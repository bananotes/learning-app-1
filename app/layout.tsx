import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import './globals.css';


export const metadata: Metadata = {
  title: 'Learning Demo App',
  description: 'save your mid-term grade',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
