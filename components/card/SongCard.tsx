import React from "react";
import { Artist } from "@/types/song";
import { Artists } from "@/components/shared";

type SongCardProps = {
  thumbnail: string;
  title: string;
  artists?: Artist[];
  duration?: string;
  plays?: string;
  views?: string;
};

export default function SongCard({
  thumbnail,
  title,
  artists,
  duration,
  plays,
  views,
}: SongCardProps) {
  return (
    <div className="flex w-[90%] md:w-[400px] lg:w-[450px] border-2 rounded-md">
      <img
        src={thumbnail}
        alt={title + "image"}
        className="w-16 h-16 shrink-0 object-center object-cover rounded-md"
      />
      <div className="flex grow flex-col justify-center px-4">
        <p className="font-semibold text-white line-clamp-1">{title}</p>
        <div className="flex items-center gap-2">
          <Artists artists={artists} />
          <Plays plays={plays} />
          <Views views={views} />
          <Duration duration={duration} />
        </div>
      </div>
    </div>
  );
}

function Duration({ duration }: { duration: string | undefined }) {
  if (!duration) return;
  return (
    <p className="text-sm font-semibold text-gray-400 line-clamp-1">
      {duration}
    </p>
  );
}

function Plays({ plays }: { plays: string | undefined }) {
  if (!plays) return;
  return (
    <p className="text-sm font-semibold text-gray-400 line-clamp-1">{plays}</p>
  );
}

function Views({ views }: { views: string | undefined }) {
  if (!views) return;
  return (
    <p className="text-sm font-semibold text-gray-400 line-clamp-1">{views}</p>
  );
}
