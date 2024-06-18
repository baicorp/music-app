import { next } from "@/utils/MusicClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get("videoId");
    const playlistId = searchParams.get("playlistId");

    if (!videoId) {
      return NextResponse.json({
        error: "missing filed either videoId or playlistId",
      });
    }
    const data = await next(videoId, playlistId);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
