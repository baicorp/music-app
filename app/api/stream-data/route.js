import axios from "axios";
import { NextResponse } from "next/server";

const getRemoteFile = async (url) => {
  try {
    let { data } = await axios.get(url);
    return data;
  } catch (e) {
    return null;
  }
};

const resolvePlayerResponse = (watchHtml) => {
  if (!watchHtml) {
    return "";
  }

  let matches = watchHtml.match(/ytInitialPlayerResponse = (.*)}}};/);
  return matches ? matches[1] + "}}}" : "";
};

const buildDecoder = async (watchHtml) => {
  if (!watchHtml) {
    return null;
  }

  let jsFileUrlMatches = watchHtml.match(
    /\/s\/player\/[A-Za-z0-9]+\/[A-Za-z0-9_.]+\/[A-Za-z0-9_]+\/base\.js/
  );

  if (!jsFileUrlMatches) {
    return null;
  }

  let jsFileContent = await getRemoteFile(
    `https://www.youtube.com${jsFileUrlMatches[0]}`
  );

  let decodeFunctionMatches = jsFileContent.match(
    /function.*\.split\(\"\"\).*\.join\(\"\"\)}/
  );

  if (!decodeFunctionMatches) {
    return null;
  }

  let decodeFunction = decodeFunctionMatches[0];

  let varNameMatches = decodeFunction.match(/\.split\(\"\"\);([a-zA-Z0-9]+)\./);

  if (!varNameMatches) {
    return null;
  }

  let varStartIndex = jsFileContent.indexOf(`var ${varNameMatches[1]}={`);
  if (varStartIndex < 0) {
    return null;
  }
  let varEndIndex = jsFileContent.indexOf("}};", varStartIndex);
  if (varEndIndex < 0) {
    return null;
  }

  let varDeclares = jsFileContent.substring(varStartIndex, varEndIndex + 3);

  if (!varDeclares) {
    return null;
  }

  return function (signatureCipher) {
    let params = new URLSearchParams(signatureCipher);
    let {
      s: signature,
      sp: signatureParam = "signature",
      url,
    } = Object.fromEntries(params);
    let decodedSignature = new Function(`
            "use strict";
            ${varDeclares}
            return (${decodeFunction})("${signature}");
        `)();

    return `${url}&${signatureParam}=${encodeURIComponent(decodedSignature)}`;
  };
};

async function getInfo(videoId) {
  if (!videoId) return null;

  const youtubeURL = `https://www.youtube.com/watch?v=${videoId}`;

  try {
    const response = await fetch(youtubeURL);
    const data = await response.text();

    if (!response || response.status != 200 || !data) {
      const error = new Error("error fetch youtubeURL");
      console.log("error fetch youtubeURL");
      throw error;
    }

    let ytInitialPlayerResponse = resolvePlayerResponse(data);
    let parsedResponse = JSON.parse(ytInitialPlayerResponse);
    let streamingData = parsedResponse.streamingData || {};

    let formats = (streamingData.formats || []).concat(
      streamingData.adaptiveFormats || []
    );

    let isEncryptedVideo = !!formats.find((it) => !!it.signatureCipher);
    if (isEncryptedVideo) {
      let decoder = await buildDecoder(data);

      if (decoder) {
        formats = formats.map((it) => {
          if (it.url || !it.signatureCipher) {
            return it;
          }

          it.url = decoder(it.signatureCipher);
          delete it.signatureCipher;
          return it;
        });
      }
    }

    let result = {
      // videoDetails: parsedResponse.videoDetails || {},
      // formats: formats.filter((format: any) => format.url),
      url: [formats[0].url, formats[1].url],
    };

    return NextResponse.json(result);
  } catch (error) {
    return null;
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");

  if (!videoId) return NextResponse.json({ error: "no videoId given" });

  try {
    const res = await getInfo(videoId);
    if (!!res === false)
      return NextResponse.json({ error: "not valid response" });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ "error nih bos": e.message });
  }
}
