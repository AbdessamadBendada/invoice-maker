import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InvoicePro | Free Professional Invoice Generator",
  description: "Generate professional PDF invoices for free. Your data never leaves your browser. Privacy-first, no account required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased selection:bg-blue-100 selection:text-blue-700`}>
        {children}
      </body>
    </html>
  );
}