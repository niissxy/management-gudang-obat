import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function generateNextObatId(): Promise<string> {
  const lastObat = await prisma.obat.findFirst({
    orderBy: { id_obat: 'desc' },
    where: {
      id_obat: {
        startsWith: 'O-',
      },
    },
  });

  if (!lastObat) {
    return 'O-0001';
  }

  const lastIdNumber = parseInt(lastObat.id_obat.replace('O-', ''));
  const nextIdNumber = lastIdNumber + 1;
  const nextId = `O-${nextIdNumber.toString().padStart(4, '0')}`;
  return nextId;
}

export async function generateNextSuplierId(): Promise<string> {
  const lastSuplier = await prisma.suplier.findFirst({
    orderBy: { id_suplier: 'desc' },
    where: {
      id_suplier: {
        startsWith: 'S-',
      },
    },
  });

  if (!lastSuplier) {
    return 'S-0001';
  }

  const lastIdNumber = parseInt(lastSuplier.id_suplier.replace('S-', ''));
  const nextIdNumber = lastIdNumber + 1;
  const nextId = `S-${nextIdNumber.toString().padStart(4, '0')}`;
  return nextId;
}

export async function generateNextKategoriId(): Promise<string> {
  const lastKategori = await prisma.kategori.findFirst({
    orderBy: { id_kategori: 'desc' },
    where: {
      id_kategori: {
        startsWith: 'K-',
      },
    },
  });

  if (!lastKategori) {
    return 'K-0001';
  }

  const lastIdNumber = parseInt(lastKategori.id_kategori.replace('K-', ''));
  const nextIdNumber = lastIdNumber + 1;
  const nextId = `K-${nextIdNumber.toString().padStart(4, '0')}`;
  return nextId;
}

export async function generateNextDistribusiId(): Promise<string> {
  const lastDistribusi = await prisma.distribusi.findFirst({
    orderBy: { id_distribusi: 'desc' },
    where: {
      id_distribusi: {
        startsWith: 'D-',
      },
    },
  });

  if (!lastDistribusi) {
    return 'D-0001';
  }

  const lastIdNumber = parseInt(lastDistribusi.id_distribusi.replace('D-', ''));
  const nextIdNumber = lastIdNumber + 1;
  const nextId = `D-${nextIdNumber.toString().padStart(4, '0')}`;
  return nextId;
}

export async function generateNextGudang1Id(): Promise<string> {
  const lastGudang1 = await prisma.gudang1.findFirst({
    orderBy: { id_gudang: 'desc' },
    where: {
      id_gudang: {
        startsWith: 'G1-',
      },
    },
  });

  if (!lastGudang1) {
    return 'G1-0001';
  }

  const lastIdNumber = parseInt(lastGudang1.id_gudang.replace('G1-', ''));
  const nextIdNumber = lastIdNumber + 1;
  const nextId = `G1-${nextIdNumber.toString().padStart(4, '0')}`;
  return nextId;
}

export async function generateNextGudang2Id(): Promise<string> {
  const lastGudang2 = await prisma.gudang2.findFirst({
    orderBy: { id_gudang: 'desc' },
    where: {
      id_gudang: {
        startsWith: 'G2-',
      },
    },
  });

  if (!lastGudang2) {
    return 'G2-0001';
  }

  const lastIdNumber = parseInt(lastGudang2.id_gudang.replace('G2-', ''));
  const nextIdNumber = lastIdNumber + 1;
  const nextId = `G2-${nextIdNumber.toString().padStart(4, '0')}`;
  return nextId;
}

export async function generateNextGudang3Id(): Promise<string> {
  const lastGudang3 = await prisma.gudang3.findFirst({
    orderBy: { id_gudang: 'desc' },
    where: {
      id_gudang: {
        startsWith: 'G3-',
      },
    },
  });

  if (!lastGudang3) {
    return 'G3-0001';
  }

  const lastIdNumber = parseInt(lastGudang3.id_gudang.replace('G3-', ''));
  const nextIdNumber = lastIdNumber + 1;
  const nextId = `G3-${nextIdNumber.toString().padStart(4, '0')}`;
  return nextId;
}