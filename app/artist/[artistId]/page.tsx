import DynamicComponent from "@/components/DynamicComponent";
import { getChannel } from "@/utils/MusicClient";
import React from "react";

export default async function page({
  params,
}: {
  params: { artistId: string };
}) {
  let data: any;
  try {
    const datas = await getChannel(params?.artistId);
    data = datas;
  } catch (error) {
    return (
      <div className="flex justify-center">
        <p>Sorry, something wrong</p>
      </div>
    );
  }

  if (!!!data) {
    return (
      <div className="flex justify-center">
        <p>Sorry, something wrong</p>
      </div>
    );
  }

  return (
    <>
      <section className="relative">
        <div>
          <img
            className="object-cover object-center w-full h-1/4"
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
        <div className="p-4 lg:px-6 xl:px-10 pt-10">
          <ChannelDynamicDataList contents={data?.contents} />
        </div>
      </section>
    </>
  );
}

async function ChannelData({ channelId }: { channelId: string }) {
  const data = await getChannel(channelId);

  if (!data)
    return (
      <div className="flex justify-center">
        <p>sorry, something wrong</p>
      </div>
    );

  return (
    <>
      <section className="relative">
        <div>
          <img
            className="object-cover object-center w-full h-1/4"
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
        <div className="p-4 lg:px-6 xl:px-10 pt-10">
          <ChannelDynamicDataList contents={data?.contents} />
        </div>
      </section>
    </>
  );
}

function ChannelDynamicDataList({ contents }: { contents: any[] | undefined }) {
  if (!contents) return "";
  return (
    <div className="flex flex-col gap-8">
      {contents.map((data) => {
        if (!data) return null;
        return (
          <section key={data?.headerTitle + new Date()}>
            <h2 className="text-xl font-bold mb-4">{data?.headerTitle}</h2>
            <div
              className={`${
                ["video", "song"]?.includes(data?.contents[0]?.type)
                  ? "flex flex-col gap-4"
                  : "overflow-x-auto flex gap-4 last:pr-4"
              }`}
            >
              {data?.contents?.map((content: any, index: number) => {
                return (
                  <DynamicComponent
                    key={index}
                    props={content}
                    type={content.type}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function Avatar({ avatar }: { avatar: string | undefined }) {
  if (!avatar) return "";
  return (
    <img
      className="object-cover object-center rounded-full w-32 h-32 md:w-48 md:h-48"
      src={avatar}
      alt={"avatar"}
      width={226}
      height={226}
    />
  );
}
