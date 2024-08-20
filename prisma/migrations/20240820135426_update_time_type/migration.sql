/*
  Warnings:

  - You are about to drop the column `is_deleted` on the `cooperative_request` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "houses" DROP CONSTRAINT "houses_cooperative_contract_id_fkey";

-- AlterTable
ALTER TABLE "add_room_member_requests" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "appraisal_report" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "attachments" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "bill_items" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "bills" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "black_list_tokens" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "expired_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "cids" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "configuration_coefficients" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP DEFAULT,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "cooperative_contracts" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "cooperative_request" DROP COLUMN "is_deleted",
ADD COLUMN     "deleted_at" TIMESTAMPTZ,
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "cooperative_request_schedule" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "deposit_bills" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "deposit_transactions" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "house_appraisal" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "house_appraisal_standard" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "house_services" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP DEFAULT,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "houses" ALTER COLUMN "cooperative_contract_id" DROP NOT NULL,
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "landlords" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "managers" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "otps" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "penalties" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "refresh_tokens" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "rental_requests" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "rental_requests_statuses" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "renter_contract_attachment" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "renter_contracts" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "renters" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "reports" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "room_appraisal" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "room_histories" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "room_member_requests" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "room_member_roles" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "room_member_schedules" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "room_member_services" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "room_members" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "rooms" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "service_schedules" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP DEFAULT,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "service_usages" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "services" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP DEFAULT,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "staffs" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "standards" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" DROP DEFAULT,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "technical_staffs" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "houses" ADD CONSTRAINT "houses_cooperative_contract_id_fkey" FOREIGN KEY ("cooperative_contract_id") REFERENCES "cooperative_contracts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
