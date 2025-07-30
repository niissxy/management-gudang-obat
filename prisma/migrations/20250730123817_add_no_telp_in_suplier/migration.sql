/*
  Warnings:

  - Added the required column `no_telp` to the `suplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "suplier" ADD COLUMN     "no_telp" INTEGER NOT NULL;
