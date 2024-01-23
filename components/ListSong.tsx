"use client";

import { Suspense } from "react";
import Loading from "./Loading";
import SongCard from "./SongCard";
import useSWR from "swr";

async function fethcher(url: string) {
  const res = await fetch(url);
  return await res.json();
}

export default function ListSong({ keywords }: { keywords: string }) {
  if (keywords === undefined || keywords === "") return <p>🎧 🎧 🎧</p>;

  const { data, isLoading } = useSWR(
    `http://localhost:3000/cloudsearch?keywords=${keywords}`,
    fethcher
  );

  return (
    <div className="grid gap-4">
      {isLoading ? (
        <Loading />
      ) : (
        data?.result?.songs?.map((data: any) => (
          // <Suspense key={crypto.randomUUID()} fallback={<Loading />}>
          <SongCard
            key={crypto.randomUUID()}
            title={data?.name}
            artist={data?.ar
              ?.map((data: { name: string }) => data.name)
              ?.toString()
              ?.replaceAll(",", " & ")}
            id={data?.id}
            img={data?.al?.picUrl}
          />
          // </Suspense>
        ))
      )}
    </div>
  );
}
