import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateNextGudang2Id } from "@/lib/generatedId";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const gudang2 = await prisma.gudang2.findMany({
    orderBy: {
      id_gudang: 'asc', 
    },
  });
  return NextResponse.json(gudang2, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: NextRequest) {
  try {
    const id_gudang = await generateNextGudang2Id();
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

    if (distribusi.tujuan !== "gudang 2") {
      return NextResponse.json({ error: "Distribusi bukan untuk gudang 2" }, { status: 400 });
    }

    if (distribusi.stok < stok) {
      return NextResponse.json({ error: "Stok distribusi tidak mencukupi" }, { status: 400 });
    }

    // Insert data ke gudang1
    await prisma.gudang2.create({
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
 return NextResponse.json({ message: "Berhasil tambah data gudang 2" }, { status: 201 });
  } catch (error) {
    console.error("Error gudang1 POST:", error);
    return NextResponse.json({ error: "Gagal tambah data gudang 2" }, { status: 500 });
  }
}


export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_gudang, id_distribusi, id_obat, stok, nama_obat, kategori } = body;

    const jumlahBaru = parseInt(stok);

    const gudangLama = await prisma.gudang2.findUnique({
      where: { id_gudang },
    });

    if (!gudangLama) {
      return NextResponse.json({ error: "Data gudang 2 tidak ditemukan" }, { status: 404 });
    }

    const distribusi = await prisma.distribusi.findUnique({
      where: { id_distribusi },
    });

    if (!distribusi) {
      return NextResponse.json({ error: "Distribusi tidak ditemukan" }, { status: 404 });
    }

    if (distribusi.stok < jumlahBaru) {
      return NextResponse.json({ error: "Stok distribusi tidak mencukupi" }, { status: 400 });
    }

    const updated = await prisma.$transaction(async (tx) => {
      // Update Gudang1: stok lama + stok baru
      const gudangUpdate = await tx.gudang2.update({
        where: { id_gudang },
        data: {
          id_distribusi,
          id_obat,
          stok: gudangLama.stok + jumlahBaru,
          nama_obat,
          kategori,
        },
      });

      // Update Distribusi: kurangi stok
      await tx.distribusi.update({
        where: { id_distribusi },
        data: {
          stok: distribusi.stok - jumlahBaru,
        },
      });

      return gudangUpdate;
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Gagal update gudang 2:", error);
    return NextResponse.json({ error: "Gagal update data gudang 2" }, { status: 500 });
  }
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
    await prisma.gudang2.delete({
      where: { id_gudang: String(id_gudang) },
    });

    return NextResponse.json({ message: 'Data Gudang 2 berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Gagal menghapus data gudang 2:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat menghapus' }, { status: 500 });
  }
}