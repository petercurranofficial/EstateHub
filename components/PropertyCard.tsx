import Link from 'next/link';
import Image from 'next/image';

export default function PropertyCard({ property }: { property: any }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <Link href={`/property/${property.slug}`}>
        <Image
          src={property.images?.[0]?.url || '/placeholder.png'}
          alt={property.title}
          width={400}
          height={250}
          className="object-cover w-full h-48"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">
          <Link href={`/property/${property.slug}`}>{property.title}</Link>
        </h3>
        <p className="text-sm text-gray-600 mb-2">{property.location.city}, {property.location.state}</p>
        <p className="text-primary font-bold mb-2">₹{property.price.toLocaleString()}</p>
        <div className="flex space-x-3 text-xs text-gray-500">
          <span>{property.bedrooms} BHK</span>
          <span>{property.bathrooms} Bath</span>
          <span>{property.builtUpArea || property.carpetArea} sqft</span>
        </div>
        <Link
          href={`/property/${property.slug}`}
          className="mt-3 inline-block text-primary hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
