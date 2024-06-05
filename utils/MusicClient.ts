import { MusicPlayerProps } from "@/components/audioPlayer/Audio";
import {
  extractChannelData,
  extractSearchData,
  extractAlbumData,
  extractHomeData,
  extractPlaylistData,
} from "@/models";

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

export async function search(query: string) {
  const body = {
    query: query,
    context: {
      client: {
        clientName: "WEB_REMIX",
        clientVersion: "1.20220918",
      },
    },
    racyCheckOk: true,
    contentCheckOk: true,
  };

  const res = await fetch(
    "https://music.youtube.com/youtubei/v1/search?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return extractSearchData(data);
}

export async function getHome() {
  const body = {
    browseId: "FEmusic_home",
    params:
      "ggM8SgQICBADSgQIBxABSgQICRABSgQIDRABSgQIAxABSgQIChABSgQIBRABSgQIBBABSgQIDhABSgQIBhAB",
    context: {
      client: {
        clientName: "WEB_REMIX",
        clientVersion: "1.20220918",
      },
    },
  };

  const res = await fetch(
    "https://music.youtube.com/youtubei/v1/browse?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return extractHomeData(data);
}

export async function getPlaylist(browseId: string) {
  const body = {
    browseId: browseId,
    context: {
      client: {
        clientName: "WEB_REMIX",
        clientVersion: "1.20220918",
      },
    },
  };

  const res = await fetch(
    "https://music.youtube.com/youtubei/v1/browse?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return extractPlaylistData(data);
}

export async function getAlbum(browseId: string) {
  const body = {
    browseId: browseId,
    context: {
      client: {
        clientName: "WEB_REMIX",
        clientVersion: "1.20220918",
      },
      thirdParty: {
        embedUrl: "https://www.youtube.com",
      },
    },
  };

  const res = await fetch(
    "https://www.youtube.com/youtubei/v1/browse?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return extractAlbumData(data);
}

export async function getChannel(browseId: string) {
  const body = {
    browseId: browseId,
    context: {
      client: {
        clientName: "WEB_REMIX",
        clientVersion: "1.20220918",
      },
      thirdParty: {
        embedUrl: "https://www.youtube.com",
      },
    },
  };
  const youtubeApiUrl =
    "https://www.youtube.com/youtubei/v1/browse?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30";
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
    return extractChannelData(data);
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getVideo(videoId: string): Promise<MusicPlayerProps> {
  const body = {
    context: {
      client: {
        clientName: "ANDROID_MUSIC",
        clientVersion: "5.26.1",
        androidSdkVersion: 30,
      },
    },
    racyCheckOk: true,
    contentCheckOk: true,
    videoId: videoId,
    params: "2AMBCgIQBg",
  };
  const youtubeApiUrl =
    "https://www.youtube.com/youtubei/v1/player?key=AIzaSyAOghZGza2MQSZkY_zfZ370N-PUdXEo8AI";
  try {
    const response = await fetch(youtubeApiUrl, {
      method: "POST",
      headers: {
        accept: "*/*",
        "X-Goog-Api-Key": "AIzaSyAOghZGza2MQSZkY_zfZ370N-PUdXEo8AI",
        origin: "https://music.youtube.com",
        referer: "https://music.youtube.com",
        DNT: "?1",
      },
      cache: "no-store",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    const thumbnails = data?.videoDetails?.thumbnail?.thumbnails[0]?.url;
    return {
      videoId: data?.videoDetails?.videoId,
      title: data?.videoDetails?.title,
      thumbnailUrl: thumbnails,
      // channelId: data?.videoDetails?.channelId,
      uploader: data?.videoDetails?.author,
      // videoDetails: { ...data?.videoDetails, thumbnail: thumbnails },
      url: data.streamingData?.adaptiveFormats[
        data.streamingData?.adaptiveFormats?.length - 1
      ]?.url,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      videoId: "error",
      title: "error",
      thumbnailUrl: "error",
      // channelId: "hello",
      uploader: "error",
      // videoDetails: { ...data?.videoDetails, thumbnail: thumbnails },
      url: ["error", "error 2"],
    };
  }
}
