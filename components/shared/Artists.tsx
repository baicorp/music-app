import Link from "next/link";
import { Artist } from "@/types/song";

export default function Artists({
  artists,
}: {
  artists: Artist[] | undefined;
}) {
  if (!artists) return;
  return (
    <div className="line-clamp-1">
      {artists?.map((artist, index) => {
        if (!artist) return;
        return (
          <Link
            key={index}
            href={`/artist/${artist.browseId}`}
            className="text-sm mr-2 font-semibold text-gray-400 hover:decoration-wavy hover:underline"
          >
            {artist.name}
          </Link>
        );
      })}
    </div>
  );
}
