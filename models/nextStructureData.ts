import { Song } from "@/types/song";

export default function extractNextData(nextData: any): Song[] | [] {
  nextData =
    nextData?.contents?.singleColumnMusicWatchNextResultsRenderer
      ?.tabbedRenderer?.watchNextTabbedResultsRenderer?.tabs[0]?.tabRenderer
      ?.content?.musicQueueRenderer?.content?.playlistPanelRenderer?.contents;

  //remove first element of array because it's the same as the current played song
  return nextData?.slice(1)?.map((next: any) => {
    next = next?.playlistPanelVideoRenderer;
    return {
      videoId: next?.navigationEndpoint?.watchEndpoint?.videoId,
      title: next?.title?.runs[0].text,
      artists: next?.longBylineText?.runs
        ?.filter(
          (data: any) =>
            data?.navigationEndpoint?.browseEndpoint
              ?.browseEndpointContextSupportedConfigs
              ?.browseEndpointContextMusicConfig?.pageType ===
            "MUSIC_PAGE_TYPE_ARTIST"
        )
        .map((data: any) => {
          return {
            name: data?.text,
            browseId: data?.navigationEndpoint?.browseEndpoint?.browseId,
          };
        }),
      thumbnail: [
        next?.thumbnail?.thumbnails[1]?.url ||
          next?.thumbnail?.thumbnails[0]?.url,
      ],
      playlistId: next?.navigationEndpoint?.watchEndpoint?.playlistId,
      duration: next?.lengthText?.runs[0]?.text,
    };
  });
}
