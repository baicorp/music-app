"use client";

import { Artist, Song } from "@/types/song";
import React, { ReactElement, ReactNode, createContext, useState } from "react";

export type MusicData = {
  videoId: string;
  title: string;
  thumbnail?: string;
  artists: Artist[];
};

type CurrentMusicContextValue = {
  trackData: MusicData | undefined;
  setTrackData: React.Dispatch<React.SetStateAction<MusicData | undefined>>;
  listTrackData: Song[] | undefined;
  setListTrackData: React.Dispatch<React.SetStateAction<Song[] | []>>;
};

export const CurrentMusicContext = createContext<
  CurrentMusicContextValue | undefined
>(undefined);

export default function MusicProvider({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode;
}) {
  const [trackData, setTrackData] = useState<MusicData | undefined>(undefined);
  const [listTrackData, setListTrackData] = useState<Song[] | []>([]);

  return (
    <CurrentMusicContext.Provider
      value={{ trackData, setTrackData, listTrackData, setListTrackData }}
    >
      {children}
    </CurrentMusicContext.Provider>
  );
}
