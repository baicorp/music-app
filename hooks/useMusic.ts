"use client";

import { useContext } from "react";
import { CurrentMusicContext } from "@/context/MusicProvider";

export default function useMusic() {
  const currentMusics = useContext(CurrentMusicContext);
  if (currentMusics === undefined) {
    throw new Error("useMusic must be inside a musicProvider");
  }
  return currentMusics;
}
