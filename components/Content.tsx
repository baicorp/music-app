import { recomendation } from "@/utils/ytb-music";
import React from "react";
import ListContent from "./ListContent";

export default async function Content({
  searchParams,
}: {
  searchParams: string;
}) {
  const data = await recomendation();

  console.log(searchParams);

  return (
    <div>
      <pre>
        {JSON.stringify(
          data.filter((item) => item?.title === searchParams),
          null,
          2
        )}
      </pre>
      <ListContent data={data.filter((item) => item?.title === searchParams)} />
    </div>
  );
}
