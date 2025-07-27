'use client';

import Card from "@/app/components/cards";

export default function TambahDataObat() {
  return (
    <main className="flex min-h-screen bg-gray-100">
      <Card title="Tambah Data Obat">
        <div>
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '300px', marginRight: '20px' }}
            placeholder="masukkan nama barang..."
          />
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '300px' }}
            placeholder="masukkan nama barang..."
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '300px', marginRight: '20px' }}
            placeholder="masukkan nama barang..."
          />
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '300px' }}
            placeholder="masukkan nama barang..."
          />
        </div>
      </Card>
    </main>
  );
}
