/*
  Warnings:

  - You are about to drop the `AddRoomMemberRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AddRoomMemberRequest" DROP CONSTRAINT "AddRoomMemberRequest_renter_id_fkey";

-- DropForeignKey
ALTER TABLE "AddRoomMemberRequest" DROP CONSTRAINT "AddRoomMemberRequest_room_history_id_fkey";

-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "deleted_at" TIMESTAMPTZ(6);

-- DropTable
DROP TABLE "AddRoomMemberRequest";

-- CreateTable
CREATE TABLE "add_room_member_reques" (
    "id" TEXT NOT NULL,
    "room_history_id" TEXT NOT NULL,
    "renter_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "add_room_member_reques_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "add_room_member_reques" ADD CONSTRAINT "add_room_member_reques_room_history_id_fkey" FOREIGN KEY ("room_history_id") REFERENCES "RoomHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "add_room_member_reques" ADD CONSTRAINT "add_room_member_reques_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "Renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
