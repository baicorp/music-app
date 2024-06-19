"use client";

import { BASE_URL } from "@/constant/constant";
import { MusicData } from "@/context/MusicProvider";
import useMusic from "@/hooks/useMusic";
import { Song } from "@/types/song";
import React, { useEffect, useRef, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { Next, Previous, Play, Pause, Loading } from "../svg";

async function fetchStreamData(videoId: string): Promise<MusicPlayerProps> {
  try {
    const androidTestSuite = `${BASE_URL}/api/stream/android?videoId=${videoId}`;
    const piped = `${BASE_URL}/api/stream/piped?videoId=${videoId}`;
    // const tvhtml5 = `${BASE_URL}/api/stream/tvhtml5?videoId=${videoId}`;

    // const [androidRes, pipedRes, tvhtml5res] = await Promise.all([
    const [androidRes, pipedRes] = await Promise.all([
      fetch(androidTestSuite, { method: "POST" }),
      fetch(piped),
      // fetch(tvhtml5, { method: "POST" }),
    ]);

    // if (!androidRes.ok || !tvhtml5res.ok) {
    if (!androidRes.ok || !pipedRes.ok) {
      throw new Error(
        `Server error: ${androidRes.statusText} / ${pipedRes.statusText}`
      );
    }

    const [androidData, pipedData] = await Promise.all([
      androidRes.json(),
      pipedRes.json(),
    ]);

    return { ...androidData, url: [androidData?.url, pipedData] };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export type MusicPlayerProps = {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  uploader: string;
  url: string;
};

export default function Audio({ videoId }: { videoId: string }) {
  const { data, isLoading } = useSWRImmutable(videoId, fetchStreamData);

  const { listTrackData, setTrackData, setListTrackData } = useMusic();
  const [isPaused, setIsPaused] = useState(false);
  const audioElement = useRef<HTMLAudioElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check if current videoId is the latest videoId in listTrackData, then fetch new new list from /api/next
    if (
      !listTrackData ||
      listTrackData[listTrackData.length - 1]?.videoId !== videoId
    ) {
      return;
    }

    async function getContinuation() {
      const response = await fetch(`${BASE_URL}/api/next?videoId=${videoId}`, {
        method: "POST",
      });
      const data = await response.json();
      setListTrackData((prev) => [...prev, ...data]);
    }
    getContinuation();
  }, [videoId]);

  async function handleError() {
    if (audioElement.current !== null) {
      if (!!!data) {
        console.log("cannot play this song data :(");
        return;
      }
      console.log(
        "cannot play this song data :(, trying to use another source..."
      );
      audioElement.current.src = data.url[1];
    } else {
      console.log("cannot play this song :(");
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
        src={data?.url[0]}
        ref={audioElement}
        onError={handleError}
        autoPlay
        onEnded={handleEnded}
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
        onWaiting={() => setLoading(true)}
        onPlaying={() => setLoading(false)}
      />
      <div className="flex items-center gap-6 md:gap-8">
        <PreviouseTrack
          onSetTrack={setTrackData}
          listTrackData={listTrackData}
          videoId={videoId}
        />
        <TogglePlayPause
          isPaused={isPaused}
          isLoading={loading || isLoading}
          audioRef={audioElement}
        />
        <NextTrack
          onSetTrack={setTrackData}
          listTrackData={listTrackData}
          videoId={videoId}
        />
      </div>
      <Progress audioRef={audioElement} isLoading={isLoading} />
    </>
  );
}

function TogglePlayPause({
  isPaused,
  isLoading,
  audioRef,
}: {
  isPaused: boolean;
  isLoading: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
}) {
  function togglePlay(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    if (audioRef?.current) {
      audioRef.current.paused
        ? audioRef.current.play()
        : audioRef.current.pause();
    }
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <button onClick={togglePlay}>{isPaused ? <Play /> : <Pause />}</button>
      )}
    </>
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
  function handlePreviousTrack(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();
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
    <button onClick={handlePreviousTrack} className="hidden md:block">
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
  function handleNextTrack(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
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
  audioRef,
  isLoading,
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
  isLoading: boolean;
}) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleTimeUpdate = () => {
      const audio = audioRef.current;
      if (audio?.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const audio = audioRef.current;

    if (!isLoading && audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
    }

    if (isLoading) {
      setProgress(0);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [audioRef, isLoading]);

  return (
    <div className="h-[3px] rounded-sm absolute bottom-0 right-0 left-0">
      <div className="h-full bg-slate-300" style={{ width: `${progress}%` }} />
    </div>
  );
}
