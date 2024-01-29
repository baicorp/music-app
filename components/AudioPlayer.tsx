"use client";

import useMusic from "@/hooks/useMusic";
// import { getMusicFromPiped } from "@/utils/pipedAPI";
import { getMusicFromCyclic } from "@/utils/cyclicApi";
import useSWRImmutable from "swr/immutable";
import Loading from "./Loading";
import Image from "next/image";
import { getUrlStream } from "@/utils/decipher";

export default function AudioPlayer() {
  const { id } = useMusic();
  const { data, isLoading } = useSWRImmutable(id, getMusicFromCyclic);

  // from cyclic
  const thumbnailUrl = data?.videoDetails?.thumbnail?.thumbnails[0]?.url;
  const title = data?.videoDetails?.title;
  const uploader = data?.videoDetails?.author;
  const signatureCipher =
    data?.streamingData?.adaptiveFormats[
      data?.streamingData?.adaptiveFormats?.length - 1
    ]?.signatureCipher;
  console.log();
  const urlStream = getUrlStream(signatureCipher);
  console.log(urlStream);
  console.log(id);
  const streamingData = urlStream;

  //if no id return empty element
  if (!id) return <></>;

  return isLoading ? (
    <Loading />
  ) : data ? (
    // using piped api resource
    // <div className="bg-[#f1f3f4] flex overflow-hidden">
    //   <Image
    //     src={data?.thumbnailUrl}
    //     alt={data?.title + " image"}
    //     className="w-24 object-cover object-center"
    //     width={300}
    //     height={300}
    //   />
    //   <div className="flex flex-col justify-center pt-2">
    //     <div className="px-5">
    //       <p className="font-semibold text-black line-clamp-1">{data?.title}</p>
    //       <p className="text-sm font-semibold text-gray-600 line-clamp-1">
    //         {data?.uploader}
    //       </p>
    //     </div>
    //     <audio controls autoPlay src={data?.audioStreamUrl?.url}></audio>
    //   </div>
    // </div>
    // using cyclic api resource
    <div className="bg-[#f1f3f4] flex overflow-hidden">
      <Image
        src={thumbnailUrl}
        alt={title + " image"}
        className="w-24 object-cover object-center"
        width={300}
        height={300}
      />
      <div className="flex flex-col justify-center pt-2">
        <div className="px-5">
          <p className="font-semibold text-black line-clamp-1">{data?.title}</p>
          <p className="text-sm font-semibold text-gray-600 line-clamp-1">
            {uploader}
          </p>
        </div>
        <audio controls autoPlay src={streamingData}></audio>
      </div>
    </div>
  ) : (
    <p>try again 👍</p>
  );
}
