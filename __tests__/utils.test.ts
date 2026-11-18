// Tests for utility functions

// --- Slug generation (same logic used in property creation) ---
function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

describe('generateSlug', () => {
  it('converts title to lowercase with hyphens', () => {
    expect(generateSlug('Luxury 3 BHK Apartment')).toBe('luxury-3-bhk-apartment');
  });

  it('strips special characters', () => {
    expect(generateSlug('Villa @ Mumbai!')).toBe('villa-mumbai');
  });

  it('removes leading and trailing hyphens', () => {
    expect(generateSlug(' --flat-- ')).toBe('flat');
  });
});

// --- Rate limiter logic ---
function makeRateLimiter(max: number, windowMs: number) {
  const trackers = new Map<string, { count: number; firstSeen: number }>();
  return function allow(ip: string, now: number): boolean {
    const entry = trackers.get(ip);
    if (!entry) { trackers.set(ip, { count: 1, firstSeen: now }); return true; }
    if (now - entry.firstSeen > windowMs) { trackers.set(ip, { count: 1, firstSeen: now }); return true; }
    if (entry.count >= max) return false;
    entry.count += 1;
    return true;
  };
}

describe('rateLimiter', () => {
  it('allows requests under the limit', () => {
    const allow = makeRateLimiter(3, 60000);
    expect(allow('1.2.3.4', Date.now())).toBe(true);
    expect(allow('1.2.3.4', Date.now())).toBe(true);
    expect(allow('1.2.3.4', Date.now())).toBe(true);
  });

  it('blocks requests over the limit', () => {
    const allow = makeRateLimiter(2, 60000);
    allow('5.6.7.8', 1000);
    allow('5.6.7.8', 1000);
    expect(allow('5.6.7.8', 1000)).toBe(false);
  });

  it('resets after the window expires', () => {
    const allow = makeRateLimiter(2, 1000);
    allow('9.9.9.9', 0);
    allow('9.9.9.9', 0);
    // Window expired
    expect(allow('9.9.9.9', 2000)).toBe(true);
  });
});
