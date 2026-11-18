'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPropertyPage() {
  const router = useRouter();
  const [locations, setLocations] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: '', description: '', price: '', listingType: 'sale',
    propertyType: 'Apartment', bedrooms: '', bathrooms: '',
    builtUpArea: '', carpetArea: '', furnishing: '', status: 'available',
    featured: false, locationId: '', agentId: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/locations').then(r => r.json()).then(setLocations);
    fetch('/api/agents').then(r => r.json()).then(setAgents);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setForm({ ...form, [target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Create property
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to create property');
      const created = await res.json();

      // Upload images
      for (const file of images) {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('propertyId', String(created.id));
        await fetch('/api/images/upload', { method: 'POST', body: fd });
      }

      router.push('/admin/properties');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Add New Property</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="input w-full" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="input w-full" rows={4} />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required className="input w-full" />

        <select name="listingType" value={form.listingType} onChange={handleChange} className="input w-full">
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>

        <select name="propertyType" value={form.propertyType} onChange={handleChange} className="input w-full">
          {['Apartment', 'Villa', 'Independent House', 'Plot', 'Commercial', 'Office Space'].map(t => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-2">
          <input name="bedrooms" type="number" placeholder="Bedrooms" value={form.bedrooms} onChange={handleChange} className="input" />
          <input name="bathrooms" type="number" placeholder="Bathrooms" value={form.bathrooms} onChange={handleChange} className="input" />
          <input name="builtUpArea" type="number" placeholder="Built-up Area (sqft)" value={form.builtUpArea} onChange={handleChange} className="input" />
          <input name="carpetArea" type="number" placeholder="Carpet Area (sqft)" value={form.carpetArea} onChange={handleChange} className="input" />
        </div>

        <input name="furnishing" placeholder="Furnishing (e.g. Furnished)" value={form.furnishing} onChange={handleChange} className="input w-full" />

        <select name="status" value={form.status} onChange={handleChange} className="input w-full">
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="rented">Rented</option>
        </select>

        <select name="locationId" value={form.locationId} onChange={handleChange} required className="input w-full">
          <option value="">Select Location</option>
          {locations.map((l) => (
            <option key={l.id} value={l.id}>{l.city}, {l.state}</option>
          ))}
        </select>

        <select name="agentId" value={form.agentId} onChange={handleChange} className="input w-full">
          <option value="">Assign Agent (optional)</option>
          {agents.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>

        <label className="flex items-center space-x-2">
          <input name="featured" type="checkbox" checked={form.featured} onChange={handleChange} />
          <span>Mark as Featured</span>
        </label>

        <div>
          <label className="block text-sm font-medium mb-1">Property Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(Array.from(e.target.files || []))}
            className="input w-full"
          />
        </div>

        <button type="submit" disabled={loading} className="bg-primary text-white px-6 py-2 rounded">
          {loading ? 'Saving...' : 'Save Property'}
        </button>
      </form>
    </div>
  );
}
