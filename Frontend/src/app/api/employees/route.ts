import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";
    const search = url.searchParams.get("search") || "";
    const departmentId = url.searchParams.get("department_id") || "";
    const locationId = url.searchParams.get("location_id") || "";

    const response = await fetch(
      `${process.env.API_URL}/employees?page=${page}&search_term=${search}&department_id=${departmentId}&location_id=${locationId}`
    );
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    const body = {
      firstName: requestBody.firstName,
      lastName: requestBody.lastName,
      landlinePhoneNumber: requestBody.landlinePhoneNumber,
      mobilePhoneNumber: requestBody.mobilePhoneNumber,
      email: requestBody.email,
      isAdmin: requestBody.isAdmin,
      locationId: requestBody.locationId,
      departmentId: requestBody.departmentId,
    };

    const token = request.cookies.get("token")?.value;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${process.env.API_URL}/employees`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.status === 200) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
