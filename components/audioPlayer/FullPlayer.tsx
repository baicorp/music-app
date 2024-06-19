"use client";
import React from "react";

export default function FullPlayer() {
  return (
    <div
      className={`absolute ${
        false ? "top-2" : "top-[1000px]"
      } left-2 right-2 bottom-2 bg-red-200 rounded-lg z-50 transition-all duration-200`}
    ></div>
  );
}
