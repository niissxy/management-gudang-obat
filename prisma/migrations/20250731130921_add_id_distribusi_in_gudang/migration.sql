/*
  Warnings:

  - Added the required column `id_distribusi` to the `gudang1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_distribusi` to the `gudang2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_distribusi` to the `gudang3` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gudang1" ADD COLUMN     "id_distribusi" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "gudang2" ADD COLUMN     "id_distribusi" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "gudang3" ADD COLUMN     "id_distribusi" TEXT NOT NULL;
