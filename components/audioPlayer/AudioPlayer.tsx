"use client";

import useMusic from "@/hooks/useMusic";
import React from "react";
import Audio from "./Audio";
import Queue from "./Queue";
import TrackInfo from "./TrackInfo";

export default function AudioPlayer() {
  const { trackData } = useMusic();

  if (!trackData) return "";

  return trackData ? (
    <div className="bg-[#1c1c1c] grow relative flex justify-between items-center md:px-4 overflow-hidden h-[65px] md:h-[76px] border-b-[1px] border-[#111] md:border-none">
      <div className="flex-1 flex item-center ">
        <TrackInfo
          thumbnail={trackData?.thumbnail || ""}
          title={trackData?.title}
          artists={trackData?.artists}
        />
      </div>
      <div className="md:flex-1 flex justify-end md:justify-center items-center">
        <Audio videoId={trackData.videoId} />
      </div>
      <div className="md:flex-1 flex justify-end pr-4 ">
        <Queue />
      </div>
    </div>
  ) : (
    ""
  );
}
