"use client";

import useMusic from "@/hooks/useMusic";
import React from "react";
import Audio from "./Audio";
import Queue from "./Queue";
import AudioInfo from "./AudioInfo";

export default function AudioPlayer() {
  const { trackData } = useMusic();

  if (!trackData) return "";

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    console.log("open full player");
  }

  return trackData ? (
    <div
      className="bg-[#1c1c1c] grow flex justify-between items-center md:px-4 h-[65px] md:h-[76px]"
      onClick={handleClick}
    >
      <div className="flex-1 flex item-center ">
        <AudioInfo
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
