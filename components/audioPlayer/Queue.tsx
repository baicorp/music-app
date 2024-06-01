"use client";

import useMusic from "@/hooks/useMusic";
import { Artist, Song } from "@/types/song";
import React from "react";
import Image from "next/image";
import { Artists } from "../shared";

export default function Queue() {
  const { setIsQueueOpen } = useMusic();

  return (
    <button onClick={() => setIsQueueOpen((prev) => !prev)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e8eaed"
      >
        <path d="M640-160q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 21 1.5t19 6.5v-328h200v80H760v360q0 50-35 85t-85 35ZM120-320v-80h320v80H120Zm0-160v-80h480v80H120Zm0-160v-80h480v80H120Z" />
      </svg>
    </button>
  );
}

export function QueueList() {
  const { listTrackData, isQueueOpen } = useMusic();
  const trackList = listTrackData?.map((content: Song, index: number) => {
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
  });

  return (
    <div
      className={`${
        isQueueOpen ? "" : "hidden"
      } flex flex-col relative h-svh overflow-y-auto min-w-[25%]`}
    >
      <p className="px-6 py-4 sticky top-0 font-extrabold bg-[#1c1c1c] z-50">
        {trackList ? "Queue" : "No Data"}
      </p>
      <div className="flex flex-col gap-2 px-6 py-4">
        <p className="font-semibold mb-2">{trackList ? "Now Playing" : ""}</p>
        {trackList || "No data"}
      </div>
    </div>
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
    <div className="flex rounded-md">
      <div className="relative">
        <Image
          src={thumbnail}
          alt={title + "image"}
          width={400}
          height={400}
          className="w-20 h-16 shrink-0 object-center object-cover rounded-md"
        />
        <div
          className={`${
            trackData?.videoId === videoId ? "block" : "hidden"
          } absolute inset-0 bg-[#00000095] flex justify-center items-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="#e8eaed"
          >
            <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" />
          </svg>
        </div>
      </div>
      <div className="w-full flex justify-between items-center px-4">
        <div className="flex grow flex-col">
          <p
            className="font-semibold text-white line-clamp-1 w-fit cursor-pointer"
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
        <p className="text-sm font-semibold text-gray-400 line-clamp-1 shrink-0">
          {duration || ""}
        </p>
      </div>
    </div>
  );
}
