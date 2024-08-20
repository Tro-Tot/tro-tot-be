/*
  Warnings:

  - A unique constraint covering the columns `[house_appraisal_id]` on the table `appraisal_report` will be added. If there are existing duplicate values, this will fail.
  - Made the column `created_at` on table `deposit_transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "cooperative_contracts" DROP CONSTRAINT "cooperative_contracts_landlord_id_fkey";

-- DropForeignKey
ALTER TABLE "cooperative_contracts" DROP CONSTRAINT "cooperative_contracts_manager_id_fkey";

-- AlterTable
ALTER TABLE "deposit_transactions" ALTER COLUMN "created_at" SET NOT NULL;

-- CreateTable
CREATE TABLE "_CooperativeContractToLandLord" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_CooperativeContractToManager" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CooperativeContractToLandLord_AB_unique" ON "_CooperativeContractToLandLord"("A", "B");

-- CreateIndex
CREATE INDEX "_CooperativeContractToLandLord_B_index" ON "_CooperativeContractToLandLord"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CooperativeContractToManager_AB_unique" ON "_CooperativeContractToManager"("A", "B");

-- CreateIndex
CREATE INDEX "_CooperativeContractToManager_B_index" ON "_CooperativeContractToManager"("B");

-- CreateIndex
CREATE UNIQUE INDEX "appraisal_report_house_appraisal_id_key" ON "appraisal_report"("house_appraisal_id");

-- AddForeignKey
ALTER TABLE "_CooperativeContractToLandLord" ADD CONSTRAINT "_CooperativeContractToLandLord_A_fkey" FOREIGN KEY ("A") REFERENCES "cooperative_contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CooperativeContractToLandLord" ADD CONSTRAINT "_CooperativeContractToLandLord_B_fkey" FOREIGN KEY ("B") REFERENCES "landlords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CooperativeContractToManager" ADD CONSTRAINT "_CooperativeContractToManager_A_fkey" FOREIGN KEY ("A") REFERENCES "cooperative_contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CooperativeContractToManager" ADD CONSTRAINT "_CooperativeContractToManager_B_fkey" FOREIGN KEY ("B") REFERENCES "managers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
