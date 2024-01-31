import { NextResponse } from "next/server";

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("videoId");
  const body = {
    videoId: id,
    context: {
      client: {
        clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
        clientVersion: "2.0",
      },
      thirdParty: {
        embedUrl: "https://www.youtube.com",
      },
    },
    playbackContext: {
      contentPlaybackContext: {
        signatureTimestamp: "19746",
      },
    },
  };
  const youtubeApiUrl =
    "https://www.youtube.com/youtubei/v1/player?key=AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w";
  try {
    const response = await fetch(youtubeApiUrl, {
      method: "POST",
      headers: {
        Host: "www.youtube.com",
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.42",
        Accept: "*/*",
        Origin: "https://www.youtube.com",
        Referer: "https://www.youtube.com/",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "de,de-DE;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    const signatureCipher =
      data.streamingData.adaptiveFormats[
        data.streamingData.adaptiveFormats.length - 1
      ].signatureCipher;
    const streamingUrl = getUrlStream(signatureCipher);

    return NextResponse.json({
      title: data.videoDetails.title,
      thumbnailUrl: data.videoDetails.thumbnail.thumbnails[0].url,
      uploader: data.videoDetails.author,
      url: streamingUrl,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
function getUrlStream(signatureCipher) {
  var PP = {
    U0: function (a, b) {
      var c = a[0];
      a[0] = a[b % a.length];
      a[b % a.length] = c;
    },
    ng: function (a) {
      a.reverse();
    },
    mM: function (a, b) {
      a.splice(0, b);
    },
  };

  var YLa = function (a) {
    a = a.split("");
    PP.ng(a, 57);
    PP.mM(a, 2);
    PP.U0(a, 24);
    PP.U0(a, 44);
    PP.mM(a, 1);
    PP.ng(a, 32);
    PP.U0(a, 6);
    return a.join("");
  };

  // the chipper have 3 query parameter ("s", "sp", "url")
  const chipper = new URLSearchParams(signatureCipher);

  // get base url
  const BASE_URL = chipper.get("url");

  // decode the "s" query parameter value
  const decodedS = YLa(chipper.get("s"));

  // generate streamable url by append it back "decodedS" value to the BASE_URL as a query parameter identified by "sig".
  return `${BASE_URL}&sig=${decodedS}`;
}
