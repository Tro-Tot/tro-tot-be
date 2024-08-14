-- CreateTable
CREATE TABLE "house_appraisal_standard" (
    "id" TEXT NOT NULL,
    "house_appraisal" TEXT NOT NULL,
    "standard_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "house_appraisal_standard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "house_appraisal_standard" ADD CONSTRAINT "house_appraisal_standard_standard_id_fkey" FOREIGN KEY ("standard_id") REFERENCES "standards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "house_appraisal_standard" ADD CONSTRAINT "house_appraisal_standard_house_appraisal_fkey" FOREIGN KEY ("house_appraisal") REFERENCES "house_appraisal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
