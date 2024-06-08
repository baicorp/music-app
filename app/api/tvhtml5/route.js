import { NextResponse } from "next/server";

const YOUTUBE_API_URL = `https://www.youtube.com/youtubei/v1/player?key=AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w`;
export async function GET() {
  const res = await fetch("https://www.youtube.com/iframe_api");
  const watchHtml = await res.text();

  let jsFileUrlMatches = watchHtml.match(
    /\/s\/player\/[A-Za-z0-9]+\/[A-Za-z0-9_.]+\/[A-Za-z0-9_]+\/base\.js/
  );

  return NextResponse.json({ jsFile: watchHtml });
}

var xPa = function (a) {
  a = a.split("");
  WO.xX(a, 62);
  WO.lp(a, 2);
  WO.FW(a, 50);
  WO.xX(a, 1);
  WO.FW(a, 26);
  WO.xX(a, 11);
  return a.join("");
};

var WO = {
  lp: function (a, b) {
    a.splice(0, b);
  },
  FW: function (a) {
    a.reverse();
  },
  xX: function (a, b) {
    var c = a[0];
    a[0] = a[b % a.length];
    a[b % a.length] = c;
  },
};

var fta = function (a) {
  a = a.split("");
  hD.mL(a, 79);
  hD.L5(a, 2);
  hD.mL(a, 24);
  hD.L5(a, 3);
  return a.join("");
};

var hD = {
  // Swap transform
  i1: function (a, b) {
    var c = a[0];
    a[0] = a[b % a.length];
    a[b % a.length] = c;
  },
  // Splice transform
  L5: function (a, b) {
    a.splice(0, b);
  },
  // Reverse transform
  mL: function (a) {
    a.reverse();
  },
};

// export async function POST(request) {
//   const url = new URL(request.url);
//   const id = url.searchParams.get("id");
//   try {
//     const response = await fetch(YOUTUBE_API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         videoId: id,
//         context: {
//           client: {
//             clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
//             clientVersion: "2.0",
//           },
//           thirdParty: {
//             embedUrl: `https://www.youtube.com`,
//           },
//         },
//         playbackContext: {
//           contentPlaybackContext: {
//             signatureTimestamp: "19369",
//           },
//         },
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(`YouTube API Error: ${errorData.error.message}`);
//     }

//     const data = await response.json();
//     const signatureCipher =
//       data?.streamingData?.adaptiveFormats?.[0]?.signatureCipher;
//     const urlSearchParams = new URLSearchParams(signatureCipher);

//     let s = urlSearchParams.get("s");
//     const sp = urlSearchParams.get("sp");
//     let url = urlSearchParams.get("url");

//     s = fta(s);
//     url = `${url}&sig=${s}`;

//     const thumbnails = data?.videoDetails?.thumbnail?.thumbnails[0]?.url;

//     return NextResponse.json(url);
//   } catch (error) {
//     console.error("Error fetching YouTube data:", error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// pages/api/getPlayerResponse.js

export async function POST(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const payload = {
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
  };

  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "com.google.android.youtube/17.36.4 (Linux; U; Android 12; GB) gzip",
  };

  try {
    const response = await fetch(YOUTUBE_API_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseBody = await response.json();

    if (!responseBody) {
      return NextResponse.status(404).json({
        error: `Video '${videoId}' is not available.`,
      });
    }

    return NextResponse.json(
      responseBody?.streamingData?.adaptiveFormats[
        responseBody.streamingData?.adaptiveFormats?.length - 1
      ]?.url
    );
  } catch (error) {
    if (error.name === "AbortError") {
      return NextResponse.json({ error: "Request was aborted" });
    } else {
      return NextResponse.json({
        error: `An error occurred: ${error.message}`,
      });
    }
  }
}
