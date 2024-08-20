/*
  Warnings:

  - A unique constraint covering the columns `[house_id,service_id]` on the table `house_services` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "house_services_house_id_service_id_key" ON "house_services"("house_id", "service_id");
