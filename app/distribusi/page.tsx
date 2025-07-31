'use client';

import Card from "../components/cards";
import Sidebar from "@/app/components/Sidebar";
import Link from "next/link";
import { useState, useEffect } from "react";

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

  return (
    <main className="flex min-h-screen bg-gray-100">
      {/* Sidebar tetap di kiri */}
      <Sidebar />

      {/* Konten card di kanan sidebar */}
      <div className="ml-64 w-full p-4">
        <Card title="Distribusi Obat">
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
                {distribusiList.map((distribusi) => (
                    <tr key={distribusi.id_distribusi}>
                      <td style={{ textAlign: 'center' }}>{distribusi.id_distribusi}</td>
                      <td style={{ textAlign: 'center' }}>{distribusi.id_obat}</td>
                      <td style={{ textAlign: 'center' }}>{distribusi.nama_obat}</td>
                      <td style={{ textAlign: 'center' }}>{distribusi.stok}</td>
                      <td style={{ textAlign: 'center' }}>{distribusi.kategori}</td>
                      <td style={{ textAlign: 'center' }}>{new Date(distribusi.tgl_distribusi).toLocaleDateString("id-ID")}</td>
                      <td style={{ textAlign: 'center' }}>{distribusi.tujuan}</td>
                      <td style={{ textAlign: 'center' }}>
                        <Link href={`/distribusi/edit/${distribusi.id_distribusi}`}>
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
