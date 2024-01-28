import { Innertube, UniversalCache } from "youtubei.js";
const { YouTube } = require("popyt");

const yt = await Innertube.create();
const youtube = new YouTube("AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w");

export async function search(query: string) {
  const search = await youtube.searchVideos(query);
  return search;
}

export async function basicInfo(videoId: string) {
  return await yt.getInfo(videoId, "YTMUSIC");
}
