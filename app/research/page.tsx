import React from "react";
import { getMusicPlayer, getPlaylist, search } from "@/utils/MusicClient";

export default async function page() {
  const data = await search("nadine");

  return (
    <>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </>
  );
}
