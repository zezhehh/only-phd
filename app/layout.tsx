import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Only PhD 独博网",
  description:
    "Explore, Click, Connect: Only-PhD, Your Window to Global PhD Opportunities. 探索、点击、连接：独博网，您通往全球博士机会的窗口。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
