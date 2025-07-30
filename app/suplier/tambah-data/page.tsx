'use client';

import Card from "@/app/components/cards";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TambahDataSuplier() {
  interface Suplier {
    id_suplier: string;
    nama_suplier: string;
    email_suplier: number;
    alamat_suplier: string;
    no_telp: string;
  }
  
    const [suplier, setSuplier] = useState<Suplier[]>([]);
    const [nama_suplier, setNamaSuplier] = useState('');
    const [email_suplier, setEmailSuplier] = useState('');
    const [alamat_suplier, setAlamatSuplier] = useState('');
    const [no_telp, setNoTelp] = useState('');
  
    const router = useRouter();
  
    useEffect(() => {
      fetch('/api/suplier')
        .then(response => response.json())
        .then(data => setSuplier(data))
        .catch(error => console.error('Error fetching suplier:', error));
    }, []);
  
   const addDataSuplier = async () => {
    const response = await fetch('/api/suplier', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama_suplier, email_suplier, alamat_suplier, no_telp }),
    });
  
    if (response.ok) {
      router.push('/suplier'); // ✅ Arahkan ke halaman /obat setelah sukses
    } else {
      const err = await response.json();
      console.error('Gagal menambahkan data:', err);
      alert('Gagal menambahkan data: ' + (err.error || ''));
    }
  };

  return (
    <main className="flex min-h-screen bg-gray-100">
      <Card title="Tambah Data Suplier">
        <div>
          <p className="text-black my-2">Nama Suplier</p>
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan nama suplier..."
            value={nama_suplier}
            onChange={(e) => setNamaSuplier(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">Email Suplier</p>
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan email suplier..."
            value={email_suplier}
            onChange={(e) => setEmailSuplier(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">Alamat Suplier</p>
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan alamat suplier..."
            value={alamat_suplier}
            onChange={(e) => setAlamatSuplier(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <p className="text-black my-2">No Telepon Suplier</p>
          <input
            className="border p-2 mr-2"
            style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '500px' }}
            placeholder="masukkan no telepon suplier..."
            value={no_telp}
            onChange={(e) => setNoTelp(e.target.value)}
          />
        </div>
        
        <div className="flex justify-end" style={{ marginTop: '20px' }}>
            <Link href="/suplier">
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
            onClick={addDataSuplier}
          >
            Tambah
          </button>
          </div>
      </Card>
    </main>
  );
}
