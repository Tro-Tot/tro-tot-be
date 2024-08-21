-- AlterTable
ALTER TABLE "deposit_transactions" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "houses" ADD COLUMN     "staff_id" UUID;

-- AddForeignKey
ALTER TABLE "houses" ADD CONSTRAINT "houses_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
