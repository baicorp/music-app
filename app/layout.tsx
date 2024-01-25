import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AudioPlayer from "@/components/AudioPlayer";
import MusicProvider from "@/context/MusicProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Experimental Music App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`relative ${inter.className}`}>
        <MusicProvider>
          {children}
          <div className="fixed z-30 bottom-0 w-full">
            <AudioPlayer />
          </div>
        </MusicProvider>
      </body>
    </html>
  );
}
