"use client";

import React, { useContext } from "react";
import { AudioProviderContext } from "@/context/AudioProvider";

export default function useAudio() {
  const audioElement = useContext(AudioProviderContext);
  if (audioElement === undefined) {
    throw new Error("useAudioProvider must be used within an AudioProvider");
  }
  return audioElement;
}
