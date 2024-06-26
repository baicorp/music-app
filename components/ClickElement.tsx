"use client";
import useMusic from "@/hooks/useMusic";
import { Artist, Song } from "@/types/song";
import React, { ReactElement } from "react";

type ClickElementProps = {
  children: ReactElement | ReactElement[];
  videoId: string;
  artists: Artist[];
  thumbnail: string[];
  title: string;
  listSong: Song[];
};

export default function ClickElement({
  children,
  videoId,
  artists,
  thumbnail,
  title,
  listSong,
}: ClickElementProps) {
  const { listTrackData, setListTrackData, setTrackData } = useMusic();

  async function handleClick() {
    setTrackData({
      videoId: videoId,
      artists: artists,
      title: title,
      thumbnail: [...thumbnail],
    });
    if (JSON.stringify(listTrackData) !== JSON.stringify(listSong)) {
      setListTrackData(listSong || []);
    }
  }

  return (
    <div onClick={() => handleClick()} className="cursor-pointer">
      {children}
    </div>
  );
}
