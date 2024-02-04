import { ClientType, Innertube } from "youtubei.js";

const yt = await Innertube.create({
  device_category: "mobile",
  client_type: ClientType.MUSIC,
});

export async function basicInfo(videoId: string) {
  return await yt.getInfo(videoId, "YTMUSIC");
}

export async function search(query: string) {
  // return await yt.getInfo(videoId, "YTMUSIC");
  return await yt.search(query);
}
