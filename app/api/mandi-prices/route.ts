import { NextRequest, NextResponse } from "next/server";

const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";
const API_URL = `https://api.data.gov.in/resource/${RESOURCE_ID}`;

type DataGovRecord = Record<string, unknown>;

const clean = (value: unknown) => String(value ?? "").trim();

async function getPage(
  apiKey: string,
  commodity: string,
  state?: string,
  district?: string,
  offset = 0
): Promise<DataGovRecord[]> {
  const params = new URLSearchParams();
  params.set("api-key", apiKey);
  params.set("format", "json");
  params.set("limit", "1000");
  params.set("offset", String(offset));
  params.set("filters[commodity]", commodity);

  if (state) params.set("filters[state.keyword]", state);
  if (district) params.set("filters[district]", district);

  const response = await fetch(`${API_URL}?${params.toString()}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`data.gov.in ${response.status}: ${body}`);
  }

  const json = (await response.json()) as { records?: unknown };
  return Array.isArray(json.records)
    ? (json.records as DataGovRecord[])
    : [];
}

async function getAllMatching(
  apiKey: string,
  commodity: string,
  state?: string,
  district?: string
) {
  const all: DataGovRecord[] = [];

  // data.gov.in pages this resource at 1000 records. We only need the
  // selected commodity and the farmer's state, so normally one page is enough.
  // Continue when a page is full, up to 10 pages to cover large states.
  for (let page = 0; page < 10; page++) {
    const records = await getPage(
      apiKey,
      commodity,
      state,
      district,
      page * 1000
    );

    all.push(...records);
    if (records.length < 1000) break;
  }

  return all;
}

function uniqueRecords(records: DataGovRecord[]) {
  const map = new Map<string, DataGovRecord>();

  for (const record of records) {
    const key = [
      clean(record.market).toLowerCase(),
      clean(record.district).toLowerCase(),
      clean(record.state).toLowerCase(),
      clean(record.commodity).toLowerCase(),
      clean(record.arrival_date),
      clean(record.variety).toLowerCase(),
      clean(record.grade).toLowerCase(),
    ].join("|");

    map.set(key, record);
  }

  return Array.from(map.values());
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.DATA_GOV_IN_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { records: [], error: "DATA_GOV_IN_API_KEY is not configured" },
      { status: 503 }
    );
  }

  const searchParams = new URL(request.url).searchParams;
  const commodity = clean(searchParams.get("commodity"));
  const state = clean(searchParams.get("state"));
  const district = clean(searchParams.get("district"));

  if (!commodity) {
    return NextResponse.json(
      { records: [], error: "commodity is required" },
      { status: 400 }
    );
  }

  try {
    // First get the farmer's exact district so its local markets are included.
    let records = district
      ? await getAllMatching(apiKey, commodity, state, district)
      : [];

    // Then get the whole state. This is what allows a mandi in a neighbouring
    // district to appear when it is closer to the farmer's profile location.
    if (state) {
      const stateRecords = await getAllMatching(apiKey, commodity, state);
      records = [...records, ...stateRecords];
    } else if (!records.length) {
      records = await getAllMatching(apiKey, commodity);
    }

    return NextResponse.json(
      { records: uniqueRecords(records) },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Mandi price API error:", error);
    return NextResponse.json(
      { records: [], error: "Unable to fetch mandi prices from data.gov.in" },
      { status: 502 }
    );
  }
}
