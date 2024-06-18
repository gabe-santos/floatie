import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Fraunces } from 'next/font/google';

const geist = localFont({
  src: '../../public/fonts/Geist-Variable.woff2',
  display: 'swap',
  variable: '--font-geist',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
});

import './globals.css';

export const metadata: Metadata = {
  title: 'Floatie',
  description:
    'A KISS-compliant day planner designed to help you get into flow.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${geist.variable} ${fraunces.variable}`}>
      <body className=''>{children}</body>
    </html>
  );
}
