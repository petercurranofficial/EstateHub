import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Manage Properties – EstateHub Admin' };

export default async function AdminProperties() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    redirect('/admin/signin');
  }

  const properties = await prisma.property.findMany({
    orderBy: { createdAt: 'desc' },
    include: { location: true },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Properties</h1>
        <Link
          href="/admin/properties/new"
          className="bg-primary text-white px-4 py-2 rounded hover:opacity-90"
        >
          + Add Property
        </Link>
      </div>
      <table className="w-full text-sm bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Featured</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p) => (
            <tr key={p.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{p.title}</td>
              <td className="p-3">{p.location.city}</td>
              <td className="p-3">{p.propertyType}</td>
              <td className="p-3">
                <span className={`px-2 py-0.5 rounded text-xs ${
                  p.status === 'available' ? 'bg-green-100 text-green-700' :
                  p.status === 'sold' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>{p.status}</span>
              </td>
              <td className="p-3">{p.featured ? '⭐' : '—'}</td>
              <td className="p-3 space-x-2">
                <Link
                  href={`/admin/properties/${p.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <form method="POST" action={`/api/properties/${p.id}`} className="inline">
                  <input type="hidden" name="_method" value="DELETE" />
                  <button type="submit" className="text-red-600 hover:underline">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
