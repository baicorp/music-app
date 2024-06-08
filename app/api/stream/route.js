import { NextResponse } from "next/server";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY;
const YOUTUBE_API_URL = `https://www.youtube.com/youtubei/v1/player?key=${YOUTUBE_API_KEY}`;
const SCRAPER_API_URL = `http://api.scraperapi.com?api_key=${SCRAPER_API_KEY}&url=${encodeURIComponent(
  YOUTUBE_API_URL
)}`;

export async function POST(request) {
  try {
    const requestBody = await request.json();

    const response = await fetch(YOUTUBE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("YouTube API Error:", errorData);
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
    return NextResponse.json({ jancuk: error.message }, { status: 500 });
  }
}

// const YOUTUBE_API_KEY = "AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w"; // Replace with your real YouTube API key
// const YOUTUBE_API_URL = `https://www.youtube.com/youtubei/v1/player?key=${YOUTUBE_API_KEY}`;

// export async function POST(request) {
//   try {
//     const requestBody = await request.json();

//     const response = await fetch(YOUTUBE_API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestBody),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(`YouTube API Error: ${errorData.error.message}`);
//     }

//     const data = await response.json();

//     const thumbnails = data?.videoDetails?.thumbnail?.thumbnails[0]?.url;
//     const result = {
//       videoId: data?.videoDetails?.videoId,
//       title: data?.videoDetails?.title,
//       thumbnailUrl: thumbnails,
//       channelId: data?.videoDetails?.channelId,
//       uploader: data?.videoDetails?.author,
//       videoDetails: { ...data?.videoDetails, thumbnail: thumbnails },
//       url: data.streamingData?.adaptiveFormats[
//         data.streamingData?.adaptiveFormats?.length - 1
//       ]?.url,
//     };

//     return NextResponse.json(result);
//   } catch (error) {
//     console.error("Error fetching YouTube data:", error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
