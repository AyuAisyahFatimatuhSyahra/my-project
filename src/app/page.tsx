import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Suitmedia Ideas</h1>
      <Link
        href="/ideas"
        className="inline-block bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
      >
        Go to Ideas Page
      </Link>
    </main>
  );
}