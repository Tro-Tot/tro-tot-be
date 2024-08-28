/*
  Warnings:

  - You are about to drop the column `room_service_id` on the `service_usages` table. All the data in the column will be lost.
  - You are about to drop the `room_member_services` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `room_service_subscription_id` to the `service_usages` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoomServiceStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'OUT_OF_SERVICE', 'UNREGISTERABLE');

-- DropForeignKey
ALTER TABLE "room_member_services" DROP CONSTRAINT "room_member_services_house_service_id_fkey";

-- DropForeignKey
ALTER TABLE "room_member_services" DROP CONSTRAINT "room_member_services_room_history_id_fkey";

-- DropForeignKey
ALTER TABLE "service_usages" DROP CONSTRAINT "service_usages_room_service_id_fkey";

-- AlterTable
ALTER TABLE "service_usages" DROP COLUMN "room_service_id",
ADD COLUMN     "room_service_subscription_id" UUID NOT NULL;

-- DropTable
DROP TABLE "room_member_services";

-- CreateTable
CREATE TABLE "room_service_subscriptions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "room_service_id" UUID NOT NULL,
    "room_history_id" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "from_date" TIMESTAMPTZ(6),
    "to_date" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ,
    "updated_at" TIMESTAMPTZ,

    CONSTRAINT "room_service_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_services" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "house_service_id" UUID NOT NULL,
    "room_id" UUID NOT NULL,
    "status" "RoomServiceStatus" NOT NULL DEFAULT 'AVAILABLE',
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ,
    "updated_at" TIMESTAMPTZ,

    CONSTRAINT "room_services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "room_service_subscriptions" ADD CONSTRAINT "room_service_subscriptions_room_service_id_fkey" FOREIGN KEY ("room_service_id") REFERENCES "room_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_service_subscriptions" ADD CONSTRAINT "room_service_subscriptions_room_history_id_fkey" FOREIGN KEY ("room_history_id") REFERENCES "room_histories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_services" ADD CONSTRAINT "room_services_house_service_id_fkey" FOREIGN KEY ("house_service_id") REFERENCES "house_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_services" ADD CONSTRAINT "room_services_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_usages" ADD CONSTRAINT "service_usages_room_service_subscription_id_fkey" FOREIGN KEY ("room_service_subscription_id") REFERENCES "room_service_subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
