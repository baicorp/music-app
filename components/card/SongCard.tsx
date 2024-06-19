import React from "react";
import { Artist, Song } from "@/types/song";
import { Artists, PlayFromTitle, SongImage } from "@/components/shared";

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
    <div className="flex rounded-md">
      <SongImage
        videoId={videoId}
        title={title}
        thumbnail={thumbnail}
        variant="default"
      />
      <div className="flex justify-between grow items-center px-4">
        <div className="flex grow flex-col justify-center">
          <PlayFromTitle
            variant="default"
            listSong={
              listSong || [
                { videoId, thumbnail, title, artists: artists!, duration },
              ]
            }
            thumbnail={thumbnail}
            title={title}
            artists={artists ? artists : []}
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

export function Duration({ duration }: { duration: string | undefined }) {
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
