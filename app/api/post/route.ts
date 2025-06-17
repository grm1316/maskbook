import prisma from "@/lib/server/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const postList = await prisma.post.findMany({
    orderBy: { likecount: 'desc' }
  });
  return NextResponse.json({ ok: true, postList });
}