import Image from "next/image";
import React from "react";
import TrackItemAlbum from "@/components/TrackItemAlbum";
import { secondsToMinutesAndSeconds } from "@/utils/durationConverter";
import { getPlaylist } from "@/utils/pipedAPI";
import { MusicCard } from "@/components/Musics";
import ClickElement from "@/components/ClickElement";

export default async function Playlist({
  params,
}: {
  params: { playlistId: string };
}) {
  const data = await getPlaylist(params.playlistId);

  return (
    <div className="p-4">
      <div className="flex">
        <Image
          src={data?.thumbnails[2].url}
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
            <p className="font-semibold text-xs text-gray-400">{data?.year}</p>
            <span>・</span>
            <p className="font-semibold text-xs text-gray-400">
              {`${data?.trackCount} songs`}
            </p>
          </div>
          <p className="font-semibold text-xs text-gray-400">
            {`${data?.duration} songs`}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-6">
        {data?.tracks?.map((track: any) => {
          const artist = track?.artists
            .map((artist: any) => artist.name)
            .join()
            .replaceAll(",", " & ");
          const trackDuration = secondsToMinutesAndSeconds(
            parseInt(track?.duration)
          );
          const thumbnail = track?.thumbnails[0]?.url;
          return (
            <ClickElement key={crypto.randomUUID()} ids={track?.videoId}>
              <MusicCard
                thumbnailUrl={thumbnail}
                artist={artist}
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
