'use client';

import Card from "@/app/components/cards";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TambahDataGudang1() {
  interface Distribusi {
    id_distribusi: string;
    id_obat: string;
    nama_obat: string;
    stok: number;
    kategori: string;
    tujuan: string;
  }

  interface Gudang2 {
    id_gudang: string;
    id_distribusi: string;
    id_obat: string;
    stok: number;
    nama_obat: string;
    kategori: string;
  }

  const [distribusiList, setDistribusiList] = useState<Distribusi[]>([]);
  const [gudang2, setGudang2] = useState<Gudang2[]>([]);

  const [id_distribusi, setIdDistribusi] = useState('');
  const [id_obat, setIdObat] = useState('');
  const [nama_obat, setNamaObat] = useState('');
  const [kategori, setKategori] = useState('');
  const [stok, setStok] = useState('');

  const router = useRouter();

  // Ambil distribusi yang tujuan = 'gudang 1'
  useEffect(() => {
    fetch('/api/distribusi?tujuan=gudang 2')
      .then(res => res.json())
      .then(data => setDistribusiList(data))
      .catch(err => console.error("Error ambil distribusi:", err));
  }, []);

  // Ambil data gudang1
  useEffect(() => {
    fetch('/api/gudang/2')
      .then(res => res.json())
      .then(data => setGudang2(data))
      .catch(err => console.error("Error ambil gudang2:", err));
  }, []);

  // Saat pilih distribusi, isi data terkait
  const handleChangeDistribusi = (value: string) => {
    setIdDistribusi(value);
    const selected = distribusiList.find(d => d.id_distribusi === value);
    if (selected) {
      setIdObat(selected.id_obat);
      setNamaObat(selected.nama_obat);
      setKategori(selected.kategori);
    } else {
      setIdObat('');
      setNamaObat('');
      setKategori('');
    }
  };

  const addDataGudang2 = async () => {
    if (!id_distribusi || !id_obat || !stok) {
      alert('ID distribusi, ID obat, dan stok wajib diisi');
      return;
    }
    const response = await fetch('/api/gudang/2', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_distribusi, id_obat, stok: parseInt(stok), nama_obat, kategori }),
    });

    if (response.ok) {
      router.push('/gudang/2');
    } else {
      const err = await response.json();
      alert('Gagal menambahkan data: ' + (err.error || ''));
      console.error('Gagal menambahkan data:', err);
    }
  };

  return (
    <main className="flex min-h-screen bg-gray-100">
      <Card title="Tambah Data Gudang 2">
        <div>
          <p className="text-black my-2">ID Distribusi (tujuan: gudang 2)</p>
          <select
            className="border p-2"
            style={{ width: '500px', border: '1px solid grey', borderRadius: '5px', color: 'black' }}
            value={id_distribusi}
            onChange={(e) => handleChangeDistribusi(e.target.value)}
          >
            <option value="">-- Pilih Distribusi --</option>
            {distribusiList.map((d, i) => (
              <option key={i} value={d.id_distribusi}>
                {d.id_distribusi} - {d.nama_obat} (Stok: {d.stok}) (Tujuan: {d.tujuan})
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">ID Obat</p>
          <input
            className="border p-2"
            style={{ width: '500px', border: '1px solid grey', borderRadius: '5px', color: 'black' }}
            value={id_obat}
            readOnly
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">Nama Obat</p>
          <input
            className="border p-2"
            style={{ width: '500px', border: '1px solid grey', borderRadius: '5px', color: 'black' }}
            value={nama_obat}
            readOnly
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">Kategori</p>
          <input
            className="border p-2"
            style={{ width: '500px', border: '1px solid grey', borderRadius: '5px', color: 'black' }}
            value={kategori}
            readOnly
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">Stok</p>
          <input
            type="number"
            className="border p-2"
            style={{ width: '500px', border: '1px solid grey', borderRadius: '5px', color: 'black' }}
            placeholder="Masukkan stok untuk gudang 2..."
            value={stok}
            onChange={(e) => setStok(e.target.value)}
            min={1}
          />
        </div>
        <div className="flex justify-end mt-4">
          <Link href="/gudang/2">
            <button className="bg-gray-500 text-white px-4 py-2 rounded mr-4">Cancel</button>
          </Link>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addDataGudang2}
          >
            Tambah
          </button>
        </div>
      </Card>
    </main>
  );
}
