/*
  Warnings:

  - The primary key for the `photos` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "photos" DROP CONSTRAINT "photos_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "photos_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "photos_id_seq";
