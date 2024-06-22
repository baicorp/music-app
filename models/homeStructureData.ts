import { contentType } from "@/utils/contentType";

export default function extractHomeData(data: any) {
  const contents =
    data?.contents?.singleColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer
      ?.content?.sectionListRenderer?.contents;
  return contents?.map((data: any) => {
    const contentTypeTitle =
      data?.musicCarouselShelfRenderer?.header
        ?.musicCarouselShelfBasicHeaderRenderer?.title?.runs[0]?.text;
    return {
      headerTitle: contentTypeTitle,
      contents: data?.musicCarouselShelfRenderer?.contents?.map((data: any) => {
        if (data?.musicResponsiveListItemRenderer) {
          return {
            title:
              data?.musicResponsiveListItemRenderer?.flexColumns[0]
                ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
                ?.text,
            thumbnail: [
              data?.musicResponsiveListItemRenderer?.thumbnail
                ?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]?.url ||
                data?.musicResponsiveListItemRenderer?.thumbnail
                  ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
            ],
            subtitle: data?.musicResponsiveListItemRenderer?.flexColumns
              ?.map((data: any) =>
                data.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                  (data: any) => data?.text?.trim()
                )
              )
              ?.flat(100)
              ?.filter((data: any) => data?.trim() !== ","),
            artists: data?.musicResponsiveListItemRenderer?.flexColumns
              ?.map((data: any) =>
                data.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                  (run: any) => {
                    if (
                      !run?.navigationEndpoint?.browseEndpoint?.browseId?.startsWith(
                        "UC"
                      )
                    )
                      return null;
                    return {
                      name: run?.text,
                      browseId:
                        run?.navigationEndpoint?.browseEndpoint?.browseId,
                    };
                  }
                )
              )
              ?.flat(100)
              ?.filter((data: any) => data !== null),
            videoId:
              data?.musicResponsiveListItemRenderer?.overlay
                ?.musicItemThumbnailOverlayRenderer?.content
                ?.musicPlayButtonRenderer?.playNavigationEndpoint?.watchEndpoint
                ?.videoId,
            type: contentType(
              data?.musicResponsiveListItemRenderer?.overlay
                ?.musicItemThumbnailOverlayRenderer?.content
                ?.musicPlayButtonRenderer?.playNavigationEndpoint?.watchEndpoint
                ?.videoId
            ),
          };
        }
        if (data?.musicTwoRowItemRenderer) {
          return {
            title: data?.musicTwoRowItemRenderer?.title?.runs[0]?.text,
            subtitle: data?.musicTwoRowItemRenderer?.subtitle?.runs
              ?.map((data: any) => data?.text?.trim())
              .flat(100)
              ?.filter((data: any) => data?.trim() !== ","),
            thumbnail: [
              data?.musicTwoRowItemRenderer?.thumbnailRenderer
                ?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]?.url ||
                data?.musicTwoRowItemRenderer?.thumbnailRenderer
                  ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
            ],
            videoId:
              data?.musicTwoRowItemRenderer?.navigationEndpoint?.watchEndpoint
                ?.videoId,
            browseId:
              data?.musicTwoRowItemRenderer?.navigationEndpoint?.browseEndpoint
                ?.browseId,
            type: contentType(
              data?.musicTwoRowItemRenderer?.navigationEndpoint?.watchEndpoint
                ?.videoId ||
                data?.musicTwoRowItemRenderer?.navigationEndpoint
                  ?.browseEndpoint?.browseId
            ),
          };
        }
      }),
    };
  });
}
