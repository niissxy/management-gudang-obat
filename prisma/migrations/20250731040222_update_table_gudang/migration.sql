/*
  Warnings:

  - Added the required column `kategori` to the `gudang1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kategori` to the `gudang2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kategori` to the `gudang3` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gudang1" ADD COLUMN     "kategori" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "gudang2" ADD COLUMN     "kategori" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "gudang3" ADD COLUMN     "kategori" TEXT NOT NULL;
