import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateNextObatId } from "@/lib/generatedId";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const obat = await prisma.obat.findMany({
    orderBy: {
      id_obat: 'asc', 
    },
  });
  return NextResponse.json(obat, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}


export async function POST(request: NextRequest) {
  try {
    const id_obat = await generateNextObatId();
    const body = await request.json();
    const { nama_obat, stok, suplier, kategori, harga, exp_date } = body;

    // Validasi input
    if (!nama_obat || !stok || !suplier || !kategori || !harga || !exp_date) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    const newDataObat = await prisma.obat.create({
      data: {
        id_obat,
        nama_obat,
        stok: parseInt(stok),
        suplier,
        kategori,
        harga: parseFloat(harga),
        exp_date: new Date(exp_date)
      },
    });

    return NextResponse.json(newDataObat, { status: 201 });
  } catch (error: any) {
    console.error("Error saat POST obat:", error);
    return NextResponse.json(
      { error: 'Gagal menambahkan data obat' },
      { status: 500 }
    );
  }
}


export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id_obat, nama_obat, stok, suplier, kategori, harga, exp_date } = body;

  // 1. Ambil stok lama
  const obatLama = await prisma.obat.findUnique({
    where: { id_obat },
  });

  if (!obatLama) {
    return NextResponse.json({ error: 'Obat tidak ditemukan' }, { status: 404 });
  }

  // 2. Tambahkan stok lama + stok baru
  const stokBaru = obatLama.stok + parseInt(stok);

  // 3. Update data
  const updateDataObat = await prisma.obat.update({
    where: { id_obat },
    data: {
      nama_obat,
      stok: stokBaru,
      suplier,
      kategori,
      harga: parseFloat(harga),
      exp_date: new Date(exp_date),
    },
  });

  return NextResponse.json(updateDataObat, {
    status: 200,
  });
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    // Cari obat berdasarkan ID
    const obat = await prisma.obat.findUnique({
      where: { id_obat: id },
    });

    if (!obat) {
      return NextResponse.json({ error: "Obat tidak ditemukan." }, { status: 404 });
    }

    // Cek apakah obat sudah digunakan di distribusi
    const digunakanDistribusi = await prisma.distribusi.findFirst({
      where: { id_obat: id },
    });

    const digunakanGudang1 = await prisma.gudang1.findFirst({
      where: { id_obat: id },
    });

    const digunakanGudang2 = await prisma.gudang2.findFirst({
      where: { id_obat: id },
    });

    const digunakanGudang3 = await prisma.gudang3.findFirst({
      where: { id_obat: id },
    });

    if (digunakanDistribusi || digunakanGudang1 || digunakanGudang2 || digunakanGudang3) {
      return NextResponse.json({
        error: "Obat tidak bisa dihapus karena sudah digunakan di distribusi atau gudang.",
      }, { status: 400 });
    }

    // Jika belum digunakan, lanjut hapus
    await prisma.obat.delete({
      where: { id_obat: id },
    });

    return NextResponse.json({ message: "Obat berhasil dihapus." });
  } catch (error) {
    console.error("Gagal menghapus obat:", error);
    return NextResponse.json({ error: "Terjadi kesalahan saat menghapus." }, { status: 500 });
  }
}
