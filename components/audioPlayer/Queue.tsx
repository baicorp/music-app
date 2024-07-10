"use client";

import { useMusic } from "@/hooks";
import { QueueListButton } from "../svg";

export default function Queue() {
  const { setIsListOpen } = useMusic();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setIsListOpen((prev) => !prev);
      }}
      className="hidden md:block"
    >
      <QueueListButton />
    </button>
  );
}
