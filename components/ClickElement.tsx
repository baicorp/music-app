"use client";
import useMusic from "@/hooks/useMusic";
import React, { ReactElement } from "react";

type ClickElementProps = {
  children: ReactElement | ReactElement[];
  id: string;
  artist: string;
  thumbnail: string;
  title: string;
};

export default function ClickElement({
  children,
  id,
  artist,
  thumbnail,
  title,
}: ClickElementProps) {
  const { setTrackData } = useMusic();

  return (
    <div
      onClick={() => {
        setTrackData({
          id: id,
          artist: artist,
          thumbnail: thumbnail,
          title: title,
        });
      }}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
}
