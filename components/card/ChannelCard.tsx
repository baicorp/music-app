import Image from "next/image";
import Link from "next/link";
import React from "react";

type ChannelCardProps = {
  browseId: string;
  thumbnail: string;
  title: string;
  subtitle: string[];
};

export default function ChannelCard({
  browseId,
  thumbnail,
  title,
  subtitle,
}: ChannelCardProps) {
  return (
    <div key={browseId} className="shrink-0 w-max">
      <Link
        href={`/artist/${browseId}`}
        className="flex flex-col items-center gap-3"
      >
        <Image
          src={thumbnail}
          alt={title}
          width={1000}
          height={1000}
          className="w-40 h-40 object-cover rounded-full"
        />
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-gray-400">
            {subtitle.join().replaceAll(",", " ")}
          </p>
        </div>
      </Link>
    </div>
  );
}
