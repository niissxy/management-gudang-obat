  import { NextRequest, NextResponse } from "next/server";
  import { PrismaClient } from "@prisma/client";
  import { generateNextGudang1Id } from "@/lib/generatedId";

  const prisma = new PrismaClient();

  export async function GET(request: NextRequest) {
    const gudang1 = await prisma.gudang1.findMany({
      orderBy: {
        id_gudang: 'asc', 
      },
    });
    return NextResponse.json(gudang1, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  export async function POST(request: NextRequest) {
    try {
      const id_gudang = await generateNextGudang1Id();
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

      if (distribusi.tujuan !== "gudang 1") {
        return NextResponse.json({ error: "Distribusi bukan untuk gudang 1" }, { status: 400 });
      }

      if (distribusi.stok < stok) {
        return NextResponse.json({ error: "Stok distribusi tidak mencukupi" }, { status: 400 });
      }

      // Insert data ke gudang1
      await prisma.gudang1.create({
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
  return NextResponse.json({ message: "Berhasil tambah data gudang 1" }, { status: 201 });
    } catch (error) {
      console.error("Error gudang1 POST:", error);
      return NextResponse.json({ error: "Gagal tambah data gudang 1" }, { status: 500 });
    }
  }


  export async function PATCH(request: NextRequest) {
    try {
      const body = await request.json();
      const { id_gudang, id_distribusi, id_obat, stok, nama_obat, kategori } = body;

      const jumlahBaru = parseInt(stok);

      const gudangLama = await prisma.gudang1.findUnique({
        where: { id_gudang },
      });

      if (!gudangLama) {
        return NextResponse.json({ error: "Data gudang 1 tidak ditemukan" }, { status: 404 });
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
        const gudangUpdate = await tx.gudang1.update({
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
      console.error("Gagal update gudang 1:", error);
      return NextResponse.json({ error: "Gagal update data gudang 1" }, { status: 500 });
    }
  }


  export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_gudang } = body;

    if (!id_gudang) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
    }

    // Ambil data gudang dulu
    const dataGudang = await prisma.gudang1.findUnique({
      where: { id_gudang },
    });

    if (!dataGudang) {
      return NextResponse.json({ error: "Data gudang tidak ditemukan" }, { status: 404 });
    }

    const { id_obat, stok, id_distribusi } = dataGudang;

    // Hapus data gudang
    await prisma.gudang1.delete({
      where: { id_gudang },
    });

    // Coba kembalikan stok ke distribusi dulu (berdasarkan id_distribusi)
    if (id_distribusi) {
      await prisma.distribusi.update({
        where: { id_distribusi },
        data: {
          stok: {
            increment: stok,
          },
        },
      });
    } else {
      // Kalau tidak ada id_distribusi, kembalikan ke obat
      await prisma.obat.update({
        where: { id_obat },
        data: {
          stok: {
            increment: stok,
          },
        },
      });
    }

    return NextResponse.json({ message: "Data Gudang 1 berhasil dihapus dan stok dikembalikan" }, { status: 200 });
  } catch (error) {
    console.error("Gagal menghapus data gudang 1:", error);
    return NextResponse.json({ error: "Terjadi kesalahan saat menghapus" }, { status: 500 });
  }
}
