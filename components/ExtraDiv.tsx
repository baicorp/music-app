"use client";
import useMusic from "@/hooks/useMusic";
import React from "react";

export default function ExtraDiv() {
  const { trackData } = useMusic();
  return (
    <div
      className={`h-[130px] lg:h-[86px] ${trackData ? "block" : "hidden"}`}
    ></div>
  );
}
