import React from "react";
import {
  getHome,
  getPlaylist,
  getChannel,
  search,
  getAlbum,
} from "@/utils/MusicClient";

export default async function page() {
  const data = await getPlaylist(
    "VLRDCLAK5uy_ntmEO6TGBtDZrVD26XvJa6Y3FHYDx40II"
  );

  return (
    <>
      {/* <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre> */}
      <div className="flex font-extrabold flex-grow">
        <div className="h-svh bg-green-400 grow">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint,
          provident perspiciatis praesentium nemo error inventore minus iste
          rerum quibusdam voluptatum facilis delectus fugiat, autem blanditiis.
          Corporis, libero veritatis? Ad, quisquam. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Ullam delectus nulla mollitia velit
          commodi voluptatibus optio? Dolore debitis, aut, obcaecati molestiae
          ad nulla dolores excepturi sunt et qui quia a! Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Facilis eaque quasi iure, sed
          veniam nostrum atque amet impedit voluptatum tenetur sequi eos a
          reiciendis! Corrupti dolore molestias fuga voluptas laboriosam? Lorem
          ipsum dolor, sit amet consectetur adipisicing elit. Deserunt facere
          eius eveniet. Deleniti quos delectus distinctio voluptates libero odio
          repudiandae possimus eius, officia ad fugit est impedit. Eveniet,
          maiores doloremque.
        </div>
        <div className="h-svh bg-orange-400 grow w-[400px]">hello world 2</div>
      </div>
    </>
  );
}
