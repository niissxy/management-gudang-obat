'use client';

import Card from "@/app/components/cards";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TambahDataKategori() {
  interface Kategori {
      id_kategori: string;
      nama_kategori: string;
    }
    
      const [kategori, setKategori] = useState<Kategori[]>([]);
      const [nama_kategori, setNamaKategori] = useState('');
    
      const router = useRouter();
    
      useEffect(() => {
        fetch('/api/kategori')
          .then(response => response.json())
          .then(data => setKategori(data))
          .catch(error => console.error('Error fetching kategori:', error));
      }, []);
    
     const addDataKategori = async () => {
      const response = await fetch('/api/kategori', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama_kategori }),
      });
    
      if (response.ok) {
        router.push('/kategori'); 
      } else {
        const err = await response.json();
        console.error('Gagal menambahkan data:', err);
        alert('Gagal menambahkan data: ' + (err.error || ''));
      }
    };

  return (
    <main className="flex min-h-screen bg-gray-100">
      <Card title="Tambah Data Kategori">
        <div>
           <p className="text-black my-2">Nama Kategori</p>
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan kategori..."
            value={nama_kategori}
            onChange={(e) => setNamaKategori(e.target.value)}
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
            onClick={addDataKategori}
          >
            Tambah
          </button>
          </div>
      </Card>
    </main>
  );
}
