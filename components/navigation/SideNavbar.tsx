"use client";
import React from "react";
import { About, Home, Search } from "@/components/svg";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideNavbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block py-3 lg:py-10 bg-secondary border border-secondary w-16 lg:w-56 xl:w-64 2xl:w-72 shrink-0 rounded-lg">
      <ul className="hidden md:flex flex-col px-2">
        <li>
          <Link
            href={"/"}
            className={`flex items-center justify-center lg:justify-normal gap-4 p-3 lg:px-5 lg:py-3 font-semibold hover:bg-[#1d1d1d] rounded-md ${
              pathname === "/" ? "bg-[#353535]" : ""
            }`}
            title="Home"
          >
            <Home active={pathname === "/"} />
            <span
              className={`${
                pathname !== "/" ? "text-[#6e6e6e]" : ""
              } hidden lg:block`}
            >
              Home
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/search"}
            className={`flex items-center justify-center lg:justify-normal gap-4 p-3 lg:px-5 lg:py-3 font-semibold hover:bg-[#1d1d1d] rounded-md ${
              pathname === "/search" ? "bg-[#353535]" : ""
            }`}
            title="Search"
          >
            <Search active={pathname === "/search"} />
            <span
              className={`${
                pathname !== "/search" ? "text-[#6e6e6e]" : ""
              } hidden lg:block`}
            >
              Search
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/about"}
            className={`flex items-center justify-center lg:justify-normal gap-4 p-3 lg:px-5 lg:py-3 font-semibold hover:bg-[#1d1d1d] rounded-md ${
              pathname === "/about" ? "bg-[#353535]" : ""
            }`}
            title="About"
          >
            <About active={pathname === "/about"} />
            <span
              className={`${
                pathname !== "/about" ? "text-[#6e6e6e]" : ""
              } hidden lg:block`}
            >
              About
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
