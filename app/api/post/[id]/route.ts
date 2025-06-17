import prisma from "@/lib/server/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ ok: false, post: null, error: "Invalid id" }, { status: 400 });
  }
  const post = await prisma.post.findUnique({
  where: { id },
});
  return NextResponse.json({ ok: true, post });
}