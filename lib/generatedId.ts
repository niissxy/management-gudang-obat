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
  const nextId = `O-${nextIdNumber.toString().padStart(4, '0')}`;
  return nextId;
}

