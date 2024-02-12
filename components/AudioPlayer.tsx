"use client";

import useMusic from "@/hooks/useMusic";
import React from "react";
import Audio from "./Audio";

export default function AudioPlayer() {
  const { trackData } = useMusic();

  if (!trackData) return "";
  return (
    <div className={`${trackData ? "" : "hidden"}`}>
      <div className="bg-[#1f1f1f] flex overflow-hidden relative">
        <img
          src={trackData?.thumbnail}
          alt={trackData?.title + " image"}
          className="w-24 object-cover object-center rounded-md py-3 pl-4"
        />
        <div className="grow relative flex justify-between items-center">
          <div className="pl-5">
            <p className="font-semibold text-white line-clamp-1">
              {trackData?.title}
            </p>
            <p className="text-sm font-semibold text-gray-400 line-clamp-1">
              {trackData?.artist}
            </p>
          </div>
          <div className="pr-4">
            <Audio videoId={trackData.videoId} />
          </div>
        </div>
      </div>
    </div>
  );
}
