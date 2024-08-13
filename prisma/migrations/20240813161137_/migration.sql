-- CreateTable
CREATE TABLE "BillItem" (
    "id" TEXT NOT NULL,
    "service_usage_id" TEXT NOT NULL,
    "bill_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BillItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL,
    "roomId" TEXT,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penalty" (
    "id" TEXT NOT NULL,
    "bill_id" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Penalty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomHistory" (
    "id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL,
    "to_date" TIMESTAMP(3),

    CONSTRAINT "RoomHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomService" (
    "id" TEXT NOT NULL,
    "house_service_id" TEXT NOT NULL,
    "room_history_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "from_date" TIMESTAMP(3),
    "to_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseService" (
    "id" TEXT NOT NULL,

    CONSTRAINT "HouseService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "house_id" TEXT NOT NULL,
    "attachment_id" TEXT,
    "room_name" TEXT NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "square_footage" DOUBLE PRECISION NOT NULL,
    "reservation_price" DOUBLE PRECISION NOT NULL,
    "number_of_bedrooms" INTEGER NOT NULL,
    "number_of_bathrooms" INTEGER NOT NULL,
    "rent_price" DOUBLE PRECISION NOT NULL,
    "number_of_people" INTEGER NOT NULL,
    "has_mezzanine" BOOLEAN NOT NULL,
    "is_occupied" BOOLEAN NOT NULL DEFAULT false,
    "index" SERIAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceUsage" (
    "id" TEXT NOT NULL,
    "room_service_id" TEXT NOT NULL,
    "previous_usage_number" INTEGER,
    "current_usage_number" INTEGER NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL,
    "to_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_initial" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "bill_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "payment_method" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_house_id_key" ON "Room"("house_id");

-- AddForeignKey
ALTER TABLE "BillItem" ADD CONSTRAINT "BillItem_service_usage_id_fkey" FOREIGN KEY ("service_usage_id") REFERENCES "ServiceUsage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillItem" ADD CONSTRAINT "BillItem_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penalty" ADD CONSTRAINT "Penalty_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomHistory" ADD CONSTRAINT "RoomHistory_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomService" ADD CONSTRAINT "RoomService_room_history_id_fkey" FOREIGN KEY ("room_history_id") REFERENCES "RoomHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomService" ADD CONSTRAINT "RoomService_house_service_id_fkey" FOREIGN KEY ("house_service_id") REFERENCES "HouseService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceUsage" ADD CONSTRAINT "ServiceUsage_room_service_id_fkey" FOREIGN KEY ("room_service_id") REFERENCES "RoomService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
