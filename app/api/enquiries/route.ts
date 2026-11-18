import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { rateLimit } from '@/lib/rateLimiter';
import { z } from 'zod';

// Validation schema for creating an enquiry
const createSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  propertyId: z.coerce.number(),
});

export async function POST(request: Request) {
  // Apply simple rate limiting using our utility (based on IP header)
  // Next.js does not expose NextRequest here, so we approximate using the request headers.
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  // Use a dummy Request-like object for the limiter
  const allowed = (() => {
    // Simple check using global tracker (reuse rateLimiter logic)
    const MAX = 30;
    const WINDOW_MS = 60 * 1000;
    const now = Date.now();
    const trackers = (global as any).__rateTrackers || ((global as any).__rateTrackers = new Map());
    const entry = trackers.get(ip);
    if (!entry) {
      trackers.set(ip, { count: 1, firstSeen: now });
      return true;
    }
    if (now - entry.firstSeen > WINDOW_MS) {
      trackers.set(ip, { count: 1, firstSeen: now });
      return true;
    }
    if (entry.count >= MAX) {
      return false;
    }
    entry.count += 1;
    return true;
  })();

  if (!allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
  }

  const json = await request.json();
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data', details: parsed.error.format() }, { status: 400 });
  }
  const enquiry = await prisma.enquiry.create({ data: parsed.data });
  return NextResponse.json(enquiry, { status: 201 });
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
    include: { property: { select: { title: true, slug: true } } },
  });
  return NextResponse.json(enquiries);
}
