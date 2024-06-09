import React from "react";
import { Artist, Song } from "@/types/song";
import { Artists, PlayFromTitle, PlayFromImage } from "@/components/shared";

export type SongCardProps = {
  videoId: string;
  thumbnail: string;
  title: string;
  artists?: Artist[];
  duration?: string;
  plays?: string;
  views?: string;
  listSong: Song[];
};

export default function SongCard({
  videoId,
  thumbnail,
  title,
  artists,
  duration,
  plays,
  views,
  listSong,
}: SongCardProps) {
  return (
    <div className="flex w-[90%] md:w-[400px] lg:w-[450px] rounded-md">
      <img
        src={thumbnail}
        width={400}
        height={400}
        alt={title + "image"}
        className="w-16 h-16 shrink-0 object-center object-cover rounded-md"
      />
      <div className="flex grow flex-col justify-center px-4">
        <PlayFromTitle
          listSong={listSong}
          thumbnail={thumbnail}
          title={title}
          artists={artists}
          videoId={videoId}
        />
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
