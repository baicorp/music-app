import {
  AlbumCard,
  ChannelCard,
  PlaylistCard,
  SingleCard,
  SongCard,
} from "@/components/card";

export default function DynamicComponent({
  type,
  props,
}: {
  type: string;
  props: any;
}) {
  if (!type) return null;
  switch (type) {
    case "song":
      return <SongCard {...props} />;
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
