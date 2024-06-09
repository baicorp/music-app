import React from "react";
import Link from "next/link";
import { Artist } from "@/types/song";
import { Artists } from "@/components/shared";

type PlaylistCardProps = {
  browseId: string;
  title: string;
  thumbnail: string;
  subtitle: string[];
  artists: Artist[];
};

export default function PlaylistCard({
  browseId,
  title,
  thumbnail,
  subtitle,
  artists,
}: PlaylistCardProps) {
  return (
    <div className="shrink-0 w-[160px]">
      <Link href={`/playlist/${browseId}`}>
        <img
          src={thumbnail}
          alt={title}
          width={226}
          height={226}
          className="w-40 h-40 object-cover rounded-md"
        />
      </Link>
      <div className="mt-3 flex-1 flex flex-col gap-1 justify-between">
        <Link
          href={`/playlist/${browseId}`}
          className="font-semibold text-white text-lg line-clamp-2 leading-tight"
        >
          {title}
        </Link>
        <p className="text-sm font-semibold text-gray-400 line-clamp-1">
          {`${subtitle[0]} ${subtitle[1]} ${subtitle[subtitle.length - 1]}`}
        </p>
        <Artists artists={artists} />
      </div>
    </div>
  );
}
