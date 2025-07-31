/*
  Warnings:

  - Made the column `id_obat` on table `distribusi` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "distribusi" ALTER COLUMN "id_obat" SET NOT NULL;
