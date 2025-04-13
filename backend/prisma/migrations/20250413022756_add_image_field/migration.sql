/*
  Warnings:

  - Added the required column `image` to the `photos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "photos" ADD COLUMN     "image" BYTEA NOT NULL;
