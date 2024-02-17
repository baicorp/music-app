import { AlbumItem } from "@/types/album";
import React from "react";

type TrackItemAlbumProps = {
  index: string;
  title: string;
  duration?: string;
  plays?: string;
};

export default function TrackItemAlbum({
  index,
  title,
  duration,
  plays,
}: TrackItemAlbumProps) {
  return (
    <div className="flex rounded-md">
      <p className="w-16 h-16 shrink-0 flex justify-center items-center text-sm font-semibold">
        {index}
      </p>
      <div className="grow flex flex-col justify-center px-4 overflow-hidden">
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
