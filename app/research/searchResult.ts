export type SongItem = {
  videoId: string; // overlay?.musicItemThumbnailOverlayRenderer?.content?.musicPlayButtonRenderer?.playNavigationEndpoint?.watchEndpoint?.videoId
  title: string; // flexColumns?.map((data: any) => data?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map((data: any) => data?.text))?.flat()?.join()
  thumbnail: string;
  duration: string;
  artist: string;
};

export type AlbumOrPlaylistItem = {
  playlistId: string; // overlay?.musicItemThumbnailOverlayRenderer?.content?.musicPlayButtonRenderer?.playNavigationEndpoint?.watchPlaylistEndpoint?.playlistId
  title: string; // flexColumns?.map((data: any) => data?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map((data: any) => data?.text))?.flat()?.join()
  thumbnail: string;
  duration: string;
  artist: string;
};

export function processSearchData(data: any[]) {
  const acceptedSearchList = [
    "songs",
    "videos",
    "artists",
    "albums",
    "community playlists",
  ];
  const result = data.map((result: any) => {
    const title = result?.musicShelfRenderer?.title?.runs[0]?.text;
    if (!acceptedSearchList.includes(title?.toLowerCase())) return null;
    return {
      title: title,
      contents: result?.musicShelfRenderer?.contents?.map((object: any) => {
        if (
          title?.toLowerCase() === "songs" ||
          title?.toLowerCase() === "videos"
        ) {
          return songResult(object);
        } else if (title?.toLowerCase() === "artists") {
          return channelResult(object);
        } else if (
          title?.toLowerCase() === "albums" ||
          title?.toLowerCase() === "community playlists"
        ) {
          return albumOrPlaylistResult(object);
        } else {
        }
      }),
    };
  });
  return result.filter((data: any) => data !== null);
}

function songResult(songObject: any) {
  const item = songObject?.musicResponsiveListItemRenderer;
  const flexColumns = parseFlexColumnsData(item?.flexColumns || []);
  return {
    videoId:
      item?.overlay?.musicItemThumbnailOverlayRenderer?.content
        ?.musicPlayButtonRenderer?.playNavigationEndpoint?.watchEndpoint
        ?.videoId,
    title: flexColumns[0],
    thumbnail:
      item?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
    duration:
      flexColumns.filter((data: string) => data.match(/\b(\d+:\d+)\b/))[0] ||
      "0",
    artist: flexColumns[1],
  };
}

function albumOrPlaylistResult(songObject: any) {
  const item = songObject?.musicResponsiveListItemRenderer;
  const flexColumns = parseFlexColumnsData(item?.flexColumns || []);
  return {
    playlistId:
      item?.overlay?.musicItemThumbnailOverlayRenderer?.content
        ?.musicPlayButtonRenderer?.playNavigationEndpoint?.watchPlaylistEndpoint
        ?.playlistId,
    title: flexColumns[0],
    thumbnail:
      item?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[
        item?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails?.length -
          1
      ]?.url,
    artist: flexColumns[3],
    year: flexColumns.filter((data: string) => data.match(/.*\d.*/))[0], // year for album
    views: flexColumns.filter((data: string) => data.match(/.*\d.*/))[0], // for playlist
  };
}

function channelResult(songObject: any) {
  const item = songObject?.musicResponsiveListItemRenderer;
  const flexColumns = parseFlexColumnsData(item?.flexColumns || []);
  return {
    channelId: item?.navigationEndpoint?.browseEndpoint?.browseId,
    thumbnail:
      item?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[
        item?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails?.length -
          1
      ]?.url,
    artist: flexColumns[0],
  };
}

// parse flex column data to singgle array
function parseFlexColumnsData(data: any[]) {
  return data
    ?.map((data: any) =>
      data?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
        (data: any) => data?.text
      )
    )
    ?.flat();
}

// parse playlist from playlistId
export function processPlaylistData(data: any) {
  const contents = data?.contents;
  const contentsData = contents.map((data: any) => {
    const item = data?.playlistPanelVideoRenderer;

    if (!item) return null;

    const title = item?.title?.runs[0]?.text;
    const thumbnail =
      item?.thumbnail?.thumbnails[item?.thumbnail?.thumbnails.length - 1]?.url;
    const duration = item?.lengthText?.runs[0]?.text;
    const videoId = item?.videoId;
    const artist = item?.shortBylineText?.runs[0]?.text;
    return {
      videoId: videoId,
      title: title,
      thumbnail: thumbnail,
      artist: artist,
      duration: duration,
    };
  });
  const finalContentsData = contentsData.filter((data: any) => data !== null);

  return {
    title: data?.title,
    trackCount: `${finalContentsData.length} songs`,
    tracks: finalContentsData,
  };
}
