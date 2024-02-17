export default function extractVideoData(videoDataObject: any) {
  return {
    videoId: videoDataObject?.videoDetails?.videoId,
    title: videoDataObject?.videoDetails?.title,
    channelId: videoDataObject?.videoDetails?.channelId,
    artist: videoDataObject?.videoDetails?.author,
    thumbnail: videoDataObject?.videoDetails?.thumbnail?.thumbnails[1]?.url,
    url:
      videoDataObject.streamingData?.adaptiveFormats?.filter((data: any) => {
        return data?.itag === 251 || data?.itag === 140;
      })[0]?.url || null,
  };
}
