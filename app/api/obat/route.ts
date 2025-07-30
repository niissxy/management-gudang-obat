import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateNextObatId } from "@/lib/generatedId";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const obat = await prisma.obat.findMany();
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

  const updateDataObat = await prisma.obat.update({
    where: { id_obat },
    data: {
      nama_obat,
      stok: parseInt(stok),
      suplier,
      kategori,
      harga: parseFloat(harga),
      exp_date: new Date(exp_date) // Ensure exp_date is a Date object
    }
  });

  return NextResponse.json(updateDataObat, {
    status: 200,
  });
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_obat } = body;

    // Pastikan ID ada
    if (!id_obat) {
      return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 });
    }

    // Hapus data secara permanen
    await prisma.obat.delete({
      where: { id_obat: String(id_obat) },
    });

    return NextResponse.json({ message: 'Data Obat berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Gagal menghapus data obat:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat menghapus' }, { status: 500 });
  }
}