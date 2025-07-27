'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Home,
  Pill,
  Layers,
  Truck,
  Package,
  Warehouse,
  ChevronDown,
  ChevronUp,
  LogOut,
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

export default function Sidebar() {
  const { data: session, status } = useSession();
  const [openGudang, setOpenGudang] = useState(false);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Not logged in</div>;
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-6">Sistem Management Gudang Obat</h2>
      <nav>
        <ul className="space-y-10">
          <li>
            <Link href="/home" className="flex items-center space-x-2 hover:text-gray-300">
              <Home size={18} />
              <span style={{ marginLeft: '11px' }}>Home</span>
            </Link>
          </li>

          <li style={{ marginTop: '20px' }}>
            <Link href="/obat" className="flex items-center space-x2 hover:text-gray-300">
              <Pill size={18} />
              <span style={{ marginLeft: '17px' }}>Daftar Obat</span>
            </Link>
          </li>

          <li style={{ marginTop: '20px' }}>
            <Link href="/kategori" className="flex items-center space-x-2 hover:text-gray-300">
              <Layers size={18} />
              <span style={{ marginLeft: '9px' }}>Kategori Obat</span>
            </Link>
          </li>

          <li style={{ marginTop: '20px' }}>
            <Link href="/suplier" className="flex items-center space-x-2 hover:text-gray-300">
              <Truck size={18} />
              <span style={{ marginLeft: '9px' }}>Suplier Obat</span>
            </Link>
          </li>

          <li style={{ marginTop: '20px' }}>
            <Link href="/distribusi" className="flex items-center space-x-2 hover:text-gray-300">
              <Package size={18} />
              <span style={{ marginLeft: '9px' }}>Distribusi Obat</span>
            </Link>
          </li>

          <li>
            <button
              onClick={() => setOpenGudang(!openGudang)}
              className="w-full flex items-center justify-between text-left hover:text-gray-300"
            >
              <div className="flex items-center">
                <Warehouse size={18} />
                <span className="ml-4" style={{ marginLeft: '15px' }}>Gudang</span>
              </div>
              {openGudang ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {openGudang && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <Link href="/gudang/utama" className="hover:text-gray-300">
                    Gudang Utama
                  </Link>
                </li>
                <li>
                  <Link href="/gudang/1" className="hover:text-gray-300">
                    Gudang 1
                  </Link>
                </li>
                <li>
                  <Link href="/gudang/2" className="hover:text-gray-300">
                    Gudang 2
                  </Link>
                </li>
                <li>
                  <Link href="/gudang/3" className="hover:text-gray-300">
                    Gudang 3
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li style={{ marginTop: '160px' }}>
            <div>
            <p>{session.user?.name}</p>
            <p className='text-blue-300'>{session.user?.email}</p>
            </div>
          </li>

          <li>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center space-x-2 text-red-400 hover:text-red-700"
            >
              <LogOut size={18} />
              <span style={{ marginLeft: '5px' }}>Sign Out</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
