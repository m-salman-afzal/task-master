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
          {children}
        </div>
      </body>
    </html>
  );
}
