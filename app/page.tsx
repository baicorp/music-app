import SearchBox from "@/components/SearchBox";
import Musics from "@/components/Musics";
import { Suspense } from "react";
import Loading from "./Loading";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="flex flex-col px-4 md:px-24">
      <h1 className="text-2xl font-bold mt-5 mb-5 self-center">🎧</h1>
      <div className="mb-8 self-center">
        <SearchBox />
      </div>
      <p className="font-bold text-lg text-start">
        {searchParams.vId === "" || searchParams.vId === undefined
          ? "Qucik Picks"
          : `Search for : ${searchParams.vId}`}
      </p>
      <div className="mt-3 grid gap-2">
        <Suspense key={searchParams.vId as string} fallback={<Loading />}>
          <Musics query={searchParams.vId as string} />
        </Suspense>
      </div>
    </main>
  );
}
