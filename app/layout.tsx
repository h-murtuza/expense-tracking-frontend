import type { Metadata } from "next";
import Providers from "@/lib/providers/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Team expense tracking and management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
