import Image from "next/image";
import Card from "./components/cards";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card title="">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Gambar di sebelah kiri */}
          <Image
            src="/gudang-obat.jpg" // Pastikan file ini ada di folder public
            alt="Ilustrasi Gudang Obat"
            width={500}
            height={500}
            className="rounded-lg"
          />

          {/* Konten di sebelah kanan */}
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-4xl font-bold mb-4 text-black">
              Sistem Manajemen Gudang Obat
            </h2>
            <p className="text-lg max-w-xl mb-6 text-black">
              Kelola stok obat dengan mudah, cepat, dan akurat. Cocok untuk rumah sakit, apotek, atau gudang farmasi.
            </p>

            <Link href='/login'>
             <button className="bg-blue-500 text-white px-3 py-2 rounded mb-6" style={{ width: '200px', marginTop: '35px' }}>
              Mulai
            </button></Link>
          </div>
        </div>
      </Card>
    </main>
  );
}
