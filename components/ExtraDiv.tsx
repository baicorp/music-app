"use client";
import useMusic from "@/hooks/useMusic";
import React from "react";

export default function ExtraDiv() {
  const { id } = useMusic();
  return (
    <div className={`h-[130px] lg:h-[86px] ${id ? "block" : "hidden"}`}></div>
  );
}
