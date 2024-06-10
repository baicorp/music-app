"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useMusic from "@/hooks/useMusic";
import { ArrowBack } from "./svg";

export default function BackButton() {
  const router = useRouter();
  const { setIsQueueOpen } = useMusic();

  return (
    <div className="p-4 lg:px-6 xl:px-10 backdrop-blur-sm sticky top-0 font-semibold z-50">
      <button
        className="flex gap-2 w-fit"
        onClick={() => {
          setIsQueueOpen(false);
          router.back();
        }}
      >
        <ArrowBack />
        <p>Back</p>
      </button>
    </div>
  );
}
