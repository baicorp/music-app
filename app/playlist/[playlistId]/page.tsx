import Image from "next/image";
import React from "react";
import { getPlaylist } from "@/utils/MusicClient";
import ClickElement from "@/components/ClickElement";
import Link from "next/link";
import { SongCard } from "@/components/card";

export default async function Playlist({
  params,
}: {
  params: { playlistId: string };
}) {
  let data: any;
  try {
    const datas = await getPlaylist(params.playlistId);
    data = datas;
  } catch (err) {
    return (
      <div className="h-screen flex justify-center items-center lg:px-6 xl:px-10">
        <p className="font-semibold text-lg">
          Failed to fetch data, try another one 🔨
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 lg:px-6 xl:px-10">
      <div className="flex">
        <Image
          src={data?.thumbnail}
          alt={`${data?.title} thumbnail`}
          width={544}
          height={544}
          className="w-[25%] aspect-square object-cover object-center rounded-sm shrink-0"
        />
        <div className="px-4 py-2 flex flex-col gap-4">
          <p className="font-bold text-lg line-clamp-2 leading-tight">
            {data?.title}
          </p>
          <div className="flex flex-col">
            <p className="font-semibold text-gray-400 break-words line-clamp-1">
              {data?.subtitle?.map((text: string, index: number) => {
                if (index === 2) {
                  if (text.split("|")[1] === "undefined") {
                    return <span key={index}>{text.split("|")[0]}</span>;
                  }
                  return (
                    <Link
                      key={index}
                      className="hover:decoration-wavy hover:underline"
                      href={`/artist/${text.split("|")[1]}`}
                    >
                      {text.split("|")[0]}
                    </Link>
                  );
                }
                return <span key={index}>{text}</span>;
              })}
            </p>
            <p className="font-semibold text-gray-400 break-words line-clamp-1">
              {`${data?.playlistStat.join().replaceAll(",", " ")} songs`}
            </p>
          </div>
          <p className="hidden md:block font-semibold text-gray-400 line-clamp-[7]">
            {data?.description}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-6">
        {data?.contents?.map((content: any) => {
          return (
            <ClickElement
              key={crypto.randomUUID()}
              id={content?.videoId}
              artist={content?.artist}
              thumbnail={content?.thumbnail}
              title={content?.title}
              trackList={data?.content}
            >
              <SongCard
                thumbnail={content?.thumbnail}
                artists={content?.artists}
                duration={content?.duration}
                title={content?.title}
                videoId={content?.videoId}
              />
            </ClickElement>
          );
        })}
      </div>
    </div>
  );
}
