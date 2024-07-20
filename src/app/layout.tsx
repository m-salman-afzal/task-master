import {Analytics} from "@vercel/analytics/react";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Inter} from "next/font/google";

import type {Metadata} from "next";

import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Task Master",
  description: "A todo list app"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="dark bg-[#1a1a2e] text-foreground min-h-screen flex flex-col">
          <header className="bg-[#2a2a4e] py-6 px-8 shadow-sm">
            <h1 className="text-3xl font-bold">Task Master</h1>
          </header>
          <main className="flex-1 py-8 px-8">
            <div className="max-w-md mx-auto grid gap-6">{children}</div>
          </main>
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
