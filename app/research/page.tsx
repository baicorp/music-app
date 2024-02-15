import React from "react";
import {
  getHome,
  getMusicPlayer,
  getPlaylist,
  getChannelData,
  search,
  getAlbum,
} from "@/utils/MusicClient";

export default async function page() {
  const data = await getAlbum("MPREb_98YcfN1GUNy");

  return (
    <>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </>
  );
}
