/*
  Warnings:

  - The values [BULDING_MANAGER,COOPERATIVE_MANAGER] on the enum `RoleCode` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `createdAt` on the `BlacklistToken` table. All the data in the column will be lost.
  - You are about to drop the column `expiredAt` on the `BlacklistToken` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `LandLord` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `LandLord` table. All the data in the column will be lost.
  - Added the required column `expired_at` to the `BlacklistToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `LandLord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleCode_new" AS ENUM ('RENTER', 'LANDLORD', 'STAFF', 'TECHNICAL_STAFF', 'ADMIN', 'MANAGER');
ALTER TABLE "Role" ALTER COLUMN "code" TYPE "RoleCode_new" USING ("code"::text::"RoleCode_new");
ALTER TYPE "RoleCode" RENAME TO "RoleCode_old";
ALTER TYPE "RoleCode_new" RENAME TO "RoleCode";
DROP TYPE "RoleCode_old";
COMMIT;

-- AlterTable
ALTER TABLE "BlacklistToken" DROP COLUMN "createdAt",
DROP COLUMN "expiredAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expired_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "LandLord" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cid_id" DROP NOT NULL;
