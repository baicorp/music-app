"use client";

import { BASE_URL } from "@/constant/constant";
import { MusicData } from "@/context/MusicProvider";
import useMusic from "@/hooks/useMusic";
import { Song } from "@/types/song";
import { getVideo } from "@/utils/MusicClient";
import wait from "@/utils/wait";
import React, { useEffect, useRef, useState } from "react";
import useSWRImmutable from "swr/immutable";

async function fetcher(id: string): Promise<MusicPlayerProps> {
  const [resData, resPipedData] = await Promise.all([
    fetch(`${BASE_URL}/api/stream?videoId=${id}`, {
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
  const res = await fetch(`${BASE_URL}/api/stream?videoId=${id}`, {
    method: "POST",
  });
  const data = await res.json();
  return { ...data, url: [data?.url] };
}

export type MusicPlayerProps = {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  uploader: string;
  url: string[];
};

export default function Audio({ videoId }: { videoId: string }) {
  const { data, isLoading } = useSWRImmutable(videoId, fetcherSingel);

  const { listTrackData, setTrackData } = useMusic();
  const [isPaused, setIsPaused] = useState(false);
  const audioElement = useRef<HTMLAudioElement>(null);

  async function handleError() {
    const nextUrl = data?.url?.[1];
    if (nextUrl) {
      audioElement.current?.setAttribute("src", nextUrl);
      audioElement.current?.load();
    }
  }

  function togglePlay() {
    if (audioElement.current) {
      if (audioElement.current.paused) {
        audioElement.current.play();
      } else {
        audioElement.current.pause();
      }
      setIsPaused(audioElement.current.paused);
    }
  }

  function handleEnded() {
    if (!listTrackData || !audioElement.current) {
      return;
    }
    const currentIndex = listTrackData.findIndex(
      (track) => track.videoId === videoId
    );
    const nextIndex = currentIndex + 1;
    if (nextIndex < listTrackData.length) {
      setTrackData(listTrackData[nextIndex]);
    }
  }

  return (
    <>
      <audio
        src={data?.url?.[0]}
        ref={audioElement}
        onError={handleError}
        autoPlay
        onEnded={handleEnded}
      />
      <div className="flex items-center gap-8">
        <PreviouseTrack
          onSetTrack={setTrackData}
          listTrackData={listTrackData}
          videoId={videoId}
        />
        <TogglePlayPause
          isPaused={isPaused}
          isLoading={isLoading}
          togglePlay={togglePlay}
        />
        <NextTrack
          onSetTrack={setTrackData}
          listTrackData={listTrackData}
          videoId={videoId}
        />
      </div>
      <Progress audioElement={audioElement} />
    </>
  );
}

type TogglePlayProps = {
  isPaused: boolean;
  isLoading: boolean;
  togglePlay: () => void;
};

function TogglePlayPause({ isPaused, isLoading, togglePlay }: TogglePlayProps) {
  return (
    <div className="relative">
      {isLoading ? (
        <svg
          version="1.1"
          id="L9"
          width="50px"
          height="50px"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enableBackground="new 0 0 0 0"
          xmlSpace="preserve"
        >
          <path
            fill="#fff"
            d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="1s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      ) : (
        <button onClick={togglePlay}>
          {isPaused ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="50px"
              viewBox="0 -960 960 960"
              width="50px"
              fill="#e8eaed"
            >
              <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="50px"
              viewBox="0 -960 960 960"
              width="50px"
              fill="#e8eaed"
            >
              <path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

function PreviouseTrack({
  listTrackData,
  videoId,
  onSetTrack,
}: {
  listTrackData: Song[] | undefined;
  videoId: string;
  onSetTrack: React.Dispatch<React.SetStateAction<MusicData | undefined>>;
}) {
  function handlePreviousTrack() {
    if (!listTrackData) {
      return;
    }
    const currentIndex = listTrackData.findIndex(
      (track) => track.videoId === videoId
    );
    const nextIndex = currentIndex - 1;
    if (0 < nextIndex) {
      onSetTrack(listTrackData[nextIndex]);
    }
  }

  return (
    <button onClick={handlePreviousTrack}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e8eaed"
      >
        <path d="M220-240v-480h80v480h-80Zm520 0L380-480l360-240v480Zm-80-240Zm0 90v-180l-136 90 136 90Z" />
      </svg>
    </button>
  );
}

function NextTrack({
  listTrackData,
  videoId,
  onSetTrack,
}: {
  listTrackData: Song[] | undefined;
  videoId: string;
  onSetTrack: React.Dispatch<React.SetStateAction<MusicData | undefined>>;
}) {
  function handleNextTrack() {
    if (!listTrackData) {
      return;
    }
    const currentIndex = listTrackData.findIndex(
      (track) => track.videoId === videoId
    );
    const nextIndex = currentIndex + 1;
    if (nextIndex < listTrackData.length) {
      onSetTrack(listTrackData[nextIndex]);
    }
  }
  return (
    <button onClick={handleNextTrack}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e8eaed"
      >
        <path d="M660-240v-480h80v480h-80Zm-440 0v-480l360 240-360 240Zm80-240Zm0 90 136-90-136-90v180Z" />
      </svg>
    </button>
  );
}

function Progress({
  audioElement,
}: {
  audioElement: React.RefObject<HTMLAudioElement>;
}) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioElement.current && audioElement.current.duration) {
        const newProgress =
          (audioElement.current.currentTime / audioElement.current.duration) *
          100;
        setProgress(newProgress);
      }
    };

    audioElement.current?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioElement.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioElement]);

  return (
    <div className="h-[2px] rounded-sm absolute bottom-0 right-0 left-0">
      <div className="h-full bg-slate-300" style={{ width: `${progress}%` }} />
    </div>
  );
}
