"use client";

import React, { useState, memo, useMemo, useEffect } from "react";
import Link from "next/link";
import { useAudio, useMusic } from "@/hooks";
import { Controls, Slider, TogglePlayPause } from "./Audio";
import SongCardQueue from "../card/SongCardQueue";
import { ArrowDown, Lyrics, QueueListButton, ThreeDot } from "../svg";
import formatTime from "@/utils/timeConverter";

export default function FullPlayerMobile() {
  const { trackData, setIsListOpen, setPlayerOpen, isPlayerOpen } = useMusic();

  const handleClose = () => {
    setPlayerOpen(false);
  };

  return (
    <>
      <div
        className={`absolute ${
          isPlayerOpen ? "top-2" : "top-[2000px]"
        } left-2 right-2 bottom-2 flex flex-col justify-between bg-secondary p-6 rounded-lg z-40 transition-all duration-200 md:hidden`}
      >
        <div className="flex justify-between mb-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            title="close"
          >
            <ArrowDown />
          </button>
          <button title="menu">
            <ThreeDot />
          </button>
        </div>
        <div className="flex justify-center">
          <img
            src={
              trackData?.thumbnail[0] ||
              "https://images.unsplash.com/photo-1500239038240-9b3b8bac73c3?q=80&w=300&h=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="Song cover"
            className="w-3/4 aspect-square rounded-lg object-contain"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <div>
            <p className="text-xl font-bold">{trackData?.title}</p>
          </div>
          <div>
            {
              <Link
                href={`/artist/${trackData?.artists[0]?.browseId}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
              >
                {trackData?.artists[0]?.name}
              </Link>
            }
          </div>
        </div>
        <div>
          <Slider />
          <div className="flex justify-between mt-2">
            <TimeUpdate isLoading={false} />
            <span className="text-xs">{trackData?.duration}</span>
          </div>
        </div>
        <div className="flex justify-center items-center gap-8">
          <Controls controlType="previous" />
          <TogglePlayPause variant="mobile" />
          <Controls controlType="next" />
        </div>
        <div className="flex justify-around items-center mt-5">
          <button title="lyrics">
            <Lyrics />
          </button>
          <button title="queue" onClick={() => setIsListOpen((prev) => !prev)}>
            <QueueListButton />
          </button>
        </div>
      </div>
      <QueueListMobile />
    </>
  );
}

export const QueueListMobile = memo(function QueueList() {
  const { listTrackData, setIsListOpen, isListOpen } = useMusic();

  const trackList = useMemo(() => {
    if (!listTrackData) return [];
    return listTrackData?.map((content, index) => {
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

  return (
    <div
      className={`${
        isListOpen ? "inset-2" : "top-[2000px]"
      } transition-all duration-200 md:hidden absolute z-50 bg-secondary border border-secondary rounded-lg overflow-y-auto flex flex-col`}
    >
      <p className="px-4 py-2 sticky top-0 font-extrabold bg-secondary z-50 text-center">
        {trackList.length ? "Queue" : "No Data"}
      </p>
      <div className="flex flex-col gap-2 px-4 py-2">
        {trackList.length ? trackList : "No data"}
      </div>
      {isListOpen ? (
        <div className="bg-secondary fixed bottom-2 right-2 left-2 flex justify-center items-center py-2 rounded-bl-lg rounded-br-lg">
          <button
            className="w-full flex justify-center items-center"
            onClick={() => {
              setIsListOpen(false);
            }}
          >
            <ArrowDown />
          </button>
        </div>
      ) : null}
    </div>
  );
});

export function TimeUpdate({ isLoading }: { isLoading: boolean }) {
  const [time, setTime] = useState<string>("0:00");
  const { audioElement } = useAudio();

  useEffect(() => {
    const handleTimeUpdate = () => {
      const audio = audioElement.current;
      const timeFormated = formatTime(audio!.currentTime.toFixed());
      setTime(timeFormated);
    };

    const audio = audioElement.current;

    if (!isLoading && audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
    }

    if (isLoading) {
      setTime("0:00");
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [audioElement, isLoading]);

  return <span className="text-xs">{time}</span>;
}
