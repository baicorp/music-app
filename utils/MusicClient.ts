import {
  processPlaylistData,
  processSearchData,
} from "@/app/research/searchResult";
import { getUrlStream } from "./cipher.js";

const headers = new Headers();
headers.append("Host", "music.youtube.com");
headers.append("Content-Type", "application/json");
headers.append(
  "User-Agent",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.42"
);
headers.append("Accept", "*/*");
headers.append("Origin", "https://music.youtube.com");
headers.append("Referer", "https://music.youtube.com/");
headers.append("Accept-Encoding", "gzip, deflate");
headers.append(
  "Accept-Language",
  "de,de-DE;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6"
);

export async function search(query: string) {
  const body = {
    query: query,
    context: {
      client: {
        clientName: "WEB_REMIX",
        clientVersion: "1.20220918",
      },
    },
    racyCheckOk: true,
    contentCheckOk: true,
  };

  const res = await fetch(
    "https://music.youtube.com/youtubei/v1/search?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  const datas =
    data?.contents?.tabbedSearchResultsRenderer?.tabs[0]?.tabRenderer?.content
      ?.sectionListRenderer?.contents;
  return processSearchData(datas);
}

type TrackProps = {
  videoId: string;
  title: string;
  thumbnail: string;
  artist: string;
  duration: string;
};

export async function getPlaylist(playlistId: string) {
  const body = {
    playlistId: playlistId,
    context: {
      client: {
        clientName: "WEB_REMIX",
        clientVersion: "1.20220918",
      },
    },
    racyCheckOk: true,
    contentCheckOk: true,
  };

  const res = await fetch(
    "https://music.youtube.com/youtubei/v1/next?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  //get main content
  const datas =
    data?.contents?.singleColumnMusicWatchNextResultsRenderer?.tabbedRenderer
      ?.watchNextTabbedResultsRenderer?.tabs[0]?.tabRenderer?.content
      ?.musicQueueRenderer?.content?.playlistPanelRenderer;
  // get playlist thumbnail
  const playlistThumbnail =
    data?.playerOverlays?.playerOverlayRenderer?.browserMediaSession
      ?.browserMediaSessionRenderer?.thumbnailDetails?.thumbnails[
      data?.playerOverlays?.playerOverlayRenderer?.browserMediaSession
        ?.browserMediaSessionRenderer?.thumbnailDetails?.thumbnails.length - 1
    ]?.url;
  return {
    playlistThumbnail: playlistThumbnail,
    ...processPlaylistData(datas),
  };
}

export async function getMusicPlayer(id: string) {
  const body = {
    videoId: id,
    context: {
      client: {
        clientName: "WEB_REMIX",
        clientVersion: "1.20220918",
      },
    },
    racyCheckOk: true,
    contentCheckOk: true,
    playbackContext: {
      contentPlaybackContext: {
        signatureTimestamp: "19746",
      },
    },
  };

  const response = await fetch(
    "https://music.youtube.com/youtubei/v1/player?key=AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }
  );
  const data = await response.json();
  const signatureCipher =
    data.streamingData.adaptiveFormats[
      data.streamingData.adaptiveFormats.length - 1
    ].signatureCipher;
  const streamingUrl = getUrlStream(signatureCipher);

  return {
    title: data.videoDetails.title,
    thumbnailUrl: data.videoDetails.thumbnail.thumbnails[0].url,
    uploader: data.videoDetails.author,
    url: streamingUrl,
  };
}
