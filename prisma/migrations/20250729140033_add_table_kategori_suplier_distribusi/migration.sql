-- CreateTable
CREATE TABLE "kategori" (
    "id_kategori" TEXT NOT NULL,
    "nama_kategori" TEXT NOT NULL,

    CONSTRAINT "kategori_pkey" PRIMARY KEY ("id_kategori")
);

-- CreateTable
CREATE TABLE "suplier" (
    "id_suplier" TEXT NOT NULL,
    "nama_suplier" TEXT NOT NULL,
    "email_suplier" TEXT NOT NULL,
    "alamat_suplier" TEXT,

    CONSTRAINT "suplier_pkey" PRIMARY KEY ("id_suplier")
);

-- CreateTable
CREATE TABLE "distribusi" (
    "id_distribusi" TEXT NOT NULL,
    "nama_obat" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "kategori" TEXT NOT NULL,
    "tgl_distribusi" TIMESTAMP(3) NOT NULL,
    "tujuan" TEXT NOT NULL,

    CONSTRAINT "distribusi_pkey" PRIMARY KEY ("id_distribusi")
);

-- CreateIndex
CREATE UNIQUE INDEX "kategori_id_kategori_key" ON "kategori"("id_kategori");

-- CreateIndex
CREATE UNIQUE INDEX "suplier_id_suplier_key" ON "suplier"("id_suplier");

-- CreateIndex
CREATE UNIQUE INDEX "distribusi_id_distribusi_key" ON "distribusi"("id_distribusi");
