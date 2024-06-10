import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AudioPlayer from "@/components/audioPlayer/AudioPlayer";
import MusicProvider from "@/context/MusicProvider";
import Link from "next/link";
import { QueueList } from "@/components/audioPlayer/Queue";
import { Home, Search, Experiment } from "@/components/svg";

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
          <div className="flex flex-col gap-2 h-svh p-2 overflow-hidden">
            <div className="flex h-[calc(100%-84px)] gap-2">
              <SideNavbar />
              {children}
              <QueueList />
            </div>
            <div>
              <AudioPlayer />
            </div>
          </div>
        </MusicProvider>
      </body>
    </html>
  );
}

function SideNavbar() {
  return (
    <nav className="hidden lg:block py-3 lg:py-10 bg-[#232323] border border-[#343434] w-56 xl:w-64 2xl:w-72 shrink-0 rounded-lg">
      <ul className="hidden lg:flex flex-col gap-6 px-4">
        <li>
          <Link
            href={"/"}
            className={`text-lg flex items-center gap-2`}
            title="Home"
          >
            <Home />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/search"}
            className="text-lg flex items-center gap-2"
            title="Search"
          >
            <Search />
            <span>Search</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/research"}
            className="text-lg flex items-center gap-2"
            title="Research"
          >
            <Experiment />
            <span>Research</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function BottomNavbar() {
  return (
    <div className="flex lg:hidden justify-center items-center py-3 gap-10 bg-[#232323] border border-[#343434]">
      <Link href={"/"} className="text-2xl" title="Home">
        <Home />
      </Link>
      <Link href={"/search"} className="text-2xl" title="Search">
        <Search />
      </Link>
      <Link href={"/research"} className="text-2xl" title="Research">
        <Experiment />
      </Link>
    </div>
  );
}
