import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOEX screener",
  description: "Screenes MOEX",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-gray-900">{children}</body>
    </html>
  );
}
