'use client';

import Card from "../components/cards";
import Sidebar from "@/app/components/Sidebar";

// components/SuplierForm.tsx

export default function Page() {

  return (
    <main className="flex">
      {/* Sidebar tetap di kiri */}
      <Sidebar />

      {/* Konten card di kanan sidebar */}
      <div className="ml-64 w-full p-4">
        <Card title="Daftar Suplier">
          <div className="mb-4">
          </div>
          <option>

          </option>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>ID Suplier</th>
                  <th style={{ textAlign: 'center' }}>Nama Suplier</th>
                  <th style={{ textAlign: 'center' }}>Email Suplier</th>
                  <th style={{ textAlign: 'center' }}>Alamat Suplier</th>
                  <th colSpan={2} style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
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
