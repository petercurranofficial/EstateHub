import type { NextRequest } from 'next/server';

// Simple in‑memory rate limiter – suitable for demo / dev environments.
// Limits each IP to `MAX` requests per `WINDOW_MS`.
const MAX = 30;
const WINDOW_MS = 60 * 1000; // 1 minute

type Tracker = { count: number; firstSeen: number };
const trackers = new Map<string, Tracker>();

export function rateLimit(req: NextRequest): boolean {
  const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown';
  const now = Date.now();
  const entry = trackers.get(ip);
  if (!entry) {
    trackers.set(ip, { count: 1, firstSeen: now });
    return true;
  }
  if (now - entry.firstSeen > WINDOW_MS) {
    // reset window
    trackers.set(ip, { count: 1, firstSeen: now });
    return true;
  }
  if (entry.count >= MAX) {
    return false; // rate limit exceeded
  }
  entry.count += 1;
  return true;
}
