"use client";
import useMusic from "@/hooks/useMusic";
import React, { ReactElement } from "react";
import { usePathname } from "next/navigation";
import { TrackProps } from "@/app/research/searchResult";

type ClickElementProps = {
  children: ReactElement | ReactElement[];
  id: string;
  artist: string;
  thumbnail: string;
  title: string;
  trackList?: TrackProps[];
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
  const url = usePathname();

  function handleClick() {
    const arrUrl = url.split("/");
    if (arrUrl.includes("playlist") || arrUrl.includes("album")) {
      if (JSON.stringify(trackList) !== JSON.stringify(listTrackData)) {
        setListTrackData(trackList);
      }
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
