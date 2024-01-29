import { StreamingData } from "@/types/typePipedApi";
import { SearchResults } from "@/types/pyYtMusic";
import { AudioStream } from "@/types/typePipedApi";
import getUrlStream from "./decipher";

const SELF_BASE_URL = "https://cyan-rich-abalone.cyclic.app";
const BASE_URL = "https://pipedapi.kavin.rocks";
const BASE_URL_ALTERNATIVE = "https://piped.12a.app";

// get streaming from piped api
export async function getMusicFromPiped(
  videoId: string
): Promise<StreamingData> {
  const res = await fetch(`${BASE_URL}/streams/${videoId}`, {
    cache: "force-cache",
    method: "GET",
  });
  const data = await res.json();
  const getOnlyAudioSrc = data?.audioStreams?.filter((stream: AudioStream) =>
    stream.mimeType.includes("audio")
  );
  data!.audioStreamUrl = getOnlyAudioSrc.reduce(
    (prev: AudioStream, current: AudioStream) =>
      prev.bitrate > current.bitrate ? prev : current
  );
  return data;
}

// search music
export async function search(query: string): Promise<SearchResults[]> {
  const res = await fetch(`http://127.0.0.1:5000/search?query=${query}`);
  if (res.status !== 200)
    throw new Error("Please chcek your internet connections");
  const data = await res.json();
  return data.data;
}

// get recomendation in home page
export async function home() {
  const res = await fetch(`http://127.0.0.1:5000`);
  if (res.status !== 200)
    throw new Error("Please chcek your internet connections");
  return await res.json();
}

// get track data from videoId
export async function getSong(videoId: string) {
  const res = await fetch(`http://127.0.0.1:5000/stream/track/${videoId}`);
  if (res.status !== 200)
    throw new Error("Please chcek your internet connections");
  const data = await res.json();
  return data.data;
}

// get album data from browseId
export async function getAlbum(browseId: string) {
  const res = await fetch(`http://127.0.0.1:5000/album/${browseId}`);
  if (res.status !== 200)
    throw new Error("Please chcek your internet connections");
  const data = await res.json();
  return data.data;
}

// get playlist data from playlistId
export async function getPlaylist(playlistId: string) {
  const res = await fetch(`http://127.0.0.1:5000/playlist/${playlistId}`);
  if (res.status !== 200)
    throw new Error("Please chcek your internet connections");
  const data = await res.json();
  return data.data;
}

// get track stream url
export async function getStreamUrl(videoId: string) {
  const res = await fetch(`http://127.0.0.1:5000/stream/track/${videoId}`);
  if (res.status !== 200)
    throw new Error("Please chcek your internet connections");
  const data = await res.json();
  return data.data;
}
