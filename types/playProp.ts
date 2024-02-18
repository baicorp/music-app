import { Artist, Song } from "./song";

export type PlayProps = {
  videoId: string;
  artists: Artist[];
  thumbnail: string;
  title: string;
  listSong: Song[];
};
