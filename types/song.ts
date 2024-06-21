export type Song = {
  videoId: string;
  title: string;
  artists: Artist[];
  thumbnail: string[];
  playlistId?: string;
  type?: string;
  duration?: string; //example format 3:20 or 200
  plays?: string;
  views?: string;
  year?: string;
  url?: string[];
};

export interface Artist {
  name: string;
  browseId: string;
}
