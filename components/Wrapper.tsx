"use client";

import React, { ReactElement } from "react";
import { usePathname } from "next/navigation";
import useMusic from "@/hooks/useMusic";

export const path = ["/", "/search", "/about"];

export default function Wrapper({
  children,
}: {
  children: React.ReactNode | ReactElement[];
}) {
  const { trackData } = useMusic();
  const pathname = usePathname();

  return (
    <div
      className={`flex ${
        path.includes(pathname) && trackData
          ? "h-[calc(100%-105px)] md:h-[calc(100%-76px)]"
          : path.includes(pathname)
          ? "h-[calc(100%-40px)] md:h-full"
          : trackData
          ? "h-[calc(100%-65px)] md:h-[calc(100%-76px)]"
          : "h-full"
      } gap-2`}
    >
      {children}
    </div>
  );
}
