"use client";

import Link from "next/link";
import { Artist } from "@/types/song";

export default function Artists({
  artists,
}: {
  artists: Artist[] | undefined;
}) {
  if (!artists) return;
  return (
    <>
      <div className="hidden md:block line-clamp-1">
        {artists?.map((artist, index) => {
          if (!artist) return;
          return (
            <Link
              key={index}
              href={`/artist/${artist.browseId}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-sm mr-2 font-semibold text-gray-400 hover:decoration-wavy hover:underline"
            >
              {artist.name}
            </Link>
          );
        })}
      </div>
      <div className="md:hidden line-clamp-1">
        {artists?.map((artist, index) => {
          if (!artist) return;
          return (
            <p key={index} className="text-sm mr-2 font-semibold text-gray-400">
              {artist.name}
            </p>
          );
        })}
      </div>
    </>
  );
}
