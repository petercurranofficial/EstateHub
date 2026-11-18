import './globals.css';
import { Inter } from 'next/font/google';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: { default: 'EstateHub – Find Your Perfect Property in India', template: '%s – EstateHub' },
  description: 'Find your perfect property in India. Buy, rent, or explore commercial spaces on EstateHub.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://estatehub.vercel.app',
    siteName: 'EstateHub',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <SessionProviderWrapper>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
