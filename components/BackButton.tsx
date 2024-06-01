"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useMusic from "@/hooks/useMusic";

export default function BackButton() {
  const router = useRouter();
  const { setIsQueueOpen } = useMusic();

  return (
    <div className="p-4 lg:px-6 xl:px-10 bg-[#1c1c1c] sticky top-0">
      <button
        className="flex gap-2 w-fit"
        onClick={() => {
          setIsQueueOpen(false);
          router.back();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
        <p>Back</p>
      </button>
    </div>
  );
}
