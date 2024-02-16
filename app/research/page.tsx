import React from "react";
import {
  getHome,
  getMusicPlayer,
  getPlaylist,
  getChannel,
  search,
  getAlbum,
} from "@/utils/MusicClient";

export default async function page() {
  const data = await getChannel("UC4X7J9D6VbTIwnFDFNkfQ1A");

  return (
    <>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </>
  );
}
