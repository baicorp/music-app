import Loading from "@/components/Loading";
import Musics from "@/components/Musics";
import React, { Suspense } from "react";

export default function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="mt-10 flex flex-col gap-2 px-4">
      <Suspense key={searchParams.vId as string} fallback={<Loading />}>
        {/* <Musics query={searchParams.vId as string} /> */}
      </Suspense>
    </div>
  );
}
