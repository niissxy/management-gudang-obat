'use client';

import Card from "@/app/components/cards";
import Sidebar from "@/app/components/Sidebar";
import Link from "next/link";
import { useState, useEffect } from "react";

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

  return (
    <main className="flex min-h-screen bg-gray-100">
      {/* Sidebar tetap di kiri */}
      <Sidebar />

      {/* Konten card di kanan sidebar */}
      <div className="ml-64 w-full p-4">
        <Card title="Gudang 3">
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
                  <th style={{ textAlign: 'center' }}>Tanggal Distribusi</th>
                  <th style={{ textAlign: 'center' }}>Kategori</th>
                  <th colSpan={2} style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {gudang3List.map((gudang3) => (
                    <tr key={gudang3.id_gudang}>
                      <td style={{ textAlign: 'center' }}>{gudang3.id_gudang}</td>
                      <td style={{ textAlign: 'center' }}>{gudang3.id_distribusi}</td>
                      <td style={{ textAlign: 'center' }}>{gudang3.id_obat}</td>
                      <td style={{ textAlign: 'center' }}>{gudang3.stok}</td>
                      <td style={{ textAlign: 'center' }}>{gudang3.nama_obat}</td>
                      <td style={{ textAlign: 'center' }}>{gudang3.kategori}</td>
                      <td style={{ textAlign: 'center' }}>
                        <Link href={`/gudang/3/edit/${gudang3.id_gudang}`}>
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
