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
            videoId:
              content?.musicCardShelfRenderer?.title?.runs[0]
                ?.navigationEndpoint?.watchEndpoint?.videoId,
            browseId:
              content?.musicCardShelfRenderer?.title?.runs[0]
                ?.navigationEndpoint?.browseEndpoint?.browseId,
            type: content?.musicCardShelfRenderer?.subtitle?.runs[0]?.text?.toLowerCase(),
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
            videoId:
              content?.musicResponsiveListItemRenderer?.overlay
                ?.musicItemThumbnailOverlayRenderer?.content
                ?.musicPlayButtonRenderer?.playNavigationEndpoint?.watchEndpoint
                ?.videoId,
            browseId:
              content?.musicResponsiveListItemRenderer?.navigationEndpoint
                ?.browseEndpoint?.browseId,
            type: subtitle[subtitle.length - 1].includes("plays")
              ? "video"
              : subtitle[0]?.toLowerCase(),
          };
        }),
      };
    }
    return undefined;
  });
}
