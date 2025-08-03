'use client';

import Card from "../components/cards";
import Sidebar from "@/app/components/Sidebar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Pen, TrashIcon } from "lucide-react";
import Alert from "../components/Alert";

export default function Page() {
  interface Distribusi {
    id_distribusi: string;
    id_obat: string;
    nama_obat: string;
    stok: number;
    kategori: string;
    tgl_distribusi: string;
    tujuan: string;
  }
  
    const [distribusiList, setDistribusiList] = useState<Distribusi[]>([]);
    const [loading, setLoading] = useState(true);

    const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [editingIdDistribusi, setEditingIdDistribusi] = useState<string | null>(null);
    const [editIdObat, setEditIdObat] = useState('');
    const [editNamaObat, setEditNamaObat] = useState('');
    const [editStok, setEditStok] = useState('');
    const [editKategori, setEditKategori] = useState('');
    const [editTglDistribusi, setEditTglDistribusi] = useState('');
    const [editTujuan, setEditTujuan] = useState('');
  
    useEffect(() => {
      const fetchDistribusi = async () => {
        try {
          const res = await fetch("/api/distribusi");
          const data = await res.json();
          setDistribusiList(data);
        } catch (err) {
          console.error("Gagal mengambil data distribusi:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchDistribusi();
    }, []);

    const startEdit = (d: Distribusi) => {
    setEditingIdDistribusi(d.id_distribusi);
    setEditIdObat(d.id_obat);
    setEditNamaObat(d.nama_obat);
    setEditStok(d.stok.toString());
    setEditKategori(d.kategori);
    setEditTglDistribusi(d.tgl_distribusi.slice(0, 10));
    setEditTujuan(d.tujuan);
  };

  const saveEdit = async () => {
  if (!editingIdDistribusi) return;

  const response = await fetch('/api/distribusi', {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id_distribusi: editingIdDistribusi,
      id_obat: editIdObat,
      nama_obat: editNamaObat,
      stok: editStok,
      kategori: editKategori,
      tgl_distribusi: editTglDistribusi,
      tujuan: editTujuan,
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
  setDistribusiList(prev => prev.map(d => d.id_distribusi === editingIdDistribusi ? updated : d));
  setEditingIdDistribusi(null);
};

 const handleDelete = async (id_distribusi: string) => {
  const confirmDelete = window.confirm("Apakah yakin ingin menghapus data ini?");
  if (!confirmDelete) return;

  const res = await fetch("/api/distribusi", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: id_distribusi }),
  });

  const result = await res.json();

  if (res.ok) {
    setDistribusiList(prev => prev.filter(item => item.id_distribusi !== id_distribusi));
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
        <Card title="Distribusi Obat">
          {alert && <Alert message={alert.message} type={alert.type} />}
          <div className="mb-4">  
          </div>
          <div className="flex justify-end">
            <Link href="/distribusi/tambah-data">
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
                  <th style={{ textAlign: 'center' }}>ID Distribusi</th>
                  <th style={{ textAlign: 'center' }}>ID Obat</th>
                  <th style={{ textAlign: 'center' }}>Nama Obat</th>
                  <th style={{ textAlign: 'center' }}>Stok</th>
                  <th style={{ textAlign: 'center' }}>Kategori</th>
                  <th style={{ textAlign: 'center' }}>Tanggal Distribusi</th>
                  <th style={{ textAlign: 'center' }}>Tujuan</th>
                  <th colSpan={2} style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {distribusiList.length > 0 ? distribusiList.map((d) => (
                <tr key={d.id_distribusi}>
                  {editingIdDistribusi === d.id_distribusi ? (
                    <>
                      <td>{d.id_distribusi}</td>
                      
                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}
                      value={editIdObat} 
                      readOnly={true}
                      onChange={(e) => setEditIdObat(e.target.value)} /></td>
                      
                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}                      
                      value={editNamaObat} 
                      readOnly={true}
                      onChange={(e) => setEditNamaObat(e.target.value)} /></td>
                      
                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}                      
                      value={editStok} 
                      onChange={(e) => setEditStok(e.target.value)} /></td>
                      
                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}                      
                      value={editKategori} 
                      readOnly={true}
                      onChange={(e) => setEditKategori(e.target.value)} /></td>

                      <td><input 
                      type="date"
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}                      
                      value={editTglDistribusi} 
                      onChange={(e) => setEditTglDistribusi(e.target.value)} /></td>

                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}                      
                      value={editTujuan} 
                      readOnly={true}
                      onChange={(e) => setEditTujuan(e.target.value)} /></td>
                      
                      <td style={{ width: '120px' }}>
                        <div className="flex gap-2">
                          <button
                            onClick={saveEdit}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={() => setEditingIdDistribusi(null)}
                            className="bg-gray-400 text-white px-3 py-1 rounded"
                          >
                          Batal
                        </button>
                        </div>
                      </td>

                    </>
                  ) : (
                    <>
                      <td>{d.id_distribusi}</td>
                      <td>{d.id_obat}</td>
                      <td>{d.nama_obat}</td>
                      <td>{d.stok}</td>
                      <td>{d.kategori}</td>
                      <td>{d.tgl_distribusi.slice(0,10)}</td>
                      <td>{d.tujuan}</td>
                      <td colSpan={2}>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => startEdit(d)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center gap-2"
                          >
                            <Pen size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(d.id_distribusi)}
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
                  <td colSpan={8} style={{ textAlign: 'center' }}>Data Distribusi tidak ditemukan</td>
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
