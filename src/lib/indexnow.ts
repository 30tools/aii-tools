export const INDEXNOW_KEY = "634a2c77198a45429967eb9dc1252278";

type SubmitResponse = {
  ok: boolean;
  status: number;
  body?: unknown;
  error?: string;
};

export async function submitIndexNow(urls: string[], host: string): Promise<SubmitResponse> {
  try {
    const keyLocation = `https://${host}/${INDEXNOW_KEY}.txt`;
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation,
        urlList: urls,
      }),
    });

    let parsed: unknown = undefined;
    try {
      parsed = await res.json();
    } catch {
      // ignore non-JSON bodies
    }

    return {
      ok: res.ok,
      status: res.status,
      body: parsed,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

