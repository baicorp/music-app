export function extractAlbumData(albumDataObject: any) {
  let contents =
    albumDataObject?.contents?.singleColumnBrowseResultsRenderer?.tabs[0]
      ?.tabRenderer?.content?.sectionListRenderer?.contents[0]
      ?.musicShelfRenderer?.contents;
  return {
    title:
      albumDataObject?.header?.musicDetailHeaderRenderer?.title?.runs[0]?.text,
    subtitle:
      albumDataObject?.header?.musicDetailHeaderRenderer?.subtitle?.runs?.map(
        (data: any, index: number) =>
          index === 2
            ? `${data?.text}|${data?.navigationEndpoint?.browseEndpoint?.browseId}`
            : data?.text
      ),
    thumbnail:
      albumDataObject?.header?.musicDetailHeaderRenderer?.thumbnail
        ?.croppedSquareThumbnailRenderer?.thumbnail?.thumbnails[2].url,
    albumStat:
      albumDataObject?.header?.musicDetailHeaderRenderer?.secondSubtitle?.runs?.map(
        (data: any) => data?.text
      ),
    description:
      albumDataObject?.header?.musicDetailHeaderRenderer?.description?.runs[0]
        ?.text,
    contents: contents?.map((data: any) => {
      const dataItem = data?.musicResponsiveListItemRenderer;
      return {
        index: dataItem?.index?.runs[0]?.text,
        videoId: dataItem?.playlistItemData?.videoId,
        title:
          dataItem?.flexColumns[0]?.musicResponsiveListItemFlexColumnRenderer
            ?.text?.runs[0]?.text,
        plays:
          dataItem?.flexColumns[
            dataItem?.flexColumns?.length - 1
          ]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.map(
            (run: any) => run?.text
          )[0] || null,
        duration:
          dataItem?.fixedColumns[0]?.musicResponsiveListItemFixedColumnRenderer
            ?.text?.runs[0]?.text,
      };
    }),
  };
}
