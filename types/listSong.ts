import { Artist } from "./song";

export type ListSongs = {
  videoId: string;
  title: string;
  thumbnail: string;
  artists?: Artist[];
};
