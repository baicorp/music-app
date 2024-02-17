"use client";

import useMusic from "@/hooks/useMusic";
import React, { RefObject, useEffect, useRef, useState } from "react";
import useSWRImmutable from "swr/immutable";

async function fetcher(id: string): Promise<MusicPlayerProps> {
  const [resData, resPipedData] = await Promise.all([
    fetch(`http://localhost:3000/api/stream?videoId=${id}`, {
      method: "POST",
    }),
    fetch(`https://pipedapi.kavin.rocks/streams/${id}`),
  ]);
  const data = await resData.json();
  const dataPiped = await resPipedData.json();
  const streamUrl =
    dataPiped?.audioStreams[dataPiped?.audioStreams?.length - 1]?.url;

  return { ...data, url: [data?.url, streamUrl] };
}

async function fetcherSingel(id: string): Promise<MusicPlayerProps> {
  const res = await fetch(`http://localhost:3000/api/stream?videoId=${id}`, {
    method: "POST",
  });
  const data = await res.json();
  return { ...data, url: [data?.url] };
}

type MusicPlayerProps = {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  uploader: string;
  url: string[];
};

export default function Audio({ videoId }: { videoId: string }) {
  const { data } = useSWRImmutable(videoId, fetcherSingel);

  const { listTrackData, setTrackData } = useMusic();

  const [playerLoad, setPlayerLoad] = useState(true);
  const audioElement = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setPlayerLoad(true);
  }, [videoId]);

  async function handleError(e: React.SyntheticEvent<HTMLAudioElement, Event>) {
    console.log("trying another source url ");
    e.currentTarget.src = data?.url[1]!;
  }

  return (
    <>
      <audio
        src={data?.url[0]}
        ref={audioElement}
        onError={(e) => handleError(e)}
        autoPlay
        onPlay={() => setPlayerLoad(false)}
        onEnded={() => {
          if (!listTrackData) {
            return;
          }
          let cuurrentIndexVideoId = listTrackData?.findIndex(
            (data) => data.videoId === videoId
          );
          cuurrentIndexVideoId++;
          if (cuurrentIndexVideoId > listTrackData.length - 1) {
            return;
          }
          setTrackData(listTrackData[cuurrentIndexVideoId]);
        }}
      ></audio>
      <TogglePlay audioElement={audioElement} isLoading={playerLoad} />
      <Progress audioElement={audioElement} trackData={data} />
    </>
  );
}

type AudioProps = {
  audioElement: RefObject<HTMLAudioElement>;
  isLoading?: boolean;
  trackData?: MusicPlayerProps;
};

function TogglePlay({ audioElement, isLoading }: AudioProps) {
  const [paused, setIsPaused] = useState<boolean>();

  function toggle() {
    if (audioElement.current?.paused) {
      audioElement.current?.play();
      setIsPaused(false);
    } else if (!audioElement.current?.paused) {
      audioElement.current?.pause();
      setIsPaused(true);
    }
  }

  useEffect(() => {
    audioElement.current?.addEventListener("ended", () => {
      setIsPaused(true);
    });
  });

  return (
    <div className="relative">
      <button className="text-3xl" disabled={isLoading} onClick={toggle}>
        {isLoading ? <PlayerLoading /> : paused ? "▶️" : "⏸️"}
      </button>
    </div>
  );
}

function Progress({ audioElement, trackData }: AudioProps) {
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
  }, [audioElement, trackData]);

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

function PlayerLoading() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
        .spinner_z9k8 {
          transform-origin: center;
          animation: spinner_StKS .75s infinite linear;
          fill: white; /* Change color to white */
        }

        @keyframes spinner_StKS {
          100% {
            transform: rotate(360deg);
          }
        }
      `}
      </style>
      <path
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      />
      <path
        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
        className="spinner_z9k8"
      />
    </svg>
  );
}
