"use client";

import { Song } from "@/types/song";
import React, { memo, useMemo } from "react";
import { QueueListButton } from "../svg";
import SongCardQueue from "../card/SongCardQueue";
import { useGlobalVal, useMusic } from "@/hooks";

export default function Queue() {
  const { setIsQueueOpen } = useGlobalVal();

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

export const QueueList = memo(function QueueList() {
  const { listTrackData } = useMusic();
  const { isQueueOpen } = useGlobalVal();

  const trackList = useMemo(() => {
    if (!listTrackData) return [];
    return listTrackData?.map((content, index) => {
      console.log("rerender list");
      return (
        <SongCardQueue
          key={index}
          videoId={content?.videoId}
          title={content?.title}
          thumbnail={content?.thumbnail || ""}
          artists={content?.artists || []}
          duration={content?.duration || ""}
          listSong={listTrackData || []}
        />
      );
    });
  }, [listTrackData]);

  return isQueueOpen ? (
    <div className="hidden bg-secondary border border-secondary w-[300px] xl:w-[350px] shrink-0 md:flex flex-col overflow-y-auto rounded-lg relative">
      <p className="bg-secondary border border-secondary rounded-t-lg px-6 py-4 sticky top-0 font-extrabold z-10">
        {trackList.length ? "Queue" : "No Data"}
      </p>
      <div className="flex flex-col gap-2 px-6 py-4">
        {trackList.length ? trackList : "No data"}
      </div>
    </div>
  ) : null;
});
