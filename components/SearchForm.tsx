import { useState } from 'react';

interface SearchFormProps {
  onSearch: (filters: Record<string, any>) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters: Record<string, any> = {};
    if (location) filters.location = location;
    if (type) filters.type = type;
    if (minPrice) filters.minPrice = Number(minPrice);
    if (maxPrice) filters.maxPrice = Number(maxPrice);
    if (bedrooms) filters.bedrooms = Number(bedrooms);
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 bg-white p-4 rounded shadow-md">
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="input"
      />
      <select value={type} onChange={(e) => setType(e.target.value)} className="input">
        <option value="">All Types</option>
        <option>Apartment</option>
        <option>Villa</option>
        <option>Independent House</option>
        <option>Plot</option>
        <option>Commercial</option>
        <option>Office Space</option>
      </select>
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Bedrooms"
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
        className="input"
      />
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded col-span-full md:col-span-1">
        Search
      </button>
    </form>
  );
}
