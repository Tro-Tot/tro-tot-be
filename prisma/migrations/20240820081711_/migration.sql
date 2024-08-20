/*
  Warnings:

  - The `status` column on the `services` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `cooperative_contract_id` on table `houses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `houses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted_at` on table `houses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "houses" ALTER COLUMN "cooperative_contract_id" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DATA TYPE TEXT,
ALTER COLUMN "deleted_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "services" DROP COLUMN "status",
ADD COLUMN     "status" "ServiceStatus" NOT NULL DEFAULT 'ACTIVE';
