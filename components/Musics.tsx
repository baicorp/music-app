import ClickElement from "./ClickElement";

export default async function Musics({ musicData }: { musicData: any[] }) {
  try {
    // return list of <MusicCard /> component
    return musicData.map((data: any) => {
      // generate artist name
      const artist = data.artists
        .map((data: any) => data.name)
        .toString()
        .replaceAll(",", " & ");
      return (
        <ClickElement key={crypto.randomUUID()} ids={data.videoId}>
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
    return <p>{"Try again later 🔨"}</p>;
  }
}

type MusicCardProps = {
  videoId: string;
  thumbnailUrl: string;
  title: string;
  artist: string;
};

export function MusicCard({
  videoId,
  thumbnailUrl,
  title,
  artist,
}: MusicCardProps) {
  return (
    <div className="flex min-w-[300px] md:min-w-96 max-w-[384px] rounded-md">
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
