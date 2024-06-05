import { getAlbum, getChannel, getHome } from "@/utils/MusicClient";
import DynamicComponent from "@/components/DynamicComponent";
import { SongCard } from "@/components/card";

export default async function Home() {
  return (
    <main className="overflow-hidden p-4 lg:px-6 xl:px-10">
      <div className="flex flex-col gap-5">
        <HomeResult />
      </div>
    </main>
  );
}

async function HomeResult() {
  let data;
  try {
    const datas = await getChannel("UCW5n3kTt0kLbDzV0q4L5Rmw");
    console.log(datas);
    data = datas;
  } catch (error) {
    return (
      <div className="h-screen flex justify-center items-center grow">
        <p>Try again later 🛠️</p>
      </div>
    );
  }
  // const list = data?.map((data: any, index: number) => {
  //   if (data?.headerTitle === "Quick picks") {
  //     return (
  //       <div key={index} className="flex flex-col gap-5">
  //         <h1 className="font-bold text-lg">{data?.headerTitle}</h1>
  //         <div className="overflow-x-auto gap-2 md:gap-4 flex flex-col flex-wrap h-[230px] md:h-[250px] empty:hidden">
  //           {data?.contents?.map((content: any, index: number) => {
  //             return (
  //               <SongCard
  //                 videoId={content?.videoId}
  //                 key={index}
  //                 title={content?.title}
  //                 thumbnail={content?.thumbnail}
  //                 artists={content?.artists}
  //                 listSong={data?.contents || []}
  //               />
  //             );
  //           })}
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div key={index} className="flex flex-col gap-5">
  //         <h1 className="font-bold text-lg">{data?.headerTitle}</h1>
  //         <div className="overflow-x-auto gap-2 md:gap-4 flex last:pr-4">
  //           {data?.contents?.map((data: any, index: number) => {
  //             return (
  //               <DynamicComponent key={index} type={data?.type} props={data} />
  //             );
  //           })}
  //         </div>
  //       </div>
  //     );
  //   }
  // });
  return (
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
}
