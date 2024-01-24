const BASE_URL = "https://pipedapi.kavin.rocks";

export async function getMusic(videoId: string) {
  const res = await fetch(`${BASE_URL}/streams/${videoId}`);
  return await res.json();
}

export async function getSuggestion() {
  const res = await fetch(`${BASE_URL}/suggestions/`);
  return await res.json();
}
