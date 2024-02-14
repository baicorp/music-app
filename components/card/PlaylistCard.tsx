import React from "react";
import Image from "next/image";
import Link from "next/link";

type PlaylistCardProps = {
  browseId: string;
  title: string;
  thumbnail: string;
  subtitle: string[];
};

export default function PlaylistCard({
  browseId,
  title,
  thumbnail,
  subtitle,
}: PlaylistCardProps) {
  return (
    <div className="shrink-0 w-[160px]">
      <Link href={`/playlist/${browseId.slice(2)}`}>
        <Image
          src={thumbnail}
          alt={title}
          width={226}
          height={226}
          className="w-40 h-40 object-cover rounded-md"
        />
        <div className="mt-3 flex-1 flex flex-col gap-1 justify-between">
          <p className="font-semibold text-white text-lg line-clamp-2 leading-tight">
            {title}
          </p>
          <p className="text-sm font-semibold text-gray-400 line-clamp-1">
            {`${subtitle[0]} ${subtitle[1]} ${subtitle[subtitle.length - 1]}`}
          </p>
        </div>
      </Link>
    </div>
  );
}
