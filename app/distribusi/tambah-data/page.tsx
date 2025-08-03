'use client';

import Card from "@/app/components/cards";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Alert from "@/app/components/Alert";

export default function TambahDataDistribusi() {
  interface Distribusi {
    id_distribusi: string;
    id_obat: string;
    nama_obat: string;
    stok: number;
    kategori: string;
    tgl_distribusi: string;
    tujuan: string;
  }

  interface Obat {
    id_obat: string;
    nama_obat: string
    kategori: string;
  }
  
    // const [listSuplier, setListSuplier] = useState<string[]>([]);
    // const [listKategori, setListKategori] = useState<string[]>([]);
  
    const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [distribusi, setDistribusi] = useState<Distribusi[]>([]);
    const [obatList, setObatList] = useState<Obat[]>([]);
    const [id_obat, setIdObat] = useState('');
    const [nama_obat, setNamaObat] = useState('');
    const [stok, setStok] = useState('');
    const [kategori, setKategori] = useState('');
    const [tgl_distribusi, setTglDistribusi] = useState('')
    const [tujuan, setTujuan] = useState('');
  
    const router = useRouter();
  
    useEffect(() => {
    fetch('/api/obat')
      .then(res => res.json())
      .then(data => {
        setObatList(data);
      })
      .catch(err => console.error("Error ambil data obat:", err));
  }, []);

  const handleChangeObat = (value: string) => {
    setIdObat(value);
    const selected = obatList.find(obat => obat.id_obat === value);
    setKategori(selected?.kategori || '');
    setNamaObat(selected?.nama_obat || '');
  };


    useEffect(() => {
    fetch('/api/distribusi')
      .then(response => response.json())
      .then(data => setDistribusi(data))
      .catch(error => console.error('Error fetching distribusi:', error));
  }, []);
  
  
   const addDataDistribusi = async () => {
    const response = await fetch('/api/distribusi', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_obat, nama_obat, stok, kategori, tgl_distribusi, tujuan }),
    });
  
    if (response.ok) {
     setAlert({ message: "Berhasil menambah data!", type: "success" });
   
     // Tambahkan delay sebelum pindah halaman
     setTimeout(() => {
       router.push('/distribusi');
     }, 1500); // 1.5 detik, bisa kamu ubah
   } else {
     const err = await response.json();
     console.error('Gagal menambahkan data:', err);
     setAlert({ message: "Gagal menambah data!", type: "error" });
   }
  };

  return (
    <main className="flex min-h-screen bg-gray-100">
      <Card title="Tambah Data Distribusi Obat">
        {alert && <Alert message={alert.message} type={alert.type} />}
        <div>
          <p className="text-black my-2">Id Obat</p>
          <select
            className="border p-2"
            style={{ width: '500px', border: '1px solid grey', borderRadius: '5px', color: 'black' }}
            value={id_obat}
            onChange={(e) => handleChangeObat(e.target.value)}
          >
            <option value="">-- Pilih Obat --</option>
            {obatList.map((obat, index) => (
              <option key={index} value={obat.id_obat}>
                {obat.id_obat}
              </option>
            ))}
          </select>
        </div>
         <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">Nama Obat</p>
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan jumlah obat..."
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
            placeholder="masukkan jumlah obat..."
            value={stok}
            onChange={(e) => setStok(e.target.value)}
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
          <p className="text-black my-2">Tanggal Distribusi</p>
          <input
            type="date"
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan tanggal distribusi..."
            value={tgl_distribusi}
            onChange={(e) => setTglDistribusi(e.target.value)}
          />
        </div>
         <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">Tujuan</p>
          <select
            className="border p-2"
            style={{ width: '500px', border: '1px solid grey', borderRadius: '5px', color: 'black' }}
            value={tujuan}
            onChange={(e) => setTujuan(e.target.value)}
          >
             <option value="">-- Pilih Gudang --</option>
            <option value='gudang 1'>gudang 1</option>
            <option value='gudang 2'>gudang 2</option>
            <option value='gudang 3'>gudang 3</option>
          </select>
        </div>
        <div className="flex justify-end" style={{ marginTop: '10px' }}>
            <Link href="/distribusi">
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
            onClick={addDataDistribusi}
          >
            Tambah
          </button>
          </div>
      </Card>
    </main>
  );
}
