"use client";

import React, { ReactElement, ReactNode, createContext, useState } from "react";

type MusicData = {
  id: string;
  title: string;
  thumbnail: string;
  artist: string;
};

type CurrentMusicContextValue = {
  trackData: MusicData | undefined;
  setTrackData: (data: MusicData) => void;
};
// export const currentMusic = createContext<CurrentMusicContextValue|undefined>(undefined);

// export default function MusicProvider({
//   children,
// }: {
//   children: ReactElement | ReactElement[] | ReactNode;
// }) {
//   const [trackData, setTrackData] = useState<MusicData | undefined>(undefined);

//   function handleSetTrackData(data: MusicData) {
//     setTrackData(data);
//   }

//   return (
//     <currentMusic.Provider value={{trackData , handleSetTrackData }}>
//       {children}
//     </currentMusic.Provider>
//   );
// }

export const CurrentMusicContext = createContext<
  CurrentMusicContextValue | undefined
>(undefined);

export default function MusicProvider({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode;
}) {
  const [trackData, setTrackData] = useState<MusicData | undefined>(undefined);

  function handleSetTrackData(data: MusicData) {
    setTrackData(data);
  }

  return (
    <CurrentMusicContext.Provider value={{ trackData, setTrackData }}>
      {children}
    </CurrentMusicContext.Provider>
  );
}
