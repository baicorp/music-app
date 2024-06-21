"use client";

import React, { ReactElement, createContext, useState } from "react";

type GlobalContextValue = {
  isQueueOpen: boolean;
  setIsQueueOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFullPlayer: boolean;
  setFullPlayer: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GlobalContext = createContext<GlobalContextValue | undefined>(
  undefined
);

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode | ReactElement | ReactElement[];
}) {
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isFullPlayer, setFullPlayer] = useState(false);
  return (
    <GlobalContext.Provider
      value={{ isQueueOpen, isFullPlayer, setIsQueueOpen, setFullPlayer }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
