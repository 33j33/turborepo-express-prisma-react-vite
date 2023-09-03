-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rules" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackingPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventsOnTrackingPlan" (
    "eventId" TEXT NOT NULL,
    "trackingPlanId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventsOnTrackingPlan_pkey" PRIMARY KEY ("eventId","trackingPlanId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_key" ON "Event"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TrackingPlan_name_key" ON "TrackingPlan"("name");

-- AddForeignKey
ALTER TABLE "EventsOnTrackingPlan" ADD CONSTRAINT "EventsOnTrackingPlan_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventsOnTrackingPlan" ADD CONSTRAINT "EventsOnTrackingPlan_trackingPlanId_fkey" FOREIGN KEY ("trackingPlanId") REFERENCES "TrackingPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
