import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateNextGudang3Id } from "@/lib/generatedId";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const gudang3 = await prisma.gudang3.findMany();
  return NextResponse.json(gudang3, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: NextRequest) {
  try {
    const id_gudang = await generateNextGudang3Id();
    const body = await request.json();
    const { id_distribusi, id_obat, stok, nama_obat, kategori } = body;

    if (!id_distribusi || !id_obat || !stok) {
      return NextResponse.json({ error: "Field wajib diisi" }, { status: 400 });
    }

    // Cari distribusi terkait
    const distribusi = await prisma.distribusi.findUnique({
      where: { id_distribusi },
    });

    if (!distribusi) {
      return NextResponse.json({ error: "Distribusi tidak ditemukan" }, { status: 404 });
    }

    if (distribusi.tujuan !== "gudang 3") {
      return NextResponse.json({ error: "Distribusi bukan untuk gudang 3" }, { status: 400 });
    }

    if (distribusi.stok < stok) {
      return NextResponse.json({ error: "Stok distribusi tidak mencukupi" }, { status: 400 });
    }

    // Insert data ke gudang1
    await prisma.gudang3.create({
      data: {
        id_gudang,
        id_distribusi,
        id_obat,
        stok,
        nama_obat,
        kategori,
      },
    });

    // Kurangi stok di distribusi
    await prisma.distribusi.update({
      where: { id_distribusi },
      data: {
        stok: distribusi.stok - stok,
      },
    });
 return NextResponse.json({ message: "Berhasil tambah data gudang 3" }, { status: 201 });
  } catch (error) {
    console.error("Error gudang1 POST:", error);
    return NextResponse.json({ error: "Gagal tambah data gudang 3" }, { status: 500 });
  }
}


export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id_gudang, id_distribusi, id_obat, stok, nama_obat, kategori } = body;

  const updateDataGudang3 = await prisma.gudang3.update({
    where: { id_gudang },
    data: {
      id_distribusi,
      id_obat,
      stok: parseInt(stok),
      nama_obat,
      kategori,
    }
  });

  return NextResponse.json(updateDataGudang3, {
    status: 200,
  });
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_gudang } = body;

    // Pastikan ID ada
    if (!id_gudang) {
      return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 });
    }

    // Hapus data secara permanen
    await prisma.gudang1.delete({
      where: { id_gudang: String(id_gudang) },
    });

    return NextResponse.json({ message: 'Data Gudang 3 berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Gagal menghapus data gudang 3:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat menghapus' }, { status: 500 });
  }
}