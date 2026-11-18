import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Query schema for filters
const querySchema = z.object({
  location: z.string().optional(),
  type: z.string().optional(),
  listing: z.enum(['sale', 'rent']).optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
});

// Body schema for creating a property (admin only)
const createSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.coerce.number(),
  listingType: z.enum(['sale', 'rent']),
  propertyType: z.string(),
  bedrooms: z.coerce.number(),
  bathrooms: z.coerce.number(),
  builtUpArea: z.coerce.number().optional(),
  carpetArea: z.coerce.number().optional(),
  furnishing: z.string().optional(),
  status: z.string().optional(),
  locationId: z.coerce.number(),
  agentId: z.coerce.number().optional(),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse(Object.fromEntries(url.searchParams));
  const where: any = {};
  if (parsed.success) {
    const q = parsed.data;
    if (q.location) where.location = { city: { contains: q.location, mode: 'insensitive' } };
    if (q.type) where.propertyType = q.type;
    if (q.listing) where.listingType = q.listing;
    if (q.minPrice) where.price = { gte: q.minPrice };
    if (q.maxPrice) where.price = { ...(where.price || {}), lte: q.maxPrice };
    if (q.bedrooms) where.bedrooms = q.bedrooms;
    if (q.bathrooms) where.bathrooms = q.bathrooms;
  }
  const properties = await prisma.property.findMany({
    where,
    include: { images: true, location: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(properties);
}

export async function POST(request: Request) {
  // In a real app, verify admin session here
  const json = await request.json();
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data', details: parsed.error.format() }, { status: 400 });
  }
  const data = parsed.data;
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const property = await prisma.property.create({
    data: {
      ...data,
      slug,
    },
  });
  return NextResponse.json(property, { status: 201 });
}
