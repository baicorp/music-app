"use client";

import { useMusic } from "@/hooks";
import React, { useState } from "react";
import Audio from "./Audio";
import Queue from "./Queue";
import AudioInfo from "./AudioInfo";

export default function AudioPlayer() {
  const { trackData } = useMusic();
  const [isOpen, setIsOpen] = useState(false);

  if (!trackData) return "";

  function handleOpen() {
    setIsOpen(true);
  }

  return trackData ? (
    <div
      className="bg-[#1c1c1c] grow flex justify-between items-center md:px-4 h-[65px] md:h-[76px] relative"
      onClick={handleOpen}
    >
      <div className="flex-1 flex item-center ">
        <AudioInfo
          thumbnail={trackData?.thumbnail ? trackData?.thumbnail[0] : ""}
          title={trackData?.title}
          artists={trackData?.artists}
        />
      </div>
      <div className="md:flex-1 flex justify-end md:justify-center items-center">
        <Audio
          videoId={trackData.videoId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <div className="md:flex-1 flex justify-end pr-4 ">
        <Queue />
      </div>
    </div>
  ) : (
    ""
  );
}
