'use client';

import Card from "../components/cards";
import Sidebar from "@/app/components/Sidebar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Pen } from "lucide-react";
import Alert from "../components/Alert";

export default function Page() {
  interface Kategori {
      id_kategori: string;
      nama_kategori: string;
    }
  
      const [kategoriList, setKategoriList] = useState<Kategori[]>([]);
      const [loading, setLoading] = useState(true);
    
      const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);
      const [editingIdKategori, setEditingIdKategori] = useState<string | null>(null);
      const [editNamaKategori, setEditNamaKategori] = useState('');

      useEffect(() => {
        const fetchKategori = async () => {
          try {
            const res = await fetch("/api/kategori");
            const data = await res.json();
            setKategoriList(data);
          } catch (err) {
            console.error("Gagal mengambil data kategori:", err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchKategori();
      }, []);

       const startEdit = (k: Kategori) => {
       setEditingIdKategori(k.id_kategori);
       setEditNamaKategori(k.nama_kategori);
  };

  const saveEdit = async () => {
  if (!editingIdKategori) return;

  const response = await fetch('/api/kategori', {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id_kategori: editingIdKategori,
      nama_kategori: editNamaKategori,
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
  setKategoriList(prev => prev.map(k => k.id_kategori === editingIdKategori ? updated : k));
  setEditingIdKategori(null);
};

  return (
    <main className="flex min-h-screen bg-gray-100">
      {/* Sidebar tetap di kiri */}
      <Sidebar />

      {/* Konten card di kanan sidebar */}
      <div className="ml-64 w-full p-4">
        <Card title="Daftar Kategori Obat">
          {alert && <Alert message={alert.message} type={alert.type} />}
          <div className="flex justify-end">
            <Link href="/kategori/tambah-data">
            <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            style={{ marginRight: '100px' }}
          >
            Tambah Data
          </button>
            </Link>
          </div>
          <div className="mb-4">
          </div>

          <div className="table-container">
            {loading ? (
              <p className="text-black">Loading...</p>
            ) : (
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>ID Kategori</th>
                  <th style={{ textAlign: 'center' }}>Nama Kategori</th>
                  <th colSpan={2} style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {kategoriList.length > 0 ? kategoriList.map((k) => (
                <tr key={k.id_kategori}>
                  {editingIdKategori === k.id_kategori ? (
                    <>
                      <td>{k.id_kategori}</td>
                      
                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}
                      value={editNamaKategori} 
                      onChange={(e) => setEditNamaKategori(e.target.value)} /></td>
                      
                      <td style={{ width: '120px' }}>
                        <div className="flex gap-2">
                          <button
                            onClick={saveEdit}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={() => setEditingIdKategori(null)}
                            className="bg-gray-400 text-white px-3 py-1 rounded"
                          >
                          Batal
                        </button>
                        </div>
                      </td>

                    </>
                  ) : (
                    <>
                      <td>{k.id_kategori}</td>
                      <td>{k.nama_kategori}</td>
                      <td colSpan={2}>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => startEdit(k)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center gap-2"
                          >
                            <Pen size={18} />
                          </button>
                          </div>
                      </td>
                    </>
                  )}
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center' }}>Data kategori tidak ditemukan</td>
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
