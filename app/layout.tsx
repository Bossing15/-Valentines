import type { Metadata } from "next";
import { Crimson_Text } from "next/font/google";
import "./globals.css";

const crimsonText = Crimson_Text({
  weight: ['400', '600'],
  subsets: ["latin"],
  variable: "--font-crimson",
  style: ['normal', 'italic']
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
      <body className={`${crimsonText.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
