"use client";

import { BASE_URL } from "@/constant/constant";
import { MusicData } from "@/context/MusicProvider";
import useMusic from "@/hooks/useMusic";
import { Song } from "@/types/song";
import React, { useEffect, useRef, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { Next, Previous, Play, Pause, Loading } from "../svg";

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

async function fetcherSingelFresh(id: string): Promise<MusicPlayerProps> {
  const res = await fetch(`${BASE_URL}/api/media`, {
    // Use http://
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      context: {
        client: {
          clientName: "ANDROID_MUSIC",
          clientVersion: "5.26.1",
          androidSdkVersion: 30,
        },
        thirdParty: {
          embedUrl: "https://music.youtube.com",
        },
      },
      attestationRequest: {
        omitBotguardData: true,
      },
      racyCheckOk: true,
      contentCheckOk: true,
      videoId: id, // Replace with actual video ID
      params: "2AMBCgIQBg",
    }),
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
  const { data, isLoading } = useSWRImmutable(videoId, fetcherSingelFresh);

  console.log("new track");
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
        <Loading />
      ) : (
        <button onClick={togglePlay}>{isPaused ? <Play /> : <Pause />}</button>
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
      <Previous />
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
      <Next />
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
