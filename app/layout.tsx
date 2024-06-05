import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AudioPlayer from "@/components/audioPlayer/AudioPlayer";
import MusicProvider from "@/context/MusicProvider";
import Link from "next/link";
import ExtraDiv from "@/components/ExtraDiv";
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
          <div className="flex">
            <nav className="hidden sticky top-0 bottom-0 lg:block py-3 lg:py-10 bg-[#1c1e1f] w-56 xl:w-64 2xl:w-72 h-svh shrink-0">
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
            {children}
            {/* <ExtraDiv /> */}
            <QueueList />
            <div className="fixed z-10 bottom-0 right-0 left-0">
              <AudioPlayer />
              <div className="flex lg:hidden justify-center items-center py-3 gap-10 bg-[#1c1e1f]">
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
            </div>
          </div>
        </MusicProvider>
      </body>
    </html>
  );
}
