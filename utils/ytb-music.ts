import YTMusic from "ytmusic-api";

const ytmusic = new YTMusic();
await ytmusic.initialize(/* Optional: Custom cookies */);

export async function recomendation() {
  const res = await ytmusic.getHome();
  return res;
}
