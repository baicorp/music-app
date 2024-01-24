import Image from "next/image";
import React from "react";

export default async function ListContent({ data }: { data: any }) {
  return (
    <div>
      <h1 className="mb-4 text-xl">{data[0]?.title}</h1>
      {data[0]?.contents?.map((item: any) => {
        return (
          <div
            key={crypto.randomUUID()}
            className={`bg-[#f1f3f4] rounded-xl max-w-[410px] overflow-hidden flex gap-2
        }`}
          >
            <Image
              src={item?.thumbnails[1]?.url}
              alt={item?.name + "image"}
              width={1400}
              height={1400}
              className="w-[100px]"
            />
            <div>
              <div>
                <p className="font-semibold px-4 pt-2 text-black line-clamp-1">
                  {item?.name}
                </p>
                <p className="text-sm px-4 text-black line-clamp-1">
                  {item?.artist?.name}
                </p>
              </div>
              {/* <audio controls src={data?.data[0]?.url}></audio> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
