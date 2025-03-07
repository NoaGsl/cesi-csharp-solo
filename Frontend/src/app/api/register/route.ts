import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const response = await fetch(`${process.env.API_URL}/admins/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      const errorMessage = error.ExceptionMessage;
      return NextResponse.json(
        { message: errorMessage },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
