export type Song = {
  videoId: string;
  title: string;
  artists: Artist[];
  type?: string;
  thumbnail?: string;
  duration?: string;
  plays?: string;
  views?: string;
  year?: string;
};

export interface Artist {
  name: string;
  browseId: string;
}
