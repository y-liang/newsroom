import './styles.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import BookmarkProvider from '@/app/components/provider';
import { Metadata } from 'next';

const { SITE_NAME } = process.env;

export const metadata: Metadata = {
  title: 'News',
  robots: {
    follow: true,
    index: true
  }
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode; }) {
  return (
    <html lang='en'>
      <body className={'relative w-full h-full bg-white antialiased text-slate-600' + ' ' + inter.className}>
        <BookmarkProvider>
          {children}
        </BookmarkProvider>
      </body>
    </html>
  );
}
