import React from "react";
import { getAlbum } from "@/utils/MusicClient";
import Link from "next/link";
import { SongCardAlbum } from "@/components/card";

export const dynamic = "force-dynamic";

export default async function Album({
  params,
}: {
  params: { browseId: string };
}) {
  let data: any;
  try {
    const datas = await getAlbum(params.browseId);
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
              <p className="font-semibold text-gray-400 line-clamp-2">
                {data?.albumStat}
              </p>
              <ul>
                {data?.artists?.map((artist: any, index: number) => (
                  <li
                    key={index}
                    className="font-semibold text-gray-400 line-clamp-2"
                  >
                    <Link href={`/artist/${artist?.browseId}`}>
                      {artist?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-400 text-sm line-clamp-[2] md:line-clamp-6">
                {data?.description}
              </p>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-3 mt-5">
          {data?.contents?.map((content: any, index: number) => {
            return (
              <SongCardAlbum
                key={index}
                videoId={content?.videoId}
                index={content?.index}
                title={content?.title}
                artists={data?.artists}
                thumbnail={content?.thumbnail}
                listSong={data?.contents}
                duration={content?.duration}
                plays={content?.plays}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
