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
  const data = await getChannel("UCFeCzD2Fqr3jlMcGTt0Jnlg");

  return (
    <>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </>
  );
}
