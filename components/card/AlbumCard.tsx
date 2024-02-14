import Image from "next/image";
import Link from "next/link";
import React from "react";

type AlbumProps = {
  thumbnail: string;
  browseId: string;
  title: string;
  subtitle: string[];
};

export default function AlbumCard({
  browseId,
  thumbnail,
  title,
  subtitle,
}: AlbumProps) {
  return (
    <div className="shrink-0 w-[160px] h-full">
      <Link href={`/album/${browseId}`}>
        <Image
          src={thumbnail}
          alt={`${title}-thumbnail`}
          width={226}
          height={226}
          className="w-40 h-w-40 rounded-md"
        />
        <div className="mt-1 flex-1 flex flex-col gap-1 justify-between relative">
          <p className="font-semibold text-white text-lg line-clamp-2 leading-tight">
            {title}
          </p>
          <p className="text-sm font-semibold text-gray-400 line-clamp-1">
            <span className="hover:decoration-wavy hover:underline">
              {subtitle[2]}
            </span>
            {`${subtitle.slice(3)}`.replaceAll(",", " ")}
          </p>
        </div>
      </Link>
    </div>
  );
}
