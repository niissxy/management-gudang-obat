import Card from "@/app/components/cards";
import SidebarDocs from "@/app/components/SidebarDocs";

export default function Overview(){
    return(
    <main className="flex min-h-screen bg-gray-100">
      <SidebarDocs />

      <div className="ml-64 w-full p-4">
        <Card title="CRUD Gudang (1, 2, dan 3)">
        <hr className="mt-2 border-b-2 border-gray-400 w-300 " />
        <p className="mt-5 text-black">Untuk gudang 2 dan gudang 3 memiliki alur yang sama</p>
          <div className="mb-4">  
          </div>
          <div>
            <h1 className="text-black font-bold text-lg mt-10">1. Tambah Data Gudang</h1>
            <hr className="mt-2 border-b-2 border-gray-400 w-300 " />
            <ul className="list-disc pl-5 text-black">
                <li className="mt-5">Untuk mulai tambah data, klik tombol "Tambah Data"</li>
                <img src="/image/docs/daftar-gudang.png" className="w-160 mt-3"/>
                <li className="mt-5">Setelah masuk ke halaman tambah data, mulai input data yang ingin ditambahkan
                    <ul className="pl-5 text-black" style={{ listStyleType: 'square' }}>
                        <li>Pilih id distribusi berdasarkan gudang tujuan</li>
                        <li>Setelah id distribusi dipilih, field id obat, nama obat, dan kategori akan terisi otomatis berdasarkan id distribusi
                            yang dipilih
                        </li>
                        <li>Masukkan stok yang diinginkan. Jumlah stok yang dimasukkan tidak bisa lebih dari jumlah stok yang ada di distribusi</li>
                    </ul>
                </li>
                <li>Setelah selesai input data, klik tombol "Tambah" untuk menambahkan data. Jika data berhasil ditambah,
                    pengguna akan diarahkan kembali ke halaman daftar gudang
                </li>
                <img src="/image/docs/tambah-gudang.png" className="w-160 mt-3"/>
            </ul>
        </div>
         <div>
            <h1 className="text-black font-bold text-lg mt-10">2. Edit Data Obat</h1>
            <hr className="mt-2 border-b-2 border-gray-400 w-300 " />
            <ul className="list-disc pl-5 text-black">
                <li>Untuk mulai edit data, klik tombol dengan icon pen disebelah kiri</li>
                <li>Setelah tombol diklik, akan muncul field untuk edit data</li>
                <img src="/image/docs/edit-gudang.png" className="w-160 mt-3"/>
                <li className="mt-5">Untuk data yang dapat diedit yaitu, stok</li>
                <li>Setelah selesai edit data, klik tombol simpan untuk menyimpan perubahan pada data</li>
                <li>Jika data berhasil di update, perubahan akan langsung terlihat di halaman daftar distribusi</li>
                <li>Setelah berhasil update, stok gudang akan bertambah berdasarkan stok gudang baru yang dimasukkan, dan
                    mengurangi stok yang ada di data di data distribusi berdasarkan stok yang baru saja diupdate di data gudang </li>
            </ul>
        </div>
        <div>
            <h1 className="text-black font-bold text-lg mt-10">3. Hapus Data Gudang</h1>
            <hr className="mt-2 border-b-2 border-gray-400 w-300 " />
             <ul className="list-disc pl-5 text-black">
                <li>Untuk menghapus data gudang, klik tombol dengan icon trash</li>
                <li>Jika berhasil, data akan terhapus dari database</li>
                <li>Untuk bagian hapus, sistem akan memeriksa apakah data berasal dari data obat atau dari data distribusi, jika berasal
                    dari data obat, saat data gudang dihapus, maka stok yang ada di gudang akan dikembalikan ke data obat. Jika berasal
                    dari data distribusi, maka stok yang ada di gudang akan dikembalikan ke data distribusi
                </li>
             </ul>
        </div>
        </Card>
       </div>
    </main>
    )
}