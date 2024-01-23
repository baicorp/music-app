"use client";

import { useRouter } from "next/navigation";

export default function RefreshButton() {
  const router = useRouter();
  return (
    <button
      className="text-black bg-[#f1f3f4] rounded-xl w-[410px] h-[106px]"
      onClick={() => {
        router.refresh();
      }}
    >
      ⟳ refresh
    </button>
  );
}
