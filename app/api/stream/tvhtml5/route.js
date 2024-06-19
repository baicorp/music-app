import { NextResponse } from "next/server";

const YOUTUBE_API_URL = `https://www.youtube.com/youtubei/v1/player?key=AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w`;
const signatureTimeStamp = 19884;

let TO = {
  nE: function (a, b) {
    a?.splice(0, b);
  },
  te: function (a, b) {
    var c = a[0];
    a[0] = a[b % a?.length];
    a[b % a?.length] = c;
  },
  Ud: function (a) {
    a?.reverse();
  },
};

function APa(a) {
  // nE, Ud,te
  a = a?.split("");
  TO.nE(a, 2);
  TO.Ud(a, 46);
  TO.te(a, 62);
  TO.nE(a, 1);
  TO.te(a, 61);
  TO.Ud(a, 40);
  TO.te(a, 65);
  TO.Ud(a, 54);
  return a?.join("");
}

export async function POST(request) {
  const url = new URL(request.url);
  const videoId = url.searchParams.get("videoId");

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(YOUTUBE_API_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        videoId,
        context: {
          client: {
            clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
            clientVersion: "2.0",
            visitorData: "CgtqTGdZdzQyLVQ5TSi396azBjIKCgJJRBIEGgAgYw%3D%3D",
          },
        },
        playbackContext: {
          contentPlaybackContext: {
            referer: `https://music.youtube.com/watch?v=${videoId}`,
            signatureTimestamp: signatureTimeStamp,
          },
        },
      }),
    });

    console.log("tvhtml5 test");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data) {
      return NextResponse.json({
        error: `Video '${videoId}' is not available.`,
      });
    }

    const signatureCipher =
      data?.streamingData?.adaptiveFormats?.[
        data?.streamingData?.adaptiveFormats?.length - 1
      ]?.signatureCipher;
    const urlSearchParams = new URLSearchParams(signatureCipher);

    let s = urlSearchParams.get("s");
    let url = urlSearchParams.get("url");

    s = APa(s);
    url = `${url}&sig=${s}`;

    return NextResponse.json(data);
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
