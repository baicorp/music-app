import formatTime from "@/utils/timeConverter";
import { NextResponse } from "next/server";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = `https://music.youtube.com/youtubei/v1/player?key=${YOUTUBE_API_KEY}`;

export async function POST(request) {
  const url = new URL(request.url);
  const videoId = url.searchParams.get("videoId");
  try {
    const response = await fetch(YOUTUBE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "com.google.android.youtube/17.36.4 (Linux; U; Android 12; GB) gzip",
      },
      body: JSON.stringify({
        videoId,
        context: {
          client: {
            // clientName: "ANDROID_TESTSUITE",
            // clientVersion: "1.9",
            clientName: "ANDROID_MUSIC",
            clientVersion: "5.26.1",
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

    const thumbnail =
      data?.videoDetails?.thumbnail?.thumbnails[1]?.url ||
      data?.videoDetails?.thumbnail?.thumbnails[0]?.url;
    const result = {
      videoId: data?.videoDetails?.videoId,
      title: data?.videoDetails?.title,
      thumbnail: [thumbnail, thumbnail],
      artists: [
        {
          name: data?.videoDetails?.author,
          browseId: data?.videoDetails?.channelId,
        },
      ],
      duration: formatTime(data?.videoDetails?.lengthSeconds),
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
