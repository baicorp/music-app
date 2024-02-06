import Image from "next/image";
import Link from "next/link";

export default function Channels({ channelsData }: { channelsData: any }) {
  return channelsData.map((channel: any) => {
    return (
      <div key={channel.artist}>
        <Link
          href={`/artist/${channel.channelId}`}
          className="p-4 flex flex-col items-center gap-4"
        >
          <Image
            src={channel.thumbnail}
            alt={channel.artist}
            width={700}
            height={700}
            className="w-32 h-32 object-cover rounded-full"
          />
          <p className="text-lg font-semibold">{channel.artist}</p>
        </Link>
      </div>
    );
  });
}
