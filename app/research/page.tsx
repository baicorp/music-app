import React from "react";
import {
  getHome,
  getVideo,
  getPlaylist,
  getChannel,
  search,
  getAlbum,
} from "@/utils/MusicClient";

export default async function page() {
  const data = await getPlaylist(
    "VLRDCLAK5uy_ntmEO6TGBtDZrVD26XvJa6Y3FHYDx40II"
  );

  return (
    <>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </>
  );
}
