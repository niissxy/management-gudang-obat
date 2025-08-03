'use client';

import Card from "../components/cards";
import Sidebar from "@/app/components/Sidebar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Pen, TrashIcon } from "lucide-react";
import Alert from "../components/Alert";

export default function Page() {
  interface Users {
      id: string;
      name: string;
      email: string;
    }
  
      const [userList, setUserList] = useState<Users[]>([]);
      const [loading, setLoading] = useState(true);
    
      const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);
      const [editingId, setEditingId] = useState<string | null>(null);
      const [editName, setEditName] = useState('');
      const [editEmail, setEditEmail] = useState('');

      useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await fetch("/api/user");
            const data = await res.json();
            setUserList(data);
          } catch (err) {
            console.error("Gagal mengambil data user:", err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUsers();
      }, []);

       const startEdit = (u: Users) => {
       setEditingId(u.id);
       setEditName(u.name);
       setEditEmail(u.email);
  };

  const saveEdit = async () => {
  if (!editingId) return;

  const response = await fetch('/api/user', {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: editingId,
      name: editName,
      email: editEmail
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
  setUserList(prev => prev.map(u => u.id === editingId ? updated : u));
  setEditingId(null);
};

const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm("Apakah yakin ingin menghapus data ini?");
  if (!confirmDelete) return;
  
    const res = await fetch("/api/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id }),
    });

    const result = await res.json();

  if (res.ok) {
    setUserList(prev => prev.filter(item => item.id !== id));
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
        <Card title="Daftar User">
          {alert && <Alert message={alert.message} type={alert.type} />}
          <div className="mb-4">
          </div>

          <div className="table-container">
            {loading ? (
              <p className="text-black">Loading...</p>
            ) : (
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>ID User</th>
                  <th style={{ textAlign: 'center' }}>Nama User</th>
                  <th style={{ textAlign: 'center' }}>Email User</th>
                  <th colSpan={2} style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {userList.length > 0 ? userList.map((u) => (
                <tr key={u.id}>
                  {editingId === u.id ? (
                    <>
                      <td>{u.id}</td>
                      
                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}
                      value={editName} 
                      onChange={(e) => setEditName(e.target.value)} /></td>

                      <td><input 
                      className="border p-2 mr-2"
                      style={{ border: '1px solid grey', color: 'black', borderRadius: '5px', width: '100px' }}
                      value={editEmail} 
                      onChange={(e) => setEditEmail(e.target.value)} /></td>
                      
                      <td style={{ width: '120px' }}>
                        <div className="flex gap-2">
                          <button
                            onClick={saveEdit}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-400 text-white px-3 py-1 rounded"
                          >
                          Batal
                        </button>
                        </div>
                      </td>

                    </>
                  ) : (
                    <>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td colSpan={2}>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => startEdit(u)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center gap-2"
                          >
                            <Pen size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(u.id)}
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
                  <td colSpan={8} style={{ textAlign: 'center' }}>Data user tidak ditemukan</td>
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
