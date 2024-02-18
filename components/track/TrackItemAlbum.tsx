import { AlbumItem } from "@/types/album";
import { Artist, Song } from "@/types/song";
import React from "react";
import { PlayFromTitle } from "../shared";

type TrackItemAlbumProps = {
  videoId: string;
  index: string;
  title: string;
  duration?: string;
  artists: Artist[];
  plays?: string;
  thumbnail: string;
  listSong: Song[];
};

export default function TrackItemAlbum({
  videoId,
  index,
  title,
  artists,
  duration,
  plays,
  thumbnail,
  listSong,
}: TrackItemAlbumProps) {
  return (
    <div className="flex rounded-md">
      <p className="w-16 h-16 shrink-0 flex justify-center items-center text-sm font-semibold">
        {index}
      </p>
      <div className="grow flex flex-col justify-center px-4 overflow-hidden">
        <PlayFromTitle
          videoId={videoId}
          listSong={listSong}
          thumbnail={thumbnail}
          title={title}
          artists={artists}
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
