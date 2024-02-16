export function extractSearchData(searchDataObject: any) {
  let contents: any[];
  contents =
    searchDataObject?.contents?.tabbedSearchResultsRenderer?.tabs[0]
      ?.tabRenderer?.content?.sectionListRenderer?.contents;
  return contents.map((content: any) => {
    // get top result
    if (content?.musicCardShelfRenderer) {
      return {
        headerTitle:
          content?.musicCardShelfRenderer?.header
            ?.musicCardShelfHeaderBasicRenderer?.title?.runs[0]?.text,
        contents: [
          {
            title: content?.musicCardShelfRenderer?.title?.runs[0]?.text,
            thumbnail:
              content?.musicCardShelfRenderer?.thumbnail?.musicThumbnailRenderer
                ?.thumbnail?.thumbnails[0]?.url,
            subtitle: content?.musicCardShelfRenderer?.subtitle?.runs
              ?.map((run: any) => run?.text?.trim())
              ?.flat(100)
              ?.filter((data: any) => data.trim() !== ","),
            artists: content?.musicCardShelfRenderer?.subtitle?.runs
              ?.map((run: any) => {
                if (
                  !run?.navigationEndpoint?.browseEndpoint?.browseId?.startsWith(
                    "UC"
                  )
                )
                  return null;
                return {
                  name: run?.text?.trim(),
                  browseId: run?.navigationEndpoint?.browseEndpoint?.browseId,
                };
              })
              ?.filter((data: any) => data !== null),
            plays:
              content?.musicCardShelfRenderer?.subtitle?.runs
                ?.map((run: any) => {
                  if (!run?.text?.endsWith("plays")) return null;
                  return run?.text?.trim();
                })
                ?.filter((data: any) => data !== null)[0] || null,
            views:
              content?.musicCardShelfRenderer?.subtitle?.runs
                ?.map((run: any) => {
                  if (!run?.text?.endsWith("views")) return null;
                  return run?.text?.trim();
                })
                ?.filter((data: any) => data !== null)[0] || null,
            duration:
              content?.musicCardShelfRenderer?.subtitle?.runs
                ?.map((run: any) => {
                  if (!timeRegex.test(run?.text)) return null;
                  return run?.text;
                })
                ?.filter((data: any) => data !== null)[0] || null,
            videoId:
              content?.musicCardShelfRenderer?.title?.runs[0]
                ?.navigationEndpoint?.watchEndpoint?.videoId,
            browseId:
              content?.musicCardShelfRenderer?.title?.runs[0]
                ?.navigationEndpoint?.browseEndpoint?.browseId,
            // type: content?.musicCardShelfRenderer?.subtitle?.runs[0]?.text?.toLowerCase(),
            type: contentType(
              content?.musicCardShelfRenderer?.title?.runs[0]
                ?.navigationEndpoint?.watchEndpoint?.videoId ||
                content?.musicCardShelfRenderer?.title?.runs[0]
                  ?.navigationEndpoint?.browseEndpoint?.browseId
            ),
          },
        ],
      };
    }
    // get related search result
    if (content?.musicShelfRenderer) {
      if (
        content?.musicShelfRenderer?.title?.runs[0]?.text?.toLowerCase() ===
          "podcasts" ||
        content?.musicShelfRenderer?.title?.runs[0]?.text?.toLowerCase() ===
          "episodes" ||
        content?.musicShelfRenderer?.title?.runs[0]?.text?.toLowerCase() ===
          "profiles"
      ) {
        return undefined;
      }

      return {
        headerTitle: content?.musicShelfRenderer?.title?.runs[0]?.text,
        contents: content?.musicShelfRenderer?.contents?.map((content: any) => {
          const subtitle = content?.musicResponsiveListItemRenderer?.flexColumns
            ?.map((flexColumn: any) =>
              flexColumn.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                (run: any) => run?.text?.trim()
              )
            )
            ?.flat(100)
            ?.filter((data: any) => data.trim() !== ",")
            ?.slice(1);
          return {
            title:
              content?.musicResponsiveListItemRenderer?.flexColumns[0]
                .musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]?.text,
            thumbnail:
              content?.musicResponsiveListItemRenderer?.thumbnail
                ?.musicThumbnailRenderer?.thumbnail?.thumbnails[
                content?.musicResponsiveListItemRenderer?.thumbnail
                  ?.musicThumbnailRenderer?.thumbnail?.thumbnails.length - 1
              ]?.url,
            subtitle: subtitle,
            artists: content?.musicResponsiveListItemRenderer?.flexColumns
              ?.map((flexColumn: any) =>
                flexColumn.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                  (run: any) => {
                    if (
                      !run?.navigationEndpoint?.browseEndpoint?.browseId?.startsWith(
                        "UC"
                      )
                    )
                      return null;
                    return {
                      name: run?.text?.trim(),
                      browseId:
                        run?.navigationEndpoint?.browseEndpoint?.browseId,
                    };
                  }
                )
              )
              ?.flat(100)
              ?.filter((data: any) => data !== null),
            plays:
              content?.musicResponsiveListItemRenderer?.flexColumns
                ?.map((flexColumn: any) =>
                  flexColumn.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                    (run: any) => {
                      if (!run?.text?.endsWith("plays")) return null;
                      return run?.text;
                    }
                  )
                )
                ?.flat(100)
                ?.filter((data: any) => data !== null)[0] || null,
            views:
              content?.musicResponsiveListItemRenderer?.flexColumns
                ?.map((flexColumn: any) =>
                  flexColumn.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                    (run: any) => {
                      if (!run?.text?.endsWith("views")) return null;
                      return run?.text;
                    }
                  )
                )
                ?.flat(100)
                ?.filter((data: any) => data !== null)[0] || null,
            duration:
              content?.musicResponsiveListItemRenderer?.flexColumns
                ?.map((flexColumn: any) =>
                  flexColumn.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                    (run: any) => {
                      if (!timeRegex.test(run?.text)) return null;
                      return run?.text;
                    }
                  )
                )
                ?.flat(100)
                ?.filter((data: any) => data !== null)[0] || null,
            videoId:
              content?.musicResponsiveListItemRenderer?.overlay
                ?.musicItemThumbnailOverlayRenderer?.content
                ?.musicPlayButtonRenderer?.playNavigationEndpoint?.watchEndpoint
                ?.videoId,
            browseId:
              content?.musicResponsiveListItemRenderer?.navigationEndpoint
                ?.browseEndpoint?.browseId,
            type: contentType(
              content?.musicResponsiveListItemRenderer?.overlay
                ?.musicItemThumbnailOverlayRenderer?.content
                ?.musicPlayButtonRenderer?.playNavigationEndpoint?.watchEndpoint
                ?.videoId ||
                content?.musicResponsiveListItemRenderer?.navigationEndpoint
                  ?.browseEndpoint?.browseId
            ),
          };
        }),
      };
    }
    return undefined;
  });
}

export function contentType(id: string) {
  if (!id) return null;
  if (id?.startsWith("MPREb_")) {
    return "album";
  } else if (id?.startsWith("VLRDCLAK5uy_") || id?.startsWith("VLPL")) {
    return "playlist";
  } else if (id?.startsWith("UC")) {
    return "artist";
  } else {
    return "song";
  }
}

export const timeRegex =
  /^(0?\d|1\d|2[0-3]):([0-5]?\d):([0-5]?\d)$|^(0?\d|1\d|2[0-3]):([0-5]?\d)$|^(0?\d|1\d|2[0-3])$/;
