import Image from "next/image";
import React from "react";
import TrackItemAlbum from "@/components/TrackItemAlbum";
import { secondsToMinutesAndSeconds } from "@/utils/durationConverter";
import { getPlaylist } from "@/utils/MusicClient";
import { MusicCard } from "@/components/Musics";
import ClickElement from "@/components/ClickElement";

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
    <div className="py-4 lg:px-6 xl:px-10">
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
            <p className="font-semibold text-xs text-gray-400">
              {data?.trackCount}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-6">
        {data?.tracks?.map((track: any) => {
          return (
            <ClickElement key={crypto.randomUUID()} ids={track?.videoId}>
              <MusicCard
                thumbnailUrl={track?.thumbnail}
                artist={track?.artist}
                title={track?.title}
                videoId={track?.videoId}
              />
            </ClickElement>
          );
        })}
      </div>
    </div>
  );
}
