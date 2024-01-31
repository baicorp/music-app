"use client";

import useMusic from "@/hooks/useMusic";
import { getMusicFromInvidious } from "@/utils/invidiousApi";
import React, {
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useSWRImmutable from "swr/immutable";
import Loading from "./Loading";

export default function AudioPlayer2() {
  const { id } = useMusic();
  const audioElement = useRef<HTMLAudioElement>(null);
  const { data, isLoading } = useSWRImmutable(id, getMusicFromInvidious);

  const thumbnailUrl =
    data?.videoThumbnails[data?.videoThumbnails?.length - 1]?.url;
  const title = data?.title;
  const uploader = data?.author;
  const url = data?.adaptiveFormats[0].url;

  return (
    <div className={`${id ? "" : "hidden"}`}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-[#1f1f1f] flex overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={title + " image"}
            className="w-24 h-[72px] object-cover object-center"
          />
          <div className="grow relative flex justify-between items-center">
            <div className="pl-5">
              <p className="font-semibold text-white line-clamp-1">{title}</p>
              <p className="text-sm font-semibold text-gray-400 line-clamp-1">
                {uploader}
              </p>
            </div>
            <div className="pr-4">
              <audio ref={audioElement} src={url || ""}></audio>
              <TogglePlay
                audioElement={audioElement}
                isLoading={isLoading}
                id={id!}
              />
              <Progress audioElement={audioElement} id={id!} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type AudioProps = {
  audioElement: RefObject<HTMLAudioElement>;
  isLoading?: boolean;
  id?: string;
};

function TogglePlay({ audioElement, id, isLoading }: AudioProps) {
  const [paused, setIsPaused] = useState<boolean>();
  const errorMessage = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    audioElement.current
      ?.play()
      .catch(() => {
        const errorElement = errorMessage.current;
        setTimeout(() => {
          errorElement ? (errorMessage.current.style.bottom = "-300px") : "";
        }, 3000);
        errorElement ? (errorMessage.current.style.bottom = "50%") : "";
      })
      .finally(() => {
        setIsPaused(audioElement.current?.paused);
      });
  }, [id]);

  function toggle() {
    if (audioElement.current?.paused) {
      audioElement.current?.play();
      setIsPaused(false);
    } else if (!audioElement.current?.paused) {
      audioElement.current?.pause();
      setIsPaused(true);
    }
  }

  return (
    <div className="relative">
      <p
        ref={errorMessage}
        className="absolute w-[113px] duration-300 p-1 rounded-md text-xs -left-[10px] -bottom-96 translate-y-1/2 -translate-x-full bg-rose-500 text-white"
      >
        Can't play this song
      </p>
      <button
        className="bg-gray-200 text-2xl border"
        disabled={isLoading}
        onClick={toggle}
      >
        {isLoading ? <Loading /> : paused ? "▶️" : "⏸️"}
      </button>
    </div>
  );
}

function Progress({ audioElement, id }: AudioProps) {
  const [timeStamp, setTimeStamp] = useState(0);

  const progresRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeStamp(0);
    const handleTimeUpdate = () => {
      const progress =
        ((audioElement?.current?.currentTime || 1) /
          (audioElement?.current?.duration || 0)) *
        100;
      setTimeStamp(progress);
    };

    audioElement.current?.addEventListener("timeupdate", handleTimeUpdate);

    // Cleanup function
    return () => {
      audioElement.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioElement, id]);

  return (
    <div className="h-1 absolute bottom-0 right-0 left-0">
      <div
        ref={progresRef}
        className="h-full bg-slate-300"
        style={{ width: `${timeStamp || 0}%` }}
      ></div>
    </div>
  );
}
