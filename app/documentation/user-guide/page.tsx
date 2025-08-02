import Card from "@/app/components/cards";
import SidebarDocs from "@/app/components/SidebarDocs";

export default function Overview(){
    return(
    <main className="flex min-h-screen bg-gray-100">
      <SidebarDocs />

      <div className="ml-64 w-full p-4">
        <Card title="User Guide">
        <hr className="mt-2 border-b-2 border-gray-400 w-300 " />
          <div className="mb-4">  
          </div>
          <div>
            <h1 className="text-black font-bold text-lg mt-10">1. Login dan Register</h1>
            <hr className="mt-2 border-b-2 border-gray-400 w-300 " />
            <ul className="list-disc pl-5 text-black">
                <li className="mt-5">Sebelum masuk, pengguna akan diarahkan ke Landing Page. Untuk masuk ke halaman login, klik tombol "Mulai"
                    <img src="/image/docs/landing-page.png" className="w-160 mt-3"/>
                </li>
                <li className="mt-5"><b>Jika belum punya akun :</b> Klik tombol "Sign Up" </li>
                <img src="/image/docs/login.png" className="w-160 mt-3"/>
                <li className="mt-5"><b>Register :</b> Masukkan nama, email dan password. Setelah berhasil sign up pengguna akan langsung diarahkan ke halaman login</li>
                <img src="/image/docs/signup.png" className="w-160 mt-3"/>
                <li className="mt-5"><b>Login :</b> Masukkan email dan password. </li>
                <img src="/image/docs/login.png" className="w-160 mt-3"/>
                <li className="mt-5">Setelah berhasil log in, pengguna akan diarahkan ke halaman Home </li>
            </ul>
            <h1 className="text-black font-bold text-lg mt-10">2. Navigasi Utama</h1>
            <hr className="mt-2 border-b-2 border-gray-400 w-300 " />
            <p className="text-black">Setelah berhasil login, pengguna dapat melihat menu navigasi yang ada di samping, dan bisa melihat halaman documentation 
                dengan meng-klik tombol "View Documentation"
            </p>
            <img src="/image/docs/home.png" className="w-160 mt-3"/>
            <ul className="list-disc pl-5 text-black">
                <li className="mt-5"><b>Daftar Obat :</b> Menampilkan semua data obat </li>
                <li className="mt-5"><b>Daftar Kategori :</b> Menampilkan semua data kategori </li>
                <li className="mt-5"><b>Daftar Suplier :</b> Menampilkan semua data suplier </li>
                <li className="mt-5"><b>Daftar Distribusi :</b> Menampilkan semua data distribusi </li>
                <li className="mt-5"><b>Daftar Gudang :</b> Didalam menu daftar gudang, menampilkan menu gudang 1, 2, dan 3, dan
                menampilkan semua data gudang 1, 2, dan 3
                </li>
                <li className="mt-5"><b>Sign Out :</b> Saat meng-klik tombol "Sign Out", pengguna akan diarahkan kembali ke halaman login </li>
                <li className="mt-5">Untuk saat ini menu untuk daftar user belum ditambahkan </li>
            </ul>
          </div>
        </Card>
       </div>
    </main>
    )
}