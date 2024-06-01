"use client";

import useMusic from "@/hooks/useMusic";
import React from "react";
import Audio from "./Audio";
import { Artists } from "../shared";
import Image from "next/image";

export default function AudioPlayer() {
  const { trackData } = useMusic();

  if (!trackData) return "";
  return (
    <div className={`${trackData ? "" : "hidden"}`}>
      <div className="bg-[#1f1f1f] overflow-hidden relative">
        <div className="grow relative flex justify-between items-center px-4">
          <div className="flex-1 flex items-center">
            <Image
              src={trackData?.thumbnail as string}
              width={400}
              height={400}
              alt={trackData?.title + " image"}
              className="w-16 h-16 aspect-square object-cover object-center rounded-md py-3 pl-4"
            />
            <div className="pl-3">
              <p className="font-semibold text-white line-clamp-1">
                {trackData?.title}
              </p>
              <Artists artists={trackData?.artists || []} />
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <Audio videoId={trackData.videoId} />
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
}
