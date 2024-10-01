"use client";
import React, { createContext, useEffect, useRef } from "react";
import { BASE_URL } from "@/constant/constant";
import { useMusic } from "@/hooks";
import { Song } from "@/types/song";
import useSWRImmutable from "swr/immutable";

async function fetchMultipleStreamData(videoId: string): Promise<Song> {
  try {
    const androidTestSuite = `${BASE_URL}/api/stream/android?videoId=${videoId}`;
    const piped = `${BASE_URL}/api/stream/piped?videoId=${videoId}`;

    const [androidRes, pipedRes] = await Promise.all([
      fetch(androidTestSuite, { method: "POST" }),
      fetch(piped),
    ]);

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
async function fetchSingleStreamData(videoId: string): Promise<Song> {
  try {
    const androidTestSuite = `${BASE_URL}/api/stream/android?videoId=${videoId}`;

    const androidRes = await fetch(androidTestSuite, { method: "POST" });

    if (!androidRes.ok) {
      throw new Error(`Server error: ${androidRes.statusText}`);
    }

    const androidData = await androidRes.json();

    return { ...androidData, url: [androidData?.url] };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

interface AudioProviderContext {
  audioElement: React.RefObject<HTMLAudioElement>;
  handleError: () => void;
  handleEnded: () => void;
  isLoading: boolean;
}

export const AudioProviderContext = createContext<
  AudioProviderContext | undefined
>(undefined);

export default function AudioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { trackData, listTrackData, setTrackData, setListTrackData } =
    useMusic();
  const audioElement = useRef<HTMLAudioElement>(null);

  const { data, isLoading } = useSWRImmutable(
    trackData?.videoId,
    fetchSingleStreamData,
    {
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
    }
  );

  useEffect(() => {
    // check if current videoId is the latest videoId in listTrackData, then fetch new new list from /api/next
    if (
      !listTrackData ||
      listTrackData[listTrackData.length - 1]?.videoId !== trackData?.videoId
    ) {
      return;
    }

    async function getContinuation() {
      if (!trackData) return;
      const response = await fetch(
        `${BASE_URL}/api/next?videoId=${trackData.videoId}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      setListTrackData((prev) => [...prev, ...data]);
    }

    getContinuation();
  }, [trackData?.videoId]);

  function handleError() {
    if (audioElement.current !== null && data?.url !== undefined) {
      if (!!!data) {
        console.log("cannot play this song data :(");
        return;
      }
      console.log(
        "cannot play this song data :(, trying to use another source..."
      );
      // audioElement.current.src = data?.url[1];
    } else {
      console.log("cannot play this song :(");
    }
  }

  function handleEnded() {
    if (!listTrackData || !audioElement.current) {
      return;
    }
    const currentIndex = listTrackData.findIndex(
      (track) => track.videoId === trackData?.videoId
    );
    const nextIndex = currentIndex + 1;
    if (nextIndex < listTrackData.length) {
      setTrackData(listTrackData[nextIndex]);
    }
  }

  console.log(data?.url);

  return (
    <AudioProviderContext.Provider
      value={{ audioElement, handleEnded, handleError, isLoading }}
    >
      <audio
        src={data?.url !== undefined ? data?.url[0] : ""}
        ref={audioElement}
        onError={handleError}
        autoPlay
        onEnded={handleEnded}
      />
      {children}
    </AudioProviderContext.Provider>
  );
}
