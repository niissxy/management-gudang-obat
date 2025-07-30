-- CreateTable
CREATE TABLE "gudang1" (
    "id_gudang" TEXT NOT NULL,
    "id_distribusi" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "nama_obat" TEXT NOT NULL,
    "tgl_distribusi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gudang1_pkey" PRIMARY KEY ("id_gudang")
);

-- CreateTable
CREATE TABLE "gudang2" (
    "id_gudang" TEXT NOT NULL,
    "id_distribusi" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "nama_obat" TEXT NOT NULL,
    "tgl_distribusi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gudang2_pkey" PRIMARY KEY ("id_gudang")
);

-- CreateTable
CREATE TABLE "gudang3" (
    "id_gudang" TEXT NOT NULL,
    "id_distribusi" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "nama_obat" TEXT NOT NULL,
    "tgl_distribusi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gudang3_pkey" PRIMARY KEY ("id_gudang")
);

-- CreateIndex
CREATE UNIQUE INDEX "gudang1_id_gudang_key" ON "gudang1"("id_gudang");

-- CreateIndex
CREATE UNIQUE INDEX "gudang2_id_gudang_key" ON "gudang2"("id_gudang");

-- CreateIndex
CREATE UNIQUE INDEX "gudang3_id_gudang_key" ON "gudang3"("id_gudang");
