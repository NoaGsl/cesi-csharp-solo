import { NextRequest, NextResponse } from "next/server";

interface RequestProps {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RequestProps) {
  const { id } = await params;
  try {
    const body = await request.json();

    const token = request.cookies.get("token")?.value;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${process.env.API_URL}/departments/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: NextRequest, { params }: RequestProps) {
  const { id } = await params;
  try {
    const token = request.cookies.get("token")?.value;

    const headers: HeadersInit = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${process.env.API_URL}/departments/${id}`, {
      method: "DELETE",
      headers,
    });

    if (response.status === 204) {
      return NextResponse.json(
        { status: 204 }
      );
    }

    const data = await response.json();
    throw new Error(data.ExceptionMessage);

  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
