"use client";

import useMusic from "@/hooks/useMusic";
import { getMusic } from "@/utils/pipedAPI";
import useSWRImmutable from "swr/immutable";
import Loading from "./Loading";

export default function AudioPlayer() {
  const { id } = useMusic();
  const { data, isLoading } = useSWRImmutable(id, getMusic);

  //if no id return empty element
  if (!id) return <></>;

  return isLoading ? (
    <Loading />
  ) : (
    <div className="bg-[#f1f3f4] flex overflow-hidden">
      <img
        src={data?.videoDetails.thumbnail?.thumbnails[0].url}
        alt={data?.videoDetails.title + " image"}
        className="w-24 object-cover object-center"
      />
      <div className="flex flex-col justify-center pt-2">
        <div className="px-5">
          <p className="font-semibold text-black line-clamp-1">
            {data?.videoDetails.title}
          </p>
          <p className="text-sm font-semibold text-gray-600 line-clamp-1">
            {data?.videoDetails.author}
          </p>
        </div>
        <audio controls autoPlay src={data?.streamUrl}></audio>
      </div>
    </div>
  );
}
