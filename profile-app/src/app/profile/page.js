"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   fetch("/api/user", {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => setUser(data));
  // }, []);

  useEffect(() => {
    fetch("/api/user", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST"
    });

    // redirect to login
    router.push("/");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h1>Email: {user.email}</h1>
      <p>ID: {user.id}</p>

      <button
        onClick={handleLogout}
        className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}