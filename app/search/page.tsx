import Loading from "@/components/Loading";
import Musics from "@/components/Musics";
import Playlist from "@/components/Playlist";
import SearchBox from "@/components/SearchBox";
import { search } from "@/utils/MusicClient";
import React, { Suspense } from "react";

export default function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="mt-10 flex flex-col gap-2 p-4">
      <div className="mb-10">
        <SearchBox />
      </div>
      <Suspense
        key={(searchParams.query as string) || ""}
        fallback={<Loading />}
      >
        <SearchResult query={(searchParams.query as string) || ""} />
      </Suspense>
    </div>
  );
}

async function SearchResult({ query }: { query: string }) {
  let data;
  try {
    if (query === "") return <></>;
    const datas = await search(query);
    data = datas;
  } catch (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Sorry try again later 🛠️</p>
      </div>
    );
  }

  return data.map((data: any) => {
    const title = data.title;
    return (
      <div key={title} className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">{title}</h2>
        {title?.toLowerCase() === "songs" ||
        title?.toLowerCase() === "videos" ? (
          <div className="flex flex-col gap-4">
            <Musics key={crypto.randomUUID()} musicData={data?.contents} />
          </div>
        ) : title?.toLowerCase() === "artists" ? (
          <div key={crypto.randomUUID()}>artist</div>
        ) : title?.toLowerCase() === "albums" ||
          title?.toLowerCase() === "community playlists" ? (
          <div className="flex gap-4">
            <Playlist playlistData={data?.contents} />
          </div>
        ) : null}
      </div>
    );
  });
}
