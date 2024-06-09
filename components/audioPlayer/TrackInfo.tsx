import { Artist } from "@/types/song";
import React from "react";
import { Artists } from "../shared";
import { BrokenImage } from "../svg";

export default function TrackInfo({
  thumbnail,
  title,
  artists,
}: {
  thumbnail: string;
  title: string;
  artists: Artist[];
}) {
  return (
    <div className="flex items-center">
      {thumbnail ? (
        <img
          src={thumbnail as string}
          width={400}
          height={400}
          alt={title + " image"}
          className="w-16 h-16 aspect-square object-cover object-center rounded-md py-3 pl-4"
        />
      ) : (
        <BrokenImage />
      )}
      <div className="pl-3">
        <p className="font-semibold text-white line-clamp-1">{title}</p>
        <Artists artists={artists || []} />
      </div>
    </div>
  );
}
