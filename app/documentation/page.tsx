'use client';

import Card from '../components/cards'
import Link from 'next/link'
import SidebarDocs from '../components/SidebarDocs';

export default function Documentation(){
    return(
        <main className="flex min-h-screen bg-gray-100">
      {/* Sidebar tetap di kiri */}
      <SidebarDocs />

      {/* Konten card di kanan sidebar */}
      <div className="ml-64 w-full p-4">
    </div>
    </main>
    )
}