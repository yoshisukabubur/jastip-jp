import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createClient } from "@/lib/supabase/server";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JastipJP — Papan titip Jepang ↔ Indonesia",
  description:
    "掲示板で日本とインドネシアの代行をつなぐ。Wants（欲しいもの）と Offers（買えます）を無料で投稿。",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let email: string | null = null;
  let signedIn = false;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    signedIn = Boolean(user);
    email = user?.email ?? null;
  } catch {
    // Missing Supabase env during local tooling; header falls back to signed-out.
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <SiteHeader email={email} signedIn={signedIn} />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
