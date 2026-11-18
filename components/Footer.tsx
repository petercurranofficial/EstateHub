import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">EstateHub</h3>
          <p className="text-sm">Your trusted partner for buying, renting, and investing in real estate across India.</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/buy" className="hover:underline">Buy</Link></li>
            <li><Link href="/rent" className="hover:underline">Rent</Link></li>
            <li><Link href="/commercial" className="hover:underline">Commercial</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Property Categories</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/buy?type=Apartment" className="hover:underline">Apartments</Link></li>
            <li><Link href="/buy?type=Villa" className="hover:underline">Villas</Link></li>
            <li><Link href="/buy?type=Independent%20House" className="hover:underline">Independent Houses</Link></li>
            <li><Link href="/buy?type=Plot" className="hover:underline">Plots</Link></li>
            <li><Link href="/commercial" className="hover:underline">Commercial</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Follow Us</h4>
          <div className="flex space-x-3">
            <a href="#" className="hover:text-primary"><Facebook size={20} /></a>
            <a href="#" className="hover:text-primary"><Twitter size={20} /></a>
            <a href="#" className="hover:text-primary"><Instagram size={20} /></a>
            <a href="#" className="hover:text-primary"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-xs">
        © {new Date().getFullYear()} EstateHub. All rights reserved.
      </div>
    </footer>
  );
}
