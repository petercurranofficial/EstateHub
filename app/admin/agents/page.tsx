'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AdminAgents() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', userId: '' });
  const [photo, setPhoto] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchAgents = async () => {
    setLoading(true);
    const res = await fetch('/api/agents');
    setAgents(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchAgents(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let photoUrl = '';
      if (photo) {
        const fd = new FormData();
        fd.append('file', photo);
        fd.append('propertyId', '0');
        const imgRes = await fetch('/api/images/upload', { method: 'POST', body: fd });
        const imgData = await imgRes.json();
        photoUrl = imgData.url;
      }
      await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, photoUrl }),
      });
      setShowForm(false);
      fetchAgents();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Agents</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-4 py-2 rounded">
          {showForm ? 'Cancel' : '+ Add Agent'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3 max-w-md">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="input w-full" />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="input w-full" />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="input w-full" />
          <input name="userId" type="number" placeholder="User ID" value={form.userId} onChange={handleChange} required className="input w-full" />
          <div>
            <label className="block text-sm font-medium mb-1">Profile Photo</label>
            <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] || null)} className="input w-full" />
          </div>
          <button type="submit" disabled={saving} className="bg-primary text-white px-4 py-2 rounded">
            {saving ? 'Saving...' : 'Save Agent'}
          </button>
        </form>
      )}

      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((a: any) => (
            <div key={a.id} className="bg-white rounded shadow p-4 flex items-center space-x-4">
              {a.photoUrl ? (
                <Image src={a.photoUrl} alt={a.name} width={60} height={60} className="rounded-full object-cover" />
              ) : (
                <div className="w-14 h-14 bg-gray-300 rounded-full" />
              )}
              <div>
                <p className="font-semibold">{a.name}</p>
                <p className="text-sm text-gray-600">{a.email}</p>
                <p className="text-sm text-gray-600">{a.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
