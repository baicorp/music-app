"use client";
import useMusic from "@/hooks/useMusic";
import React, { ReactElement } from "react";
import { TrackProps } from "@/app/research/searchResult";

type ClickElementProps = {
  children: ReactElement | ReactElement[];
  id: string;
  artist: string;
  thumbnail: string;
  title: string;
  trackList: TrackProps[] | [];
};

export default function ClickElement({
  children,
  id,
  artist,
  thumbnail,
  title,
  trackList,
}: ClickElementProps) {
  const { listTrackData, setListTrackData, setTrackData } = useMusic();

  function handleClick() {
    if (JSON.stringify(listTrackData) !== JSON.stringify(trackList)) {
      setListTrackData(trackList);
    }
    setTrackData({
      videoId: id,
      artist: artist,
      title: title,
      thumbnail: thumbnail,
    });
  }

  return (
    <div onClick={() => handleClick()} className="cursor-pointer">
      {children}
    </div>
  );
}
