import { Song } from "@/types/song";

export default function extractNextData(nextData: any): Song[] | [] {
  return nextData?.map((next: any) => {
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
      thumbnail:
        next?.thumbnail?.thumbnails[1]?.url ||
        next?.thumbnail?.thumbnails[0]?.url,
      playlistId: next?.navigationEndpoint?.watchEndpoint?.playlistId,
      duration: next?.lengthText?.runs[0]?.text,
      type: "song",
    };
  });
}
