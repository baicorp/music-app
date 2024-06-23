import {
  extractChannelData,
  extractSearchData,
  extractAlbumData,
  extractHomeData,
  extractPlaylistData,
  extractNextData,
} from "@/models";

type urlType = "browse" | "search" | "album" | "playlist" | "next";

function url(type: urlType) {
  return `https://music.youtube.com/youtubei/v1/${type}?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30`;
}

const headers = new Headers();
headers.append("Host", "music.youtube.com");
headers.append("Content-Type", "application/json");
headers.append(
  "User-Agent",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.42"
);
headers.append("Accept", "*/*");
headers.append("Origin", "https://music.youtube.com");
headers.append("Referer", "https://music.youtube.com/");
headers.append("Accept-Encoding", "gzip, deflate");
headers.append(
  "Accept-Language",
  "de,de-DE;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6"
);

const payload = {
  context: {
    client: {
      clientName: "WEB_REMIX",
      clientVersion: "1.20220918",
    },
  },
  racyCheckOk: true,
  contentCheckOk: true,
};

export async function search(query: string) {
  const res = await fetch(url("search"), {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: query,
      ...payload,
    }),
  });
  const data = await res.json();
  return extractSearchData(data);
}

export async function getHome() {
  const fetchData = async (browseId: string, additionalPayload = {}) => {
    return await fetch(url("browse"), {
      method: "POST",
      headers,
      body: JSON.stringify({
        browseId,
        ...payload,
        ...additionalPayload,
      }),
    });
  };

  const res1 = fetchData("FEmusic_home");
  const res2 = fetchData("FEmusic_home", {
    params:
      "ggM8SgQICBABSgQIBxABSgQIAxABSgQICRABSgQIChABSgQIDRABSgQIDhABSgQIBBABSgQIBRABSgQIBhAD",
  });

  const [a, b] = await Promise.all([res1, res2]);
  let [dataA, dataB] = await Promise.all([a.json(), b.json()]);
  dataA = extractHomeData(dataA);
  dataB = extractHomeData(dataB);
  return [...dataA, ...dataB];
}

export async function getPlaylist(browseId: string) {
  const res = await fetch(url("browse"), {
    method: "POST",
    headers,
    body: JSON.stringify({
      browseId: browseId,
      ...payload,
    }),
  });
  const data = await res.json();
  return extractPlaylistData(data);
}

export async function getAlbum(browseId: string) {
  const res = await fetch(url("browse"), {
    method: "POST",
    headers,
    body: JSON.stringify({
      browseId: browseId,
      ...payload,
    }),
  });
  const data = await res.json();
  return extractAlbumData(data);
}

export async function getChannel(browseId: string) {
  const response = await fetch(url("browse"), {
    method: "POST",
    headers,
    cache: "no-store",
    body: JSON.stringify({
      browseId,
      ...payload,
    }),
  });

  const data = await response.json();
  return extractChannelData(data);
}

export async function next(videoId: string, playlistId: string | null) {
  playlistId = !!playlistId ? playlistId : `RDAMVM${videoId}`;

  const body = {
    videoId,
    playlistId,
    isAudioOnly: true,
    ...payload,
  };

  const response = await fetch(
    "https://music.youtube.com/youtubei/v1/next?prettyPrint=false",
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );
  let data = await response.json();
  return extractNextData(data);
}
