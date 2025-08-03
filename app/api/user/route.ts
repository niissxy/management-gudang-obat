import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const user = await prisma.users.findMany({
    orderBy: {
      id: 'asc', 
    },
  });
  return NextResponse.json(user, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}


export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id, name, email } = body;

  const updateDataUser = await prisma.users.update({
    where: { id },
    data: {
      name,
      email
    }
  });

  return NextResponse.json(updateDataUser, {
    status: 200,
  });
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    // Pastikan ID ada
    if (!id) {
      return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 });
    }

    // Hapus data secara permanen
    await prisma.users.delete({
      where: { id: String(id) },
    });

    return NextResponse.json({ message: 'Data User berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Gagal menghapus data obat:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat menghapus' }, { status: 500 });
  }
}