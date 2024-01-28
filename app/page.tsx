import Musics from "@/components/Musics";
import Album from "@/components/Album";
import { home } from "@/utils/pipedAPI";
import Playlist from "@/components/Playlist";

export default async function Home() {
  const data = await home();
  return (
    <main className="flex flex-col mt-10">
      <div>
        <p className="font-bold text-lg ml-4">{data?.data[3]?.title}</p>
        <div className="mt-3 pl-4 overflow-x-auto gap-2 flex flex-col flex-wrap h-[208px]">
          <Musics musicData={data?.data[3]?.contents || []} />
        </div>
      </div>
      <div className="mt-6">
        <p className="font-bold text-lg md:text-xl ml-4">
          {data?.data[0]?.title}
        </p>
        <div className="mt-3 pl-4 overflow-x-auto flex gap-4 ">
          <Album albumData={data?.data[0]?.contents || []} />
        </div>
      </div>
      <div className="mt-6">
        <p className="font-bold text-lg md:text-xl ml-4">
          {data?.data[8]?.title}
        </p>
        <div className="mt-3 pl-4 overflow-x-auto flex gap-4 ">
          <Playlist playlistData={data?.data[8]?.contents || []} />
        </div>
      </div>
    </main>
  );
}
