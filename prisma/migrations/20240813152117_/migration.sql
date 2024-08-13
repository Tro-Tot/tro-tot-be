/*
  Warnings:

  - You are about to drop the column `userId` on the `LandLord` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Otp` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Otp` table. All the data in the column will be lost.
  - You are about to drop the column `expiredAt` on the `Otp` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Otp` table. All the data in the column will be lost.
  - The primary key for the `RefreshToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `expiredAt` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TechnicalStaff` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TechnicalStaff` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TechnicalStaff` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[refresh_token]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `LandLord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Manager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Manager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expired_at` to the `Otp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Otp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expired_at` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Renter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Renter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `TechnicalStaff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `TechnicalStaff` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LandLord" DROP CONSTRAINT "LandLord_userId_fkey";

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_userId_fkey";

-- DropForeignKey
ALTER TABLE "Renter" DROP CONSTRAINT "Renter_userId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_userId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalStaff" DROP CONSTRAINT "TechnicalStaff_userId_fkey";

-- DropIndex
DROP INDEX "RefreshToken_refreshToken_key";

-- AlterTable
ALTER TABLE "LandLord" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Manager" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Otp" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "expiredAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "expired_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "expiredAt",
DROP COLUMN "refreshToken",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expired_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "refresh_token" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("refresh_token");

-- AlterTable
ALTER TABLE "Renter" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TechnicalStaff" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_refresh_token_key" ON "RefreshToken"("refresh_token");

-- AddForeignKey
ALTER TABLE "LandLord" ADD CONSTRAINT "LandLord_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renter" ADD CONSTRAINT "Renter_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalStaff" ADD CONSTRAINT "TechnicalStaff_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
