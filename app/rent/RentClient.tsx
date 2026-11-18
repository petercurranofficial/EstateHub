'use client';
import { useEffect, useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import SearchForm from '@/components/SearchForm';

export default function RentClient() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProperties = async (params = {}) => {
    setLoading(true);
    const qs = new URLSearchParams(params as any).toString();
    const res = await fetch(`/api/properties?${qs}`);
    const data = await res.json();
    setProperties(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties({ listing: 'rent' });
  }, []);

  const handleSearch = (filters: any) => {
    fetchProperties({ listing: 'rent', ...filters });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Properties for Rent</h1>
      <SearchForm onSearch={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
