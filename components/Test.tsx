// "use client";

// import useSWR from "swr";
import { basicInfo, search } from "@/utils/youtubei";
import { MusicCard } from "./Musics";

export default async function Test() {
  // const { data, isLoading } = useSWR("sunflower", search);
  const data = await search("ata halilintar");
  const isLoading = false;
  // const data = await basicInfo();

  // const musicList = isLoading
  //   ? "⏳"
  //   : data?.videos?.map((detail) => {
  //       return (
  //         <MusicCard
  //           key={detail?.title?.text}
  //           title={detail?.title?.text!}
  //           artist={detail?.author?.name}
  //           thumbnailUrl={detail?.thumbnails[0].url}
  //           videoId={detail?.id}
  //         />
  //       );
  //     });

  return <>{isLoading ? "⏳" : <pre>{JSON.stringify(data, null, 2)}</pre>}</>;
}
