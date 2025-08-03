'use client';

import Card from "@/app/components/cards";
import Sidebar from "@/app/components/Sidebar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Pen, TrashIcon } from "lucide-react";
import Alert from "@/app/components/Alert";

export default function Page() {
  interface Gudang3 {
    id_gudang: string;
    id_distribusi: string;
    id_obat: string;
    stok: number;
    nama_obat: string,
    kategori: string;
  }

  const [gudang3List, setGudang3List] = useState<Gudang3[]>([]);
  const [loading, setLoading] = useState(true);

  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [editingIdGudang3, setEditingIdGudang3] = useState<string | null>(null);
  const [editIdDistribusi, setEditIdDistribusi] = useState('');
  const [editIdObat, setEditIdObat] = useState('');
  const [editStok, setEditStok] = useState('');
  const [editNamaObat, setEditNamaObat] = useState('');
  const [editKategori, setEditKategori] = useState('');

  useEffect(()=> {
    const fetchGudang3 = async() => {
      try {
          const res = await fetch("/api/gudang/3");
          const data = await res.json();
          setGudang3List(data);
        } catch (err) {
          console.error("Gagal mengambil data gudang 3:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchGudang3();
    }, []);

    const startEdit = (g3: Gudang3) => {
    setEditingIdGudang3(g3.id_gudang);
    setEditIdDistribusi(g3.id_distribusi);
    setEditIdObat(g3.id_obat);
    setEditStok(g3.stok.toString());
    setEditNamaObat(g3.nama_obat);
    setEditKategori(g3.kategori);
  };

  const saveEdit = async () => {
  if (!editingIdGudang3) return;

  const response = await fetch('/api/gudang/3', {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id_gudang: editingIdGudang3,
      id_distribusi: editIdDistribusi,
      id_obat: editIdObat,
      stok: editStok,
      nama_obat: editNamaObat,
      kategori: editKategori,
    }),
  });

  if (response.ok) {
     setAlert({ message: "Berhasil update data!", type: "success" });
   } else {
     const err = await response.json();
     console.error('Gagal update data:', err);
     setAlert({ message: "Gagal update data!", type: "error" });
   }

  const updated = await response.json();
  setGudang3List(prev => prev.map(g3 => g3.id_gudang === editingIdGudang3 ? updated : g3));
  setEditingIdGudang3(null);
};

const handleDelete = async (id_gudang: string) => {
  const confirmDelete = window.confirm("Apakah yakin ingin menghapus data ini?");
  if (!confirmDelete) return;
  
    const res = await fetch("/api/gudang/3", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id_gudang: id_gudang }),
    });

    const result = await res.json();

    if (res.ok) {
    setGudang3List(prev => prev.filter(item => item.id_gudang !== id_gudang));
    setAlert({ message: "Berhasil menghapus data!", type: "success" });
  } else {
    setAlert({ message: result.error || "Gagal menghapus data!", type: "error" });
  }

  useEffect(() => {
  if (alert) {
    const timer = setTimeout(() => setAlert(null), 3000);
    return () => clearTimeout(timer);
  }
}, [alert]);

  };

  return (
    <main className="flex min-h-screen bg-gray-100">
      {/* Sidebar tetap di kiri */}
      <Sidebar />

      {/* Konten card di kanan sidebar */}
      <div className="ml-64 w-full p-4">
        <Card title="Gudang 3">
          {alert && <Alert message={alert.message} type={alert.type} />}
          <div className="mb-4">
          </div>
          <div className="flex justify-end">
            <Link href="/gudang/3/tambah-data">
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
                {gudang3List.length > 0 ? gudang3List.map((g3) => (
                <tr key={g3.id_gudang}>
                  {editingIdGudang3 === g3.id_gudang ? (
                    <>
                      <td>{g3.id_gudang}</td>

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
                            onClick={() => setEditingIdGudang3(null)}
                            className="bg-gray-400 text-white px-3 py-1 rounded"
                          >
                          Batal
                        </button>
                        </div>
                      </td>

                    </>
                  ) : (
                    <>
                      <td>{g3.id_gudang}</td>
                      <td>{g3.id_distribusi}</td>
                      <td>{g3.id_obat}</td>
                      <td>{g3.stok}</td>
                      <td>{g3.nama_obat}</td>
                      <td>{g3.kategori}</td>
                      <td colSpan={2}>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => startEdit(g3)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center gap-2"
                          >
                            <Pen size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(g3.id_gudang)}
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
                  <td colSpan={8} style={{ textAlign: 'center' }}>Data Gudang 2 tidak ditemukan</td>
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
