// audio card
export type AudioCard = {
  title: string;
  uploader: string;
  audioStreams: string;
  thumbnailUrl: string;
};

// music detail from youtubei
export interface VideoData {
  responseContext: ResponseContext;
  playabilityStatus: PlayabilityStatus;
  streamingData: StreamingData;
  playbackTracking: PlaybackTracking;
  videoDetails: VideoDetails;
  playerConfig: PlayerConfig;
  storyboards: Storyboards;
  trackingParams: string;
  attestation: Attestation;
  adBreakHeartbeatParams: string;
  streamUrl: string;
}

export interface ResponseContext {
  visitorData: string;
  maxAgeSeconds: number;
}

export interface PlayabilityStatus {
  status: string;
  playableInEmbed: boolean;
}

export interface StreamingData {
  expiresInSeconds: string;
  formats: Format[];
  adaptiveFormats: AdaptiveFormat[];
}

export interface Format {
  itag: number;
  mimeType: string;
  bitrate: number;
  width: number;
  height: number;
  lastModified: string;
  quality: string;
  fps: number;
  qualityLabel: string;
  projectionType: string;
  audioQuality: string;
  approxDurationMs: string;
  audioSampleRate: string;
  audioChannels: number;
  signatureCipher: string;
}

export interface AdaptiveFormat {
  itag: number;
  mimeType: string;
  bitrate: number;
  width?: number;
  height?: number;
  initRange: InitRange;
  indexRange: IndexRange;
  lastModified: string;
  contentLength: string;
  quality: string;
  fps?: number;
  qualityLabel?: string;
  projectionType: string;
  averageBitrate: number;
  approxDurationMs: string;
  signatureCipher: string;
  colorInfo?: ColorInfo;
  highReplication?: boolean;
  audioQuality?: string;
  audioSampleRate?: string;
  audioChannels?: number;
  loudnessDb?: number;
  xtags?: string;
  isDrc?: boolean;
}

export interface InitRange {
  start: string;
  end: string;
}

export interface IndexRange {
  start: string;
  end: string;
}

export interface ColorInfo {
  transferCharacteristics: string;
}

export interface PlaybackTracking {
  videostatsPlaybackUrl: VideostatsPlaybackUrl;
  videostatsDelayplayUrl: VideostatsDelayplayUrl;
  videostatsWatchtimeUrl: VideostatsWatchtimeUrl;
  ptrackingUrl: PtrackingUrl;
  qoeUrl: QoeUrl;
  atrUrl: AtrUrl;
  videostatsScheduledFlushWalltimeSeconds: number[];
  videostatsDefaultFlushIntervalSeconds: number;
}

export interface VideostatsPlaybackUrl {
  baseUrl: string;
}

export interface VideostatsDelayplayUrl {
  baseUrl: string;
}

export interface VideostatsWatchtimeUrl {
  baseUrl: string;
}

export interface PtrackingUrl {
  baseUrl: string;
}

export interface QoeUrl {
  baseUrl: string;
}

export interface AtrUrl {
  baseUrl: string;
  elapsedMediaTimeSeconds: number;
}

export interface VideoDetails {
  videoId: string;
  title: string;
  lengthSeconds: string;
  keywords: string[];
  channelId: string;
  isOwnerViewing: boolean;
  shortDescription: string;
  isCrawlable: boolean;
  thumbnail: Thumbnail;
  allowRatings: boolean;
  viewCount: string;
  author: string;
  isPrivate: boolean;
  isUnpluggedCorpus: boolean;
  isLiveContent: boolean;
}

export interface Thumbnail {
  thumbnails: Thumbnail2[];
}

export interface Thumbnail2 {
  url: string;
  width: number;
  height: number;
}

export interface PlayerConfig {
  audioConfig: AudioConfig;
  mediaCommonConfig: MediaCommonConfig;
  webPlayerConfig: WebPlayerConfig;
}

export interface AudioConfig {
  loudnessDb: number;
  perceptualLoudnessDb: number;
  enablePerFormatLoudness: boolean;
}

export interface MediaCommonConfig {
  dynamicReadaheadConfig: DynamicReadaheadConfig;
}

export interface DynamicReadaheadConfig {
  maxReadAheadMediaTimeMs: number;
  minReadAheadMediaTimeMs: number;
  readAheadGrowthRateMs: number;
}

export interface WebPlayerConfig {
  useCobaltTvosDash: boolean;
}

export interface Storyboards {
  playerStoryboardSpecRenderer: PlayerStoryboardSpecRenderer;
}

export interface PlayerStoryboardSpecRenderer {
  spec: string;
  recommendedLevel: number;
}

export interface Attestation {
  playerAttestationRenderer: PlayerAttestationRenderer;
}

export interface PlayerAttestationRenderer {
  challenge: string;
  botguardData: BotguardData;
}

export interface BotguardData {
  program: string;
  interpreterSafeUrl: InterpreterSafeUrl;
  serverEnvironment: number;
}

export interface InterpreterSafeUrl {
  privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: string;
}

export interface ChannelData {
  artistName: string;
  description: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  avatar: string;
  contents: Content[];
}

export interface Content {
  headerTitle: string;
  contents: Content2[];
}

export interface Content2 {
  title: string;
  thumbnail: string;
  subtitle: string;
  videoId?: string;
  type: string;
  browseId?: string;
}
