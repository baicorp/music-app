import Loading from "@/components/Loading";
import SearchBox from "@/components/SearchBox";
import SongCard from "@/components/SongCard";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="flex flex-col items-center py-20">
      <h1 className="text-2xl font-bold mb-5">HEAR 🎧</h1>
      <div className="mb-10">
        <SearchBox />
      </div>
      <div className="grid gap-4">
        <Suspense fallback={<Loading />}>
          <ListSong query={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function ListSong({
  query,
}: {
  query: { [key: string]: string | string[] | undefined };
}) {
  const res = await fetch(
    `http://localhost:3000/cloudsearch?keywords=${query.keywords}`
  );

  const dataSong = await res.json();

  return dataSong?.result?.songs.map((data: any) => (
    <Suspense fallback={<Loading />}>
      <SongCard
        key={crypto.randomUUID()}
        title={data?.name}
        id={data?.id}
        img={data?.al?.picUrl}
      />
    </Suspense>
  ));
}
