"use client";

import { BASE_URL } from "@/constant/constant";
import { MusicData } from "@/context/MusicProvider";
import useMusic from "@/hooks/useMusic";
import { Song } from "@/types/song";
import React, { useEffect, useRef, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { Next, Previous, Play, Pause, Loading } from "../svg";

async function fetchMobile(id: string): Promise<MusicPlayerProps> {
  try {
    const res = await fetch(`${BASE_URL}/api/stream?id=${id}`, {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.statusText}`);
    }

    const data = await res.json();
    return { ...data, url: [data?.url] };
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    throw error;
  }
}

async function fetchWeb(id: string): Promise<{ url: string[] }> {
  try {
    const res = await fetch(`${BASE_URL}/api/stream-data?videoId=${id}`);

    if (!res.ok) {
      throw new Error(`Server error: ${res.statusText}`);
    }

    const data = await res.json();
    return { url: [data?.url] };
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    throw error;
  }
}

async function fetchTvhtml5(id: string): Promise<{ url: string[] }> {
  try {
    const res = await fetch(`${BASE_URL}/api/tvhtml5?id=${id}`);

    if (!res.ok) {
      throw new Error(`Server error: ${res.statusText}`);
    }

    const data = await res.json();
    return { url: [data] };
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
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
  const { data, isLoading } = useSWRImmutable(videoId, fetchMobile);

  const { listTrackData, setTrackData } = useMusic();
  const [isPaused, setIsPaused] = useState(false);
  const audioElement = useRef<HTMLAudioElement>(null);

  async function handleError() {
    console.log("cannot play this song :(");
    const data = await fetchTvhtml5(videoId);
    if (audioElement.current !== null) {
      audioElement.current.src = data.url[0];
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
      />
      <div className="flex items-center gap-2 md:gap-8">
        <PreviouseTrack
          onSetTrack={setTrackData}
          listTrackData={listTrackData}
          videoId={videoId}
        />
        <TogglePlayPause
          isPaused={isPaused}
          isLoading={isLoading}
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
  const togglePlay = () => {
    if (audioRef?.current) {
      audioRef.current.paused
        ? audioRef.current.play()
        : audioRef.current.pause();
    }
  };

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
    <div className="h-[2px] rounded-sm absolute bottom-0 right-0 left-0">
      <div className="h-full bg-slate-300" style={{ width: `${progress}%` }} />
    </div>
  );
}
