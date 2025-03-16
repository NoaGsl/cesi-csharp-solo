import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const response = await fetch(`${process.env.API_URL}/admins/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: error.ExceptionMessage },
        { status: response.status }
      );
    }

    const data = await response.json();
    const token = data.token;

    // Create a NextResponse that sets an HttpOnly cookie with the JWT token
    // Apparently the browser will automatically send this cookie with every request
    const res = NextResponse.json({ message: "Login successful" }, { status: 200 });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24, // a day
    });

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
