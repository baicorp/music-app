"use client";

import { useMusic } from "@/hooks";
import Audio from "./Audio";
import Queue from "./Queue";
import AudioInfo from "./AudioInfo";

export default function AudioPlayer() {
  const { trackData, setPlayerOpen } = useMusic();
  const handleOpen = () => {
    setPlayerOpen(true);
  };

  if (!trackData) return null;

  return (
    <div
      onClick={handleOpen}
      className="bg-[#1c1c1c] flex justify-between md:justify-normal items-center md:gap-6 px-2 lg:px-6 md:px-4 h-[65px] md:h-[76px]"
    >
      <div className="min-w-64 xl:max-w-80 flex item-center">
        <AudioInfo
          thumbnail={trackData?.thumbnail ? trackData?.thumbnail[0] : ""}
          title={trackData?.title}
          artists={trackData?.artists}
        />
      </div>
      <Audio />
      <Queue />
    </div>
  );
}
