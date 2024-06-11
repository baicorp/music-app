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

const signatureTimeStamp = 19884;

let TO = {
  nE: function (a, b) {
    a.splice(0, b);
  },
  te: function (a, b) {
    var c = a[0];
    a[0] = a[b % a.length];
    a[b % a.length] = c;
  },
  Ud: function (a) {
    a.reverse();
  },
};

function APa(a) {
  // nE, Ud,te
  a = a.split("");
  TO.nE(a, 2);
  TO.Ud(a, 46);
  TO.te(a, 62);
  TO.nE(a, 1);
  TO.te(a, 61);
  TO.Ud(a, 40);
  TO.te(a, 65);
  TO.Ud(a, 54);
  return a.join("");
}

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

export async function POST(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(YOUTUBE_API_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        videoId: id,
        context: {
          client: {
            clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
            clientVersion: "2.0",
          },
          thirdParty: {
            embedUrl: `https://www.youtube.com`,
          },
        },
        playbackContext: {
          contentPlaybackContext: {
            signatureTimestamp: signatureTimeStamp,
          },
        },
      }),
    });

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

    return NextResponse.json(url);
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
