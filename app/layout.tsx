import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AudioPlayer from "@/components/AudioPlayer";
import MusicProvider from "@/context/MusicProvider";
import Link from "next/link";
import ExtraDiv from "@/components/ExtraDiv";

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
            <div className="hidden sticky top-0 lg:block py-3 lg:py-10 bg-gray-950 w-56 xl:w-64 2xl:w-72 h-svh shrink-0">
              <ul className="hidden lg:flex flex-col gap-6 px-4">
                <li>
                  <Link
                    href={"/"}
                    className={`text-lg flex items-center gap-2`}
                    title="Home"
                  >
                    <span>🏠</span>
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/search"}
                    className="text-lg flex items-center gap-2"
                    title="Search"
                  >
                    <span>🔍</span>
                    <span>Search</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/research"}
                    className="text-lg flex items-center gap-2"
                    title="Research"
                  >
                    <span>🥼</span>
                    <span>Research</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="overflow-hidden grow">
              {children}
              <ExtraDiv />
            </div>
            <div className="fixed z-10 bottom-0 right-0 left-0">
              <AudioPlayer />
              <div className="flex lg:hidden justify-center items-center py-3 gap-10 bg-gray-800">
                <Link href={"/"} className="text-2xl" title="Home">
                  🏠
                </Link>
                <Link href={"/search"} className="text-2xl" title="Search">
                  🔍
                </Link>
                <Link href={"/research"} className="text-2xl" title="Research">
                  🥼
                </Link>
              </div>
            </div>
          </div>
        </MusicProvider>
      </body>
    </html>
  );
}
