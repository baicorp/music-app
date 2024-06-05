import { NextResponse } from "next/server";

const YOUTUBE_API_KEY = "AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w"; // Replace with your real YouTube API key
const YOUTUBE_API_URL = `https://www.youtube.com/youtubei/v1/player?key=${YOUTUBE_API_KEY}`;

export async function POST(request) {
  try {
    const requestBody = await request.json();
    const { videoId, context } = requestBody;

    const response = await fetch(YOUTUBE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoId, context }),
    });

    if (!response.ok) {
      // Handle errors from YouTube API
      const errorData = await response.json();
      throw new Error(`YouTube API Error: ${errorData.error.message}`);
    }

    const data = await response.json();

    // Process the response data if needed
    // Example: extract specific fields or transform the data

    const thumbnails = data?.videoDetails?.thumbnail?.thumbnails[0]?.url;
    return NextResponse.json({
      videoId: data?.videoDetails?.videoId,
      title: data?.videoDetails?.title,
      thumbnailUrl: thumbnails,
      channelId: data?.videoDetails?.channelId,
      uploader: data?.videoDetails?.author,
      videoDetails: { ...data?.videoDetails, thumbnail: thumbnails },
      url: data.streamingData?.adaptiveFormats[
        data.streamingData?.adaptiveFormats?.length - 1
      ]?.url,
    });
  } catch (error) {
    console.error("Error fetching YouTube data:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 }); // Internal Server Error
  }
}
