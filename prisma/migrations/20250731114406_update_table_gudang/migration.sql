/*
  Warnings:

  - You are about to drop the column `id_distribusi` on the `gudang1` table. All the data in the column will be lost.
  - You are about to drop the column `tgl_distribusi` on the `gudang1` table. All the data in the column will be lost.
  - You are about to drop the column `id_distribusi` on the `gudang2` table. All the data in the column will be lost.
  - You are about to drop the column `tgl_distribusi` on the `gudang2` table. All the data in the column will be lost.
  - You are about to drop the column `id_distribusi` on the `gudang3` table. All the data in the column will be lost.
  - You are about to drop the column `tgl_distribusi` on the `gudang3` table. All the data in the column will be lost.
  - Added the required column `id_obat` to the `gudang1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_obat` to the `gudang2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_obat` to the `gudang3` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gudang1" DROP COLUMN "id_distribusi",
DROP COLUMN "tgl_distribusi",
ADD COLUMN     "id_obat" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "gudang2" DROP COLUMN "id_distribusi",
DROP COLUMN "tgl_distribusi",
ADD COLUMN     "id_obat" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "gudang3" DROP COLUMN "id_distribusi",
DROP COLUMN "tgl_distribusi",
ADD COLUMN     "id_obat" TEXT NOT NULL;
