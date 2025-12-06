import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { SoundProvider } from "@/context/SoundContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GuiBackground from "@/components/GuiBackground";
import CursorAura from "@/components/CursorAura";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Vaibhav Gala | System Developer",
  description: "Personal Portfolio of Vaibhav Gala - Linux Terminal Edition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaCode.variable} font-mono antialiased bg-[#0d1117] min-h-screen text-gray-300 selection:bg-gray-800 selection:text-white`}
      >
        <ThemeProvider>
          <SoundProvider>
            <CursorAura />
            <GuiBackground />
            <Navbar />
            <main className="pt-16 min-h-screen flex flex-col relative z-0">
              {children}
            </main>
            <Footer />
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
