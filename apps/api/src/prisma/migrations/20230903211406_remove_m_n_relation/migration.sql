/*
  Warnings:

  - You are about to drop the `EventsOnTrackingPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventsOnTrackingPlan" DROP CONSTRAINT "EventsOnTrackingPlan_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventsOnTrackingPlan" DROP CONSTRAINT "EventsOnTrackingPlan_trackingPlanId_fkey";

-- DropTable
DROP TABLE "EventsOnTrackingPlan";

-- CreateTable
CREATE TABLE "_EventToTrackingPlan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventToTrackingPlan_AB_unique" ON "_EventToTrackingPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToTrackingPlan_B_index" ON "_EventToTrackingPlan"("B");

-- AddForeignKey
ALTER TABLE "_EventToTrackingPlan" ADD CONSTRAINT "_EventToTrackingPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToTrackingPlan" ADD CONSTRAINT "_EventToTrackingPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "TrackingPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
