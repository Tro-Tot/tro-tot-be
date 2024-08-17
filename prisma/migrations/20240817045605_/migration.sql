/*
  Warnings:

  - The values [INACTIVE] on the enum `HouseServiceStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('ACTIVE', 'UNREGISTRABLE', 'TERMINATED');

-- AlterEnum
BEGIN;
CREATE TYPE "HouseServiceStatus_new" AS ENUM ('ACTIVE', 'UNREGISTRABLE', 'TERMINATED');
ALTER TABLE "house_services" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "house_services" ALTER COLUMN "status" TYPE "HouseServiceStatus_new" USING ("status"::text::"HouseServiceStatus_new");
ALTER TYPE "HouseServiceStatus" RENAME TO "HouseServiceStatus_old";
ALTER TYPE "HouseServiceStatus_new" RENAME TO "HouseServiceStatus";
DROP TYPE "HouseServiceStatus_old";
ALTER TABLE "house_services" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;
