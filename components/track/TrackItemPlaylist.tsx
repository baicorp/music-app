import React from "react";
import { Artist, Song } from "@/types/song";
import { Artists, PlayFromTitle } from "@/components/shared";
import Image from "next/image";

type TrackItemPlaylistProps = {
  videoId: string;
  thumbnail: string;
  title: string;
  artists?: Artist[];
  duration?: string;
  plays?: string;
  views?: string;
  listSong: Song[];
};

export default function TrackItemPlaylist({
  videoId,
  thumbnail,
  title,
  artists,
  duration,
  plays,
  views,
  listSong,
}: TrackItemPlaylistProps) {
  return (
    <div className="flex rounded-md">
      <Image
        src={thumbnail}
        alt={title + "image"}
        width={400}
        height={400}
        className="w-16 h-16 shrink-0 object-center object-cover rounded-md"
      />
      <div className="w-full flex justify-between items-center px-4">
        <div className="flex grow flex-col justify-center">
          <PlayFromTitle
            listSong={listSong}
            thumbnail={thumbnail}
            title={title}
            artists={artists}
            videoId={videoId}
          />
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
