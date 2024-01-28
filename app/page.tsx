import SearchBox from "@/components/SearchBox";
import Musics from "@/components/Musics";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import Test from "@/components/Test";
import Album from "@/components/Album";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="flex flex-col">
      <h1 className="text-2xl font-bold mt-5 mb-5 self-center">🎧</h1>
      <div className="mb-8 self-center">
        <SearchBox />
      </div>
      <div>
        <p className="font-bold text-lg ml-4">
          {searchParams.vId === "" || searchParams.vId === undefined
            ? "Qucik Picks"
            : `Search for : ${searchParams.vId}`}
        </p>
        <div className="mt-3 pl-4 overflow-x-auto gap-2 flex flex-col flex-wrap h-[208px]">
          <Suspense key={searchParams.vId as string} fallback={<Loading />}>
            <Musics query={searchParams.vId as string} />
          </Suspense>
        </div>
      </div>
      <div className="mt-6">
        <p className="font-bold text-lg md:text-xl ml-4">
          {searchParams.vId === "" || searchParams.vId === undefined
            ? "Album"
            : ""}
        </p>
        <div className="mt-3 pl-4 overflow-x-auto flex gap-4 ">
          <Suspense key={searchParams.vId as string} fallback={<Loading />}>
            <Album />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
