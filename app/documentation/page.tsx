'use client'

import Card from '../components/cards'
import Link from 'next/link'

export default function Docs() {
  return (
    <main className="flex min-h-screen bg-gray-100">
      <div className="ml-0 w-full p-4">
        <Card title="Documentation">
            <div className="flex justify-end">
            <Link href="/home">
            <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            style={{ marginLeft: '100px'}}
          >
            Back
          </button>
            </Link>
          </div>
          <hr className="mt-2 border-b-2 border-gray-400 w-362 " />

          <section className="py-8 px-4 bg-white">
            {/* Flex container untuk 2 box */}
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
              {/* Box 1 */}
              <div className="flex-1 bg-white rounded-xl shadow-md p-4 border border-gray-300">
                <h2 className="text-lg font-bold mb-2 text-black">Menu</h2>
                <ul className="list-disc pl-5 text-black">
                  <li>Daftar Obat
                    <ul className='list-disc pl-5 text-black'>
                    </ul>
                  </li>
                  <li>Daftar Suplier</li>
                  <li>Daftar Kategori</li>
                  <li>Daftar Distribusi</li>
                  <li>Daftar Gudang 1, 2, dan 3</li>
                </ul>
              </div>

              {/* Box 2 */}
              <div className="flex-1 bg-white rounded-xl shadow-md p-4 border border-gray-300">
                <h2 className="text-lg font-bold mb-2 text-black">Fitur</h2>
                <ul className="list-disc pl-5 text-black">
                  <li>Sign Up/Log In sebelum masuk ke sistem</li>
                  <li>Tambah Data, Edit Data dan Hapus Data untuk
                    <ul className="list-disc pl-5 text-black">
                        <li>Data Obat</li>
                        <li>Data Suplier</li>
                        <li>Data Distribusi</li>
                        <li>Data Gudang 1, 2, dan 3</li>
                    </ul>
                  <li>Saat ini untuk data kategori hanya bisa tambah data dan edit data</li>
                  </li>
                </ul>
              </div>
            </div>
            <hr className="mt-2 border-b-2 border-gray-400 w-362 " style={{ marginTop: '40px' }}/>

            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6" style={{ marginTop: '40px' }}>
              {/* Box 1 */}
              <div className="flex-1 bg-white rounded-xl shadow-md p-4 border border-gray-300">
                <h2 className="text-lg font-bold mb-2 text-black">Detail</h2>
                <ul className="list-disc pl-5 text-black">
                    <li>Saat pertama kali membuka aplikasi ini, akan diarahkan ke halaman landing page,
                        untuk masuk ke dalam aplikasi, tekan tombol mulai untuk melakukan log in atau sign up (jika belum memiliki akun).
                    </li>
                  <li>Register:
                    <ul className='list-disc pl-5 text-black'>
                        <li>Masukkan nama, email dan password, jika sign up berhasil akan diarahkan ke halaman log in</li>
                    </ul>
                  </li>
                  <li>Log in
                    <ul className='list-disc pl-5 text-black'>
                        <li>Masukkan email dan password yang baru saja dibuat, jika login berhasil akan diarahkan ke halaman home.
                            Setelah itu, pilih menu yang akan dikunjungi
                        </li>
                    </ul>
                  </li>
                  <li>Daftar Obat
                    <ul className='list-disc pl-5 text-black'>
                        <li>
                            Tambah Data
                            <ul className='list-disc pl-5 text-black'>
                                <li>
                                    Untuk menambah data obat, tekan tombol "Tambah Data" yang ada di bagian atas tabel untuk mulai menambah data.
                                    Kemudian, masukkan semua data yang dibutuhkan untuk daftar obat didalam field input yang sudah disediakan.
                                </li>
                                <li>
                                    Untuk mengirimkan data, tekan tombol "Tambah" dibagian bawah dan tombol "Cancel" untuk membatalkan. Jika data
                                    berhasil dikirimkan, akan otomatis berpindah ke halaman daftar obat
                                </li>
                                <li>Id Obat sudah digenerate secara otomatis, dan untuk suplier berupa option dari data suplier, dan kategori berupa option dari
                                    data kategori
                                </li>
                            </ul>
                        </li>
                        <li>Edit Data
                            <ul className='list-disc pl-5 text-black'>
                                <li>
                                    Untuk memulai edit data, tekan tombol dengan icon pen. Untuk data yang bisa diedit yaitu nama obat, stok, harga dan exp_date
                                </li>
                                <li>
                                    Untuk mengirimkan data, tekan tombol "Simpan" dan tombol "Cancel" untuk membatalkan. Jika data
                                    berhasil diedit, data akan otomatis berubah di halaman obat
                                </li>
                                <li>Jika update data berhasil, maka stok lama dari data obat akan bertambah berdasarkan stok yang diupdate sebelumnya</li>
                                <li>Field Id, suplier, kategori tidak bisa di edit</li>
                            </ul>
                        </li>
                        <li>Hapus Data
                            <ul className='list-disc pl-5 text-black'>
                                <li>
                                    Untuk memulai hapus data, tekan tombol dengan icon trash disebelah kanan tombol edit.
                                </li>
                                <li>
                                    Data obat yang sudah digunakan di distribusi atau gudang 1, 2, 3, tidak bisa dihapus
                                </li>
                            </ul>
                        </li>
                    </ul>
                  </li>

                  <li>Daftar Kategori
                    <ul className='list-disc pl-5 text-black'>
                        <li>
                            Tambah Data
                            <ul className='list-disc pl-5 text-black'>
                                <li>
                                    Untuk menambah data kategori, tekan tombol "Tambah Data" yang ada di bagian atas tabel untuk mulai menambah data.
                                    Kemudian, masukkan semua data yang dibutuhkan untuk daftar kategori didalam field input yang sudah disediakan.
                                </li>
                                <li>
                                    Untuk mengirimkan data, tekan tombol "Tambah" dibagian bawah dan tombol "Cancel" untuk membatalkan. Jika data
                                    berhasil dikirimkan, akan otomatis berpindah ke halaman daftar kategori
                                </li>
                                <li>Id Kategori sudah digenerate secara otomatis</li>
                            </ul>
                        </li>
                        <li>Edit Data
                            <ul className='list-disc pl-5 text-black'>
                                <li>
                                    Untuk memulai edit data, tekan tombol dengan icon pen. Untuk data yang bisa diedit yaitu hanya nama_kategori
                                </li>
                                <li>
                                    Untuk mengirimkan data, tekan tombol "Simpan" dan tombol "Cancel" untuk membatalkan. Jika data
                                    berhasil diedit, data akan otomatis berubah di halaman kategori
                                </li>
                            </ul>
                        </li>
                        <li>Hapus Data
                            <ul className='list-disc pl-5 text-black'>
                                <li>
                                    Untuk hapus data, tekan tombol dengan icon trash yang ada disebelah kanan tombol edit, untuk data obat yang sudah digunakan di
                                    distribusi atau gudang 1, 2, 3 tidak bisa dihapus
                                </li>
                            </ul>
                        </li>
                    </ul>
                  </li>

                  <li>Daftar Suplier
                    <ul className='list-disc pl-5 text-black'>
                        <li>
                            Tambah Data
                            <ul className='list-disc pl-5 text-black'>
                                <li>
                                    Untuk menambah data suplier, tekan tombol "Tambah Data" yang ada di bagian atas tabel untuk mulai menambah data.
                                    Kemudian, masukkan semua data yang dibutuhkan untuk daftar suplier didalam field input yang sudah disediakan.
                                </li>
                                <li>
                                    Untuk mengirimkan data, tekan tombol "Tambah" dibagian bawah dan tombol "Cancel" untuk membatalkan. Jika data
                                    berhasil dikirimkan, akan otomatis berpindah ke halaman daftar suplier
                                </li>
                                <li>Id Suplier sudah digenerate secara otomatis</li>
                            </ul>
                        </li>
                        <li>Edit Data
                            <ul className='list-disc pl-5 text-black'>
                                <li>
                                    Untuk memulai edit data, tekan tombol dengan icon pen. Untuk data yang bisa diedit yaitu nama, email, alamat dan no_telp
                                </li>
                                <li>
                                    Untuk mengirimkan data, tekan tombol "Simpan" dan tombol "Cancel" untuk membatalkan. Jika data
                                    berhasil diedit, data akan otomatis berubah di halaman suplier
                                </li>
                            </ul>
                        </li>
                        <li>Hapus Data
                            <ul className='list-disc pl-5 text-black'>
                                <li>
                                    Untuk hapus data, tekan tombol dengan icon trash yang ada disebelah kanan tombol edit, jika berhasil data akan terhapus
                                </li>
                            </ul>
                        </li>
                    </ul>
                  </li>

                  <li>Daftar Distribusi
                    <ul className='list-disc pl-5 text-black'>
                        <li>
                            Tambah Data
                            <ul className='list-disc pl-5 text-black'>
                                <li>
                                    Untuk menambah data distribusi, tekan tombol "Tambah Data" yang ada di bagian atas tabel untuk mulai menambah data.
                                    Kemudian, masukkan semua data yang dibutuhkan untuk daftar distribusi didalam field input yang sudah disediakan.
                                </li>
                                <li>
                                    Untuk mengirimkan data, tekan tombol "Tambah" dibagian bawah dan tombol "Cancel" untuk membatalkan. Jika data
                                    berhasil dikirimkan, akan otomatis berpindah ke halaman daftar distribusi
                                </li>
                                 <li>
                                    Jika berhasil menambah data distribusi, maka stok yang ada di daftar obat akan berkurang berdasarkan stok yang
                                    dimasukkan di data distribusi
                                </li>
                                <li>Id Distribusi sudah digenerate secara otomatis</li>
                            </ul>
                        </li>
                        <li>Edit Data
                            <ul className='list-disc pl-5 text-black'>
                                <li>
                                    Untuk memulai edit data, tekan tombol dengan icon pen. Untuk data yang bisa diedit yaitu stok dan tgl_distribusi
                                </li>
                                <li>
                                    Untuk mengirimkan data, tekan tombol "Simpan" dan tombol "Cancel" untuk membatalkan. Jika data
                                    berhasil diedit, data akan otomatis berubah di halaman distribusi
                                </li>
                                <li>
                                    Saat update data berhasil, maka stok lama yang ada di distribusi akan bertambah berdasarkan stok yang diupdate sebelumnya,
                                    dan juga akan mengurangi stok di daftar obat berdasarkan stok yang diinput saat edit data
                                </li>
                            </ul>
                        </li>
                        <li>Hapus Data
                            <ul className='list-disc pl-5 text-black'>
                                <li>
                                    Untuk hapus data, tekan tombol dengan icon trash yang ada disebelah kanan tombol edit, jika berhasil data akan terhapus.
                                    Untuk data distribusi yang sudah digunakan di gudang 1, 2, atau 3, maka tidak akan bisa dihapus
                                </li>
                            </ul>
                        </li>
                    </ul>
                  </li>

                  <li>Daftar Gudang 1, 2, 3
                    <ul className='list-disc pl-5 text-black'>
                        <li>
                            Tambah Data
                            <ul className='list-disc pl-5 text-black'>
                                <li>
                                    Untuk menambah data gudang 1, 2 atau 3, tekan tombol "Tambah Data" yang ada di bagian atas tabel untuk mulai menambah data.
                                    Kemudian, masukkan semua data yang dibutuhkan untuk daftar distribusi didalam field input yang sudah disediakan.
                                </li>
                                <li>
                                    Untuk mengirimkan data, tekan tombol "Tambah" dibagian bawah dan tombol "Cancel" untuk membatalkan. Jika data
                                    berhasil dikirimkan, akan otomatis berpindah ke halaman daftar gudang 1, 2 atau 3 (sesuai gudang yang sedang aktif)
                                </li>
                                 <li>
                                    Jika berhasil menambah data gudang, maka stok yang ada di daftar distribusi akan berkurang berdasarkan stok yang
                                    dimasukkan di data gudang
                                </li>
                                <li>Id Gudang sudah digenerate secara otomatis</li>
                            </ul>
                        </li>
                        <li>Edit Data
                            <ul className='list-disc pl-5 text-black'>
                                <li>
                                    Untuk memulai edit data, tekan tombol dengan icon pen. Untuk data yang bisa diedit yaitu stok dan tgl_distribusi
                                </li>
                                <li>
                                    Untuk mengirimkan data, tekan tombol "Simpan" dan tombol "Cancel" untuk membatalkan. Jika data
                                    berhasil diedit, data akan otomatis berubah di halaman gudang
                                </li>
                                <li>
                                    Saat update data berhasil, maka stok lama yang ada di gudang 1, 2, atau 3 akan bertambah berdasarkan stok yang diupdate sebelumnya,
                                    dan juga akan mengurangi stok di daftar distribusi berdasarkan stok yang diinput saat edit data
                                </li>
                            </ul>
                        </li>
                        <li>Hapus Data
                            <ul className='list-disc pl-5 text-black'>
                                <li>
                                    Untuk hapus data, tekan tombol dengan icon trash yang ada disebelah kanan tombol edit, jika berhasil data akan terhapus.
                                </li>
                                <li>Saat menghapus data, sistem akan mengecek apakah data ada di distribusi atau obat</li>
                                <li>Jika ada di distribusi, saat data gudang 1, 2, atau 3 dihapus, maka stok yang ada di gudang tersebut akan kembali 
                                    ke distribusi dan menambah stok di distribusi berdasarkan stok gudang yang dihapus
                                </li>
                                 <li>Jika tidak ada di distribusi, saat data gudang 1, 2, atau 3 dihapus, maka stok yang ada di gudang tersebut akan kembali 
                                    ke data obat dan menambah stok di data obat berdasarkan stok gudang yang dihapus
                                </li>
                            </ul>
                        </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </Card>
      </div>
    </main>
  )
}
