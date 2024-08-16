/*
  Warnings:

  - You are about to drop the column `attachment_id` on the `rooms` table. All the data in the column will be lost.
  - Added the required column `parent_type` to the `attachments` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `parent_id` on the `attachments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

-- CreateEnum
CREATE TYPE "ParentType" AS ENUM ('ROOM', 'HOUSE');

-- DropIndex
DROP INDEX "rooms_house_id_key";

-- AlterTable
ALTER TABLE "attachments" ADD COLUMN     "parent_type" "ParentType" NOT NULL,
DROP COLUMN "parent_id",
ADD COLUMN     "parent_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "attachment_id",
ADD COLUMN     "description" TEXT;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "house_attachmentId" FOREIGN KEY ("parent_id") REFERENCES "houses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "room_attachmentId" FOREIGN KEY ("parent_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
