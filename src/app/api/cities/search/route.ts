import { NextRequest, NextResponse } from "next/server";

const RAPID_API_KEY = process.env.GEO_DB_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query || query.length < 3) {
    return NextResponse.json({ data: [] });
  }

  if (!RAPID_API_KEY) {
    return NextResponse.json({ error: "GeoDB key not configured" }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(
        query
      )}&limit=5&sort=-population`,
      {
        headers: {
          "x-rapidapi-key": RAPID_API_KEY,
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from GeoDB");
    }

    const data = await response.json();
    const cities = data.data.map((city: any) => ({
      id: city.id.toString(),
      name: city.city,
      country: city.country,
      countryCode: city.countryCode,
      region: city.region,
      latitude: city.latitude,
      longitude: city.longitude,
    }));

    return NextResponse.json({ success: true, data: cities });
  } catch (error) {
    console.error("GeoDB error:", error);
    return NextResponse.json({ error: "Failed to fetch cities" }, { status: 500 });
  }
}
