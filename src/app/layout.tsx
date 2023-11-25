import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ProtectedPage from "@/components/auth/ProtectedPage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coeus",
  description: "Upgrading education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProtectedPage />
        <main className="">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
