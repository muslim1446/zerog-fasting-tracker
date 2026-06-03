import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
export const metadata = {
title: 'ZeroG - Scientific Fasting',
description: 'A psychologically-driven, scientifically-calibrated fasting tracker.',
};
export default function RootLayout({ children }) {
return (
<html lang="en">
<head>
<meta charSet="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body className={`${inter.className} bg-neutral-950 text-white antialiased`}>
{children}
</body>
</html>
);
}