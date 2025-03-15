import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  if (token) {
    return NextResponse.json({ authenticated: true }, { status: 200 });
  }
  return NextResponse.json({ authenticated: false }, { status: 200 });
}
