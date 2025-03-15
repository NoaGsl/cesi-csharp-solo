import { NextResponse } from "next/server";

interface RequestProps {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RequestProps) {
  const { id } = await params;

  try {
    const response = await fetch(`${process.env.API_URL}/employees/${id}`);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
