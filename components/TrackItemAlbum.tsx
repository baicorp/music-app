import React from "react";

type TrackItemAlbumProps = {
  trackId: string;
  order: number;
  title: string;
  artistName: string;
  duration: string;
};

export default function TrackItemAlbum({
  trackId,
  order,
  title,
  artistName,
  duration,
}: TrackItemAlbumProps) {
  return (
    <div className="flex">
      <p className="w-14 h-14 shrink-0 flex justify-center items-center text-sm font-semibold">
        {order + 1}
      </p>
      <div className="grow flex flex-col justify-end px-4 overflow-hidden">
        <p className="font-semibold text-white line-clamp-1">{title}</p>
        <div className="flex items-center">
          <p className="text-xs font-semibold text-gray-400 line-clamp-1">
            {artistName}
          </p>
          <span>・</span>
          <p className="text-xs font-semibold text-gray-400">{duration}</p>
        </div>
      </div>
    </div>
  );
}
