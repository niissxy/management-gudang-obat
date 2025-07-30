import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateNextSuplierId } from "@/lib/generatedId";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const suplier = await prisma.suplier.findMany();
  return NextResponse.json(suplier, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: NextRequest) {
  try {
    const id_suplier = await generateNextSuplierId();
    const body = await request.json();
    const { nama_suplier, email_suplier, alamat_suplier, no_telp } = body;

    // Validasi input
    if (!nama_suplier || !email_suplier || !alamat_suplier || !no_telp) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    const newDataSuplier = await prisma.suplier.create({
      data: {
        id_suplier,
        nama_suplier,
        email_suplier,
        alamat_suplier,
        no_telp,
      },
    });

    return NextResponse.json(newDataSuplier, { status: 201 });
  } catch (error: any) {
    console.error("Error saat POST suplier:", error);
    return NextResponse.json(
      { error: 'Gagal menambahkan data suplier' },
      { status: 500 }
    );
  }
}


export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id_suplier, nama_suplier, email_suplier, alamat_suplier, no_telp } = body;

  const updateDataSuplier = await prisma.suplier.update({
    where: { id_suplier },
    data: {
      nama_suplier,
      email_suplier,
      alamat_suplier,
      no_telp,
    }
  });

  return NextResponse.json(updateDataSuplier, {
    status: 200,
  });
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_suplier } = body;

    // Pastikan ID ada
    if (!id_suplier) {
      return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 });
    }

    // Hapus data secara permanen
    await prisma.suplier.delete({
      where: { id_suplier: String(id_suplier) },
    });

    return NextResponse.json({ message: 'Data Suplier berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Gagal menghapus data obat:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat menghapus' }, { status: 500 });
  }
}