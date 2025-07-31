import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateNextDistribusiId } from "@/lib/generatedId";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const dataObat = await prisma.obat.findMany({
    select: {
      id_obat: true,
      kategori: true
    }
  })

  const distribusi = await prisma.distribusi.findMany();
  return NextResponse.json(distribusi, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: NextRequest) {
  try {
    const id_distribusi = await generateNextDistribusiId();
    const body = await request.json();
    console.log("Body:", body); // Tambahkan log

    const { id_obat, nama_obat, stok, kategori, tgl_distribusi, tujuan } = body;

    // Validasi input paling awal
    if (!id_obat || !nama_obat || !stok || !kategori || !tgl_distribusi || !tujuan) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    const obat = await prisma.obat.findFirst({
      where: { id_obat },
    });

    if (!obat) {
      return NextResponse.json({ error: "Obat tidak ditemukan." }, { status: 404 });
    }

    if (obat.stok < parseInt(stok)) {
      return NextResponse.json({ error: "Stok obat tidak mencukupi." }, { status: 400 });
    }

    await prisma.obat.update({
      where: { id_obat: obat.id_obat },
      data: {
        stok: obat.stok - parseInt(stok),
      },
    });

    const newDataDistribusi = await prisma.distribusi.create({
      data: {
        id_distribusi,
        id_obat,
        nama_obat,
        stok: parseInt(stok),
        kategori,
        tgl_distribusi: new Date(tgl_distribusi),
        tujuan,
      },
    });

    return NextResponse.json(newDataDistribusi, { status: 201 });
  } catch (error: any) {
    console.error("Error saat POST distribusi:", error);
    return NextResponse.json(
      { error: 'Gagal menambahkan data distribusi' },
      { status: 500 }
    );
  }
}



export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id_distribusi, id_obat, nama_obat, stok, kategori, tujuan, tgl_distribusi } = body;

  const updateDataDistribusi = await prisma.distribusi.update({
    where: { id_distribusi },
    data: {
      id_obat,
      nama_obat,
      stok: parseInt(stok),
      kategori,
      tgl_distribusi: new Date(tgl_distribusi),
      tujuan,
    }
  });

  return NextResponse.json(updateDataDistribusi, {
    status: 200,
  });
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_distribusi } = body;

    // Pastikan ID ada
    if (!id_distribusi) {
      return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 });
    }

    // Hapus data secara permanen
    await prisma.distribusi.delete({
      where: { id_distribusi: String(id_distribusi) },
    });

    return NextResponse.json({ message: 'Data Distribusi berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Gagal menghapus data distribusi:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat menghapus' }, { status: 500 });
  }
}