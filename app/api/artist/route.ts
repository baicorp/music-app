import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("videoId");
  const body = {
    browseId: "UCFeCzD2Fqr3jlMcGTt0Jnlg",
    context: {
      client: {
        clientName: "WEB_REMIX",
        clientVersion: "1.20220918",
      },
      thirdParty: {
        embedUrl: "https://www.youtube.com",
      },
    },
    playbackContext: {
      contentPlaybackContext: {
        signatureTimestamp: 19746,
      },
    },
  };
  const youtubeApiUrl =
    "https://music.youtube.com/youtubei/v1/browse?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30";
  try {
    const response = await fetch(youtubeApiUrl, {
      method: "POST",
      headers: {
        Host: "music.youtube.com",
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.42",
        Accept: "*/*",
        Origin: "https://music.youtube.com",
        Referer: "https://music.youtube.com/",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "de,de-DE;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      },
      cache: "no-store",
      body: JSON.stringify(body),
    });

    const data = await response.json();
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
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
