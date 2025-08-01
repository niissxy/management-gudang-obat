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

  const distribusi = await prisma.distribusi.findMany({
    orderBy: {
      id_distribusi: 'asc', 
    },
  });
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
  try {
    const body = await request.json();
    const { id_distribusi, id_obat, nama_obat, stok, kategori, tujuan, tgl_distribusi } = body;

    const jumlahBaru = parseInt(stok);

    // Ambil data distribusi lama
    const distribusiLama = await prisma.distribusi.findUnique({
      where: { id_distribusi },
    });

    if (!distribusiLama) {
      return NextResponse.json({ error: "Data distribusi tidak ditemukan." }, { status: 404 });
    }

    const obat = await prisma.obat.findUnique({
      where: { id_obat },
    });

    if (!obat) {
      return NextResponse.json({ error: "Obat tidak ditemukan." }, { status: 404 });
    }

    if (obat.stok < jumlahBaru) {
      return NextResponse.json({ error: "Stok obat tidak mencukupi." }, { status: 400 });
    }

    const updated = await prisma.$transaction(async (tx) => {
      // Kurangi stok obat dengan stok yang baru ditambahkan
      await tx.obat.update({
        where: { id_obat },
        data: {
          stok: obat.stok - jumlahBaru,
        },
      });

      // Tambahkan stok distribusi lama dengan yang baru
      const distribusiUpdate = await tx.distribusi.update({
        where: { id_distribusi },
        data: {
          stok: distribusiLama.stok + jumlahBaru,
          nama_obat,
          kategori,
          tujuan,
        },
      });

      return distribusiUpdate;
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Gagal update distribusi:", error);
    return NextResponse.json({ error: "Terjadi kesalahan saat update" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    const distribusi = await prisma.distribusi.findUnique({
      where: { id_distribusi: id },
    });

    if (!distribusi) {
      return NextResponse.json({ error: "Distribusi tidak ditemukan." }, { status: 404 });
    }

    const digunakanGudang1 = await prisma.gudang1.findFirst({
      where: { id_distribusi: id },
    });

    const digunakanGudang2 = await prisma.gudang2.findFirst({
      where: { id_distribusi: id },
    });

    const digunakanGudang3 = await prisma.gudang3.findFirst({
      where: { id_distribusi: id },
    });

    if ( digunakanGudang1 || digunakanGudang2 || digunakanGudang3) {
      return NextResponse.json({
        error: "Obat tidak bisa dihapus karena sudah digunakan di distribusi atau gudang.",
      }, { status: 400 });
    }

    // Jika belum digunakan, lanjut hapus
    await prisma.distribusi.delete({
      where: { id_distribusi: id },
    });

    return NextResponse.json({ message: "Obat berhasil dihapus." });
  } catch (error) {
    console.error("Gagal menghapus distribusi:", error);
    return NextResponse.json({ error: "Terjadi kesalahan saat menghapus." }, { status: 500 });
  }
}
