export interface MusicDetail {
  error?: string;
  title: string;
  description: string;
  uploadDate: Date;
  uploader: string;
  uploaderUrl: string;
  uploaderAvatar: string;
  thumbnailUrl: string;
  hls: string;
  dash: null;
  lbryId: null;
  category: string;
  license: string;
  visibility: string;
  tags: string[];
  metaInfo: any[];
  uploaderVerified: boolean;
  duration: number;
  views: number;
  likes: number;
  dislikes: number;
  uploaderSubscriberCount: number;
  audioStreams: OStream[];
  videoStreams: OStream[];
  relatedStreams: RelatedStream[];
  subtitles: any[];
  livestream: boolean;
  proxyUrl: string;
  chapters: any[];
  previewFrames: PreviewFrame[];
}

export interface OStream {
  url: string;
  format: Format;
  quality: string;
  mimeType: MIMEType;
  codec: null | string;
  audioTrackId: null;
  audioTrackName: null;
  audioTrackType: null;
  audioTrackLocale: null;
  videoOnly: boolean;
  itag: number;
  bitrate: number;
  initStart: number;
  initEnd: number;
  indexStart: number;
  indexEnd: number;
  width: number;
  height: number;
  fps: number;
  contentLength: number;
}

export enum Format {
  M4A = "M4A",
  MPEG4 = "MPEG_4",
  Webm = "WEBM",
  WebmaOpus = "WEBMA_OPUS",
}

export enum MIMEType {
  AudioMp4 = "audio/mp4",
  AudioWebm = "audio/webm",
  VideoMp4 = "video/mp4",
  VideoWebm = "video/webm",
}

export interface PreviewFrame {
  urls: string[];
  frameWidth: number;
  frameHeight: number;
  totalCount: number;
  durationPerFrame: number;
  framesPerPageX: number;
  framesPerPageY: number;
}

export interface RelatedStream {
  url: string;
  type: Type;
  title?: string;
  thumbnail: string;
  uploaderName: string;
  uploaderUrl: null | string;
  uploaderAvatar?: string;
  uploadedDate?: string;
  shortDescription?: null;
  duration?: number;
  views?: number;
  uploaded?: number;
  uploaderVerified: boolean;
  isShort?: boolean;
  name?: string;
  playlistType?: string;
  videos?: number;
}

export enum Type {
  Playlist = "playlist",
  Stream = "stream",
}

// audio card
export type AudioCard = {
  title: string;
  uploader: string;
  audioStreams: OStream[];
  thumbnailUrl: string;
};

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
