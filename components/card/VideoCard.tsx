import Image from "next/image";
import React from "react";
import ClickElement from "../ClickElement";

type SongCardProps = {
  videoId?: string;
  thumbnail: string;
  title: string;
  artist?: string;
  subtitle: string[];
};

export default function VideoCard({
  thumbnail,
  title,
  videoId,
  artist,
  subtitle,
}: SongCardProps) {
  return (
    <ClickElement
      key={crypto.randomUUID()}
      id={videoId!}
      artist={artist!}
      thumbnail={thumbnail}
      title={title}
      trackList={[]}
    >
      <MusicCard title={title} thumbnail={thumbnail} subtitle={subtitle} />
    </ClickElement>
  );
}

export function MusicCard({ thumbnail, title, subtitle }: SongCardProps) {
  return (
    <div className="flex w-[300px] md:w-[384px] rounded-md">
      <img
        src={thumbnail}
        alt={title + "image"}
        className="w-16 h-16 shrink-0 object-center object-cover rounded-md"
      />
      <div className="flex grow flex-col justify-center px-4">
        <p className="font-semibold text-white line-clamp-1">{title}</p>
        <p className="text-sm font-semibold text-gray-400 line-clamp-1">
          {subtitle?.join()?.replaceAll(",", " ")}
        </p>
      </div>
    </div>
  );
}
