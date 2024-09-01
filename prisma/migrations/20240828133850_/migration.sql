/*
  Warnings:

  - You are about to drop the column `furniture` on the `houses` table. All the data in the column will be lost.
  - You are about to drop the column `main_door_direction` on the `houses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[house_service_id]` on the table `service_schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "houses" DROP COLUMN "furniture",
DROP COLUMN "main_door_direction",
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "service_schedules" ADD COLUMN     "house_service_id" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "service_schedules_house_service_id_key" ON "service_schedules"("house_service_id");

-- AddForeignKey
ALTER TABLE "service_schedules" ADD CONSTRAINT "service_schedules_house_service_id_fkey" FOREIGN KEY ("house_service_id") REFERENCES "house_services"("id") ON DELETE SET NULL ON UPDATE CASCADE;
