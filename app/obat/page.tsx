'use client';

import { useEffect, useState } from "react";
import Card from "../components/cards";
import Sidebar from "@/app/components/Sidebar";
import Link from "next/link";

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
              <p>Loading...</p>
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
                  {obatList.map((obat) => (
                    <tr key={obat.id_obat}>
                      <td style={{ textAlign: 'center' }}>{obat.id_obat}</td>
                      <td style={{ textAlign: 'center' }}>{obat.nama_obat}</td>
                      <td style={{ textAlign: 'center' }}>{obat.stok}</td>
                      <td style={{ textAlign: 'center' }}>{obat.suplier}</td>
                      <td style={{ textAlign: 'center' }}>{obat.kategori}</td>
                      <td style={{ textAlign: 'center' }}>Rp. {obat.harga.toLocaleString("id-ID")}</td>
                      <td style={{ textAlign: 'center' }}>{new Date(obat.exp_date).toLocaleDateString("id-ID")}</td>
                      <td style={{ textAlign: 'center' }}>
                        <Link href={`/obat/edit/${obat.id_obat}`}>
                          <button className="text-blue-500">Edit</button>
                        </Link>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button className="text-red-500">Hapus</button>
                      </td>
                    </tr>
                  ))}
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
