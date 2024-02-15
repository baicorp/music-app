export type Album = {
  title: string;
  subtitle: string;
  thumbnail: string;
  albumStat: string;
  description?: string;
  conetents: AlbumItem[];
};

export type AlbumItem = {
  index: string;
  title: string;
  videoId: string;
  plays: string;
  duration: string;
};
