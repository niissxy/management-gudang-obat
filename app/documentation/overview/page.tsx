import Card from "@/app/components/cards";
import SidebarDocs from "@/app/components/SidebarDocs";

export default function Overview(){
    return(
    <main className="flex min-h-screen bg-gray-100">
      <SidebarDocs />

      <div className="ml-64 w-full p-4">
        <Card title="Overview">
        <hr className="mt-2 border-b-2 border-gray-400 w-300 " />
          <div className="mb-4">  
          </div>
          <div>
            <p className="text-black">Aplikasi Manajemen Gudang Obat adalah sistem berbasis web yang digunakan untuk mengelola data obat, suplier, kategori, distribusi, dan gudang secara terintegrasi. 
                Aplikasi ini dirancang untuk mempermudah pengguna dalam memantau stok, melakukan distribusi, dan mencatat pergerakan obat dari satu gudang ke gudang lainnya.
            </p>
          </div>
          <h2 className="text-black text-xl font-semibold mt-10 mb-4">Fitur Utama</h2>
          <hr className="mt-2 border-b-2 border-gray-400 w-300 " />
          <div>
            <ul className="list-disc pl-5 text-black">
                <li><b>Manajemen Obat :</b> Tambah, edit dan hapus data obat</li>
                <li><b>Manajemen Kategori :</b> Tambah dan edit data kategori </li>
                <li><b>Manajemen Suplier :</b> Tambah, edit, dan hapus data suplier </li>
                <li><b>Manajemen Distribusi :</b> Tambah, edit, dan hapus data distribusi </li>
                <li><b>Manajemen Gudang 1, 2, dan 3 :</b> Tambah, edit dan hapus data gudang 1, 2, dan 3 </li>
            </ul>
          </div>
          <h2 className="text-black text-xl font-semibold mt-10 mb-4">Autentikasi</h2>
          <hr className="mt-2 border-b-2 border-gray-400 w-300 " />
          <div>
            <ul className="list-disc pl-5 text-black">
                <li>Pengguna wajib sign up atau login sebelum mengakses fitur manajemen data</li>
                <li>Tersedia Landing Page, Sign Up Page, dan Log In Page</li>
            </ul>
          </div>
          <h2 className="text-black text-xl font-semibold mt-10 mb-4">Alur Penggunaan</h2>
          <hr className="mt-2 border-b-2 border-gray-400 w-300 " />
          <div>
            <ul className="list-disc pl-5 text-black">
                <li>Log in/Register akun terlebih dahulu</li>
                <li>Masuk ke halaman Home</li>
                <li>Akses menu untuk mulai manajemen data</li>
            </ul>
          </div>
        </Card>
       </div>
    </main>
    )
}