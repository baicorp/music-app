// detail data from given videoId
export interface StreamingData {
  title: string;
  description: string;
  uploadDate: string;
  uploader: string;
  uploaderUrl: string;
  uploaderAvatar: string;
  thumbnailUrl: string;
  hls: string;
  dash: any;
  lbryId: any;
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
  audioStreams: AudioStream[];
  videoStreams: VideoStream[];
  relatedStreams: RelatedStream[];
  subtitles: Subtitle[];
  livestream: boolean;
  proxyUrl: string;
  chapters: any[];
  previewFrames: PreviewFrame[];
  audioStreamUrl: AudioStream;
}

export interface AudioStream {
  url: string;
  format: string;
  quality: string;
  mimeType: string;
  codec: string;
  audioTrackId: any;
  audioTrackName: any;
  audioTrackType: any;
  audioTrackLocale: any;
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

export interface VideoStream {
  url: string;
  format: string;
  quality: string;
  mimeType: string;
  codec?: string;
  audioTrackId: any;
  audioTrackName: any;
  audioTrackType: any;
  audioTrackLocale: any;
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

export interface RelatedStream {
  url: string;
  type: string;
  title?: string;
  thumbnail: string;
  uploaderName: string;
  uploaderUrl?: string;
  uploaderAvatar?: string;
  uploadedDate?: string;
  shortDescription: any;
  duration?: number;
  views?: number;
  uploaded?: number;
  uploaderVerified: boolean;
  isShort?: boolean;
  name?: string;
  playlistType?: string;
  videos?: number;
}

export interface Subtitle {
  url: string;
  mimeType: string;
  name: string;
  code: string;
  autoGenerated: boolean;
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
