import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueueList from "@/components/Queue";
import { BottomNav, SideNavbar } from "@/components/navigation";
import Wrapper from "../components/Wrapper";
import AudioPlayer from "@/components/audioPlayer/AudioPlayer";
import { Suspense } from "react";
import { MusicProvider, AudioProvider } from "@/context";
import FullPlayerMobile from "@/components/audioPlayer/FullPlayerMobile";

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
      <body className={`${inter.className} relative`}>
        <div className="flex flex-col h-dvh p-2 overflow-hidden relative">
          <MusicProvider>
            <AudioProvider>
              <Wrapper>
                <SideNavbar />
                {children}
                <QueueList />
              </Wrapper>
              <Suspense fallback={<p>loading...</p>}>
                <AudioPlayer />
              </Suspense>
              <Suspense fallback={<p>loading...</p>}>
                <FullPlayerMobile />
              </Suspense>
            </AudioProvider>
          </MusicProvider>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
