import Link from 'next/link';
import { Building2, Home, TrendingUp, Users, MapPin, Phone } from 'lucide-react';
import prisma from '@/lib/prisma';
import PropertyCard from '@/components/PropertyCard';

export const metadata = {
  title: 'EstateHub – Find Your Perfect Property in India',
  description: 'Search thousands of properties for sale, rent, and commercial spaces across India.',
};

export default async function HomePage() {
  const featuredProperties = await prisma.property.findMany({
    where: { featured: true, status: 'available' },
    include: { images: true, location: true },
    take: 6,
  });

  const categories = [
    { label: 'Apartments', icon: Building2, href: '/buy?type=Apartment' },
    { label: 'Villas', icon: Home, href: '/buy?type=Villa' },
    { label: 'Independent Houses', icon: Home, href: '/buy?type=Independent House' },
    { label: 'Plots', icon: MapPin, href: '/buy?type=Plot' },
    { label: 'Commercial', icon: Building2, href: '/commercial' },
    { label: 'Office Spaces', icon: Building2, href: '/commercial?type=Office Space' },
  ];

  const locations = ['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Chennai', 'Pune'];

  const whyChooseUs = [
    { icon: TrendingUp, title: '15+ Years Experience', desc: 'Trusted by thousands of buyers and sellers across India.' },
    { icon: Building2, title: '10,000+ Properties', desc: 'Extensive database covering metro cities and emerging towns.' },
    { icon: Users, title: 'Expert Agents', desc: 'Dedicated professionals to guide you through every step.' },
    { icon: Phone, title: '24/7 Support', desc: 'We are always available to answer your questions.' },
  ];

  const testimonials = [
    { name: 'Priya Sharma', text: 'EstateHub made finding our dream home so easy. Excellent service!', city: 'Mumbai' },
    { name: 'Ravi Krishnan', text: 'We rented our commercial space within a week. Highly recommended.', city: 'Bangalore' },
    { name: 'Anita Desai', text: 'The agents were very professional and knowledgeable. Great experience.', city: 'Pune' },
  ];

  const steps = [
    { step: '01', title: 'Search Properties', desc: 'Use our powerful filters to find properties matching your budget and preferences.' },
    { step: '02', title: 'Visit & Evaluate', desc: 'Schedule visits with our agents and explore the properties in person.' },
    { step: '03', title: 'Close the Deal', desc: 'Our team assists you with documentation, negotiations, and final registration.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-primary to-blue-900 flex items-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 py-16 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Find Your Perfect Property
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Search thousands of verified properties across India. Buy, rent, or invest with confidence.
          </p>
          {/* Search tabs */}
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto text-left">
            <div className="flex space-x-1 mb-4">
              {['Buy', 'Rent', 'Commercial'].map((tab) => (
                <Link
                  key={tab}
                  href={tab === 'Buy' ? '/buy' : tab === 'Rent' ? '/rent' : '/commercial'}
                  className="px-6 py-2 rounded font-medium text-sm bg-primary text-white first:bg-primary"
                >
                  {tab}
                </Link>
              ))}
            </div>
            <form action="/buy" method="GET" className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input name="location" type="text" placeholder="Location (City or Area)" className="input text-gray-900" />
              <select name="type" className="input text-gray-900">
                <option value="">Property Type</option>
                {['Apartment', 'Villa', 'Independent House', 'Plot', 'Commercial', 'Office Space'].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <input name="minPrice" type="number" placeholder="Min Price (₹)" className="input text-gray-900" />
              <input name="maxPrice" type="number" placeholder="Max Price (₹)" className="input text-gray-900" />
              <button type="submit" className="md:col-span-4 bg-primary text-white py-3 rounded font-semibold hover:opacity-90 transition">
                Search Properties
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
          <p className="text-gray-600">Hand‑picked properties from our premium listings</p>
        </div>
        {featuredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        ) : (
          <p className="text-center text-gray-500">No featured properties yet. Add properties from the admin dashboard.</p>
        )}
        <div className="text-center mt-8">
          <Link href="/buy" className="bg-primary text-white px-8 py-3 rounded font-semibold hover:opacity-90 transition">
            Browse All Properties
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
            <p className="text-gray-600">Find the type of property that suits you best</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(({ label, icon: Icon, href }) => (
              <Link key={label} href={href} className="flex flex-col items-center bg-white rounded-xl p-5 shadow hover:shadow-md hover:text-primary transition text-center">
                <Icon size={32} className="text-primary mb-2" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Why Choose EstateHub?</h2>
          <p className="text-gray-600">We're committed to making your property journey seamless</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-6 border rounded-xl hover:shadow-md transition">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon size={28} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Locations */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Popular Cities</h2>
            <p className="text-gray-600">Explore properties in top real estate markets</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {locations.map((city) => (
              <Link key={city} href={`/buy?location=${city}`} className="bg-white rounded-xl p-4 text-center shadow hover:shadow-md hover:text-primary transition">
                <MapPin size={24} className="text-primary mx-auto mb-1" />
                <span className="font-medium text-sm">{city}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">How It Works</h2>
          <p className="text-gray-600">Your property journey in three simple steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ step, title, desc }) => (
            <div key={step} className="text-center">
              <div className="text-5xl font-bold text-primary/20 mb-3">{step}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, text, city }) => (
              <div key={name} className="bg-white/10 rounded-xl p-6 backdrop-blur">
                <p className="text-blue-100 mb-4 italic">"{text}"</p>
                <p className="font-semibold">{name}</p>
                <p className="text-sm text-blue-200">{city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Property?</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Contact our expert team today and let us help you find the perfect property in India.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/buy" className="bg-primary text-white px-8 py-3 rounded font-semibold hover:opacity-90 transition">
            Browse Properties
          </Link>
          <Link href="/contact" className="border border-primary text-primary px-8 py-3 rounded font-semibold hover:bg-primary hover:text-white transition">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
