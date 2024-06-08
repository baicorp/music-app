import { NextResponse } from "next/server";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY;
const YOUTUBE_API_URL = `https://www.youtube.com/youtubei/v1/player?key=${YOUTUBE_API_KEY}`;
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
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: "ANDROID_MUSIC",
            clientVersion: "5.26.1",
            androidSdkVersion: 30,
          },
          thirdParty: {
            embedUrl: "https://music.youtube.com",
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
    console.error("Error fetching YouTube data:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
