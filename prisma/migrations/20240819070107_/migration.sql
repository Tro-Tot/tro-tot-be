/*
  Warnings:

  - You are about to drop the column `parent_id` on the `attachments` table. All the data in the column will be lost.
  - You are about to drop the column `parent_type` on the `attachments` table. All the data in the column will be lost.
  - You are about to drop the column `is_occupied` on the `rooms` table. All the data in the column will be lost.
  - The `status` column on the `rooms` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[index]` on the table `rooms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `display_name` to the `attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_url` to the `attachments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "room_statuses" AS ENUM ('AVAILABLE', 'UNDER_MAINTENANCE', 'OUT_OF_SERVICE', 'RESERVED', 'UNAVAILABLE', 'OCCUPIED');

-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "house_attachmentId";

-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "room_attachmentId";

-- AlterTable
ALTER TABLE "attachments" DROP COLUMN "parent_id",
DROP COLUMN "parent_type",
ADD COLUMN     "display_name" TEXT NOT NULL,
ADD COLUMN     "file_url" TEXT NOT NULL,
ADD COLUMN     "house_id" UUID,
ADD COLUMN     "room_id" UUID,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "houses" ALTER COLUMN "cooperative_contract_id" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR,
ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "is_occupied",
DROP COLUMN "status",
ADD COLUMN     "status" "room_statuses" NOT NULL DEFAULT 'UNAVAILABLE';

-- DropEnum
DROP TYPE "ParentType";

-- CreateIndex
CREATE UNIQUE INDEX "rooms_index_key" ON "rooms"("index");

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "houses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
