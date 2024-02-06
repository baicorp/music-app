import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Album({ albumData }: { albumData: any[] }) {
  return albumData.map((content: any) => {
    return (
      <Link
        key={content.playlistId}
        href={`album/${content?.playlistId || ""} `}
      >
        <AlbumCard
          browseId={content?.playlistId}
          thumbnails={content?.thumbnail}
          title={content?.title}
          year={content?.year}
        />
      </Link>
    );
  });
}

export function AlbumCard({
  browseId,
  title,
  thumbnails,
  year,
}: {
  browseId: string;
  title: string;
  thumbnails: string;
  year: string;
}) {
  return (
    <div className="shrink-0 w-[160px]">
      <Image
        src={thumbnails}
        alt={`${title}-thumbnail`}
        width={226}
        height={226}
        className="w-40 h-w-40 rounded-md"
      />
      <div className="mt-1 flex-1 flex flex-col gap-1 justify-between">
        <p className="font-semibold text-white text-lg line-clamp-2 leading-tight">
          {title}
        </p>
        <p className="text-sm font-semibold text-gray-400 line-clamp-1">
          {year}
        </p>
      </div>
    </div>
  );
}
