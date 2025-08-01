import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateNextKategoriId } from "@/lib/generatedId";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const kategori = await prisma.kategori.findMany({
    orderBy: {
      id_kategori: 'asc', 
    },
  });
  return NextResponse.json(kategori, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: NextRequest) {
  try {
    const id_kategori = await generateNextKategoriId();
    const body = await request.json();
    const { nama_kategori } = body;

    // Validasi input
    if (!nama_kategori) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    const newDataKategori = await prisma.kategori.create({
      data: {
        id_kategori,
        nama_kategori,
      },
    });

    return NextResponse.json(newDataKategori, { status: 201 });
  } catch (error: any) {
    console.error("Error saat POST kategori:", error);
    return NextResponse.json(
      { error: 'Gagal menambahkan data kategori' },
      { status: 500 }
    );
  }
}


export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id_kategori, nama_kategori } = body;

  const updateDataKategori = await prisma.kategori.update({
    where: { id_kategori },
    data: {
      nama_kategori,
    }
  });

  return NextResponse.json(updateDataKategori, {
    status: 200,
  });
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_kategori } = body;

    // Pastikan ID ada
    if (!id_kategori) {
      return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 });
    }

    // Hapus data secara permanen
    await prisma.kategori.delete({
      where: { id_kategori: String(id_kategori) },
    });

    return NextResponse.json({ message: 'Data Kategori berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Gagal menghapus data obat:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat menghapus' }, { status: 500 });
  }
}