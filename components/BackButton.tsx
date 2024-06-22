"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowBack } from "./svg";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="p-4 lg:px-6 xl:px-10 backdrop-blur-sm sticky top-0 font-semibold z-10">
      <button
        className="flex gap-2 w-fit"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowBack />
        <p>Back</p>
      </button>
    </div>
  );
}
