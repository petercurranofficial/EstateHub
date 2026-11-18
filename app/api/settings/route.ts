import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  const settings = await prisma.websiteSetting.findMany();
  // Convert array to key/value map
  const result = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const json = await request.json() as Record<string, string>;
  // Upsert each key/value pair
  const updates = Object.entries(json).map(([key, value]) =>
    prisma.websiteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
  );
  await Promise.all(updates);
  return NextResponse.json({ success: true });
}
