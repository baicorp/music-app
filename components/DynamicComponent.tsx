import {
  AlbumCard,
  ChannelCard,
  PlaylistCard,
  SingleCard,
} from "@/components/card";
import { TrackItemPlaylist } from "./track";

export default function DynamicComponent({
  type,
  props,
}: {
  type: string;
  props: any;
}) {
  switch (type) {
    case "song":
      return <TrackItemPlaylist {...props} />;
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
