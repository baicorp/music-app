import { AlbumItem } from "@/types/album";
import React from "react";

export default function TrackItemAlbum({
  videoId,
  index,
  title,
  duration,
  plays,
}: AlbumItem) {
  return (
    <div className="flex">
      <p className="w-14 h-14 shrink-0 flex justify-center items-center text-sm font-semibold">
        {index}
      </p>
      <div className="grow flex flex-col justify-end px-4 overflow-hidden">
        <p className="font-semibold text-white line-clamp-1">{title}</p>
        <div className="flex items-center">
          <p className="text-xs font-semibold text-gray-400">{plays}</p>
          <span>・</span>
          <p className="text-xs font-semibold text-gray-400">{duration}</p>
        </div>
      </div>
    </div>
  );
}
