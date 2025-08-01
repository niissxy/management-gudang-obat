'use client';

import { useEffect, useState } from "react";
import Card from "../components/cards";
import Sidebar from "@/app/components/Sidebar";
import Link from "next/link";
import { Pen, TrashIcon } from "lucide-react";

interface Obat {
  id_obat: string;
  nama_obat: string;
  stok: number;
  suplier: string;
  kategori: string;
  harga: number;
  exp_date: string;
}

export default function Page() {
  const [obatList, setObatList] = useState<Obat[]>([]);
  const [loading, setLoading] = useState(true);

  const [obat, setObat] = useState<Obat[]>([]);
  const [editingIdObat, setEditingIdObat] = useState<string | null>(null);
  const [editNamaObat, setEditNamaObat] = useState('');
  const [editStok, setEditStok] = useState('');
  const [editSuplier, setEditSuplier] = useState('');
  const [editKategori, setEditKategori] = useState('');
  const [editHarga, setEditHarga] = useState('');
  const [editExpdate, setEditExpDate] = useState('');

  useEffect(() => {
    const fetchObat = async () => {
      try {
        const res = await fetch("/api/obat");
        const data = await res.json();
        setObatList(data);
      } catch (err) {
        console.error("Gagal mengambil data obat:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchObat();
  }, []);

  const startEdit = (o: Obat) => {
    setEditingIdObat(o.id_obat);
    setEditNamaObat(o.nama_obat);
    setEditStok(o.stok.toString());
    setEditSuplier(o.suplier);
    setEditKategori(o.kategori);
    setEditHarga(o.harga.toString());
    setEditExpDate(o.exp_date.slice(0, 10)); 
  };

  const saveEdit = async () => {
  if (!editingIdObat) return;

  const response = await fetch('/api/obat', {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id_obat: editingIdObat,
      nama_obat: editNamaObat,
      stok: editStok,
      suplier: editSuplier,
      kategori: editKategori,
      harga: editHarga,
      exp_date: editExpdate
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    alert(errorData.error || "Gagal update data");
    return;
  }

  const updated = await response.json();
  setObatList(prev => prev.map(o => o.id_obat === editingIdObat ? updated : o));
  setEditingIdObat(null);
};

 const handleDelete = async (id_obat: string) => {
    const res = await fetch("/api/obat", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id_obat }),
    });

    const result = await res.json();

    if (res.ok) {
      // Hapus dari state tanpa refresh
      setObat(prev => prev.filter(item => item.id_obat !== id_obat));
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
        <Card title="Daftar Obat">
          <div className="flex justify-end mb-4">
            <Link href="/obat/tambah-data">
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
                    <th style={{ textAlign: 'center' }}>ID Obat</th>
                    <th style={{ textAlign: 'center' }}>Nama Obat</th>
                    <th style={{ textAlign: 'center' }}>Stok</th>
                    <th style={{ textAlign: 'center' }}>Suplier</th>
                    <th style={{ textAlign: 'center' }}>Kategori</th>
                    <th style={{ textAlign: 'center' }}>Harga</th>
                    <th style={{ textAlign: 'center' }}>Exp Date</th>
                    <th colSpan={2} style={{ textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                {obatList.length > 0 ? obatList.map((o) => (
                <tr key={o.id_obat}>
                  {editingIdObat === o.id_obat ? (
                    <>
                      <td>{o.id_obat}</td>
                      
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
                      value={editSuplier} 
                      readOnly={true}
                      onChange={(e) => setEditSuplier(e.target.value)} /></td>
                      
                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}                      
                      value={editKategori} 
                      readOnly={true}
                      onChange={(e) => setEditKategori(e.target.value)} /></td>
                      
                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}     
                      value={editHarga}
                      readOnly={true} 
                      onChange={(e) => setEditHarga(e.target.value)} /></td>

                      <td><input     
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}                      
                      value={editExpdate} onChange={(e) => 
                      setEditExpDate(e.target.value)} /></td>
                      
                      <td style={{ width: '120px' }}>
                        <div className="flex gap-2">
                          <button
                            onClick={saveEdit}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={() => setEditingIdObat(null)}
                            className="bg-gray-400 text-white px-3 py-1 rounded"
                          >
                          Batal
                        </button>
                        </div>
                      </td>

                    </>
                  ) : (
                    <>
                      <td>{o.id_obat}</td>
                      <td>{o.nama_obat}</td>
                      <td>{o.stok}</td>
                      <td>{o.suplier}</td>
                      <td>{o.kategori}</td>
                      <td>Rp. {o.harga.toLocaleString('id-ID')}</td>
                      <td>{o.exp_date.slice(0, 10)}</td>
                      <td colSpan={2}>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => startEdit(o)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center gap-2"
                          >
                            <Pen size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(o.id_obat)}
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
                  <td colSpan={8} style={{ textAlign: 'center' }}>Data barang tidak ditemukan</td>
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
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }
            th,
            td {
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
