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
      <div className="bg-[#1f1f1f] flex overflow-hidden relative">
        <Image
          src={trackData?.thumbnail as string}
          width={400}
          height={400}
          alt={trackData?.title + " image"}
          className="w-20 h-20 aspect-square object-cover object-center rounded-md py-3 pl-4"
        />
        <div className="grow relative flex justify-between items-center">
          <div className="pl-5">
            <p className="font-semibold text-white line-clamp-1">
              {trackData?.title}
            </p>
            <Artists artists={trackData?.artists || []} />
          </div>
          <div className="pr-4">
            <Audio videoId={trackData.videoId} />
          </div>
        </div>
      </div>
    </div>
  );
}
