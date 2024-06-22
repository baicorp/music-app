import React from "react";
import { getPlaylist } from "@/utils/MusicClient";
import Link from "next/link";
import { SongCard } from "@/components/card";

export const dynamic = "force-dynamic";

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
      <div className="flex justify-center">
        <p>Sorry, something wrong</p>
      </div>
    );
  }

  if (!!!data) {
    return (
      <div className="flex justify-center">
        <p>Sorry, something wrong</p>
      </div>
    );
  }

  return (
    <div>
      <div className="p-4 lg:px-6 xl:px-10">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src={data?.thumbnail}
            alt={`${data?.title} thumbnail`}
            width={544}
            height={544}
            className="w-[70%] md:w-[37%] lg:w-[34%] aspect-square object-cover object-center rounded-sm shrink-0"
          />
          <div className="px-4 py-6 md:py-2 flex items-center md:items-start flex-col gap-4">
            <p className="font-extrabold md:font-bold text-3xl md:text-lg lg:text-3xl line-clamp-3 leading-tight text-center md:text-start">
              {data?.title}
            </p>
            <div className="text-xs md:text-base md:flex flex-col items-center text-center md:text-start md:items-start gap-1">
              <p className="font-semibold text-gray-400 line-clamp-2">
                {data?.subtitle}
              </p>
              <p className="font-semibold text-gray-400 line-clamp-2 text-center md:text-start">
                {data?.playlistStat}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-400 text-sm line-clamp-[2] md:line-clamp-6">
                {data?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          {data?.contents?.map((content: any, index: number) => {
            return (
              <SongCard
                key={index}
                videoId={content?.videoId}
                title={content?.title}
                thumbnail={content?.thumbnail}
                artists={content?.artists}
                duration={content?.duration}
                views={content?.views}
                plays={content?.plays}
                listSong={data?.contents || []}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
