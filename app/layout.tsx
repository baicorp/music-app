import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AudioPlayer from "@/components/AudioPlayer";
import MusicProvider from "@/context/MusicProvider";
import Link from "next/link";

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
            <div className="flex justify-center items-center py-3 gap-10 bg-gray-800">
              <Link href={"/"} className="text-2xl" title="Home">
                🏠
              </Link>
              <Link href={"/search"} className="text-2xl" title="Search">
                🔍
              </Link>
            </div>
          </div>
          <div className="h-[164px]"></div>
        </MusicProvider>
      </body>
    </html>
  );
}
