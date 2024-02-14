import Image from "next/image";
import Link from "next/link";
import React from "react";
import Play from "../Play";

type VideoCardProps = {
  browseId: string;
  thumbnail: string;
  title: string;
  subtitle: string[];
};

export default function SingleCard({
  browseId,
  thumbnail,
  title,
  subtitle,
}: VideoCardProps) {
  return (
    <div className="shrink-0 w-[160px] h-full">
      <Link href={`/album/${browseId}`}>
        <div className="relative">
          <Image
            src={thumbnail}
            alt={`${title}-thumbnail`}
            width={226}
            height={226}
            className="w-40 h-w-40 rounded-md"
          />
          <div className="bg-[#00000041] backdrop-blur-sm w-10 h-10 rounded-full absolute bottom-4 right-4 flex justify-center items-center hover:scale-110 duration-150">
            <Play />
          </div>
        </div>
        <div className="mt-1 flex-1 flex flex-col gap-1 justify-between relative">
          <p className="font-semibold text-white text-lg line-clamp-2 leading-tight">
            {title}
          </p>
          <p className="text-sm font-semibold text-gray-400 line-clamp-1">
            <span className="hover:decoration-wavy hover:underline">
              {subtitle[3]}
            </span>
            {`${subtitle.slice(4)}`.replaceAll(",", " ")}
          </p>
        </div>
      </Link>
    </div>
  );
}
