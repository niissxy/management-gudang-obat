'use client';

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Card from "../components/cards";  
import Link from "next/link";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Something went wrong");
    } else {
      setSuccess("Registration successful! Please login.");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
  <main className="flex items-center justify-center min-h-screen bg-gray-100">    
    <Card title="">
      <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <h2 className="text-2xl font-bold mb-2 text-black text-center">Sign Up</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <input
          className="border p-2 w-full text-black"
          style={{ border: '1px solid grey', borderRadius: '5px', width: '400px' }}
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
          className="bg-blue-600 text-white text-lg py-2 rounded hover:bg-blue-700"
          style={{ width: '400px' }}>Sign Up</button>

          <p className="mt-4 text-black text-sm">
            Have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
      </form>
      </div>
    </Card>
  </main>
  );
}
