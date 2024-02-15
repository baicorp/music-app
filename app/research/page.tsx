import React from "react";
import {
  getHome,
  getMusicPlayer,
  getPlaylist,
  getChannelData,
  search,
} from "@/utils/MusicClient";

export default async function page() {
  const data = await getHome();

  return (
    <>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </>
  );
}
