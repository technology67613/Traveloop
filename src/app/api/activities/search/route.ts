import { NextRequest, NextResponse } from "next/server";

const FOURSQUARE_API_KEY = process.env.FOURSQUARE_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get("city");
  const query = searchParams.get("query") || "sightseeing";

  if (!city) {
    return NextResponse.json({ error: "City is required" }, { status: 400 });
  }

  if (!FOURSQUARE_API_KEY) {
    return NextResponse.json({ error: "Foursquare key not configured" }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.foursquare.com/v3/places/search?near=${encodeURIComponent(
        city
      )}&query=${encodeURIComponent(query)}&limit=10&fields=fsq_id,name,categories,location,photos`,
      {
        headers: {
          Authorization: FOURSQUARE_API_KEY,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from Foursquare");
    }

    const data = await response.json();
    const places = data.results.map((place: any) => ({
      id: place.fsq_id,
      name: place.name,
      category: place.categories[0]?.name || "Activity",
      address: place.location.formatted_address,
      imageUrl: place.photos?.[0] 
        ? `${place.photos[0].prefix}300x200${place.photos[0].suffix}` 
        : null,
    }));

    return NextResponse.json({ success: true, data: places });
  } catch (error) {
    console.error("Foursquare error:", error);
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
  }
}
