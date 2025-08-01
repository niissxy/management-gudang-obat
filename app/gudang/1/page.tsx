'use client';

import Card from "@/app/components/cards";
import Sidebar from "@/app/components/Sidebar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Pen, TrashIcon } from "lucide-react";

export default function Page() {
  interface Gudang1 {
    id_gudang: string;
    id_distribusi: string;
    id_obat: string;
    stok: number;
    nama_obat: string,
    kategori: string;
  }

  const [gudang1List, setGudang1List] = useState<Gudang1[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingIdGudang1, setEditingIdGudang1] = useState<string | null>(null);
  const [editIdDistribusi, setEditIdDistribusi] = useState('');
  const [editIdObat, setEditIdObat] = useState('');
  const [editStok, setEditStok] = useState('');
  const [editNamaObat, setEditNamaObat] = useState('');
  const [editKategori, setEditKategori] = useState('');

  useEffect(()=> {
    const fetchGudang1 = async() => {
      try {
          const res = await fetch("/api/gudang/1");
          const data = await res.json();
          setGudang1List(data);
        } catch (err) {
          console.error("Gagal mengambil data gudang 1:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchGudang1();
    }, []);

    const startEdit = (g1: Gudang1) => {
    setEditingIdGudang1(g1.id_gudang);
    setEditIdDistribusi(g1.id_distribusi);
    setEditIdObat(g1.id_obat);
    setEditStok(g1.stok.toString());
    setEditNamaObat(g1.nama_obat);
    setEditKategori(g1.kategori);
  };

  const saveEdit = async () => {
  if (!editingIdGudang1) return;

  const response = await fetch('/api/gudang/1', {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id_gudang: editingIdGudang1,
      id_distribusi: editIdDistribusi,
      id_obat: editIdObat,
      stok: editStok,
      nama_obat: editNamaObat,
      kategori: editKategori,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    alert(errorData.error || "Gagal update data");
    return;
  }

  const updated = await response.json();
  setGudang1List(prev => prev.map(g1 => g1.id_gudang === editingIdGudang1 ? updated : g1));
  setEditingIdGudang1(null);
};

 const handleDelete = async (id_gudang: string) => {
    const res = await fetch("/api/gudang/1", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id_gudang: id_gudang }),
    });

    const result = await res.json();

    if (res.ok) {
      // Hapus dari state tanpa refresh
      setGudang1List(prev => prev.filter(item => item.id_gudang !== id_gudang));
    } else {
      alert(result.error || "Gagal menghapus");
    }
  };

  return (
    <main className="flex min-h-screen bg-gray-100">
      {/* Sidebar tetap di kiri */}
      <Sidebar />

      {/* Konten card di kanan sidebar */}
      <div className="ml-64 w-full p-4">
        <Card title="Gudang 1">
          <div className="mb-4">
          </div>
          <div className="flex justify-end">
            <Link href="/gudang/1/tambah-data">
            <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            style={{ marginRight: '100px' }}
          >
            Tambah Data
          </button>
            </Link>
          </div>

          <div className="table-container">
            {loading ? (
              <p className="text-black">Loading...</p>
            ) : (
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>ID Gudang</th>
                  <th style={{ textAlign: 'center' }}>ID Distribusi</th>
                  <th style={{ textAlign: 'center' }}>ID Obat</th>
                  <th style={{ textAlign: 'center' }}>Stok</th>
                  <th style={{ textAlign: 'center' }}>Nama Obat</th>
                  <th style={{ textAlign: 'center' }}>Kategori</th>
                  <th colSpan={2} style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {gudang1List.length > 0 ? gudang1List.map((g1) => (
                <tr key={g1.id_gudang}>
                  {editingIdGudang1 === g1.id_gudang ? (
                    <>
                      <td>{g1.id_gudang}</td>

                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}
                      value={editIdDistribusi} 
                      readOnly={true}
                      onChange={(e) => setEditIdDistribusi(e.target.value)} /></td>
                      
                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}
                      value={editIdObat} 
                      readOnly={true}
                      onChange={(e) => setEditIdObat(e.target.value)} /></td>

                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}                      
                      value={editStok} 
                      onChange={(e) => setEditStok(e.target.value)} /></td>

                       <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}
                      value={editNamaObat} 
                      readOnly={true}
                      onChange={(e) => setEditNamaObat(e.target.value)} /></td>

                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}                      
                      value={editKategori} 
                      readOnly={true}
                      onChange={(e) => setEditKategori(e.target.value)} /></td>

                      <td style={{ width: '120px' }}>
                        <div className="flex gap-2">
                          <button
                            onClick={saveEdit}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={() => setEditingIdGudang1(null)}
                            className="bg-gray-400 text-white px-3 py-1 rounded"
                          >
                          Batal
                        </button>
                        </div>
                      </td>

                    </>
                  ) : (
                    <>
                      <td>{g1.id_gudang}</td>
                      <td>{g1.id_distribusi}</td>
                      <td>{g1.id_obat}</td>
                      <td>{g1.stok}</td>
                      <td>{g1.nama_obat}</td>
                      <td>{g1.kategori}</td>
                      <td colSpan={2}>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => startEdit(g1)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center gap-2"
                          >
                            <Pen size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(g1.id_gudang)}
                            className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2"
                          >
                            <TrashIcon size={18} />
                          </button>
                          </div>
                      </td>
                    </>
                  )}
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center' }}>Data Gudang 1 tidak ditemukan</td>
                </tr>
              )}
                </tbody>
              </table>
            )}
          </div>

          <style jsx>{`
            .table-container {
              margin: 32px auto;
              max-width: 1000px;
            }
            table {
              color: black;
              width: 100%;
              border-collapse: collapse;
              background: #fff;
              box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px 16px;
              text-align: left;
            }
            th {
              background: #f5f5f5;
              font-weight: bold;
            }
            tr:nth-child(even) {
              background: #fafafa;
            }
          `}</style>
        </Card>
      </div>
    </main>
  );
}
