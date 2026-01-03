import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Artemis Development",
  description: "Build Something Amazing - A modern platform for web development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
