-- CreateTable
CREATE TABLE "photos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "collection" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "models" TEXT NOT NULL,
    "creative_direction" TEXT NOT NULL,
    "photography" TEXT NOT NULL,
    "photography_assistant" TEXT NOT NULL,
    "film" TEXT NOT NULL,
    "styling" TEXT NOT NULL,
    "beauty" TEXT NOT NULL,
    "set_production" TEXT NOT NULL,
    "executive_production" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);
