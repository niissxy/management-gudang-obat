'use client';

import Card from "@/app/components/cards";
import Link from "next/link";

export default function TambahDataGudang1() {
  return (
    <main className="flex min-h-screen bg-gray-100">
      <Card title="Tambah Data Gudang 1">
        <div>
          <p className="text-black my-2">ID Distribusi</p>
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan id distribusi..."
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">Stok</p>
          <input
            type="number"
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan stok..."
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">Nama Obat</p>
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan nama obat..."
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">Kategori</p>
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan kategori..."
          />
        </div>
         <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">Tujuan</p>
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan tujuan..."
          />
        </div>
        <div className="flex justify-end" style={{ marginTop: '10px' }}>
            <Link href="/gudang/1">
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
