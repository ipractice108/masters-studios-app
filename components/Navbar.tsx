import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold">
          Masters & Studios
        </Link>
        <div className="space-x-4">
          <Link href="/instructor" className="text-gray-600 hover:text-gray-900">
            Преподавателям
          </Link>
          <Link href="/studio" className="text-gray-600 hover:text-gray-900">
            Студиям
          </Link>
        </div>
      </div>
    </nav>
  );
}