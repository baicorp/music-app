"use client";

import { getMusic } from "@/utils/pipedAPI";
import React from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import Loading from "./Loading";
import { AudioCard, VideoDetail } from "@/types/type";
import Image from "next/image";

export default function MusicList() {
  const searchParams = useSearchParams();

  const { data, isLoading, error } = useSWR<VideoDetail>(
    searchParams.get("vId"),
    getMusic
  );

  // cek apakah ada searchParameter "vId"
  if (!data) return <p>Start listening 🎧</p>;

  //cek apakah ada error baik status atau invalid videoId
  if (error || data?.error)
    return (
      <p className="p-3 bg-rose-500 rounded-md text-xs">
        video id is not valid
      </p>
    );

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <AudioCard
          thumbnailUrl={data?.thumbnailUrl!}
          audioStreams={data?.audioStreams!}
          title={data?.title!}
          uploader={data?.uploader!}
        />
      )}
    </div>
  );
}

function AudioCard({ thumbnailUrl, audioStreams, title, uploader }: AudioCard) {
  const highestBitrate = Math.max(
    ...audioStreams?.map((data) => data?.bitrate)
  );
  const audioStreamUrl = audioStreams?.filter(
    (data) => data.bitrate === highestBitrate
  );

  return (
    <div className="bg-[#f1f3f4] rounded-xl max-w-[410px] overflow-hidden flex gap-2">
      <Image
        src={thumbnailUrl}
        alt={title + "image"}
        width={1400}
        height={1400}
        className="w-[100px] object-center object-contain bg-gray-900"
      />
      <div>
        <div>
          <p className="font-semibold px-4 pt-2 text-black line-clamp-1">
            {title}
          </p>
          <p className="text-sm px-4 text-black line-clamp-1">{uploader}</p>
        </div>
        <audio controls src={audioStreamUrl[0].url}></audio>
      </div>
    </div>
  );
}
