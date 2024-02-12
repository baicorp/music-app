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
    if (result?.musicCardShelfRenderer) {
      const subtitle = result?.musicCardShelfRenderer?.subtitle?.runs.map(
        (run: any) => run.text
      );
      if (
        subtitle[0].toLowerCase() === "song" ||
        subtitle[0].toLowerCase() === "video"
      ) {
        return {
          title:
            result?.musicCardShelfRenderer?.header
              ?.musicCardShelfHeaderBasicRenderer?.title?.runs[0]?.text,
          contents: [
            {
              title: result?.musicCardShelfRenderer?.title?.runs[0]?.text,
              videoId:
                result?.musicCardShelfRenderer?.title?.runs[0]
                  ?.navigationEndpoint?.watchEndpoint?.videoId,
              thumbnail:
                result?.musicCardShelfRenderer?.thumbnail
                  ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0].url,
              duration: subtitle[subtitle.length - 1],
              artist: subtitle[2],
              type: subtitle[0],
            },
          ],
        };
      } else if (
        subtitle[0].toLowerCase() === "album" ||
        subtitle[0].toLowerCase() === "playlist"
      ) {
        return {
          title:
            result?.musicCardShelfRenderer?.header
              ?.musicCardShelfHeaderBasicRenderer?.title?.runs[0]?.text,
          contents: [
            {
              title: result?.musicCardShelfRenderer?.title?.runs[0]?.text,
              playlistId:
                result?.musicCardShelfRenderer?.buttons[0]?.buttonRenderer
                  ?.command?.watchPlaylistEndpoint?.playlistId,
              thumbnail:
                result?.musicCardShelfRenderer?.thumbnail
                  ?.musicThumbnailRenderer?.thumbnail?.thumbnails[
                  result?.musicCardShelfRenderer?.thumbnail
                    ?.musicThumbnailRenderer?.thumbnail?.thumbnails?.length - 1
                ].url,
              year: subtitle.filter((data: any) => data.match(/^\d{4}$/))[0],
              type: subtitle[0],
            },
          ],
        };
      } else if (subtitle[0].toLowerCase() === "artist") {
        return {
          title:
            result?.musicCardShelfRenderer?.header
              ?.musicCardShelfHeaderBasicRenderer?.title?.runs[0]?.text,
          contents: [
            {
              artist: result?.musicCardShelfRenderer?.title?.runs[0]?.text,
              channelId:
                result?.musicCardShelfRenderer?.title?.runs[0]
                  ?.navigationEndpoint?.browseEndpoint?.browseId,
              thumbnail:
                result?.musicCardShelfRenderer?.thumbnail
                  ?.musicThumbnailRenderer?.thumbnail?.thumbnails[
                  result?.musicCardShelfRenderer?.thumbnail
                    ?.musicThumbnailRenderer?.thumbnail?.thumbnails?.length - 1
                ].url,
              type: subtitle[0],
            },
          ],
        };
      }
    }
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

export function processChannelData(data: any[]) {
  const acceptedSearchList = [
    "songs",
    "videos",
    // "artists",
    "albums",
    "community playlists",
  ];
  const result = data.map((result: any) => {
    if (result?.musicShelfRenderer) {
      const contents = result?.musicShelfRenderer?.map((data: any) => {
        return songResult(data);
      });
      return {
        title: result?.musicShelfRenderer?.title?.runs[0]?.text,
        contents: contents,
      };
    } else if (result?.musicCarouselShelfRenderer) {
      const title =
        result?.musicCarouselShelfRenderer?.header
          ?.musicCarouselShelfBasicHeaderRenderer?.title?.runs[0]?.text;
      if (!acceptedSearchList.includes(title?.toLowerCase())) return null;
      return {
        title: title,
        contents: result?.musicCarouselShelfRenderer?.contents?.map(
          (object: any) => {
            if (
              title?.toLowerCase() === "songs" ||
              title?.toLowerCase() === "videos"
            ) {
              return songResultFromChannel(object);
            } else if (
              title?.toLowerCase() === "albums" ||
              title?.toLowerCase() === "community playlists"
            ) {
              return albumOrPlaylistResult(object);
            } else {
            }
          }
        ),
      };
    } else {
      return null;
    }
  });
  return result.filter((data: any) => data !== null);
}

// parse playlist from playlistId
export type TrackProps = {
  videoId: string;
  title: string;
  thumbnail: string;
  artist: string;
  duration?: string;
};
export function processPlaylistData(data: any) {
  const contents = data?.contents;
  const contentsData = contents.map((data: any) => {
    const item = data?.playlistPanelVideoRenderer;

    if (!item) return null;
    return {
      videoId: item?.videoId,
      title: item?.title?.runs[0]?.text,
      thumbnail:
        item?.thumbnail?.thumbnails[item?.thumbnail?.thumbnails.length - 1]
          ?.url,
      artist: item?.shortBylineText?.runs[0]?.text,
      duration: item?.lengthText?.runs[0]?.text,
    };
  });
  const finalContentsData: TrackProps[] = contentsData.filter(
    (data: any) => data !== null
  );

  return {
    title: data?.title,
    trackCount: `${finalContentsData.length} songs`,
    tracks: finalContentsData,
  };
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

function songResultFromChannel(songObject: any) {
  const item = songObject?.musicTwoRowItemRenderer;
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
    year: flexColumns.filter((data: string) => data.match(/^\d{4}$/))[0], // year for album
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
