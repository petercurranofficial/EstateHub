import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const schema = z.object({
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().default('India'),
});

export async function GET() {
  const locations = await prisma.location.findMany({ orderBy: { city: 'asc' } });
  return NextResponse.json(locations);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const json = await request.json();
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data', details: parsed.error.format() }, { status: 400 });
  }
  const location = await prisma.location.create({ data: parsed.data });
  return NextResponse.json(location, { status: 201 });
}
