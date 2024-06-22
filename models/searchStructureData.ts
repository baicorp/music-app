import { contentType } from "@/utils/contentType";

export default function extractSearchData(searchDataObject: any) {
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
            thumbnail: [
              content?.musicCardShelfRenderer?.thumbnail?.musicThumbnailRenderer
                ?.thumbnail?.thumbnails[1]?.url ||
                content?.musicCardShelfRenderer?.thumbnail
                  ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
            ],
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
          "profiles" ||
        content?.musicShelfRenderer?.title?.runs[0]?.text?.toLowerCase() ===
          "last episodes"
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
            thumbnail: [
              content?.musicResponsiveListItemRenderer?.thumbnail
                ?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]?.url ||
                content?.musicResponsiveListItemRenderer?.thumbnail
                  ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
            ],
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

export const timeRegex =
  /^(0?\d|1\d|2[0-3]):([0-5]?\d):([0-5]?\d)$|^(0?\d|1\d|2[0-3]):([0-5]?\d)$|^(0?\d|1\d|2[0-3])$/;
