import Musics, { MusicCard } from "@/components/Musics";
import Album, { AlbumCard } from "@/components/Album";
import { home } from "@/utils/pipedAPI";
import Playlist, { PlaylistCard } from "@/components/Playlist";
import ClickElement from "@/components/ClickElement";
import Link from "next/link";

export default async function Home() {
  let data;
  try {
    const datas = await home();
    data = datas;
  } catch (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Try again later 🛠️</p>
      </div>
    );
  }
  return (
    <main className="overflow-hidden lg:px-6 xl:px-10">
      {data.data?.map((result: any) => {
        return <Result key={result.title} result={result} />;
      })}
    </main>
  );
}

function Result({ result }: { result: any }) {
  return (
    <div className="mt-8">
      <p className="font-bold text-lg ml-4">{result.title}</p>
      <div className="mt-3 pl-4 overflow-x-auto gap-2 md:gap-4 flex flex-col flex-wrap h-[210px] md:h-[250px] empty:hidden">
        {result?.contents?.map((data: any) => {
          if (data.videoId) {
            const artist = data.artists
              .map((data: any) => data.name)
              .toString()
              .replaceAll(",", " & ");
            return (
              <ClickElement
                key={crypto.randomUUID()}
                id={data.videoId}
                artist={artist}
                thumbnail={data.thumbnails[0].url}
                title={data?.title}
                trackList={result?.contents || []}
              >
                <MusicCard
                  title={data.title}
                  artist={artist}
                  thumbnailUrl={data.thumbnails[0].url}
                  videoId={data.videoId}
                />
              </ClickElement>
            );
          }
        })}
      </div>
      <div className="mt-3 pl-4 overflow-x-auto gap-2 md:gap-4 flex last:pr-4">
        {result?.contents?.map((data: any) => {
          if (data.browseId) {
            const thumbnail = data.thumbnails[0].url;
            return (
              <Link
                key={crypto.randomUUID()}
                href={`album/${data?.browseId || ""} `}
              >
                <AlbumCard
                  key={data.browseId}
                  browseId={data.browseId}
                  thumbnails={thumbnail}
                  title={data.title}
                  year={data.year}
                />
              </Link>
            );
          } else if (data.playlistId) {
            const thumbnail = data.thumbnails[0].url;
            return (
              <Link
                key={crypto.randomUUID()}
                href={`playlist/${data?.playlistId}`}
              >
                <PlaylistCard
                  key={data.playlistId}
                  thumbnails={thumbnail}
                  title={data.title}
                  description={data.description}
                />
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}
