import { MusicDetail, QuickPicks, SearchResults } from "@/types/type";

const BASE_URL = "https://pipedapi.kavin.rocks";
const BASE_URL_ALTERNATIVE = "https://pipedapi.syncpundit.io/";

export async function getMusic(videoId: string): Promise<MusicDetail> {
  const res = await fetch(`${BASE_URL}/streams/${videoId}`);
  return await res.json();
}

export async function search(query: string): Promise<SearchResults[]> {
  const res = await fetch(`http://127.0.0.1:5000/search?query=${query}`);
  const data = await res.json();
  return data.data;
}

export async function home(): Promise<QuickPicks[]> {
  const res = await fetch(`http://127.0.0.1:5000`);
  const data = await res.json();
  return data?.data[3]?.contents;
}
