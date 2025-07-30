'use client';

import Card from "@/app/components/cards";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';


interface Obat {
  id_obat: string;
  nama_obat: string;
  stok: number;
  suplier: string;
  kategori: string;
  harga: number;
  exp_date: Date;
}

export default function TambahDataObat() {
  const [obat, setObat] = useState<Obat[]>([]);
  const [nama_obat, setNamaObat] = useState('');
  const [stok, setStok] = useState('');
  const [suplier, setSuplier] = useState('');
  const [kategori, setKategori] = useState('');
  const [harga, setHarga] = useState('');
  const [exp_date, setExpDate] = useState('')

  const router = useRouter();

  useEffect(() => {
    fetch('/api/obat')
      .then(response => response.json())
      .then(data => setObat(data))
      .catch(error => console.error('Error fetching obat:', error));
  }, []);

 const addDataObat = async () => {
  const response = await fetch('/api/obat', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nama_obat, stok, suplier, kategori, harga, exp_date }),
  });

  if (response.ok) {
    router.push('/obat'); // ✅ Arahkan ke halaman /obat setelah sukses
  } else {
    const err = await response.json();
    console.error('Gagal menambahkan data:', err);
    alert('Gagal menambahkan data: ' + (err.error || ''));
  }
};


  return (
    <main className="flex min-h-screen bg-gray-100">
      <Card title="Tambah Data Obat">
        <div>
          <p className="text-black my-2">Nama Obat</p>
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan nama obat..."
            value={nama_obat}
            onChange={(e) => setNamaObat(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">Stok Obat</p>
          <input
            type="number"
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan stok barang..."
            value={stok}
            onChange={(e) => setStok(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">Suplier</p>
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan suplier obat..."
            value={suplier}
            onChange={(e) => setSuplier(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">Kategori</p>
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan kategori..."
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
          />
        </div>
         <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">Harga Obat</p>
          <input
            type="number"
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan harga obat..."
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">Exp Date</p>
          <input
            type="date"
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan exp date..."
            value={exp_date}
            onChange={(e) => setExpDate(e.target.value)}
          />
        </div>
        <div className="flex justify-end" style={{ marginTop: '20px' }}>
            <Link href="/obat">
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
            onClick={addDataObat}
          >
            Tambah
          </button>
          </div>
      </Card>
    </main>
  );
}
