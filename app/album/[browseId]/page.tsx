import Image from "next/image";
import React from "react";
import { TrackItemAlbum } from "@/components/track";
import { getAlbum } from "@/utils/MusicClient";
import Link from "next/link";

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
      <div className="h-screen flex justify-center items-center">
        <p className="font-semibold text-lg">
          Failed to fetch data, try another one dah
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 lg:px-6 xl:px-10">
        <div className="flex">
          <Image
            src={data?.thumbnail}
            alt={`${data?.title} thumbnail`}
            width={544}
            height={544}
            className="w-[50%] md:w-[30%] lg:w-[25%] aspect-square object-cover object-center rounded-sm shrink-0"
          />
          <div className="px-4 py-2 text-sm md:text-base">
            <p className="font-bold text-lg lg:text-3xl line-clamp-3 leading-tight">
              {data?.title}
            </p>
            <div className="flex flex-col my-4">
              <p className="font-semibold text-gray-400 line-clamp-2">
                {data?.subtitle?.map((text: string, index: number) => {
                  if (index === 2) {
                    if (!text?.split("|")[1]) return <span>{text}</span>;
                    return (
                      <Link
                        key={text.split("|")[1]}
                        className="hover:decoration-wavy hover:underline"
                        href={`/artist/${text.split("|")[1]}`}
                      >
                        {text.split("|")[0]}
                      </Link>
                    );
                  }
                })}
              </p>
              <p className="font-semibold text-gray-400 line-clamp-2">
                {`${data?.albumStat.join().replaceAll(",", " ")} songs`}
              </p>
            </div>
            <div className="hidden md:block">
              <p className="font-semibold text-gray-400 text-sm line-clamp-6">
                {data?.description}
              </p>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-3 mt-5">
          {data?.contents?.map((content: any, index: number) => {
            return (
              <TrackItemAlbum
                key={index}
                videoId={content?.videoId}
                index={content?.index}
                title={content?.title}
                artists={data?.artists}
                thumbnail={data?.thumbnail}
                listSong={data?.contents}
                duration={content?.duration}
                plays={content?.plays}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
