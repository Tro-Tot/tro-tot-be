/*
  Warnings:

  - The values [ACTIVE] on the enum `HouseServiceStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HouseServiceStatus_new" AS ENUM ('AVAILABLE', 'UNREGISTRABLE', 'TERMINATED', 'UNAVAILABLE');
ALTER TABLE "house_services" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "house_services" ALTER COLUMN "status" TYPE "HouseServiceStatus_new" USING ("status"::text::"HouseServiceStatus_new");
ALTER TYPE "HouseServiceStatus" RENAME TO "HouseServiceStatus_old";
ALTER TYPE "HouseServiceStatus_new" RENAME TO "HouseServiceStatus";
DROP TYPE "HouseServiceStatus_old";
ALTER TABLE "house_services" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
COMMIT;

-- AlterTable
ALTER TABLE "house_services" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
