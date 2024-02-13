import ClickElement from "./ClickElement";
import { SongItem } from "@/app/research/searchResult";

export default function Musics({ musicData }: { musicData: SongItem[] }) {
  try {
    return musicData.map((data) => {
      return (
        <ClickElement
          key={crypto.randomUUID()}
          id={data.videoId!}
          artist={data?.artist!}
          thumbnail={data?.thumbnail}
          // @ts-ignore
          trackList={musicData || []}
          title={data?.title}
        >
          <MusicCard
            title={data.title}
            // @ts-ignore
            artist={data.artist || data.subtitle?.split("|")[0]}
            thumbnailUrl={data.thumbnail}
            videoId={data.videoId!}
          />
        </ClickElement>
      );
    });
  } catch (error) {
    return <p>{"Try again later 🔨"}</p>;
  }
}

type MusicCardProps = {
  videoId: string;
  thumbnailUrl: string;
  title: string;
  artist?: string;
};

export function MusicCard({
  videoId,
  thumbnailUrl,
  title,
  artist,
}: MusicCardProps) {
  return (
    <div className="flex w-[300px] md:w-[384px] rounded-md">
      <img
        src={thumbnailUrl}
        alt={title + "image"}
        className="w-16 h-16 shrink-0 object-center object-cover rounded-md"
      />
      <div className="flex grow flex-col justify-center px-4">
        <p className="font-semibold text-white line-clamp-1">{title}</p>
        <p className="text-sm font-semibold text-gray-400 line-clamp-1">
          {artist}
        </p>
      </div>
    </div>
  );
}
