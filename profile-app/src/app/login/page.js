"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    // ✅ store token
    localStorage.setItem("token", data.token);

    router.push("/profile");
  } else {
    alert(data.message);
  }
};

  return (
    <div className="p-10">
      <h1>Login</h1>

       <button
        onClick={() => router.replace("/")}
        className="mb-4 bg-gray-300 px-3 py-1 rounded"
      >
        ← Back
      </button>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 block mb-2"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 block mb-2"
      />

      <button onClick={handleLogin} className="bg-green-500 text-white p-2">
        Login
      </button>
    </div>
  );
}