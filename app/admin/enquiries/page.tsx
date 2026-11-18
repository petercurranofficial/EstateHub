'use client';
import { useEffect, useState } from 'react';

const STATUSES = ['New', 'Contacted', 'Follow-up', 'Interested', 'Converted', 'Closed'];

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    const res = await fetch('/api/enquiries');
    const data = await res.json();
    setEnquiries(data);
    setLoading(false);
  };

  useEffect(() => { fetchEnquiries(); }, []);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchEnquiries();
  };

  const deleteEnquiry = async (id: number) => {
    if (!confirm('Delete this enquiry?')) return;
    await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
    fetchEnquiries();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Manage Enquiries</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-sm bg-white rounded shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Property</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((e: any) => (
              <tr key={e.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{e.name}</td>
                <td className="p-3">{e.email}</td>
                <td className="p-3">{e.property?.title || 'General'}</td>
                <td className="p-3">
                  <select
                    value={e.status}
                    onChange={(ev) => updateStatus(e.id, ev.target.value)}
                    className="border rounded px-2 py-1 text-xs"
                  >
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td className="p-3">{new Date(e.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  <button onClick={() => deleteEnquiry(e.id)} className="text-red-600 hover:underline text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
