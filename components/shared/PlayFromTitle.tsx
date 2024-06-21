"use client";

import React from "react";
import ClickElement from "../ClickElement";
import { Artist, Song } from "@/types/song";

type playFromTitleProps = {
  variant: "default" | "queue";
  artists: Artist[] | [];
  listSong: Song[] | [];
  thumbnail: string[];
  title: string;
  videoId: string;
};

export default function PlayFromTitle(props: playFromTitleProps) {
  return (
    <ClickElement
      artists={props.artists || []}
      listSong={props.listSong}
      thumbnail={[...props.thumbnail]}
      title={props.title}
      videoId={props.videoId}
    >
      <p
        className={`font-semibold text-white line-clamp-1 ${
          props.variant === "queue" ? "text-sm lg:text-base" : ""
        }`}
      >
        {props?.title}
      </p>
    </ClickElement>
  );
}
