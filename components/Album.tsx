import React from "react";
import { promises as fs } from "fs";
import Image from "next/image";

export default async function Album() {
  const file = await fs.readFile(process.cwd() + "/data/album.json", "utf8");
  const data = JSON.parse(file);

  return data.contents.map((content: any) => {
    const thumbnail = content.thumbnails[0].url;
    return (
      <AlbumCard
        key={content.browseId}
        browseId={content.browseId}
        thumbnails={thumbnail}
        title={content.title}
        year={content.year}
      />
    );
  });
}

function AlbumCard({
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
