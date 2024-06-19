"use client";

import useMusic from "@/hooks/useMusic";
import { Song } from "@/types/song";
import React, { useMemo } from "react";
import { QueueListButton } from "../svg";
import SongCardQueue from "../card/SongCardQueue";

export default function Queue() {
  const { setIsQueueOpen } = useMusic();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setIsQueueOpen((prev) => !prev);
      }}
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
          <SongCardQueue
            key={index}
            videoId={content?.videoId}
            title={content?.title}
            thumbnail={content.thumbnail!}
            artists={content?.artists}
            duration={content?.duration || ""}
            listSong={listTrackData || []}
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
