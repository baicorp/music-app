import Image from "next/image";
import RefreshButton from "./RefreshButton";

export default async function SongCard({
  title,
  artist,
  id,
  img,
}: SongCardProps) {
  const res = await fetch(
    `http://localhost:3000/song/url/v1?id=${id}&level=hires`
  );
  const data = await res.json();

  if (data?.code !== 200) {
    return <RefreshButton />;
  }

  return (
    <div
      className={`bg-[#f1f3f4] rounded-xl max-w-[410px] overflow-hidden flex gap-2 ${
        !data?.data[0]?.url ? "hidden" : ""
      }`}
    >
      <Image
        src={img}
        alt={title + "image"}
        width={1400}
        height={1400}
        className="w-[100px]"
      />
      <div>
        <div>
          <p className="font-semibold px-4 pt-2 text-black line-clamp-1">
            {title}
          </p>
          <p className="text-sm px-4 text-black line-clamp-1">{artist}</p>
        </div>
        <audio controls src={data?.data[0]?.url}></audio>
      </div>
    </div>
  );
}

type SongCardProps = {
  title: string;
  artist: string;
  id: string;
  img: string;
};
