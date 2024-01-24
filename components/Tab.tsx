"use client";

import { tabMenu } from "@/constant/constant";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Tab() {
  const searchParams = useSearchParams();

  return (
    <div className="flex gap-4">
      {tabMenu.map((data) => (
        <TabCard
          key={data.id}
          title={data.title}
          currentTab={searchParams.get("tab") || "Quick picks"}
        />
      ))}
    </div>
  );
}

function TabCard({ title, currentTab }: { title: string; currentTab: string }) {
  const router = useRouter();
  return (
    <div
      className={`px-3 py-2 text-sm bg-[#3f3f3f] rounded-md cursor-pointer ${
        currentTab === title
          ? "bg-slate-100 text-[#0f0f0f]"
          : "hover:bg-[#535353]"
      }`}
      onClick={() => {
        router.push(`?tab=${title}`);
      }}
    >
      <p>{title}</p>
    </div>
  );
}
