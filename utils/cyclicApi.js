// get streaming from cyclic
export async function getMusicFromCyclic(videoId) {
  const res = await fetch(
    `https://cyan-rich-abalone.cyclic.app/stream/${videoId}`,
    {
      method: "POST",
    }
  );
  return res.json();
}

// data structure
// const thumbnailUrl =
//   data?.videoThumbnails[data?.videoThumbnails?.length - 1]?.url;
// const title = data?.title;
// const uploader = data?.author;
// const url = data?.adaptiveFormats[0].url;
