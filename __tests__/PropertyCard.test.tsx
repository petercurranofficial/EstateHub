import { render, screen } from '@testing-library/react';
import PropertyCard from '@/components/PropertyCard';

const mockProperty = {
  id: 1,
  slug: 'luxury-3bhk-apartment-bangalore',
  title: 'Luxury 3 BHK Apartment',
  price: 7500000,
  bedrooms: 3,
  bathrooms: 2,
  builtUpArea: 1500,
  carpetArea: null,
  propertyType: 'Apartment',
  location: { city: 'Bangalore', state: 'Karnataka' },
  images: [{ id: 1, url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg', publicId: 'sample' }],
};

describe('PropertyCard', () => {
  it('renders the property title', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText('Luxury 3 BHK Apartment')).toBeInTheDocument();
  });

  it('shows the city', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText(/Bangalore/)).toBeInTheDocument();
  });

  it('renders the View Details link with correct href', () => {
    render(<PropertyCard property={mockProperty} />);
    const links = screen.getAllByRole('link');
    const detailLink = links.find((l) =>
      l.getAttribute('href')?.includes('luxury-3bhk-apartment-bangalore')
    );
    expect(detailLink).toBeDefined();
  });

  it('shows bedroom and bathroom counts', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText(/3 BHK/)).toBeInTheDocument();
    expect(screen.getByText(/2 Bath/)).toBeInTheDocument();
  });
});
