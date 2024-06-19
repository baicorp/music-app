import { Artists, PlayFromTitle, SongImage } from "../shared";
import { SongCardProps } from "./SongCard";

export default function SongCardQueue({
  videoId,
  thumbnail,
  title,
  artists,
  duration,
  listSong,
}: SongCardProps) {
  return (
    <div className="flex rounded-md bg-[#0f0f0f]">
      <SongImage
        videoId={videoId}
        title={title}
        thumbnail={thumbnail}
        variant="queue"
      />
      <div className="flex justify-between grow items-center px-4">
        <div className="flex grow flex-col">
          <PlayFromTitle
            videoId={videoId}
            title={title}
            thumbnail={thumbnail}
            artists={artists ? artists : []}
            listSong={listSong}
            variant="queue"
          />
          <div className="flex items-center gap-2 line-clamp-1">
            <Artists artists={artists} />
          </div>
        </div>
        <p className="text-xs lg:text-sm font-semibold text-gray-400 line-clamp-1 shrink-0">
          {duration || ""}
        </p>
      </div>
    </div>
  );
}
