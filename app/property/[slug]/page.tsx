import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import EnquiryForm from '@/components/EnquiryForm';

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const property = await prisma.property.findUnique({
    where: { slug: params.slug },
    include: { location: true },
  });
  if (!property) return { title: 'Property Not Found' };
  return {
    title: `${property.title} – EstateHub`,
    description: property.description?.slice(0, 150) || 'Property details',
  };
};

export default async function PropertyDetail({ params }: { params: { slug: string } }) {
  const property = await prisma.property.findUnique({
    where: { slug: params.slug },
    include: { images: true, location: true, amenities: { include: { amenity: true } } },
  });
  if (!property) notFound();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{property.title}</h1>
      <p className="text-gray-600">{property.location.city}, {property.location.state}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image gallery */}
        <div className="grid grid-cols-2 gap-2">
          {property.images.map((img) => (
            <Image
              key={img.id}
              src={img.url}
              alt={property.title}
              width={400}
              height={300}
              className="object-cover"
            />
          ))}
        </div>
        {/* Details */}
        <div className="space-y-2">
          <p><strong>Price:</strong> ₹{property.price.toLocaleString()}</p>
          <p><strong>Type:</strong> {property.propertyType}</p>
          <p><strong>Listing:</strong> {property.listingType}</p>
          <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
          <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
          <p><strong>Area:</strong> {property.builtUpArea || property.carpetArea} sqft</p>
          <p><strong>Furnishing:</strong> {property.furnishing || 'N/A'}</p>
        </div>
      </div>
      {/* Amenities list */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Amenities</h2>
        <ul className="list-disc list-inside">
          {property.amenities.map((pa) => (
            <li key={pa.amenityId}>{pa.amenity.name}</li>
          ))}
        </ul>
      </div>
      {/* Enquiry form */}
      <EnquiryForm propertyId={property.id} />
    </div>
  );
}
