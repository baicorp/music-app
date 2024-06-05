import React from "react";
import {
  getHome,
  getPlaylist,
  getVideo,
  getChannel,
  search,
  getAlbum,
} from "@/utils/MusicClient";

export default async function Page() {
  const res = await fetch("http://localhost:3000/api/media", {
    // Use http://
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      context: {
        client: {
          clientName: "ANDROID_MUSIC",
          clientVersion: "5.26.1",
          androidSdkVersion: 30,
        },
        thirdParty: {
          embedUrl: "https://music.youtube.com",
        },
      },
      attestationRequest: {
        omitBotguardData: true,
      },
      racyCheckOk: true,
      contentCheckOk: true,
      videoId: "SfLfO8vBQk4", // Replace with actual video ID
      params: "2AMBCgIQBg",
    }),
  });

  const data = await res.json();

  return (
    <>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </>
  );
}
