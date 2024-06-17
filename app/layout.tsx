import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MusicProvider from "@/context/MusicProvider";
import { QueueList } from "@/components/audioPlayer/Queue";
import { BottomNav, SideNavbar } from "@/components/navigation";
import Wrapper from "../components/Wrapper";
import AudioPlayer from "@/components/audioPlayer/AudioPlayer";

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
        <MusicProvider>
          <div className="flex flex-col h-dvh p-2 overflow-hidden">
            <Wrapper>
              <SideNavbar />
              {children}
              <QueueList />
            </Wrapper>
            <div>
              <AudioPlayer />
              <BottomNav />
            </div>
          </div>
        </MusicProvider>
      </body>
    </html>
  );
}
