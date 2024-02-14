import DynamicComponent from "@/components/DynamicComponent";
import Loading from "@/components/Loading";
import SearchBox from "@/components/SearchBox";
import { search } from "@/utils/MusicClient";
import React, { Suspense } from "react";

export default function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="mt-5 flex flex-col gap-2 p-4 lg:px-6 xl:px-10">
      <div className="mb-10">
        <SearchBox />
      </div>
      <Suspense
        key={(searchParams.query as string) || ""}
        fallback={<Loading />}
      >
        <SearchResult query={(searchParams.query as string) || ""} />
      </Suspense>
    </div>
  );
}

async function SearchResult({ query }: { query: string }) {
  let data;
  try {
    if (query === "") return <></>;
    const datas = await search(query);
    data = datas;
  } catch (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Sorry try again later 🛠️</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {data.map((data) => {
        if (!data) return null;
        return (
          <section key={data?.headerTitle + new Date()}>
            <h2 className="text-xl font-bold mb-4 px-4">{data?.headerTitle}</h2>
            <div
              className={`${
                ["video", "song"]?.includes(data?.contents[0]?.type)
                  ? "flex flex-col gap-4"
                  : "overflow-x-auto flex gap-4 last:pr-4"
              } px-4`}
            >
              {data?.contents?.map((data: any) => {
                return (
                  <DynamicComponent
                    key={data?.type + new Date()}
                    props={data}
                    type={data.type}
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
