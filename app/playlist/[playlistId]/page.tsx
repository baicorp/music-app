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
            className="w-[70%] md:w-[30%] lg:w-[25%] aspect-square object-cover object-center rounded-sm shrink-0"
          />
          <div className="px-4 py-6 md:py-2 flex flex-col gap-4">
            <p className="text-center md:text-start font-extrabold md:font-bold text-3xl md:text-lg lg:text-3xl line-clamp-3 leading-tight">
              {data?.title}
            </p>
            <div className="hidden text-sm md:text-base md:flex flex-col">
              <p className="font-semibold text-gray-400 line-clamp-2">
                {data?.subtitle?.map((text: string, index: number) => {
                  if (index === 2) {
                    if (text.split("|")[1] === "undefined") {
                      return <span key={index}>{text?.split("|")[0]}</span>;
                    }
                    return (
                      <Link
                        key={index}
                        className="hover:decoration-wavy hover:underline"
                        href={`/artist/${text.split("|")[1]}`}
                      >
                        {text?.split("|")[0]}
                      </Link>
                    );
                  }
                  return <span key={index}>{text}</span>;
                })}
              </p>
              <p className="font-semibold text-gray-400 line-clamp-2">
                {`${data?.playlistStat?.join()?.replaceAll(",", " ")} songs`}
              </p>
            </div>
            <div className="hidden md:block">
              <p className="font-semibold text-gray-400 text-sm line-clamp-[6]">
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
