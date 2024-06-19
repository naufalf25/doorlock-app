import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Nav from '@/components/Nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Kunci Pintuku',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
