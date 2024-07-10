"use client";

import React, { useEffect, useState } from "react";
import { useAudio, useMusic } from "@/hooks";
import { Next, Previous, Play, Pause, Loading } from "../svg";

export default function Audio() {
  return (
    <>
      <div className="md:grow flex gap-4 items-center">
        <div className="flex items-center gap-5 lg:gap-8">
          <Controls className="hidden md:block" controlType="previous" />
          <TogglePlayPause />
          <Controls controlType="next" />
        </div>
        <div className="hidden md:block w-full">
          <Slider />
        </div>
      </div>
    </>
  );
}

export function Slider() {
  const { audioElement } = useAudio();
  const [range, setRange] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const audio = audioElement.current;
    const handleTimeUpdate = () => {
      if (audio?.duration) {
        setDuration(audio?.duration);
        setRange(Math.ceil(audio.currentTime));
      }
    };
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
    }
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [audioElement]);

  const handleChangeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioElement.current;
    if (audio) {
      audio.currentTime = Number(e.target.value);
      setRange(Number(e.target.value));
    }
  };

  return (
    <div
      className="bg-[#ffffff40] relative h-1 md:w-full group"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="cursor-pointer h-full rounded-full bg-white relative"
        style={{
          width: `${(range / duration) * 100}%`,
        }}
      ></div>
      <input
        className="hidden cursor-pointer w-full rounded-full absolute top-0 group-hover:block"
        type="range"
        min="0"
        max={audioElement.current?.duration || 0}
        value={range}
        onChange={(e) => {
          e.stopPropagation();
          handleChangeRange(e);
        }}
      />
    </div>
  );
}

export function TogglePlayPause({
  variant = "default",
}: {
  variant?: "default" | "mobile";
}) {
  const { isLoading, audioElement } = useAudio();

  function togglePlay(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    if (audioElement?.current) {
      audioElement.current.paused
        ? audioElement.current.play()
        : audioElement.current.pause();
    }
  }

  const [isplay, setIsPlay] = useState(false);
  const [isLoad, setIsLoad] = useState(isLoading);

  useEffect(() => {
    const audio = audioElement.current;
    if (!audio) {
      setIsLoad(true);
      return;
    }
    isLoading ? setIsLoad(true) : setIsLoad(false);
    audio.addEventListener("play", () => setIsPlay(false));
    audio.addEventListener("pause", () => setIsPlay(true));
  }, [audioElement, isLoading]);

  return (
    <>
      {isLoad ? (
        variant === "mobile" ? (
          <div className="p-2 bg-[#ffffff33] rounded-full w-[56px] h-[56px] flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <Loading />
        )
      ) : (
        <button onClick={togglePlay}>
          {isplay ? (
            variant === "mobile" ? (
              <Play width="35px" height="35px" />
            ) : (
              <Play />
            )
          ) : variant === "mobile" ? (
            <Pause width="35px" height="35px" />
          ) : (
            <Pause />
          )}
        </button>
      )}
    </>
  );
}

export function Controls({
  controlType,
  className,
}: {
  controlType: "next" | "previous";
  className?: string;
}) {
  const { trackData, listTrackData, setTrackData } = useMusic();

  function handleControl(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (!listTrackData || !trackData) return;
    const currentIndex = listTrackData.findIndex(
      (track) => track.videoId === trackData?.videoId
    );
    if (controlType === "next") {
      currentIndex < listTrackData.length - 1
        ? setTrackData(listTrackData[currentIndex + 1])
        : null;
    } else if (controlType === "previous") {
      currentIndex > 0 ? setTrackData(listTrackData[currentIndex - 1]) : null;
    }
  }

  return (
    <button className={`${className}`} onClick={handleControl}>
      {controlType === "next" ? <Next /> : <Previous />}
    </button>
  );
}
