import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin Dashboard – EstateHub',
};

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    redirect('/admin/signin');
  }

  const [totalProperties, activeListings, soldProperties, rentedProperties, totalEnquiries] = await Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { status: 'available' } }),
    prisma.property.count({ where: { status: 'sold' } }),
    prisma.property.count({ where: { status: 'rented' } }),
    prisma.enquiry.count(),
  ]);

  const recentEnquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { property: { select: { title: true } } },
  });

  const recentProperties = await prisma.property.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { location: true },
  });

  const stats = [
    { label: 'Total Properties', value: totalProperties },
    { label: 'Active Listings', value: activeListings },
    { label: 'Sold', value: soldProperties },
    { label: 'Rented', value: rentedProperties },
    { label: 'Total Enquiries', value: totalEnquiries },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded shadow p-4 text-center">
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Enquiries */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Recent Enquiries</h2>
        <table className="w-full text-sm bg-white rounded shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Property</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentEnquiries.map((e) => (
              <tr key={e.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{e.name}</td>
                <td className="p-3">{e.property.title}</td>
                <td className="p-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{e.status}</span>
                </td>
                <td className="p-3">{new Date(e.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Recently Added Properties */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Recently Added Properties</h2>
        <table className="w-full text-sm bg-white rounded shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentProperties.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.location.city}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    p.status === 'available' ? 'bg-green-100 text-green-700' :
                    p.status === 'sold' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{p.status}</span>
                </td>
                <td className="p-3">{new Date(p.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
