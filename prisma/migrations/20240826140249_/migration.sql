/*
  Warnings:

  - A unique constraint covering the columns `[cooperative_contract_id]` on the table `houses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "houses_cooperative_contract_id_key" ON "houses"("cooperative_contract_id");
