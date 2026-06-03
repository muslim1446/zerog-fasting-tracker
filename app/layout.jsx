import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ZeroG - Fasting Tracker',
  description: 'A psychologically-driven fasting tracker powered by science.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} bg-neutral-950 text-white dark`}>
        {children}
      </body>
    </html>
  );
}
