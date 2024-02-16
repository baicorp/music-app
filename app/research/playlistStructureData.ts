export function extractPlaylistData(playlistObject: any) {
  let contents =
    playlistObject?.contents?.singleColumnBrowseResultsRenderer?.tabs[0]
      ?.tabRenderer?.content?.sectionListRenderer?.contents[0]
      ?.musicPlaylistShelfRenderer?.contents;
  return {
    title:
      playlistObject?.header?.musicDetailHeaderRenderer?.title?.runs[0]?.text,
    subtitle:
      playlistObject?.header?.musicDetailHeaderRenderer?.subtitle?.runs?.map(
        (data: any, index: number) =>
          index === 2
            ? `${data?.text}|${data?.navigationEndpoint?.browseEndpoint?.browseId}`
            : data?.text
      ),
    thumbnail:
      playlistObject?.header?.musicDetailHeaderRenderer?.thumbnail
        ?.croppedSquareThumbnailRenderer?.thumbnail?.thumbnails[3]?.url ||
      playlistObject?.header?.musicDetailHeaderRenderer?.thumbnail
        ?.croppedSquareThumbnailRenderer?.thumbnail?.thumbnails[2]?.url,
    playlistStat:
      playlistObject?.header?.musicDetailHeaderRenderer?.secondSubtitle?.runs?.map(
        (data: any) => data?.text
      ),
    description:
      playlistObject?.header?.musicDetailHeaderRenderer?.description?.runs[0]
        ?.text,
    contents: contents?.map((data: any) => {
      const dataItem = data?.musicResponsiveListItemRenderer;
      return {
        videoId: dataItem?.playlistItemData?.videoId,
        title:
          dataItem?.flexColumns[0]?.musicResponsiveListItemFlexColumnRenderer
            ?.text?.runs[0]?.text,
        artists: dataItem?.flexColumns
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
                  browseId: run?.navigationEndpoint?.browseEndpoint?.browseId,
                };
              }
            )
          )
          ?.flat(100)
          ?.filter((data: any) => data !== null),
        thumbnail:
          dataItem?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]
            ?.url,
        duration:
          dataItem?.fixedColumns[0]?.musicResponsiveListItemFixedColumnRenderer
            ?.text?.runs[0]?.text,
      };
    }),
  };
}
