"use client";

import { TrackProps } from "@/app/research/searchResult";
import React, { ReactElement, ReactNode, createContext, useState } from "react";

export type MusicData = {
  videoId: string;
  title: string;
  thumbnail: string;
  artist: string;
};

type CurrentMusicContextValue = {
  trackData: MusicData | undefined;
  setTrackData: React.Dispatch<React.SetStateAction<MusicData | undefined>>;
  listTrackData: TrackProps[] | undefined;
  setListTrackData: React.Dispatch<React.SetStateAction<TrackProps[] | []>>;
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
  const [listTrackData, setListTrackData] = useState<TrackProps[] | []>([]);

  return (
    <CurrentMusicContext.Provider
      value={{ trackData, setTrackData, listTrackData, setListTrackData }}
    >
      {children}
    </CurrentMusicContext.Provider>
  );
}
