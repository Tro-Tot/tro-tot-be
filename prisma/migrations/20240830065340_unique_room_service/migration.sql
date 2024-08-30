/*
  Warnings:

  - A unique constraint covering the columns `[house_service_id,room_id]` on the table `room_services` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "room_services_house_service_id_room_id_key" ON "room_services"("house_service_id", "room_id");
