'use client';

import Card from "../components/cards";
import Sidebar from "@/app/components/Sidebar";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Page() {
  interface Kategori {
      id_kategori: string;
      nama_kategori: string;
    }
  
      const [kategoriList, setKategoriList] = useState<Kategori[]>([]);
      const [loading, setLoading] = useState(true);
    
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

  return (
    <main className="flex min-h-screen bg-gray-100">
      {/* Sidebar tetap di kiri */}
      <Sidebar />

      {/* Konten card di kanan sidebar */}
      <div className="ml-64 w-full p-4">
        <Card title="Daftar Kategori Obat">
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
                {kategoriList.map((kategori) => (
                    <tr key={kategori.id_kategori}>
                      <td style={{ textAlign: 'center' }}>{kategori.id_kategori}</td>
                      <td style={{ textAlign: 'center' }}>{kategori.nama_kategori}</td>
                      <td style={{ textAlign: 'center' }}>
                        <Link href={`/kategori/edit/${kategori.id_kategori}`}>
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
            )};
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
