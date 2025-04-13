/*
  Warnings:

  - Added the required column `imageUrl` to the `photos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "photos" ADD COLUMN     "imageUrl" TEXT NOT NULL;
