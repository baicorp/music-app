"use client";

import { Song } from "@/types/song";
import React, { ReactElement, ReactNode, createContext, useState } from "react";

type CurrentMusicContextValue = {
  trackData: Song | undefined;
  setTrackData: React.Dispatch<React.SetStateAction<Song | undefined>>;
  listTrackData: Song[] | undefined;
  setListTrackData: React.Dispatch<React.SetStateAction<Song[] | []>>;
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPlayerOpen: boolean;
  setPlayerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CurrentMusicContext = createContext<
  CurrentMusicContextValue | undefined
>(undefined);

export default function MusicProvider({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode;
}) {
  const [trackData, setTrackData] = useState<Song | undefined>(undefined);
  const [listTrackData, setListTrackData] = useState<Song[] | []>([]);
  const [isListOpen, setIsListOpen] = useState(false);
  const [isPlayerOpen, setPlayerOpen] = useState(false);

  return (
    <CurrentMusicContext.Provider
      value={{
        trackData,
        setTrackData,
        listTrackData,
        setListTrackData,
        isListOpen,
        setIsListOpen,
        isPlayerOpen,
        setPlayerOpen,
      }}
    >
      {children}
    </CurrentMusicContext.Provider>
  );
}
