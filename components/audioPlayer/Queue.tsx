"use client";

import useMusic from "@/hooks/useMusic";
import { Artist, Song } from "@/types/song";
import React, { useMemo } from "react";
import { Artists } from "../shared";
import { QueueListButton, Speaker } from "../svg";

export default function Queue() {
  const { setIsQueueOpen } = useMusic();

  return (
    <button
      onClick={() => setIsQueueOpen((prev) => !prev)}
      className="hidden md:block"
    >
      <QueueListButton />
    </button>
  );
}

export function QueueList() {
  const { listTrackData, isQueueOpen } = useMusic();

  const trackList = useMemo(
    () =>
      listTrackData?.map((content: Song, index: number) => {
        return (
          <TrackQueueList
            key={index}
            videoId={content?.videoId}
            title={content?.title}
            thumbnail={content.thumbnail!}
            artists={content?.artists}
            duration={content?.duration || ""}
          />
        );
      }),
    [listTrackData]
  );

  return isQueueOpen ? (
    <div className="hidden bg-secondary border border-secondary w-[300px] xl:w-[350px] shrink-0 md:flex flex-col overflow-y-auto rounded-lg relative">
      <p className="px-6 py-4 sticky top-0 font-extrabold backdrop-blur-sm z-30">
        {trackList ? "Queue" : "No Data"}
      </p>
      <div className="flex flex-col gap-2 px-6 py-4">
        {trackList || "No data"}
      </div>
    </div>
  ) : (
    ""
  );
}

type TrackQueueListProps = {
  videoId: string;
  thumbnail: string;
  title: string;
  artists: Artist[];
  duration: string;
};

function TrackQueueList({
  videoId,
  thumbnail,
  title,
  artists,
  duration,
}: TrackQueueListProps) {
  const { setTrackData, trackData } = useMusic();
  return (
    <div className="flex rounded-md bg-[#0f0f0f]">
      <div className="relative overflow-hidden w-16 h-14 lg:w-20 lg:h-16">
        <img
          src={thumbnail}
          alt={title + "image"}
          width={200}
          height={200}
          className="w-16 h-14 lg:w-20 lg:h-16 shrink-0 object-center object-cover rounded-md"
        />
        <div
          className={`${
            trackData?.videoId === videoId ? "block" : "hidden"
          } absolute inset-0 bg-[#00000090] flex justify-center items-center`}
        >
          <Speaker />
        </div>
      </div>
      <div className="w-full flex justify-between items-center px-4">
        <div className="flex grow flex-col">
          <p
            className="font-semibold text-white text-sm lg:text-base line-clamp-1 w-fit cursor-pointer"
            onClick={() =>
              setTrackData({
                videoId: videoId,
                artists: artists,
                title: title,
                thumbnail: thumbnail,
              })
            }
          >
            {title}
          </p>
          <div className="flex items-center gap-2 line-clamp-1">
            <Artists artists={artists} />
          </div>
        </div>
        <p className="text-xs lg:text-sm font-semibold text-gray-400 line-clamp-1 shrink-0">
          {duration || ""}
        </p>
      </div>
    </div>
  );
}
