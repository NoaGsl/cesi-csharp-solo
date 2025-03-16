import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function GET(req: NextRequest) {
  const JWT_SECRET = process.env.JWT_SECRET as string;

  const tokenCookie = req.cookies.get("token");
  const token = tokenCookie ? tokenCookie.value : null;

  if (token) {
    try {
      await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    } catch (error) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({ authenticated: true }, { status: 200 });
  }
  return NextResponse.json({ authenticated: false }, { status: 200 });
}
