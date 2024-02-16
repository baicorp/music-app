import React from "react";
import { Song, Artist } from "@/types/song";
import Link from "next/link";

export default function SongCard({
  thumbnail,
  title,
  artists,
  duration,
  plays,
  views,
}: Song) {
  return (
    <div className="flex w-[300px] md:w-[384px] rounded-md">
      <img
        src={thumbnail}
        alt={title + "image"}
        className="w-16 h-16 shrink-0 object-center object-cover rounded-md"
      />
      <div className="flex grow flex-col justify-center px-4">
        <p className="font-semibold text-white line-clamp-1">{title}</p>
        <div className="flex gap-2">
          <Artists artists={artists} />
          <Plays plays={plays} />
          <Views views={views} />
          <Duration duration={duration} />
        </div>
      </div>
    </div>
  );
}

function Artists({ artists }: { artists: Artist[] }) {
  if (!artists) return;
  return artists?.map((artist, index) => {
    if (!artist) return;
    return (
      <Link
        key={index}
        href={`/artist/${artist.browseId}`}
        className="text-sm font-semibold text-gray-400 line-clamp-1 hover:decoration-wavy hover:underline"
      >
        {artist.name}
      </Link>
    );
  });
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
