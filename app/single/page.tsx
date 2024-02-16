import ClickElement from "@/components/ClickElement";
import TrackItemAlbum from "@/components/TrackItemAlbum";
import { getAlbum } from "@/utils/MusicClient";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page({
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
            className="w-[40%] aspect-video object-cover object-center rounded-sm shrink-0"
          />
          <div className="px-4 py-2 text-sm md:text-base">
            <p className="font-bold text-lg line-clamp-3 leading-tight">
              {data?.title}
            </p>
            <div className="flex flex-col mt-3">
              <p className="font-semibold text-gray-400">
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
              <p className="font-semibold text-gray-400">
                {`${data?.albumStat.join().replaceAll(",", " ")} songs`}
              </p>
            </div>
            <p className="hidden md:block text-gray-400 text-sm line-clamp-[7]">
              {data?.description}
            </p>
          </div>
        </div>
        <div className="gap-2 mt-5">
          {data?.contents?.map((content: any) => {
            return (
              <ClickElement
                key={crypto.randomUUID()}
                id={content?.videoId}
                artist={data?.subtitle[2]?.split("|")[0]}
                thumbnail={data?.thumbnail}
                title={content?.title}
                trackList={data?.content}
              >
                <TrackItemAlbum
                  index={content?.index}
                  videoId={content?.videoId}
                  title={content?.title}
                  duration={content?.duration!}
                  plays={content?.plays}
                />
              </ClickElement>
            );
          })}
        </div>
      </div>
    </>
  );
}
