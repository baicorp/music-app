"use client";
import { BASE_URL } from "@/constant/constant";
import React, { useRef, useState } from "react";
import useSWRImmutable from "swr/immutable";

async function fetchStreamData(videoId: string) {
  const response = await fetch(`${BASE_URL}/api/stream-android?id=${videoId}`, {
    method: "POST",
  });
  const data = await response.json();
  return data;
}

export default function Audios({ videoId }: { videoId: string }) {
  const { data, isLoading } = useSWRImmutable(videoId, fetchStreamData);
  const [lengthArray, _] = useState(data?.length);
  const [index, setIndex] = useState(0);
  const audioElement = useRef<HTMLAudioElement>(null);

  // console.log(lengthArray);
  console.log(index);

  async function handleError() {
    if (audioElement.current !== null) {
      if (!!!data) {
        console.log("cannot play this song data :(");
        return;
      }
      console.log("error nih bos");
      setIndex((prev) => prev + 1);
      if (index >= lengthArray) {
        return;
      }
      audioElement.current.src = data[index];
    } else {
      console.log("cannot play this song :(");
    }
  }

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <audio
        src={data[index]}
        ref={audioElement}
        onError={handleError}
        autoPlay
        controls
      ></audio>
    </div>
  );
}
