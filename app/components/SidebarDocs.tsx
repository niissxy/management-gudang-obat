'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { FileText, 
        PieChart, 
        User2Icon,
        PillIcon,
        Layers,
        TruckIcon,
        Package,
        Warehouse,
        ArrowLeft
    } 
from 'lucide-react';

export default function SidebarDocs() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Not logged in</div>;
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4 shadow-lg">
    <div className='flex items-center gap-2'>
        <FileText /><h2 className="text-xl font-bold">Documentation</h2>
    </div>
        
      <nav>
        <ul className="space-y-10">
          <li className='mt-10'>
             <Link href="/documentation/overview" className="flex items-center space-x-2 hover:text-gray-300">
              <PieChart size={18} />
              <span style={{ marginLeft: '11px' }}>Overview</span>
            </Link>
          </li>

          <li style={{ marginTop: '20px' }}>
            <Link href="/documentation/user-guide" className="flex items-center space-x-2 hover:text-gray-300">
              <User2Icon size={18} />
              <span style={{ marginLeft: '11px' }}>User Guide</span>
            </Link>
          </li>

          <li style={{ marginTop: '20px' }}>
             <Link href="/documentation/crud-obat" className="flex items-center space-x-2 hover:text-gray-300">
              <PillIcon size={18} />
              <span style={{ marginLeft: '11px' }}>CRUD Obat</span>
            </Link>
          </li>

          <li style={{ marginTop: '20px' }}>
             <Link href="/documentation/crud-kategori" className="flex items-center space-x-2 hover:text-gray-300">
              <Layers size={18} />
              <span style={{ marginLeft: '11px' }}>CRUD Kategori</span>
            </Link>
          </li>

          <li style={{ marginTop: '20px' }}>
             <Link href="/documentation/crud-suplier" className="flex items-center space-x-2 hover:text-gray-300">
              <TruckIcon size={18} />
              <span style={{ marginLeft: '11px' }}>CRUD Suplier</span>
            </Link>
          </li>

          <li style={{ marginTop: '20px' }}>
             <Link href="/documentation/crud-distribusi" className="flex items-center space-x-2 hover:text-gray-300">
              <Package size={18} />
              <span style={{ marginLeft: '11px' }}>CRUD Distribusi</span>
            </Link>
          </li>

          <li style={{ marginTop: '20px' }}>
             <Link href="/documentation/crud-gudang" className="flex items-center space-x-2 hover:text-gray-300">
              <Warehouse size={18} />
              <span style={{ marginLeft: '11px' }}>CRUD Gudang (1, 2, dan 3)</span>
            </Link>
          </li>

          <li style={{ marginTop: '20px' }}>
             <Link href="/home" className="flex items-center space-x-2 hover:text-gray-300">
              <ArrowLeft size={18} />
              <span style={{ marginLeft: '11px' }}>Back</span>
            </Link>
          </li>

          <li>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center space-x-2 text-red-400 hover:text-red-700"
            >
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
