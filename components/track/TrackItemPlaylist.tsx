import React from "react";
import { Artist } from "@/types/song";
import { Artists } from "@/components/shared";

type TrackItemPlaylistProps = {
  thumbnail: string;
  title: string;
  artists?: Artist[];
  duration?: string;
  plays?: string;
  views?: string;
};

export default function TrackItemPlaylist({
  thumbnail,
  title,
  artists,
  duration,
  plays,
  views,
}: TrackItemPlaylistProps) {
  return (
    <div className="flex rounded-md">
      <img
        src={thumbnail}
        alt={title + "image"}
        className="w-16 h-16 shrink-0 object-center object-cover rounded-md"
      />
      <div className="w-full flex justify-between items-center px-4">
        <div className="flex grow flex-col justify-center">
          <p className="font-semibold text-white line-clamp-1">{title}</p>
          <div className="flex items-center gap-2 line-clamp-1">
            <Artists artists={artists} />
            <Plays plays={plays} />
            <Views views={views} />
          </div>
        </div>
        <Duration duration={duration} />
      </div>
    </div>
  );
}

function Duration({ duration }: { duration: string | undefined }) {
  if (!duration) return;
  return (
    <p className="text-sm font-semibold text-gray-400 line-clamp-1 shrink-0">
      {duration}
    </p>
  );
}

function Plays({ plays }: { plays: string | undefined }) {
  if (!plays) return;
  return (
    <p className="text-sm font-semibold text-gray-400 line-clamp- shrink-0">
      {plays}
    </p>
  );
}

function Views({ views }: { views: string | undefined }) {
  if (!views) return;
  return (
    <p className="text-sm font-semibold text-gray-400 line-clamp-1 shrink-0">
      {views}
    </p>
  );
}
