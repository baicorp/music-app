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
          ? "h-[calc(100%-134px)] md:h-[calc(100%-84px)]"
          : path.includes(pathname)
          ? "h-[calc(100%-58px)] md:h-full"
          : trackData
          ? "h-[calc(100%-84px)]"
          : "h-full"
      } gap-2`}
    >
      {children}
    </div>
  );
}
