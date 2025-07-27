'use client'

import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Card from "../components/cards";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    });
    if (res?.error) {
      setError("Email atau password salah.");
    } else {
      router.push("/home");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card title="">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
          <h2 className="text-2xl font-bold mb-2 text-black text-center">Login</h2>
          
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <input
            className="border p-2 w-full text-black"
            style={{ border: '1px solid grey', borderRadius: '5px', width: '400px' }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            className="border p-2 w-full text-black"
            style={{ border: '1px solid grey', borderRadius: '5px', width: '400px' }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-blue-600 text-white text-lg px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Login
          </button>

          {/* Sign up prompt */}
          <p className="mt-4 text-black text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </Card>
    </main>
  );
}
