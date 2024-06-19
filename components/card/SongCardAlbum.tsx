import { Artist, Song } from "@/types/song";
import React from "react";
import { PlayFromTitle, SongImage } from "../shared";

type SongCardPropsAlbum = {
  index: string;
  videoId: string;
  thumbnail: string;
  title: string;
  artists: Artist[];
  duration?: string;
  plays?: string;
  views?: string;
  listSong: Song[];
};

export default function SongCardAlbum({
  index,
  videoId,
  thumbnail,
  title,
  artists,
  duration,
  plays,
  listSong,
}: SongCardPropsAlbum) {
  return (
    <div className="flex rounded-md">
      <SongImage
        videoId={videoId}
        title={title}
        thumbnail={thumbnail}
        variant="album"
        index={index}
      />
      <div className="grow flex flex-col justify-center px-4 overflow-hidden">
        <PlayFromTitle
          videoId={videoId}
          title={title}
          thumbnail={thumbnail}
          artists={artists}
          listSong={listSong}
          variant="default"
        />
        <div className="flex items-center">
          <p className="text-xs font-semibold text-gray-400">{plays}</p>
          <span>・</span>
          <p className="text-xs font-semibold text-gray-400">{duration}</p>
        </div>
      </div>
    </div>
  );
}
