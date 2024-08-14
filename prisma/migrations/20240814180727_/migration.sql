/*
  Warnings:

  - The primary key for the `House` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `House` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `roomId` column on the `House` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `HouseService` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `HouseService` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `is_deleted` on the `add_room_member_requests` table. All the data in the column will be lost.
  - The primary key for the `bill_items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `bill_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `black_list_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `updatedAt` on the `black_list_tokens` table. All the data in the column will be lost.
  - The `id` column on the `black_list_tokens` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `cids` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `cids` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `deposit_bills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `deposit_bills` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `deposit_transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `deposit_transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `landlords` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `landlords` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `managers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `managers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `penalties` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `penalties` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `RentalRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RentalRequestStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Renter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RenterContract` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RenterContractAttachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomMemberRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomVisitRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomVisitSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceUsage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TechnicalStaff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `room_history_id` on the `add_room_member_requests` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `renter_id` on the `add_room_member_requests` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `service_usage_id` on the `bill_items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `created_at` on table `cids` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `deposit_bill_id` on the `deposit_transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `landlords` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `managers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "role_codes" AS ENUM ('RENTER', 'LANDLORD', 'STAFF', 'TECHNICAL_STAFF', 'ADMIN', 'MANAGER');

-- DropForeignKey
ALTER TABLE "RentalRequest" DROP CONSTRAINT "RentalRequest_rental_request_status_id_fkey";

-- DropForeignKey
ALTER TABLE "RentalRequest" DROP CONSTRAINT "RentalRequest_renter_id_fkey";

-- DropForeignKey
ALTER TABLE "RentalRequest" DROP CONSTRAINT "RentalRequest_room_id_fkey";

-- DropForeignKey
ALTER TABLE "Renter" DROP CONSTRAINT "Renter_user_id_fkey";

-- DropForeignKey
ALTER TABLE "RenterContract" DROP CONSTRAINT "RenterContract_deposit_bill_id_fkey";

-- DropForeignKey
ALTER TABLE "RenterContract" DROP CONSTRAINT "RenterContract_renter_id_fkey";

-- DropForeignKey
ALTER TABLE "RenterContract" DROP CONSTRAINT "RenterContract_room_history_id_fkey";

-- DropForeignKey
ALTER TABLE "RenterContractAttachment" DROP CONSTRAINT "RenterContractAttachment_contract_id_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_house_id_fkey";

-- DropForeignKey
ALTER TABLE "RoomHistory" DROP CONSTRAINT "RoomHistory_room_id_fkey";

-- DropForeignKey
ALTER TABLE "RoomMember" DROP CONSTRAINT "RoomMember_renter_id_fkey";

-- DropForeignKey
ALTER TABLE "RoomMember" DROP CONSTRAINT "RoomMember_room_history_id_fkey";

-- DropForeignKey
ALTER TABLE "RoomMember" DROP CONSTRAINT "RoomMember_room_role_id_fkey";

-- DropForeignKey
ALTER TABLE "RoomService" DROP CONSTRAINT "RoomService_house_service_id_fkey";

-- DropForeignKey
ALTER TABLE "RoomService" DROP CONSTRAINT "RoomService_room_history_id_fkey";

-- DropForeignKey
ALTER TABLE "RoomVisitRequest" DROP CONSTRAINT "RoomVisitRequest_renter_id_fkey";

-- DropForeignKey
ALTER TABLE "RoomVisitRequest" DROP CONSTRAINT "RoomVisitRequest_room_id_fkey";

-- DropForeignKey
ALTER TABLE "RoomVisitSchedule" DROP CONSTRAINT "RoomVisitSchedule_room_visit_request_id_fkey";

-- DropForeignKey
ALTER TABLE "ServiceUsage" DROP CONSTRAINT "ServiceUsage_room_service_id_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_user_id_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalStaff" DROP CONSTRAINT "TechnicalStaff_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cid_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_id_fkey";

-- DropForeignKey
ALTER TABLE "add_room_member_requests" DROP CONSTRAINT "add_room_member_requests_renter_id_fkey";

-- DropForeignKey
ALTER TABLE "add_room_member_requests" DROP CONSTRAINT "add_room_member_requests_room_history_id_fkey";

-- DropForeignKey
ALTER TABLE "bill_items" DROP CONSTRAINT "bill_items_service_usage_id_fkey";

-- DropForeignKey
ALTER TABLE "landlords" DROP CONSTRAINT "landlords_user_id_fkey";

-- DropForeignKey
ALTER TABLE "managers" DROP CONSTRAINT "managers_user_id_fkey";

-- AlterTable
ALTER TABLE "House" DROP CONSTRAINT "House_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "roomId",
ADD COLUMN     "roomId" UUID,
ADD CONSTRAINT "House_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "HouseService" DROP CONSTRAINT "HouseService_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "HouseService_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "add_room_member_requests" DROP COLUMN "is_deleted",
DROP COLUMN "room_history_id",
ADD COLUMN     "room_history_id" UUID NOT NULL,
DROP COLUMN "renter_id",
ADD COLUMN     "renter_id" UUID NOT NULL,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "bill_items" DROP CONSTRAINT "bill_items_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "service_usage_id",
ADD COLUMN     "service_usage_id" UUID NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ,
ADD CONSTRAINT "bill_items_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "bills" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "black_list_tokens" DROP CONSTRAINT "black_list_tokens_pkey",
DROP COLUMN "updatedAt",
ADD COLUMN     "updated_at" TIMESTAMPTZ,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ,
ADD CONSTRAINT "black_list_tokens_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "cids" DROP CONSTRAINT "cids_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "issue_date" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ,
ADD CONSTRAINT "cids_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "deposit_bills" DROP CONSTRAINT "deposit_bills_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ,
ADD CONSTRAINT "deposit_bills_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "deposit_transactions" DROP CONSTRAINT "deposit_transactions_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "deposit_bill_id",
ADD COLUMN     "deposit_bill_id" UUID NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ,
ADD CONSTRAINT "deposit_transactions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "landlords" DROP CONSTRAINT "landlords_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ,
ADD CONSTRAINT "landlords_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "managers" DROP CONSTRAINT "managers_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ,
ADD CONSTRAINT "managers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "otps" ALTER COLUMN "expired_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "penalties" DROP CONSTRAINT "penalties_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "due_date" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ,
ADD CONSTRAINT "penalties_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "refresh_tokens" ALTER COLUMN "expired_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_pkey",
ADD COLUMN     "deleted_at" TIMESTAMPTZ,
ADD COLUMN     "updated_at" TIMESTAMPTZ,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "RentalRequest";

-- DropTable
DROP TABLE "RentalRequestStatus";

-- DropTable
DROP TABLE "Renter";

-- DropTable
DROP TABLE "RenterContract";

-- DropTable
DROP TABLE "RenterContractAttachment";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "RoomHistory";

-- DropTable
DROP TABLE "RoomMember";

-- DropTable
DROP TABLE "RoomMemberRole";

-- DropTable
DROP TABLE "RoomService";

-- DropTable
DROP TABLE "RoomVisitRequest";

-- DropTable
DROP TABLE "RoomVisitSchedule";

-- DropTable
DROP TABLE "ServiceUsage";

-- DropTable
DROP TABLE "Staff";

-- DropTable
DROP TABLE "TechnicalStaff";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "RoleCode";

-- CreateTable
CREATE TABLE "rental_requests_statuses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "status" TEXT NOT NULL DEFAULT 'pending',
    "statusCode" "StatusCode" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "rental_requests_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rental_requests" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "room_id" UUID NOT NULL,
    "renter_id" UUID NOT NULL,
    "rental_request_status_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "rental_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "renter_contract_attachment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "contract_id" UUID NOT NULL,
    "file_type" "FileType" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "renter_contract_attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "renter_contracts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "room_history_id" UUID NOT NULL,
    "deposit_bill_id" UUID NOT NULL,
    "renter_id" UUID NOT NULL,
    "total_months" INTEGER NOT NULL,
    "billing_cycle" INTEGER NOT NULL,
    "from_date" TIMESTAMPTZ NOT NULL,
    "to_date" TIMESTAMPTZ NOT NULL,
    "signing_date" TIMESTAMPTZ NOT NULL,
    "exterminate_date" TIMESTAMPTZ NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "renter_contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "renters" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "renters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "room_history_id" UUID NOT NULL,
    "renter_id" UUID NOT NULL,
    "attachment_id" UUID,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "code" "role_codes" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_histories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "room_id" UUID NOT NULL,
    "from_date" TIMESTAMPTZ NOT NULL,
    "to_date" TIMESTAMPTZ,
    "status" "RoomHistoryStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "room_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_members" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "room_history_id" UUID NOT NULL,
    "renter_id" UUID NOT NULL,
    "room_role_id" UUID NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "room_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_member_roles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "room_role_name" TEXT NOT NULL,
    "room_role_code" "RoomRoleCode" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "room_member_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_member_services" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "house_service_id" UUID NOT NULL,
    "room_history_id" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "from_date" TIMESTAMPTZ,
    "to_date" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "room_member_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_member_requests" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "room_id" UUID NOT NULL,
    "renter_id" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "room_member_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_member_schedules" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "room_visit_request_id" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "from" TIMESTAMPTZ NOT NULL,
    "expectation_end" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "room_member_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "house_id" UUID NOT NULL,
    "attachment_id" UUID,
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
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_usages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "room_service_id" UUID NOT NULL,
    "previous_usage_number" INTEGER,
    "current_usage_number" INTEGER NOT NULL,
    "from_date" TIMESTAMPTZ NOT NULL,
    "to_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_initial" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "service_usages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staffs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "staffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technical_staffs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "technical_staffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar_url" TEXT,
    "cid_id" UUID,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "first_name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "is_deleted" BOOLEAN DEFAULT false,
    "is_verified" BOOLEAN DEFAULT false,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "role_id" UUID NOT NULL,
    "status" TEXT DEFAULT 'active',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "renter_contracts_deposit_bill_id_key" ON "renter_contracts"("deposit_bill_id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_house_id_key" ON "rooms"("house_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- AddForeignKey
ALTER TABLE "add_room_member_requests" ADD CONSTRAINT "add_room_member_requests_room_history_id_fkey" FOREIGN KEY ("room_history_id") REFERENCES "room_histories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "add_room_member_requests" ADD CONSTRAINT "add_room_member_requests_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "renters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_items" ADD CONSTRAINT "bill_items_service_usage_id_fkey" FOREIGN KEY ("service_usage_id") REFERENCES "service_usages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landlords" ADD CONSTRAINT "landlords_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managers" ADD CONSTRAINT "managers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_requests" ADD CONSTRAINT "rental_requests_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_requests" ADD CONSTRAINT "rental_requests_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "renters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_requests" ADD CONSTRAINT "rental_requests_rental_request_status_id_fkey" FOREIGN KEY ("rental_request_status_id") REFERENCES "rental_requests_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renter_contract_attachment" ADD CONSTRAINT "renter_contract_attachment_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "renter_contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renter_contracts" ADD CONSTRAINT "renter_contracts_room_history_id_fkey" FOREIGN KEY ("room_history_id") REFERENCES "room_histories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renter_contracts" ADD CONSTRAINT "renter_contracts_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "renters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renter_contracts" ADD CONSTRAINT "renter_contracts_deposit_bill_id_fkey" FOREIGN KEY ("deposit_bill_id") REFERENCES "deposit_bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renters" ADD CONSTRAINT "renters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_histories" ADD CONSTRAINT "room_histories_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_members" ADD CONSTRAINT "room_members_room_history_id_fkey" FOREIGN KEY ("room_history_id") REFERENCES "room_histories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_members" ADD CONSTRAINT "room_members_room_role_id_fkey" FOREIGN KEY ("room_role_id") REFERENCES "room_member_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_members" ADD CONSTRAINT "room_members_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "renters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_member_services" ADD CONSTRAINT "room_member_services_house_service_id_fkey" FOREIGN KEY ("house_service_id") REFERENCES "HouseService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_member_services" ADD CONSTRAINT "room_member_services_room_history_id_fkey" FOREIGN KEY ("room_history_id") REFERENCES "room_histories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_member_requests" ADD CONSTRAINT "room_member_requests_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_member_requests" ADD CONSTRAINT "room_member_requests_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "renters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_member_schedules" ADD CONSTRAINT "room_member_schedules_room_visit_request_id_fkey" FOREIGN KEY ("room_visit_request_id") REFERENCES "room_member_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_usages" ADD CONSTRAINT "service_usages_room_service_id_fkey" FOREIGN KEY ("room_service_id") REFERENCES "room_member_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffs" ADD CONSTRAINT "staffs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technical_staffs" ADD CONSTRAINT "technical_staffs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cid_id_fkey" FOREIGN KEY ("cid_id") REFERENCES "cids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
