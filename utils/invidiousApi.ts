import { SongDetail } from "@/types/typeInvidiousAPI";

const BASE_URL = "https://invidious.perennialte.ch/api/v1";

export async function getMusicFromInvidious(
  videoId: string
): Promise<SongDetail> {
  const res = await fetch(`${BASE_URL}/videos/${videoId}`);
  return await res.json();
}
