import { QuickPicks, SearchResults } from "@/types/pyYtMusic";
import { home, search } from "@/utils/pipedAPI";
import ClickElement from "./ClickElement";

export default async function Musics({ query }: { query: string }) {
  let musicData: SearchResults[] | QuickPicks[];
  let errorMessage: string;
  try {
    if (query === "" || query === undefined) {
      const quicPicks = await home();
      musicData = quicPicks;
    } else {
      const data = await search(query);
      musicData = data;
    }

    // return list of <MusicCard /> component
    return musicData.map((data) => {
      // generate artist name
      const artist = data.artists
        .map((data) => data.name)
        .toString()
        .replaceAll(",", " & ");
      return (
        <ClickElement key={data?.videoId} ids={data.videoId}>
          <MusicCard
            title={data.title}
            artist={artist}
            thumbnailUrl={data.thumbnails[0].url}
            videoId={data.videoId}
          />
        </ClickElement>
      );
    });
  } catch (error) {
    errorMessage = "Try again later 🔨";
    return <p>{error as string}</p>;
  }
}

export function MusicCard({
  videoId,
  thumbnailUrl,
  title,
  artist,
}: {
  videoId: string;
  thumbnailUrl: string;
  title: string;
  artist: string;
}) {
  return (
    <div key={videoId} className="flex min-w-[300px] md:min-w-96 rounded-md">
      <img
        src={thumbnailUrl}
        alt={title + "image"}
        className="w-16 h-16 object-center object-cover rounded-md"
      />
      <div className="flex flex-col justify-center px-4">
        <p className="font-semibold text-white line-clamp-1">{title}</p>
        <p className="text-sm font-semibold text-gray-400 line-clamp-1">
          {artist}
        </p>
      </div>
    </div>
  );
}
