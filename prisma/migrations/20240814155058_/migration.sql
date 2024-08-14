/*
  Warnings:

  - You are about to drop the `Bill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BillItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlacklistToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cid` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DepositBill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DepositTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LandLord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Manager` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Otp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Penalty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RefreshToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `add_room_member_reques` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BillItem" DROP CONSTRAINT "BillItem_bill_id_fkey";

-- DropForeignKey
ALTER TABLE "BillItem" DROP CONSTRAINT "BillItem_service_usage_id_fkey";

-- DropForeignKey
ALTER TABLE "LandLord" DROP CONSTRAINT "LandLord_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Penalty" DROP CONSTRAINT "Penalty_bill_id_fkey";

-- DropForeignKey
ALTER TABLE "RenterContract" DROP CONSTRAINT "RenterContract_deposit_bill_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_bill_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cid_id_fkey";

-- DropForeignKey
ALTER TABLE "add_room_member_reques" DROP CONSTRAINT "add_room_member_reques_renter_id_fkey";

-- DropForeignKey
ALTER TABLE "add_room_member_reques" DROP CONSTRAINT "add_room_member_reques_room_history_id_fkey";

-- DropTable
DROP TABLE "Bill";

-- DropTable
DROP TABLE "BillItem";

-- DropTable
DROP TABLE "BlacklistToken";

-- DropTable
DROP TABLE "Cid";

-- DropTable
DROP TABLE "DepositBill";

-- DropTable
DROP TABLE "DepositTransaction";

-- DropTable
DROP TABLE "LandLord";

-- DropTable
DROP TABLE "Manager";

-- DropTable
DROP TABLE "Otp";

-- DropTable
DROP TABLE "Penalty";

-- DropTable
DROP TABLE "RefreshToken";

-- DropTable
DROP TABLE "add_room_member_reques";

-- CreateTable
CREATE TABLE "add_room_member_requests" (
    "id" TEXT NOT NULL,
    "room_history_id" TEXT NOT NULL,
    "renter_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "add_room_member_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bill_items" (
    "id" TEXT NOT NULL,
    "service_usage_id" TEXT NOT NULL,
    "bill_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bill_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bills" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "black_list_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "black_list_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cids" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "issuing_authority" TEXT NOT NULL,
    "issue_date" TIMESTAMP(3) NOT NULL,
    "registered_address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deposit_bills" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "deposit_bills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deposit_transactions" (
    "id" TEXT NOT NULL,
    "deposit_bill_id" TEXT NOT NULL,
    "transaction_type" "TransactionType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "deposit_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landlords" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "landlords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "managers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otps" (
    "id" SERIAL NOT NULL,
    "otp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "otps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "penalties" (
    "id" TEXT NOT NULL,
    "bill_id" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "penalties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "refresh_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("refresh_token")
);

-- CreateIndex
CREATE UNIQUE INDEX "black_list_tokens_token_key" ON "black_list_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "cids_number_key" ON "cids"("number");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_refresh_token_key" ON "refresh_tokens"("refresh_token");

-- AddForeignKey
ALTER TABLE "add_room_member_requests" ADD CONSTRAINT "add_room_member_requests_room_history_id_fkey" FOREIGN KEY ("room_history_id") REFERENCES "RoomHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "add_room_member_requests" ADD CONSTRAINT "add_room_member_requests_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "Renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_items" ADD CONSTRAINT "bill_items_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_items" ADD CONSTRAINT "bill_items_service_usage_id_fkey" FOREIGN KEY ("service_usage_id") REFERENCES "ServiceUsage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landlords" ADD CONSTRAINT "landlords_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managers" ADD CONSTRAINT "managers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penalties" ADD CONSTRAINT "penalties_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenterContract" ADD CONSTRAINT "RenterContract_deposit_bill_id_fkey" FOREIGN KEY ("deposit_bill_id") REFERENCES "deposit_bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cid_id_fkey" FOREIGN KEY ("cid_id") REFERENCES "cids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
