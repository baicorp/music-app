"use client";

import { useMusic } from "@/hooks";
import { memo, useMemo } from "react";
import SongCardQueue from "./card/SongCardQueue";

const MemoizeSongCardQueue = memo(SongCardQueue);

const QueueList = memo(function QueueList() {
  const { listTrackData, isListOpen } = useMusic();

  const trackList = useMemo(() => {
    if (!listTrackData) return [];
    return listTrackData?.map((content, index) => {
      console.log("rerender list");
      return (
        <MemoizeSongCardQueue
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

  return isListOpen ? (
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

export default QueueList;
