import Link from "next/link";
import { Artist } from "@/types/song";

export default function Artists({
  artists,
}: {
  artists: Artist[] | undefined;
}) {
  if (!artists) return;
  return (
    <ul className="flex gap-2 w-1/3 line-clamp-1">
      {artists?.map((artist, index) => {
        if (!artist) return;
        return (
          <li key={index}>
            <Link
              href={`/artist/${artist.browseId}`}
              className="text-sm font-semibold text-nowrap text-gray-400 hover:decoration-wavy hover:underline"
            >
              {artist.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
