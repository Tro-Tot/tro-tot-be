/*
  Warnings:

  - You are about to drop the `House` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HouseService` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ConfigurationCoefficientCode" AS ENUM ('COOPERATION_PERCENTAGE');

-- CreateEnum
CREATE TYPE "CooperativeRequestStatus" AS ENUM ('LANDLORD_SENT', 'MANAGER_RECEIVED', 'MANAGER_CANCELLED', 'TECHNICAL_STAFF_ASSIGNED', 'TECHNICAL_STAFF_APPRAISED', 'MANAGER_REPORTED');

-- CreateEnum
CREATE TYPE "HouseServiceStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'TERMINATED');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('ELECTRICITY', 'WATER', 'INTERNET', 'PARKING', 'WASTE_COLLECTION', 'WASHING_MACHINE', 'CLEANING');

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_house_id_fkey";

-- DropForeignKey
ALTER TABLE "RoomService" DROP CONSTRAINT "RoomService_house_service_id_fkey";

-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "deleted_at" TIMESTAMPTZ(6);

-- DropTable
DROP TABLE "House";

-- DropTable
DROP TABLE "HouseService";

-- CreateTable
CREATE TABLE "appraisal_report" (
    "id" TEXT NOT NULL,
    "house_appraisal_id" TEXT NOT NULL,
    "manager_note" TEXT,
    "is_qualified" BOOLEAN NOT NULL,
    "company_revenue_percentage" DOUBLE PRECISION NOT NULL,
    "landlord_revenue_percentage" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "appraisal_report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" TEXT NOT NULL,
    "parent_id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_type" "FileType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configuration_coefficients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" "ConfigurationCoefficientCode" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "configuration_coefficients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cooperative_contracts" (
    "id" TEXT NOT NULL,
    "landlord_id" TEXT NOT NULL,
    "manager_id" TEXT NOT NULL,
    "company_revenue_percentage" DOUBLE PRECISION NOT NULL,
    "landlord_revenue_percentage" DOUBLE PRECISION NOT NULL,
    "contract_pdf_uri" TEXT NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL,
    "to_date" TIMESTAMP(3) NOT NULL,
    "signing_date" TIMESTAMP(3) NOT NULL,
    "exterminate_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cooperative_contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cooperative_request_schedule" (
    "id" TEXT NOT NULL,
    "cooperative_request_id" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "expectation_end" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "cooperative_request_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cooperative_request" (
    "id" TEXT NOT NULL,
    "cooperativeRequestStatus" "CooperativeRequestStatus" NOT NULL,
    "cooperative_request_status_id" TEXT NOT NULL,
    "landlord_id" TEXT NOT NULL,
    "manager_id" TEXT NOT NULL,
    "technical_staff_id" TEXT,
    "contact_number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "expect_roi" DOUBLE PRECISION,
    "length" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "expect_meeting_date" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cooperative_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_appraisal" (
    "id" TEXT NOT NULL,
    "house_appraisal_id" TEXT NOT NULL,
    "room_number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "floor_number" INTEGER NOT NULL,
    "furniture" TEXT NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "landlord_rent_price" DOUBLE PRECISION NOT NULL,
    "landlord_deposit" DOUBLE PRECISION NOT NULL,
    "has_mezzanine" BOOLEAN NOT NULL,
    "is_house" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "room_appraisal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "house_services" (
    "id" TEXT NOT NULL,
    "service_id" TEXT,
    "house_id" TEXT,
    "status" "HouseServiceStatus" NOT NULL DEFAULT 'ACTIVE',
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "house_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "houses" (
    "id" TEXT NOT NULL,
    "cooperative_contract_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "ward" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "house_type" TEXT NOT NULL,
    "number_of_floor" INTEGER NOT NULL,
    "number_of_room" INTEGER NOT NULL,
    "number_of_bathroom" INTEGER NOT NULL,
    "main_door_direction" TEXT NOT NULL,
    "furniture" TEXT NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "road_width" DOUBLE PRECISION NOT NULL,
    "description" DOUBLE PRECISION NOT NULL,
    "legal_document" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "houses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "house_appraisal" (
    "id" TEXT NOT NULL,
    "cooperative_request_id" TEXT,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "ward" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "house_type" TEXT NOT NULL,
    "number_of_floor" INTEGER NOT NULL,
    "number_of_room" INTEGER NOT NULL,
    "number_of_bathroom" INTEGER NOT NULL,
    "furniture" TEXT NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "road_width" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "legal_document" TEXT NOT NULL,
    "technical_note" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "house_appraisal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_schedules" (
    "id" TEXT NOT NULL,
    "day_of_month" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "service_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "house_id" TEXT,
    "service_schedule_id" TEXT,
    "service_name" TEXT NOT NULL,
    "service_price" DOUBLE PRECISION NOT NULL,
    "service_type" "ServiceType" NOT NULL,
    "unit" TEXT NOT NULL,
    "bill_cycle" INTEGER NOT NULL DEFAULT 1,
    "is_compulsory" BOOLEAN NOT NULL,
    "is_manual" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "standards" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_refactorable" BOOLEAN NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "standards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cooperative_request_schedule_cooperative_request_id_key" ON "cooperative_request_schedule"("cooperative_request_id");

-- CreateIndex
CREATE UNIQUE INDEX "cooperative_request_cooperative_request_status_id_key" ON "cooperative_request"("cooperative_request_status_id");

-- AddForeignKey
ALTER TABLE "appraisal_report" ADD CONSTRAINT "appraisal_report_house_appraisal_id_fkey" FOREIGN KEY ("house_appraisal_id") REFERENCES "house_appraisal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooperative_contracts" ADD CONSTRAINT "cooperative_contracts_landlord_id_fkey" FOREIGN KEY ("landlord_id") REFERENCES "LandLord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooperative_contracts" ADD CONSTRAINT "cooperative_contracts_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooperative_request_schedule" ADD CONSTRAINT "cooperative_request_schedule_cooperative_request_id_fkey" FOREIGN KEY ("cooperative_request_id") REFERENCES "cooperative_request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooperative_request" ADD CONSTRAINT "cooperative_request_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooperative_request" ADD CONSTRAINT "cooperative_request_landlord_id_fkey" FOREIGN KEY ("landlord_id") REFERENCES "LandLord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooperative_request" ADD CONSTRAINT "cooperative_request_technical_staff_id_fkey" FOREIGN KEY ("technical_staff_id") REFERENCES "TechnicalStaff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_appraisal" ADD CONSTRAINT "room_appraisal_house_appraisal_id_fkey" FOREIGN KEY ("house_appraisal_id") REFERENCES "house_appraisal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "house_services" ADD CONSTRAINT "house_services_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "houses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "house_services" ADD CONSTRAINT "house_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "houses" ADD CONSTRAINT "houses_cooperative_contract_id_fkey" FOREIGN KEY ("cooperative_contract_id") REFERENCES "cooperative_contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "house_appraisal" ADD CONSTRAINT "house_appraisal_cooperative_request_id_fkey" FOREIGN KEY ("cooperative_request_id") REFERENCES "cooperative_request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomService" ADD CONSTRAINT "RoomService_house_service_id_fkey" FOREIGN KEY ("house_service_id") REFERENCES "house_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "houses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
