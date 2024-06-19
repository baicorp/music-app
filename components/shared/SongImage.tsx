"use client";
import useMusic from "@/hooks/useMusic";
import React from "react";
import { BrokenImage, Speaker } from "../svg";

export default function SongImage({
  index,
  videoId,
  title,
  thumbnail,
  variant,
}: {
  index?: string;
  videoId: string;
  title: string;
  thumbnail: string;
  variant: "queue" | "default" | "album";
}) {
  const { trackData } = useMusic();
  return (
    <div
      className={`relative overflow-hidden ${
        variant === "queue" ? "w-14 h-14" : "w-14 h-14 lg:w-16 lg:h-16"
      } shrink-0 flex justify-center items-center`}
    >
      {variant === "album" ? (
        <p className="font-semibold">{index}</p>
      ) : thumbnail ? (
        <img
          src={thumbnail}
          loading="lazy"
          alt={title + " image"}
          width={400}
          height={400}
          className="w-full h-full shrink-0 aspect-square object-center object-cover rounded-md"
        />
      ) : (
        <BrokenImage />
      )}
      <div
        className={`${
          trackData?.videoId === videoId ? "block" : "hidden"
        } absolute inset-0 bg-[#000000b3] flex justify-center items-center`}
      >
        <Speaker />
      </div>
    </div>
  );
}
