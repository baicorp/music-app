import Image from "next/image";

export default async function SongCard({ title, id, img }: SongCardProps) {
  const res = await fetch(
    `http://localhost:3000/song/url/v1?id=${id}&level=hires`
  );
  const data = await res.json();

  return (
    <div
      className={`bg-[#f1f3f4] rounded-xl max-w-[400px] flex gap-2 ${
        !data?.data[0].url ? "hidden" : ""
      }`}
    >
      <Image
        src={img}
        alt={title + "image"}
        width={1400}
        height={1400}
        className="w-[90px] h-[90px]"
      />
      <div>
        <p className="text-lg px-4 pt-2 text-black line-clamp-1">{title}</p>
        <audio controls src={data?.data[0]?.url}></audio>
      </div>
    </div>
  );
}

type SongCardProps = {
  title: string;
  id: string;
  img: string;
};
