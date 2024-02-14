import {
  AlbumCard,
  ChannelCard,
  PlaylistCard,
  SongCard,
  VideoCard,
  SingleCard,
} from "@/components/card";

export default function DynamicComponent({
  type,
  props,
}: {
  type: string;
  props: any;
}) {
  switch (type) {
    case "song":
      return <SongCard {...props} />;
    case "video":
      return <VideoCard {...props} />;
    case "single":
      return <SingleCard {...props} />;
    case "album":
      return <AlbumCard {...props} />;
    case "artist":
      return <ChannelCard {...props} />;
    case "playlist":
      return <PlaylistCard {...props} />;
    default:
      return <PlaylistCard {...props} />;
  }
}
