'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from '../contexts/AuthContext';

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Bux IQ",
//   description: "Budget Tracking application",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <AuthProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    // </AuthProvider>
  );
}
