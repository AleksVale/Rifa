import "./globals.css";
import type { Metadata } from "next";

// google fonts
import { Inter } from "next/font/google";

// import bootstrap css file
import "bootstrap/dist/css/bootstrap.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
