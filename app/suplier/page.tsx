'use client';

import Card from "../components/cards";
import Sidebar from "@/app/components/Sidebar";
import Link from "next/link";
import { useState, useEffect } from "react";

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
              <p>Loading...</p>
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
                  {suplierList.map((suplier) => (
                    <tr key={suplier.id_suplier}>
                      <td style={{ textAlign: 'center' }}>{suplier.id_suplier}</td>
                      <td style={{ textAlign: 'center' }}>{suplier.nama_suplier}</td>
                      <td style={{ textAlign: 'center' }}>{suplier.email_suplier}</td>
                      <td style={{ textAlign: 'center' }}>{suplier.alamat_suplier}</td>
                      <td style={{ textAlign: 'center' }}>{suplier.no_telp}</td>
                      <td style={{ textAlign: 'center' }}>
                        <Link href={`/suplier/edit/${suplier.id_suplier}`}>
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
