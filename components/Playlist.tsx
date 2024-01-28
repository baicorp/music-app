import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Playlist({ playlistData }: { playlistData: any[] }) {
  return playlistData.map((content: any) => {
    const thumbnail = content.thumbnails[0].url;
    return (
      <Link key={crypto.randomUUID()} href={`playlist/${content?.playlistId}`}>
        <PlaylistCard
          key={content.playlistId}
          thumbnails={thumbnail}
          title={content.title}
          description={content.description}
        />
      </Link>
    );
  });
}

function PlaylistCard({
  title,
  thumbnails,
  description,
}: {
  title: string;
  thumbnails: string;
  description: string;
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
          {description}
        </p>
      </div>
    </div>
  );
}
