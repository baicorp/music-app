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
        "X-Goog-Api-Format-Version": "1",
        "X-YouTube-Client-Name": "ANDROID_MUSIC",
        "X-YouTube-Client-Version": "5.01",
        Origin: "https://music.youtube.com",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "de,de-DE;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: "ANDROID_MUSIC",
            clientVersion: "5.01",
            androidSdkVersion: 30,
          },
        },
        attestationRequest: {
          omitBotguardData: true,
        },
        racyCheckOk: true,
        contentCheckOk: true,
        videoId: id,
        params: "2AMBCgIQBg",
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
  if (!id) return NextResponse.json({ error: response.status });

  const response = await fetch(`https://pipedapi.kavin.rocks/streams/${id}`);
  if (!response.ok) {
    return NextResponse.json({ error: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data?.audioStreams[0]?.url);
}
