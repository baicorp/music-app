"use client";

import useMusic from "@/hooks/useMusic";
import React, {
  ReactElement,
  ReactNode,
  RefObject,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";
import useSWRImmutable from "swr/immutable";
import Loading from "./Loading";
import { getMusicPlayer, getPlaylist } from "@/utils/MusicClient";

async function fetcher(id: string) {
  const res = await fetch(`http://localhost:3000/api/stream?videoId=${id}`, {
    method: "POST",
  });
  const data = res.json();
  return data;
}

type MusicPlayerProps = {
  title: string;
  thumbnailUrl: string;
  uploader: string;
  url: string;
};

export default function AudioPlayer2() {
  const { id } = useMusic();
  const audioElement = useRef<HTMLAudioElement>(null);
  // const [data, setData] = useState<MusicPlayerProps>();
  // const [isLoading, setIsLoading] = useState(false);
  const { data, isLoading } = useSWRImmutable(id, fetcher);

  // useEffect(() => {
  //   async function getMusic() {
  //     const data = await getMusicPlayer(id || "1");
  //     setData(data);
  //   }
  //   getMusic();
  // }, [id]);

  // console.log(data?.title);

  return (
    <div className={`${id ? "" : "hidden"}`}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-[#1f1f1f] flex overflow-hidden relative">
          <img
            src={data?.thumbnailUrl}
            alt={data?.title + " image"}
            className="w-24 object-cover object-center rounded-md py-3 pl-4"
          />
          <div className="grow relative flex justify-between items-center">
            <div className="pl-5">
              <p className="font-semibold text-white line-clamp-1">
                {data?.title}
              </p>
              <p className="text-sm font-semibold text-gray-400 line-clamp-1">
                {data?.uploader}
              </p>
            </div>
            <div className="pr-4">
              <audio
                ref={audioElement}
                src={data?.url || ""}
                autoPlay
                onEnded={() => {
                  console.log("song ended bos");
                }}
              ></audio>
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
          errorElement ? (errorElement.style.bottom = "-300px") : "";
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
    <div className="h-[2px] rounded-sm absolute bottom-0 right-0 left-0">
      <div
        ref={progresRef}
        className="h-full bg-slate-300"
        style={{ width: `${timeStamp || 0}%` }}
      ></div>
    </div>
  );
}
