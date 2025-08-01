'use client';

import Card from "../components/cards";
import Sidebar from "@/app/components/Sidebar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Pen, TrashIcon } from "lucide-react";

export default function Page() {
  interface Suplier {
    id_suplier: string;
    nama_suplier: string;
    email_suplier: string;
    alamat_suplier: string;
    no_telp: string;
  }

    const [suplierList, setSuplierList] = useState<Suplier[]>([]);
    const [loading, setLoading] = useState(true);

    const [editingIdSuplier, setEditingIdSuplier] = useState<string | null>(null);
    const [editNamaSuplier, setEditNamaSuplier] = useState('');
    const [editEmailSuplier, setEditEmailSuplier] = useState('');
    const [editAlamatSuplier, setEditAlamatSuplier] = useState('');
    const [editNoTelp, setEditNoTelp] = useState('');
  
    useEffect(() => {
      const fetchSuplier = async () => {
        try {
          const res = await fetch("/api/suplier");
          const data = await res.json();
          setSuplierList(data);
        } catch (err) {
          console.error("Gagal mengambil data suplier:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchSuplier();
    }, []);

    const startEdit = (s: Suplier) => {
    setEditingIdSuplier(s.id_suplier);
    setEditNamaSuplier(s.nama_suplier);
    setEditEmailSuplier(s.email_suplier);
    setEditAlamatSuplier(s.alamat_suplier);
    setEditNoTelp(s.no_telp);
  };

  const saveEdit = async () => {
  if (!editingIdSuplier) return;

  const response = await fetch('/api/suplier', {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id_suplier: editingIdSuplier,
      nama_suplier: editNamaSuplier,
      email_suplier: editEmailSuplier,
      alamat_suplier: editAlamatSuplier,
      no_telp: editNoTelp,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    alert(errorData.error || "Gagal update data");
    return;
  }

  const updated = await response.json();
  setSuplierList(prev => prev.map(s => s.id_suplier === editingIdSuplier ? updated : s));
  setEditingIdSuplier(null);
};

  return (
    <main className="flex min-h-screen bg-gray-100">
      {/* Sidebar tetap di kiri */}
      <Sidebar />

      {/* Konten card di kanan sidebar */}
      <div className="ml-64 w-full p-4">
        <Card title="Daftar Suplier">
          <div className="mb-4">
          </div>
          <div className="flex justify-end">
            <Link href="/suplier/tambah-data">
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
                  <th style={{ textAlign: 'center' }}>ID Suplier</th>
                  <th style={{ textAlign: 'center' }}>Nama Suplier</th>
                  <th style={{ textAlign: 'center' }}>Email Suplier</th>
                  <th style={{ textAlign: 'center' }}>Alamat Suplier</th>
                  <th style={{ textAlign: 'center' }}>No Telepon Suplier</th>
                  <th colSpan={2} style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                  {suplierList.length > 0 ? suplierList.map((s) => (
                <tr key={s.id_suplier}>
                  {editingIdSuplier === s.id_suplier ? (
                    <>
                      <td>{s.id_suplier}</td>
                      
                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}
                      value={editNamaSuplier} 
                      onChange={(e) => setEditNamaSuplier(e.target.value)} /></td>
                      
                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}                      
                      value={editEmailSuplier} 
                      onChange={(e) => setEditEmailSuplier(e.target.value)} /></td>
                      
                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}                      
                      value={editAlamatSuplier} 
                      onChange={(e) => setEditAlamatSuplier(e.target.value)} /></td>
                      
                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}                      
                      value={editNoTelp} 
                      onChange={(e) => setEditNoTelp(e.target.value)} /></td>
                      
                      <td style={{ width: '120px' }}>
                        <div className="flex gap-2">
                          <button
                            onClick={saveEdit}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={() => setEditingIdSuplier(null)}
                            className="bg-gray-400 text-white px-3 py-1 rounded"
                          >
                          Batal
                        </button>
                        </div>
                      </td>

                    </>
                  ) : (
                    <>
                      <td>{s.id_suplier}</td>
                      <td>{s.nama_suplier}</td>
                      <td>{s.email_suplier}</td>
                      <td>{s.alamat_suplier}</td>
                      <td>{s.no_telp}</td>
                      <td colSpan={2}>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => startEdit(s)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center gap-2"
                          >
                            <Pen size={18} />
                          </button>
                          <button
                            onClick={() => deleteBarang(o.id_obat)}
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
                  <td colSpan={8} style={{ textAlign: 'center' }}>Data suplier tidak ditemukan</td>
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
