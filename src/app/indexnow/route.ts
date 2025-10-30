import { NextRequest } from "next/server";
import { submitIndexNow } from "@/lib/indexnow";

export async function GET() {
  return new Response(
    JSON.stringify({
      status: "ready",
      message: "POST to this endpoint with { urls: string[] } to submit to IndexNow.",
      docs: "https://www.indexnow.org/",
      keyFile: "/634a2c77198a45429967eb9dc1252278.txt",
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function POST(req: NextRequest) {
  try {
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "ai-tools.30tools.com";
    const data = await req.json().catch(() => ({}));
    const urls: string[] = Array.isArray(data?.urls)
      ? data.urls
      : data?.url
      ? [data.url]
      : [];

    if (!host) {
      return new Response(JSON.stringify({ error: "Host header missing" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!urls.length) {
      return new Response(JSON.stringify({ error: "Provide url or urls in request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await submitIndexNow(urls, host);
    return new Response(JSON.stringify(result), {
      status: result.ok ? 200 : 500,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

