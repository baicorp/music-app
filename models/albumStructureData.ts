export default function extractAlbumData(albumDataObject: any) {
  const album =
    albumDataObject?.contents?.twoColumnBrowseResultsRenderer?.tabs[0]
      ?.tabRenderer?.content?.sectionListRenderer?.contents[0]
      ?.musicResponsiveHeaderRenderer;
  const contents =
    albumDataObject?.contents?.twoColumnBrowseResultsRenderer?.secondaryContents
      ?.sectionListRenderer?.contents[0]?.musicShelfRenderer?.contents;
  return {
    title: album?.title?.runs[0]?.text,
    subtitle: album?.subtitle?.runs?.map((data: any) => data?.text)?.join(""),
    thumbnail:
      album?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[3]?.url ||
      album?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[2]?.url ||
      album?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]?.url ||
      album?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[0]?.url,
    albumStat: album?.secondSubtitle?.runs
      ?.map((data: any) => data?.text)
      ?.join(""),
    description:
      album?.description?.musicDescriptionShelfRenderer?.description?.runs[0]
        ?.text,
    artists: album?.straplineTextOne?.runs
      ?.map((run: any) => {
        if (run?.navigationEndpoint?.browseEndpoint) {
          return {
            name: run?.text,
            browseId: run?.navigationEndpoint?.browseEndpoint?.browseId,
          };
        }
        return null;
      })
      ?.filter((data: any) => data !== null),
    contents: contents?.map((data: any) => {
      const dataItem = data?.musicResponsiveListItemRenderer;
      return {
        index: dataItem?.index?.runs[0]?.text,
        videoId: dataItem?.playlistItemData?.videoId,
        thumbnail: [
          album?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[2]
            ?.url ||
            album?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails[1]
              ?.url?.url,
        ],
        title:
          dataItem?.flexColumns[0]?.musicResponsiveListItemFlexColumnRenderer
            ?.text?.runs[0]?.text,
        artists: album?.straplineTextOne?.runs
          ?.map((run: any) => {
            if (run?.navigationEndpoint?.browseEndpoint) {
              return {
                name: run?.text,
                browseId: run?.navigationEndpoint?.browseEndpoint?.browseId,
              };
            }
            return null;
          })
          ?.filter((data: any) => data !== null),
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
