"use client";

import { BASE_URL } from "@/constant/constant";
import { useMusic } from "@/hooks";
import { Song } from "@/types/song";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useSWRImmutable from "swr/immutable";
import Link from "next/link";
import {
  Next,
  Previous,
  Play,
  Pause,
  Loading,
  QueueListButton,
  ThreeDot,
  ArrowDown,
  Lyrics,
} from "../svg";
import formatTime from "@/utils/timeConverter";
import SongCardQueue from "../card/SongCardQueue";

async function fetchStreamData(videoId: string): Promise<Song> {
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

export default function Audio({
  videoId,
  setIsOpen,
  isOpen,
}: {
  videoId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  const { data, isLoading } = useSWRImmutable(videoId, fetchStreamData, {
    onSuccess: (data) => {
      setTrackData((previous) => {
        if (!previous) return undefined;
        return {
          ...previous,
          duration: previous.duration ? previous.duration : data?.duration,
          thumbnail: [previous?.thumbnail[0], data?.thumbnail[0]],
          url: data?.url,
        };
      });
    },
  });

  const { trackData, listTrackData, setTrackData, setListTrackData } =
    useMusic();
  const [isPaused, setIsPaused] = useState(false);
  const audioElement = useRef<HTMLAudioElement>(null);
  const [loading, setLoading] = useState(true);
  const [queueOpen, setQueueOpen] = useState(false);

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
    if (audioElement.current !== null && data?.url !== undefined) {
      if (!!!data) {
        console.log("cannot play this song data :(");
        return;
      }
      console.log(
        "cannot play this song data :(, trying to use another source..."
      );
      audioElement.current.src = data?.url[1];
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
        src={data?.url !== undefined ? data?.url[0] : ""}
        ref={audioElement}
        onError={handleError}
        autoPlay
        onEnded={handleEnded}
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
        onWaiting={() => setLoading(true)}
        onPlaying={() => setLoading(false)}
      />
      <div className="flex items-center gap-5 md:gap-8">
        <div className="hidden md:block">
          <PreviouseTrack
            onSetTrack={setTrackData}
            listTrackData={listTrackData}
            videoId={videoId}
          >
            <Previous />
          </PreviouseTrack>
        </div>
        <TogglePlayPause
          isPaused={isPaused}
          isLoading={loading || isLoading}
          audioRef={audioElement}
        >
          {isPaused ? <Play /> : <Pause />}
        </TogglePlayPause>
        <NextTrack
          onSetTrack={setTrackData}
          listTrackData={listTrackData}
          videoId={videoId}
        >
          <Next />
        </NextTrack>
      </div>
      <div
        className={`rounded-sm absolute bottom-0 right-0 left-0 ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <Progress audioRef={audioElement} isLoading={isLoading} />
      </div>
      {/* full player for mobile */}
      <div
        className={`fixed ${
          isOpen ? "top-2" : "top-[1000px]"
        } left-2 right-2 bottom-2 flex flex-col justify-between bg-transparent backdrop-blur-3xl shadow-[#00000005] shadow-[0_0_3px] p-6 rounded-lg z-40 transition-all duration-200 md:hidden`}
      >
        <div className="flex justify-between mb-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
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
                  console.log("close");
                  setIsOpen(false);
                }}
              >
                {trackData?.artists[0]?.name}
              </Link>
            }
          </div>
        </div>
        <div className="flex flex-col gap-1.5 mt-2">
          <div className="bg-[#ffffff33] rounded-full overflow-hidden">
            <Progress audioRef={audioElement} isLoading={isLoading} />
          </div>
          <div className="flex justify-between text-gray-300">
            <TimeUpdate audioRef={audioElement} isLoading={isLoading} />
            <span className="text-xs">
              {trackData?.duration || (
                <div className="w-7 h-3 aspect-square rounded-md bg-gray-300 animate-pulse"></div>
              )}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center gap-8">
          <PreviouseTrack
            onSetTrack={setTrackData}
            listTrackData={listTrackData}
            videoId={trackData?.videoId || ""}
          >
            <Previous width="35px" height="35px" />
          </PreviouseTrack>
          <TogglePlayPause
            isPaused={isPaused}
            isLoading={loading || isLoading}
            audioRef={audioElement}
          >
            <div className="p-2 bg-[#ffffff33] rounded-full">
              {isPaused ? (
                <Play width="40px" height="40px" />
              ) : (
                <Pause width="40px" height="40px" />
              )}
            </div>
          </TogglePlayPause>
          <NextTrack
            onSetTrack={setTrackData}
            listTrackData={listTrackData}
            videoId={trackData?.videoId || ""}
          >
            <Next width="35x" height="35px" />
          </NextTrack>
        </div>
        <div className="flex justify-around items-center mt-5">
          <button title="lyrics">
            <Lyrics />
          </button>
          <button
            title="queue"
            onClick={(e) => {
              e.stopPropagation();
              setQueueOpen(true);
            }}
          >
            <QueueListButton />
          </button>
        </div>
      </div>
      {/* queue inside full player */}
      <QueueList isQueueOpen={queueOpen} setIsQueueOpen={setQueueOpen} />
    </>
  );
}

export function TogglePlayPause({
  isPaused,
  isLoading,
  audioRef,
  children,
}: {
  isPaused: boolean;
  isLoading: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  children: ReactNode;
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
        <div className="p-2 bg-[#ffffff33] rounded-full w-[56px] h-[56px] flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <button onClick={togglePlay}>{children}</button>
      )}
    </>
  );
}

export function PreviouseTrack({
  listTrackData,
  videoId,
  onSetTrack,
  children,
}: {
  listTrackData: Song[] | undefined;
  videoId: string;
  onSetTrack: React.Dispatch<React.SetStateAction<Song | undefined>>;
  children: ReactNode;
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
    const prevIndex = currentIndex - 1;
    if (0 <= prevIndex) {
      onSetTrack(listTrackData[prevIndex]);
    }
  }

  return <button onClick={handlePreviousTrack}>{children}</button>;
}

export function NextTrack({
  listTrackData,
  videoId,
  onSetTrack,
  children,
}: {
  listTrackData: Song[] | undefined;
  videoId: string;
  onSetTrack: React.Dispatch<React.SetStateAction<Song | undefined>>;
  children: ReactNode;
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
  return <button onClick={handleNextTrack}>{children}</button>;
}

export function TimeUpdate({
  audioRef,
  isLoading,
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
  isLoading: boolean;
}) {
  const [time, setTime] = useState<string>("0:00");

  useEffect(() => {
    const handleTimeUpdate = () => {
      const audio = audioRef.current;
      const timeFormated = formatTime(audio!.currentTime.toFixed());
      setTime(timeFormated);
    };

    const audio = audioRef.current;

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
  }, [audioRef, isLoading]);

  return <span className="text-xs">{time}</span>;
}

export function Progress({
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
    <div className="h-[3px]">
      <div className="h-full bg-white" style={{ width: `${progress}%` }} />
    </div>
  );
}

const QueueList = memo(function QueueList({
  isQueueOpen,
  setIsQueueOpen,
}: {
  isQueueOpen: boolean;
  setIsQueueOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { listTrackData } = useMusic();

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
        isQueueOpen ? "inset-2" : "top-[900px]"
      } transition-all duration-200 md:hidden fixed z-50 bg-secondary border border-secondary rounded-lg overflow-y-auto flex flex-col`}
    >
      <p className="px-4 py-2 sticky top-0 font-extrabold backdrop-blur-sm z-50 text-center">
        {trackList.length ? "Queue" : "No Data"}
      </p>
      <div className="flex flex-col gap-2 px-4 py-2">
        {trackList.length ? trackList : "No data"}
      </div>
      {isQueueOpen ? (
        <div className="backdrop-blur-3xl fixed bottom-2 right-2 left-2 flex justify-center items-center py-2 rounded-bl-lg rounded-br-lg">
          <button
            onClick={() => {
              setIsQueueOpen(false);
            }}
          >
            <ArrowDown />
          </button>
        </div>
      ) : null}
    </div>
  );
});
