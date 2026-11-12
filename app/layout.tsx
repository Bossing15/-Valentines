import type { Metadata } from "next";
import { Crimson_Text, Geist } from "next/font/google";
import "./globals.css";

const crimsonText = Crimson_Text({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-crimson",
  style: ["normal", "italic"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Five Years, Still Choosing You",
  description: "A love letter in website form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${crimsonText.variable} ${geist.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
