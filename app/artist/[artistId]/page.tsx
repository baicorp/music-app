import Album from "@/components/Album";
import Channels from "@/components/Channels";
import Loading from "@/components/Loading";
import Musics from "@/components/Musics";
import Playlist from "@/components/Playlist";
import { Content } from "@/types/type";
import { getChannel } from "@/utils/MusicClient";
import Image from "next/image";
import React, { Suspense } from "react";

export default function page({ params }: { params: { artistId: string } }) {
  return (
    <div>
      <Suspense key={params.artistId} fallback={<Loading />}>
        <ChannelData channelId={params.artistId} />
      </Suspense>
    </div>
  );
}

async function ChannelData({ channelId }: { channelId: string }) {
  const data = await getChannel(channelId);

  if (!data) return <p>sorry</p>;

  return (
    <>
      <section className="relative">
        <div>
          <Image
            className="object-cover object-center w-full h-full"
            src={data?.thumbnail}
            alt={data?.artistName}
            width={data?.thumbnailWidth}
            height={data?.thumbnailHeight}
          />
          <div className="bg-gradient-to-b from-[#191919] via-transparent to-[#0f0f0f] absolute inset-0"></div>
          <div className="absolute flex flex-col justify-end items-center lg:items-start inset-0 lg:px-6 xl:px-10 p-4">
            <div className="flex gap-4 items-center justify-end">
              <Avatar avatar={data?.avatar} />
              <h1 className="font-bold lg:font-black text-4xl lg:text-6xl lg:mb-2">
                {data?.artistName}
              </h1>
            </div>
            <div className="hidden lg:block">
              <p className="w-1/2 text-sm line-clamp-4">{data?.description}</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="lg:px-6 xl:px-10 p-4 pt-10">
          <ChannelDataList contents={data?.contents} />
        </div>
      </section>
    </>
  );
}

function ChannelDataList({ contents }: { contents: Content[] }) {
  const list = contents?.map((data) => {
    return (
      <div className=" mb-5" key={data?.headerTitle}>
        <h2 className="font-bold text-xl mb-3">{data?.headerTitle}</h2>
        <div className="flex flex-col gap-3">
          <div key={data?.headerTitle}>
            {data?.headerTitle === "Songs" ? (
              <div className="flex flex-col gap-4">
                <Musics musicData={data?.contents} />
              </div>
            ) : data?.headerTitle === "Albums" ? (
              <div className="overflow-x-auto gap-2 md:gap-4 flex last:pr-4">
                <Album albumData={data?.contents} />
              </div>
            ) : data?.headerTitle === "Fans might also like" ? (
              <div className="overflow-x-auto gap-2 md:gap-4 flex last:pr-4">
                <Channels channelsData={data?.contents} />
              </div>
            ) : data?.headerTitle === "Featured on" ? (
              <div className="overflow-x-auto gap-2 md:gap-4 flex last:pr-4">
                <Playlist playlistData={data?.contents} />
              </div>
            ) : data?.headerTitle === "Singles" ? (
              <div className="overflow-x-auto gap-2 md:gap-4 flex last:pr-4">
                <Album albumData={data?.contents} />
              </div>
            ) : data?.headerTitle === "Videos" ? (
              <div className="flex flex-col gap-4">
                <Musics musicData={data?.contents} />
              </div>
            ) : data?.headerTitle === "Playlists" ? (
              <div className="overflow-x-auto gap-2 md:gap-4 flex last:pr-4">
                <Playlist playlistData={data?.contents} />
              </div>
            ) : undefined}
          </div>
        </div>
      </div>
    );
  });
  return list;
}

function Avatar({ avatar }: { avatar: string | undefined }) {
  if (!avatar) return "";
  return (
    <Image
      className="object-cover object-center rounded-full w-32 h-32 md:w-48 md:h-48"
      src={avatar}
      alt={"avatar"}
      width={226}
      height={226}
    />
  );
}
