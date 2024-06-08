import { NextResponse } from "next/server";

const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY;
const YOUTUBE_API_URL = `https://music.youtube.com/youtubei/v1/player?key=AIzaSyDCU8hByM-4DrUqRUYnGn-3llEO78bcxq8`;
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
        "X-YouTube-Client-Name": "TVHTML5",
        "X-YouTube-Client-Version": "2.0",
        "x-origin": "https://www.youtube.com",
        "User-Agent":
          "Mozilla/5.0 (PlayStation 4 5.55) AppleWebKit/601.2 (KHTML, like Gecko)",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "de,de-DE;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: "TVHTML5",
            clientVersion: "2.0",
          },
          thirdParty: {
            embedUrl: `https://www.youtube.com/watch?v=${id}`,
          },
        },
        attestationRequest: {
          omitBotguardData: true,
        },
        racyCheckOk: true,
        contentCheckOk: true,
        videoId: id,
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

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching YouTube data:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
