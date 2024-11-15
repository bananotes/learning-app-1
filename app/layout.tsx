import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import TitleBar from '@/app/components/title-bar/TitleBar';
import { Toaster } from '@/app/components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
  title: 'Flipping World',
  description: 'Flipping World',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <SessionProvider>
          <TitleBar />
          <main className="flex-1">
            {children}
          </main>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
