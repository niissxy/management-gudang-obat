import Card from "@/app/components/cards";
import SidebarDocs from "@/app/components/SidebarDocs";

export default function Overview(){
    return(
    <main className="flex min-h-screen bg-gray-100">
      <SidebarDocs />

      <div className="ml-64 w-full p-4">
        <Card title="CRUD Obat">
        <hr className="mt-2 border-b-2 border-gray-400 w-300 " />
          <div className="mb-4">  
          </div>
          <div>
            <h1 className="text-black font-bold text-lg mt-10">1. Tambah Data Obat</h1>
            <hr className="mt-2 border-b-2 border-gray-400 w-300 " />
            <ul className="list-disc pl-5 text-black">
                <li className="mt-5">Untuk mulai tambah data, klik tombol "Tambah Data"</li>
                <img src="/image/docs/daftar-obat.png" className="w-160 mt-3"/>
                <li className="mt-5">Setelah masuk ke halaman tambah data, mulai input data yang ingin ditambahkan
                    <ul className="pl-5 text-black" style={{ listStyleType: 'square' }}>
                        <li>Masukkan nama obat</li>
                        <li>Masukkan stok obat</li>
                        <li>Pilih suplier (Untuk suplier diambil dari data suplier)</li>
                        <li>Pilih Kategori (Untuk kategori diambil dari data kategori)</li>
                        <li>Masukkan harga obat</li>
                        <li>Masukkan Exp date</li>
                    </ul>
                </li>
                <li>Setelah selesai input data, klik tombol "Tambah" untuk menambahkan data. Jika data berhasil ditambah,
                    pengguna akan diarahkan kembali ke halaman daftar obat
                </li>
                <img src="/image/docs/tambah-obat.png" className="w-160 mt-3"/>
            </ul>
        </div>
         <div>
            <h1 className="text-black font-bold text-lg mt-10">2. Edit Data Obat</h1>
            <hr className="mt-2 border-b-2 border-gray-400 w-300 " />
            <ul className="list-disc pl-5 text-black">
                <li>Untuk mulai edit data, klik tombol dengan icon pen disebelah kiri</li>
                <li>Setelah tombol diklik, akan muncul field untuk edit data</li>
                <img src="/image/docs/edit-obat.png" className="w-160 mt-3"/>
                <li className="mt-5">Untuk data yang dapat diedit yaitu, nama obat, stok obat, harga obat dan exp date</li>
                <li>Setelah selesai edit data, klik tombol simpan untuk menyimpan perubahan pada data</li>
                <li>Jika data berhasil di update, perubahan akan langsung terlihat di halaman daftar obat</li>
                <li>Setelah berhasil update, stok obat akan bertambah berdasarkan stok obat baru yang dimasukkan</li>
            </ul>
        </div>
        <div>
            <h1 className="text-black font-bold text-lg mt-10">3. Hapus Data Obat</h1>
            <hr className="mt-2 border-b-2 border-gray-400 w-300 " />
             <ul className="list-disc pl-5 text-black">
                <li>Untuk menghapus data obat, klik tombol dengan icon trash</li>
                <li>Jika berhasil, data akan terhapus dari database</li>
             </ul>
        </div>
        </Card>
       </div>
    </main>
    )
}