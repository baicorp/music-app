"use client";

import Image from "next/image";
import RefreshButton from "./RefreshButton";
import { revalidateTag } from "next/cache";
import useSWR from "swr";
import Loading from "./Loading";
import { useState } from "react";

async function fetcher(url: string) {
  const res = await fetch(url);
  return await res.json();
}

export default function SongCard({ title, artist, id, img }: SongCardProps) {
  const [rerender, setRerender] = useState(false);
  const { data, isLoading } = useSWR(
    `http://localhost:3000/song/url/v1?id=${id}&level=hires`,
    fetcher
  );

  console.log("rerender");

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : data?.code !== 200 ? (
        <button
          className="text-black bg-[#f1f3f4] rounded-xl w-[410px] h-[106px]"
          onClick={() => {
            console.log("click");
            setRerender((prev) => !prev);
          }}
        >
          ⟳ refresh
        </button>
      ) : (
        <div
          className={`bg-[#f1f3f4] rounded-xl max-w-[410px] overflow-hidden flex gap-2 ${
            !data?.data[0]?.url ? "hidden" : ""
          }`}
        >
          <Image
            src={img}
            alt={title + "image"}
            width={1400}
            height={1400}
            className="w-[100px]"
          />
          <div>
            <div>
              <p className="font-semibold px-4 pt-2 text-black line-clamp-1">
                {title}
              </p>
              <p className="text-sm px-4 text-black line-clamp-1">{artist}</p>
            </div>
            <audio controls src={data?.data[0]?.url}></audio>
          </div>
        </div>
      )}
    </>
  );
}

type SongCardProps = {
  title: string;
  artist: string;
  id: string;
  img: string;
};
