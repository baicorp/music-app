import { getHome } from "@/utils/MusicClient";
import DynamicComponent from "@/components/DynamicComponent";
import { SongCard } from "@/components/card";

export default async function Home() {
  return (
    <main className="bg-secondary border border-secondary overflow-x-hidden px-4 lg:px-6 xl:px-10 rounded-lg grow">
      <div className="flex flex-col gap-5 overflow-y-auto rounded-md h-full py-4">
        <HomeResult />
      </div>
    </main>
  );
}

async function HomeResult() {
  let data;
  try {
    const datas = await getHome();
    data = datas;
  } catch (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Sorry, something wrong 😢 </p>
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

  const list = data?.map((data: any, index: number) => {
    if (data?.headerTitle === "Quick picks") {
      return (
        <div key={index} className="flex flex-col gap-5">
          <h1 className="font-bold text-lg">{data?.headerTitle}</h1>
          <div className="overflow-x-auto gap-2 md:gap-4 flex flex-col flex-wrap h-[230px] md:h-[250px] empty:hidden">
            {data?.contents?.map((content: any, index: number) => {
              return (
                <DynamicComponent
                  key={index}
                  type={content?.type}
                  props={content}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div key={index} className="flex flex-col gap-5">
          <h1 className="font-bold text-lg">{data?.headerTitle}</h1>
          <div className="overflow-x-auto gap-2 md:gap-4 flex last:pr-4">
            {data?.contents?.map((data: any, index: number) => {
              return (
                <DynamicComponent key={index} type={data?.type} props={data} />
              );
            })}
          </div>
        </div>
      );
    }
  });
  return list;
}
