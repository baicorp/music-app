import { NextResponse } from "next/server";
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
