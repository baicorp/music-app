"use client";

import React from "react";
import Link from "next/link";
import { About, Home, Search } from "@/components/svg";
import { usePathname } from "next/navigation";
import { path } from "../Wrapper";

export default function BottomNav() {
  const pathname = usePathname();

  return path.includes(pathname) ? (
    <div className="flex md:hidden justify-evenly items-center pb-1 py-3 bg-[#1c1c1c] border-t-[1px] border-[#111] md:border-none">
      <Link href={"/"} className="text-2xl" title="Home">
        <Home active={pathname === "/"} />
      </Link>
      <Link href={"/search"} className="text-2xl" title="Search">
        <Search active={pathname === "/search"} />
      </Link>
      <Link href={"/about"} className="text-2xl" title="About">
        <About active={pathname === "/about"} />
      </Link>
    </div>
  ) : (
    ""
  );
}
