'use client';

import Sidebar from "../components/Sidebar";
import { useSession } from 'next-auth/react';
import Link from "next/link";

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar di kiri */}
      <Sidebar />

      {/* Konten Utama */}
      <div className="flex flex-1 items-center justify-center">
        <section className="py-8 px-6 w-full" style={{ marginLeft: '200px' }}>
          <div className="max-w-3xl mx-auto flex justify-center">
            {/* Box */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-300 w-full md:w-1/2">
              <h2 className="text-xl font-bold mb-2 text-black">Welcome!!</h2>
              {status === 'loading' ? (
                <p className="text-gray-500">Loading session...</p>
              ) : session ? (
                <p className="text-black">Logged in as: {session.user?.email}</p>
              ) : (
                <p className="text-red-500">You are not logged in.</p>
              )}
               <div className="flex justify-end">
            <Link href="/documentation">
            <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            style={{ marginLeft: '100px', marginTop: '80px' }}
          >
            View Documentation
          </button>
            </Link>
          </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
