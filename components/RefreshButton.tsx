"use client";

import { useRouter } from "next/router";
export default function RefreshButton() {
  const router = useRouter();
  return (
    <button
      className="text-xs bg-[#f1f3f4] rounded-xl max-w-[410px]"
      onClick={() => {
        router.reload();
      }}
    >
      ⟳ refresh
    </button>
  );
}
