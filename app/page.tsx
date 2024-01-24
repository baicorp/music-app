import SearchBox from "@/components/SearchBox";
import Tab from "@/components/Tab";
import MusicList from "@/components/MusicList";

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
      <p className="mb-4">Search for : {searchParams.keywords}</p>
      <Tab />
      <div className="mt-5">
        <MusicList />
      </div>
    </main>
  );
}
