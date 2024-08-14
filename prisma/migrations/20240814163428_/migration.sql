/*
  Warnings:

  - The primary key for the `bills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `bills` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `bill_id` on the `bill_items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bill_id` on the `penalties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_bill_id_fkey";

-- DropForeignKey
ALTER TABLE "bill_items" DROP CONSTRAINT "bill_items_bill_id_fkey";

-- DropForeignKey
ALTER TABLE "penalties" DROP CONSTRAINT "penalties_bill_id_fkey";

-- AlterTable
ALTER TABLE "bill_items" DROP COLUMN "bill_id",
ADD COLUMN     "bill_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "bills" DROP CONSTRAINT "bills_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "bills_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "penalties" DROP COLUMN "bill_id",
ADD COLUMN     "bill_id" UUID NOT NULL;

-- DropTable
DROP TABLE "Transaction";

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "bill_id" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transaction_type" "TransactionType" NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bill_items" ADD CONSTRAINT "bill_items_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penalties" ADD CONSTRAINT "penalties_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
