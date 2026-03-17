import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10">
      <h1>Home</h1>

      <Link href="/signup">Signup</Link>
      <br />
      <Link href="/login">Login</Link>
    </div>
  );
}