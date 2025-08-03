import Card from "@/app/components/cards";
import SidebarDocs from "@/app/components/SidebarDocs";

export default function Overview(){
    return(
    <main className="flex min-h-screen bg-gray-100">
      <SidebarDocs />

      <div className="ml-64 w-full p-4">
        <Card title="CRUD Distribusi">
        <hr className="mt-2 border-b-2 border-gray-400 w-300 " />
          <div className="mb-4">  
          </div>
          <div>
            <h1 className="text-black font-bold text-lg mt-10">1. Tambah Data Distribusi</h1>
            <hr className="mt-2 border-b-2 border-gray-400 w-300 " />
            <ul className="list-disc pl-5 text-black">
                <li className="mt-5">Untuk mulai tambah data, klik tombol "Tambah Data"</li>
                <img src="/image/docs/daftar-distribusi.png" className="w-160 mt-3"/>
                <li className="mt-5">Setelah masuk ke halaman tambah data, mulai input data yang ingin ditambahkan
                    <ul className="pl-5 text-black" style={{ listStyleType: 'square' }}>
                        <li>Pilih id obat</li>
                        <li>Saat id obat dipilih, field nama obat dan kategori akan terisi otomatis</li>
                        <li>Id obat, nama obat dan kategori diambil dari data obat</li>
                        <li>Masukkan stok obat yang diinginkan. Stok obat yang dimasukkan tidak bisa lebih dari stok yang ada di data obat</li>
                    </ul>
                </li>
                <li>Setelah selesai input data, klik tombol "Tambah" untuk menambahkan data. Jika data berhasil ditambah,
                    pengguna akan diarahkan kembali ke halaman daftar distribusi
                </li>
                <img src="/image/docs/tambah-distribusi.png" className="w-160 mt-3"/>
            </ul>
        </div>
         <div>
            <h1 className="text-black font-bold text-lg mt-10">2. Edit Data Distribusi</h1>
            <hr className="mt-2 border-b-2 border-gray-400 w-300 "/>
            <ul className="list-disc pl-5 text-black">
                <li>Untuk mulai edit data, klik tombol dengan icon pen disebelah kiri</li>
                <li>Setelah tombol diklik, akan muncul field untuk edit data</li>
                <img src="/image/docs/edit-distribusi.png" className="w-160 mt-3"/>
                <li className="mt-5">Untuk data yang dapat diedit yaitu, stok dan tanggal distribusi</li>
                <li>Setelah selesai edit data, klik tombol simpan untuk menyimpan perubahan pada data</li>
                <li>Jika data berhasil di update, perubahan akan langsung terlihat di halaman daftar distribusi</li>
                <li>Setelah berhasil update, stok distribusi akan bertambah berdasarkan stok distribusi baru yang dimasukkan, dan 
                    mengurangi stok obat berdasarkan stok yang baru saja diupdate di data distribusi
                </li>
            </ul>
        </div>
        <div>
            <h1 className="text-black font-bold text-lg mt-10">3. Hapus Data Distribusi</h1>
            <hr className="mt-2 border-b-2 border-gray-400 w-300 "/>
             <ul className="list-disc pl-5 text-black">
                <li>Untuk menghapus data suplier, klik tombol dengan icon trash</li>
                <li>Jika berhasil, data akan terhapus dari database</li>
                <li>Untuk data distribusi yang sudah digunakan di gudang 1, 2, 3, tidak bisa dihapus</li>
             </ul>
        </div>
        </Card>
       </div>
    </main>
    )
}