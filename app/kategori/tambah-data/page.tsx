'use client';

import Card from "@/app/components/cards";
import Link from "next/link";

export default function TambahDataKategori() {
  return (
    <main className="flex min-h-screen bg-gray-100">
      <Card title="Tambah Data Kategori">
        <div>
           <p className="text-black my-2">Nama Kategori</p>
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan kategori..."
          />
        </div>
        <div className="flex justify-end" style={{ marginTop: '20px' }}>
            <Link href="/kategori">
            <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            style={{ marginRight: '7px' }}
          >
            Cancel
          </button>
            </Link>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            style={{ marginRight: '7px' }}
          >
            Tambah
          </button>
          </div>
      </Card>
    </main>
  );
}
