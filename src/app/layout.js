import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  applicationName: 'Kunci Pintuku App',
  title: 'Kunci Pintuku App',
  description: 'Aplikasi website kunci pintu ESP32',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Kunci Pintuku App',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: '#2E236C',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
