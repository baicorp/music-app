import Image from "next/image";
import React from "react";
import TrackItemAlbum from "@/components/TrackItemAlbum";
import { getAlbum } from "@/utils/pipedAPI";
import ClickElement from "@/components/ClickElement";
import { getPlaylist } from "@/utils/MusicClient";
import { TrackProps } from "@/app/research/searchResult";

export default async function Album({
  params,
}: {
  params: { browseId: string };
}) {
  let data: {
    title: any;
    trackCount: string;
    tracks: TrackProps[];
    playlistThumbnail: any;
  };
  try {
    const datas = await getPlaylist(params.browseId);
    data = datas;
  } catch (err) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="font-semibold text-lg">
          Failed to fetch data, try another one
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 lg:px-6 xl:px-10">
      <div className="flex">
        <Image
          src={data?.playlistThumbnail}
          alt={`${data?.title} thumbnail`}
          width={266}
          height={266}
          className="w-[40%] h-auto object-cover object-center rounded-sm"
        />
        <div className="px-4 py-2">
          <p className="font-bold text-lg line-clamp-3 leading-tight">
            {data?.title}
          </p>
          <div className="flex items-center mt-3">
            {/* <p className="font-semibold text-xs text-gray-400">{data?.year}</p> */}
            {/* <span>・</span> */}
            <p className="font-semibold text-xs text-gray-400">
              {`${data?.trackCount} songs`}
            </p>
          </div>
        </div>
      </div>
      <div className="gap-2 mt-5">
        {data?.tracks?.map((track, index: number) => {
          return (
            <ClickElement
              key={crypto.randomUUID()}
              id={track?.videoId}
              artist={track?.artist}
              thumbnail={track?.thumbnail}
              title={track?.title}
            >
              <TrackItemAlbum
                order={index}
                trackId={track?.videoId}
                title={track?.title}
                artistName={track?.artist}
                duration={track?.duration}
              />
            </ClickElement>
          );
        })}
      </div>
    </div>
  );
}
