import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-gray-600">Sorry, the page you are looking for does not exist or has been moved.</p>
      <Link href="/" className="bg-primary text-white px-6 py-2 rounded hover:opacity-90 transition">
        Go Back Home
      </Link>
    </div>
  );
}
