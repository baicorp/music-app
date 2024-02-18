"use client";

import React from "react";
import ClickElement from "../ClickElement";
import { SongCardProps } from "../card/SongCard";

export default function PlayFromTitle(props: SongCardProps) {
  return (
    <ClickElement
      artists={props.artists || []}
      listSong={props.listSong}
      thumbnail={props.thumbnail}
      title={props.title}
      videoId={props.videoId}
    >
      <p className="font-semibold text-white line-clamp-1">{props?.title}</p>
    </ClickElement>
  );
}
