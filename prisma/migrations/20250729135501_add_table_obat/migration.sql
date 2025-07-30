-- CreateTable
CREATE TABLE "obat" (
    "id_obat" TEXT NOT NULL,
    "nama_obat" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "suplier" TEXT,
    "kategori" TEXT,
    "harga" INTEGER NOT NULL,
    "exp_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "obat_pkey" PRIMARY KEY ("id_obat")
);

-- CreateIndex
CREATE UNIQUE INDEX "obat_id_obat_key" ON "obat"("id_obat");
