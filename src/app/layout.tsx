import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import ThemeLayout from "@/components/ThemeLayout";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Vaibhav Gala | System Developer",
  description: "Portfolio of Vaibhav Gala - Building scalable systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${firaCode.variable} font-mono antialiased min-h-screen selection:bg-primary selection:text-black`}>
        <ThemeLayout>{children}</ThemeLayout>
      </body>
    </html>
  );
}