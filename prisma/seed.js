const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await hash(process.env.ADMIN_PASSWORD || 'Admin@123!', 12);
  const adminUser = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@estatehub.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@estatehub.com',
      passwordHash: hashedPassword,
      role: 'admin',
    },
  });
  console.log('Admin user created:', adminUser.email);

  // Create locations
  const locations = await Promise.all([
    prisma.location.upsert({ where: { id: 1 }, update: {}, create: { city: 'Mumbai', state: 'Maharashtra' } }),
    prisma.location.upsert({ where: { id: 2 }, update: {}, create: { city: 'Bangalore', state: 'Karnataka' } }),
    prisma.location.upsert({ where: { id: 3 }, update: {}, create: { city: 'Delhi', state: 'Delhi' } }),
    prisma.location.upsert({ where: { id: 4 }, update: {}, create: { city: 'Hyderabad', state: 'Telangana' } }),
    prisma.location.upsert({ where: { id: 5 }, update: {}, create: { city: 'Chennai', state: 'Tamil Nadu' } }),
    prisma.location.upsert({ where: { id: 6 }, update: {}, create: { city: 'Pune', state: 'Maharashtra' } }),
  ]);
  console.log(`${locations.length} locations created`);

  // Create amenities
  const amenityNames = ['Swimming Pool', 'Gym', 'Parking', 'Security', 'Lift', 'Power Backup', 'Garden', 'Club House'];
  for (const name of amenityNames) {
    await prisma.amenity.upsert({ where: { name }, update: {}, create: { name } });
  }
  console.log('Amenities created');

  // Create a sample agent
  const agentUser = await prisma.user.upsert({
    where: { email: 'agent@estatehub.com' },
    update: {},
    create: {
      email: 'agent@estatehub.com',
      passwordHash: await hash('Agent@123!', 12),
      role: 'agent',
    },
  });
  await prisma.agent.upsert({
    where: { userId: agentUser.id },
    update: {},
    create: {
      userId: agentUser.id,
      name: 'Rajesh Kumar',
      email: 'agent@estatehub.com',
      phone: '+91 98765 43210',
    },
  });
  console.log('Sample agent created');

  // Create sample properties
  const propertyData = [
    {
      title: 'Luxury 3 BHK Apartment in Bandra',
      slug: 'luxury-3-bhk-apartment-bandra-mumbai',
      description: 'A stunning 3 BHK apartment in the heart of Bandra, Mumbai with sea views.',
      price: 25000000,
      listingType: 'sale',
      propertyType: 'Apartment',
      bedrooms: 3,
      bathrooms: 3,
      builtUpArea: 1800,
      carpetArea: 1500,
      furnishing: 'Fully Furnished',
      status: 'available',
      featured: true,
      locationId: 1,
    },
    {
      title: 'Modern 2 BHK Flat for Rent in Koramangala',
      slug: 'modern-2bhk-flat-rent-koramangala-bangalore',
      description: 'Spacious 2 BHK flat in Koramangala with balcony and covered parking.',
      price: 35000,
      listingType: 'rent',
      propertyType: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      builtUpArea: 1100,
      carpetArea: 950,
      furnishing: 'Semi-Furnished',
      status: 'available',
      featured: false,
      locationId: 2,
    },
    {
      title: 'Premium Villa in Jubilee Hills',
      slug: 'premium-villa-jubilee-hills-hyderabad',
      description: 'Elegant 4 BHK villa in Jubilee Hills with private pool and garden.',
      price: 45000000,
      listingType: 'sale',
      propertyType: 'Villa',
      bedrooms: 4,
      bathrooms: 4,
      builtUpArea: 4000,
      carpetArea: 3500,
      furnishing: 'Unfurnished',
      status: 'available',
      featured: true,
      locationId: 4,
    },
  ];

  for (const data of propertyData) {
    await prisma.property.upsert({
      where: { slug: data.slug },
      update: {},
      create: data,
    });
  }
  console.log(`${propertyData.length} sample properties created`);

  // Sample blog post
  await prisma.blogPost.upsert({
    where: { slug: 'top-locations-to-invest-in-india-2026' },
    update: {},
    create: {
      title: 'Top Locations to Invest in Real Estate in India – 2026',
      slug: 'top-locations-to-invest-in-india-2026',
      excerpt: 'Discover the best cities and localities offering high returns for property investors in 2026.',
      content: '<p>India\'s real estate market continues to grow with Bangalore, Pune, and Hyderabad leading the way in residential and commercial investments.</p>',
      published: true,
    },
  });
  console.log('Sample blog post created');

  // Website settings
  const defaultSettings = [
    { key: 'companyName', value: 'EstateHub' },
    { key: 'contactEmail', value: 'info@estatehub.com' },
    { key: 'contactPhone', value: '+91 98000 00000' },
    { key: 'address', value: 'Mumbai, Maharashtra, India' },
    { key: 'footerText', value: '© 2026 EstateHub. All rights reserved.' },
  ];
  for (const s of defaultSettings) {
    await prisma.websiteSetting.upsert({ where: { key: s.key }, update: {}, create: s });
  }
  console.log('Website settings seeded');

  console.log('✅ Seeding complete!');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
