import { NextResponse } from "next/server";
import { Clients, Innertube } from "youtubei.js/web";

export async function GET(request) {
  const url = new URL(request.url);
  const videoId = url.searchParams.get("videoId");
  if (!videoId) return NextResponse.json({ error: "no id given" });

  const response = await fetch(
    `https://pipedapi.reallyaweso.me/streams/${videoId}`
  );
  if (!response.ok) {
    return NextResponse.json({ error: response.status });
  }

  const data = await response.json();
  if (!data) return NextResponse.json({ error: response.status });
  const stream = data?.audioStreams?.filter((data) => data?.itag === 251);
  return NextResponse.json(stream[0]?.url);
}

export async function POST(request) {
  const url = new URL(request.url);
  const videoId = url.searchParams.get("videoId");

  if (!videoId) return NextResponse.json({ error: "no id given" });

  console.log(videoId);

  const yt = await Innertube.create();
  const info = await yt.getInfo(videoId);

  const urlStream = info.streaming_data?.formats[0].decipher(yt.session.player);

  return NextResponse.json(urlStream);
}
