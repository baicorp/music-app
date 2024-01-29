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
