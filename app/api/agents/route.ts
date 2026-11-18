import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { z } from 'zod';

const agentSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  photoUrl: z.string().url().optional().or(z.literal('')),
  active: z.boolean().optional(),
  userId: z.coerce.number(),
});

export async function GET() {
  const agents = await prisma.agent.findMany({
    where: { active: true },
    include: { properties: { select: { id: true, title: true, slug: true } } },
  });
  return NextResponse.json(agents);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const json = await request.json();
  const parsed = agentSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data', details: parsed.error.format() }, { status: 400 });
  }
  const agent = await prisma.agent.create({ data: parsed.data });
  return NextResponse.json(agent, { status: 201 });
}
