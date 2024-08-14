/*
  Warnings:

  - You are about to drop the column `payment_method` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `RoomHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_type` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('IMAGE', 'PDF', 'VIDEO');

-- CreateEnum
CREATE TYPE "StatusCode" AS ENUM ('PENDING', 'APPROVE', 'DISAPPROVE');

-- CreateEnum
CREATE TYPE "RoomHistoryStatus" AS ENUM ('ACTIVE', 'DEACTIVE');

-- CreateEnum
CREATE TYPE "RoomRoleCode" AS ENUM ('CONTRACT_OWNER', 'MEMBER');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('BANKING', 'CASH');

-- AlterTable
ALTER TABLE "RoomHistory" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "status" "RoomHistoryStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "payment_method",
ADD COLUMN     "transaction_type" "TransactionType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- CreateTable
CREATE TABLE "AddRoomMemberRequest" (
    "id" TEXT NOT NULL,
    "room_history_id" TEXT NOT NULL,
    "renter_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AddRoomMemberRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepositBill" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DepositBill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepositTransaction" (
    "id" TEXT NOT NULL,
    "deposit_bill_id" TEXT NOT NULL,
    "transaction_type" "TransactionType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DepositTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalRequestStatus" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "statusCode" "StatusCode" NOT NULL DEFAULT 'PENDING',
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RentalRequestStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalRequest" (
    "id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "renter_id" TEXT NOT NULL,
    "rental_request_status_id" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RentalRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RenterContractAttachment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contract_id" TEXT NOT NULL,
    "file_type" "FileType" NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RenterContractAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RenterContract" (
    "id" TEXT NOT NULL,
    "room_history_id" TEXT NOT NULL,
    "deposit_bill_id" TEXT NOT NULL,
    "renter_id" TEXT NOT NULL,
    "total_months" INTEGER NOT NULL,
    "billing_cycle" INTEGER NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL,
    "to_date" TIMESTAMP(3) NOT NULL,
    "signing_date" TIMESTAMP(3) NOT NULL,
    "exterminate_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RenterContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "room_history_id" TEXT NOT NULL,
    "renter_id" TEXT NOT NULL,
    "attachment_id" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomMember" (
    "id" TEXT NOT NULL,
    "room_history_id" TEXT NOT NULL,
    "renter_id" TEXT NOT NULL,
    "room_role_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomMemberRole" (
    "id" TEXT NOT NULL,
    "room_role_name" TEXT NOT NULL,
    "room_role_code" "RoomRoleCode" NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomMemberRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomVisitRequest" (
    "id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "renter_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomVisitRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomVisitSchedule" (
    "id" TEXT NOT NULL,
    "room_visit_request_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "from" TIMESTAMP(3) NOT NULL,
    "expectation_end" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomVisitSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RenterContract_deposit_bill_id_key" ON "RenterContract"("deposit_bill_id");

-- AddForeignKey
ALTER TABLE "AddRoomMemberRequest" ADD CONSTRAINT "AddRoomMemberRequest_room_history_id_fkey" FOREIGN KEY ("room_history_id") REFERENCES "RoomHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddRoomMemberRequest" ADD CONSTRAINT "AddRoomMemberRequest_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "Renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalRequest" ADD CONSTRAINT "RentalRequest_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalRequest" ADD CONSTRAINT "RentalRequest_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "Renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalRequest" ADD CONSTRAINT "RentalRequest_rental_request_status_id_fkey" FOREIGN KEY ("rental_request_status_id") REFERENCES "RentalRequestStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenterContractAttachment" ADD CONSTRAINT "RenterContractAttachment_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "RenterContract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenterContract" ADD CONSTRAINT "RenterContract_room_history_id_fkey" FOREIGN KEY ("room_history_id") REFERENCES "RoomHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenterContract" ADD CONSTRAINT "RenterContract_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "Renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenterContract" ADD CONSTRAINT "RenterContract_deposit_bill_id_fkey" FOREIGN KEY ("deposit_bill_id") REFERENCES "DepositBill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMember" ADD CONSTRAINT "RoomMember_room_history_id_fkey" FOREIGN KEY ("room_history_id") REFERENCES "RoomHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMember" ADD CONSTRAINT "RoomMember_room_role_id_fkey" FOREIGN KEY ("room_role_id") REFERENCES "RoomMemberRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMember" ADD CONSTRAINT "RoomMember_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "Renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomVisitRequest" ADD CONSTRAINT "RoomVisitRequest_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomVisitRequest" ADD CONSTRAINT "RoomVisitRequest_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "Renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomVisitSchedule" ADD CONSTRAINT "RoomVisitSchedule_room_visit_request_id_fkey" FOREIGN KEY ("room_visit_request_id") REFERENCES "RoomVisitRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
