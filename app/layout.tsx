import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aman Srivastava',
  description:
    'Software engineer. RAG pipelines, financial data infrastructure, media bias detection. Rising senior at UMD, interning at IBM.',
  openGraph: {
    title: 'Aman Srivastava',
    description:
      'Software engineer. RAG pipelines, financial infrastructure, media bias detection.',
    url: 'https://amansrivastava.com',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Aman Srivastava',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} font-sans bg-white text-[#0A0A0A]`}
      >
        {children}
      </body>
    </html>
  );
}
