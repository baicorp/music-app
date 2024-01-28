// search result
export interface SearchResults {
  album: Album;
  artists: Artist[];
  category: string;
  duration: string;
  duration_seconds: number;
  feedbackTokens: FeedbackTokens;
  inLibrary: boolean;
  isExplicit: boolean;
  resultType: string;
  thumbnails: Thumbnail[];
  title: string;
  videoId: string;
  videoType: string;
  year: any;
}

export interface Album {
  id: string;
  name: string;
}

export interface Artist {
  id: string;
  name: string;
}

export interface FeedbackTokens {
  add: string;
  remove: string;
}

export interface Thumbnail {
  height: number;
  url: string;
  width: number;
}

// quick picks
export interface QuickPicks {
  album: Album;
  artists: Artist[];
  isExplicit: boolean;
  thumbnails: Thumbnail[];
  title: string;
  videoId: string;
}
