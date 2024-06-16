import { NextResponse } from "next/server";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY;
const YOUTUBE_API_URL = `https://music.youtube.com/youtubei/v1/player?key=${YOUTUBE_API_KEY}`;
const SCRAPER_API_URL = `http://api.scraperapi.com?api_key=${SCRAPER_API_KEY}&url=${encodeURIComponent(
  YOUTUBE_API_URL
)}`;

export async function POST(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  try {
    const response = await fetch(YOUTUBE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "com.google.android.youtube/17.36.4 (Linux; U; Android 12; GB) gzip",
      },
      body: JSON.stringify({
        videoId: id,
        context: {
          client: {
            clientName: "ANDROID_TESTSUITE",
            clientVersion: "1.9",
            androidSdkVersion: 30,
            hl: "en",
            gl: "US",
            utcOffsetMinutes: 0,
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`YouTube API Error: ${errorData.error.message}`);
    }

    const data = await response.json();

    const thumbnails = data?.videoDetails?.thumbnail?.thumbnails[0]?.url;
    const result = {
      videoId: data?.videoDetails?.videoId,
      title: data?.videoDetails?.title,
      thumbnailUrl: thumbnails,
      channelId: data?.videoDetails?.channelId,
      uploader: data?.videoDetails?.author,
      videoDetails: { ...data?.videoDetails, thumbnail: thumbnails },
      url: data.streamingData?.adaptiveFormats[
        data.streamingData?.adaptiveFormats?.length - 1
      ]?.url,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching YouTube data POST:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "no id given" });

  const response = await fetch(`https://pipedapi.reallyaweso.me/streams/${id}`);
  if (!response.ok) {
    return NextResponse.json({ error: response.status });
  }

  const data = await response.json();
  if (!data) return NextResponse.json({ error: response.status });
  const stream = data?.audioStreams?.filter((data) => data?.itag === 251);
  return NextResponse.json(stream[0]?.url);
}
