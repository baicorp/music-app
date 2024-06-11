import { NextResponse } from "next/server";

const ANDROID = {
  clientName: "ANDROID_MUSIC",
  clientVersion: "5.26.1",
  api_key: "AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w",
  userAgent:
    "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36",
};

const headers = {
  "Content-Type": "application/json",
  "User-Agent": ANDROID.userAgent,
  "X-Goog-Api-Format-Version": "1",
  "X-YouTube-Client-Name": ANDROID.clientName,
  "X-YouTube-Client-Version": ANDROID.clientVersion,
  "x-origin": "https://music.youtube.com",
};

export async function POST(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  try {
    const response = await fetch(
      `https://music.youtube.com/youtubei/v1/player?key=${ANDROID.api_key}`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          videoId: id,
          context: {
            client: {
              clientName: ANDROID.clientName,
              clientVersion: ANDROID.clientVersion,
              androidSdkVersion: 31,
              hl: "en",
              gl: "US",
              utcOffsetMinutes: 0,
            },
          },
        }),
      }
    );
    if (!response.ok) {
      throw new Error(response.text());
    }
    const data = await response.json();
    // const thumbnails = data?.videoDetails?.thumbnail?.thumbnails[0]?.url;

    // const result = {
    //   videoId: data?.videoDetails?.videoId,
    //   title: data?.videoDetails?.title,
    //   thumbnailUrl: thumbnails,
    //   channelId: data?.videoDetails?.channelId,
    //   uploader: data?.videoDetails?.author,
    //   videoDetails: { ...data?.videoDetails, thumbnail: thumbnails },
    //   url: data.streamingData?.adaptiveFormats[
    //     data.streamingData?.adaptiveFormats?.length - 1
    //   ]?.url,
    // };

    const urlArray = data?.streamingData?.adaptiveFormats?.map((item) => {
      return item?.url;
    });

    return NextResponse.json(urlArray);
  } catch (error) {
    return new Response(JSON.stringify({ error: error }));
  }
}
