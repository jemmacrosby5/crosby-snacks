import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Crosby Snacks',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${jakarta.variable} ${inter.variable} antialiased m-0 p-0 flex flex-col min-h-screen`}
        >
          <Header />
          <main className="flex-1 bg-linear-to-br from-secondary-green via-slate-100 to-primary-blue p-4 md:p-8 lg:p-16">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
