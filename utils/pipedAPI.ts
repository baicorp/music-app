import { VideoData } from "@/types/type";
import { QuickPicks, SearchResults } from "@/types/pyYtMusic";
import getUrlStream from "./decipher";

const SELF_BASE_URL = "https://cyan-rich-abalone.cyclic.app";
const BASE_URL = "https://pipedapi.kavin.rocks";
const BASE_URL_ALTERNATIVE = "https://pipedapi.syncpundit.io/";

export async function getMusic(videoId: string): Promise<VideoData> {
  const res = await fetch(`${SELF_BASE_URL}/stream/${videoId}`, {
    cache: "force-cache",
    method: "POST",
  });
  const data = await res.json();
  const signatureCipher =
    data?.streamingData?.adaptiveFormats[
      data?.streamingData?.adaptiveFormats.length - 1
    ].signatureCipher;

  data.streamUrl = getUrlStream(signatureCipher);

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
export async function home(): Promise<QuickPicks[]> {
  const res = await fetch(`http://127.0.0.1:5000`);
  if (res.status !== 200)
    throw new Error("Please chcek your internet connections");
  const data = await res.json();
  return data?.data[3]?.contents;
}

// get track data from videoId
export async function getSong(videoId: string) {
  const res = await fetch(`http://127.0.0.1:5000/track/${videoId}`);
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
