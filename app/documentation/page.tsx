'use client';

import SidebarDocs from '../components/SidebarDocs';

export default function Documentation(){
    return(
        <main className="flex min-h-screen bg-gray-100">
      {/* Sidebar tetap di kiri */}
      <SidebarDocs />
       <div className="flex flex-1 items-center justify-center">
        <section className="py-8 px-6 w-full" style={{ marginLeft: '200px' }}>
          <div className="max-w-3xl mx-auto flex justify-center">
            {/* Box */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-300 w-full md:w-1/2">
              <h2 className="text-xl font-semibold mb-2 text-black">Silakan pilih menu disamping untuk mulai membaca dokumentasi!</h2>
            </div>
          </div>
        </section>
    </div>
    </main>
    )
}