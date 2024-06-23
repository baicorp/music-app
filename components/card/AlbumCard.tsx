import { Artist } from "@/types/song";
import Link from "next/link";
import React from "react";
import { Artists } from "@/components/shared";

type AlbumProps = {
  browseId: string;
  thumbnail: string;
  title: string;
  subtitle: string;
  artists: Artist[];
};

export default function AlbumCard({
  browseId,
  thumbnail,
  title,
  subtitle,
  artists,
}: AlbumProps) {
  return (
    <div className="shrink-0 w-[160px] h-full">
      <Link href={`/album/${browseId}`}>
        <img
          src={thumbnail}
          alt={`${title}-thumbnail`}
          width={226}
          height={226}
          className="w-40 h-w-40 rounded-md"
        />
      </Link>
      <div className="mt-1 flex-1 flex flex-col gap-1 justify-between relative">
        <Link
          href={`/playlist/${browseId}`}
          className="font-semibold text-white text-lg line-clamp-2 leading-tight"
        >
          {title}
        </Link>
        <div className="flex gap-2">
          <p
            className={`${
              artists?.length === 0 ? "block" : "hidden"
            } text-sm font-semibold text-gray-400 line-clamp-1`}
          >
            {subtitle}
          </p>
          <div
            className={`${
              artists?.length === 0 ? "hidden" : "block"
            } flex gap-2 line-clamp-1`}
          >
            <Artists artists={artists} />
            <Year year={subtitle?.[subtitle?.length - 1]} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Year({ year }: { year: string | undefined }) {
  if (!year) return "";
  if (year?.length !== 4) return "";
  return (
    <p className="text-sm font-semibold text-gray-400 line-clamp-1">{year}</p>
  );
}
