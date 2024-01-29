import Loading from "@/components/Loading";
import Musics from "@/components/Musics";
import SearchBox from "@/components/SearchBox";
import { search } from "@/utils/pipedAPI";
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
  const data = await search(query);
  if (query === "") return <></>;

  return <Musics musicData={data} />;
}
