"use client";

import React, { ReactElement, ReactNode, createContext, useState } from "react";

type CurrentMusicContextValue = {
  id: string | null;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
};

export const currentMusic = createContext<CurrentMusicContextValue | undefined>(
  undefined
);

export default function MusicProvider({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode;
}) {
  const [id, setId] = useState<string | null>(null);
  return (
    <currentMusic.Provider value={{ id, setId }}>
      {children}
    </currentMusic.Provider>
  );
}
