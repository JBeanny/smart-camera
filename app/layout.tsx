import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sloth Camera By Bean",
  description:
    "Smart Camera which sends the taken pictures to specific telegram channel",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc`}>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {children}
      </body>
    </html>
  );
}
