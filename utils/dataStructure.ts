export function extractChannelData(channelObject: any) {
  return {
    artistName:
      channelObject?.header?.musicImmersiveHeaderRenderer?.title?.runs[0]?.text,
    description:
      channelObject?.header?.musicImmersiveHeaderRenderer?.description?.runs[0]
        ?.text,
    thumbnail:
      channelObject?.header?.musicImmersiveHeaderRenderer?.thumbnail
        ?.thumbnails[2]?.url,
    contents:
      channelObject?.contents?.singleColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents?.map(
        (data: any) => {
          if (data?.musicShelfRenderer) {
            return {
              title: data?.musicShelfRenderer?.title?.runs[0]?.text,
              contents: data?.musicShelfRenderer?.contents?.map((data: any) => {
                return {
                  title: "",
                  thumbnail: "",
                  subtitle: data?.musicResponsiveListItemRenderer?.flexColumns
                    ?.map((data: any) =>
                      data.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
                        (data: any) => data?.text
                      )
                    )
                    ?.flat()
                    .join()
                    .replaceAll(",", " "),
                  id: data?.musicResponsiveListItemRenderer?.overlay
                    ?.musicItemThumbnailOverlayRenderer?.content
                    ?.musicPlayButtonRenderer?.playNavigationEndpoint
                    ?.watchEndpoint?.videoId,
                };
              }),
            };
          }
          if (data?.musicCarouselShelfRenderer) {
            return {
              title:
                data?.musicCarouselShelfRenderer?.header
                  ?.musicCarouselShelfBasicHeaderRenderer?.title?.runs[0]?.text,
              contents: data?.musicCarouselShelfRenderer?.contents?.map(
                (data: any) => {
                  return {
                    title: data?.musicTwoRowItemRenderer?.title?.runs[0]?.text,
                    subtitle: data?.musicTwoRowItemRenderer?.subtitle?.runs
                      ?.map((data: any) => data.text)
                      .join()
                      .replaceAll(",", " "),
                    thumbnail:
                      data?.musicTwoRowItemRenderer?.thumbnailRenderer
                        ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
                    id:
                      data?.musicTwoRowItemRenderer?.navigationEndpoint
                        ?.browseEndpoint?.browseId ||
                      data?.musicTwoRowItemRenderer?.navigationEndpoint
                        ?.watchEndpoint?.videoId,
                  };
                }
              ),
            };
          }
        }
      ),
  };
}
// const artistPage = {
//   artistName: header?.musicImmersiveHeaderRenderer?.title?.runs[0]?.text,
//   description: header?.musicImmersiveHeaderRenderer?.description?.runs[0]?.text,
//   thumbnail:
//     header?.musicImmersiveHeaderRenderer?.thumbnail?.thumbnails[2]?.url,
//   contents:
//     contents?.singleColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents?.map(
//       (data) => {
//         if (data?.musicShelfRenderer) {
//           return {
//             title: data?.musicShelfRenderer?.title?.runs[0]?.text,
//             contents: data?.musicShelfRenderer?.contents?.map((data) => {
//               return {
//                 title: "",
//                 thumbnail: "",
//                 subtitle: data?.musicResponsiveListItemRenderer?.flexColumns
//                   ?.map((data) =>
//                     data.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
//                       (data) => data?.text
//                     )
//                   )
//                   ?.flat()
//                   .join()
//                   .replaceAll(",", " "),
//                 id: data?.musicResponsiveListItemRenderer?.overlay
//                   ?.musicItemThumbnailOverlayRenderer?.content
//                   ?.musicPlayButtonRenderer?.playNavigationEndpoint
//                   ?.watchEndpoint?.videoId,
//               };
//             }),
//           };
//         }
//         if (data?.musicCarouselShelfRenderer) {
//           return {
//             title:
//               data?.musicCarouselShelfRenderer?.header
//                 ?.musicCarouselShelfBasicHeaderRenderer?.title?.runs[0]?.text,
//             contents: data?.musicCarouselShelfRenderer?.contents?.map(
//               (data) => {
//                 return {
//                   title: data?.musicTwoRowItemRenderer?.title?.runs[0]?.text,
//                   subtitle: data?.musicTwoRowItemRenderer?.subtitle?.runs
//                     ?.map((data) => data.text)
//                     .join()
//                     .replaceAll(",", " "),
//                   thumbnail:
//                     data?.musicTwoRowItemRenderer?.thumbnailRenderer
//                       ?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
//                   id:
//                     data?.musicTwoRowItemRenderer?.navigationEndpoint
//                       ?.browseEndpoint?.browseId ||
//                     data?.musicTwoRowItemRenderer?.navigationEndpoint
//                       ?.watchEndpoint?.videoId,
//                 };
//               }
//             ),
//           };
//         }
//       }
//     ),
// };
