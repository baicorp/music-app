"use client";

import { useContext } from "react";
import { currentMusic } from "@/context/MusicProvider";

export default function useMusic() {
  const currentMusics = useContext(currentMusic);
  if (currentMusics === undefined) {
    throw new Error("useMusic must be inside a musicProvider");
  }
  return currentMusics;
}
