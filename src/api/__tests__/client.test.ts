import { z } from "zod";
import { ApiError, get } from "../client";

const schema = z.object({ ok: z.boolean() });

function mockFetch(response: Partial<Response> | Error) {
  const fetchMock = jest.fn(() =>
    response instanceof Error
      ? Promise.reject(response)
      : Promise.resolve({ ok: true, status: 200, ...response } as Response),
  );
  globalThis.fetch = fetchMock as unknown as typeof fetch;
  return fetchMock;
}

describe("get", () => {
  it("builds the URL with query params and returns parsed data", async () => {
    const fetchMock = mockFetch({ json: () => Promise.resolve({ ok: true }) });

    await expect(
      get("search.php", schema, { s: "pie & mash" }),
    ).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=pie+%26+mash",
    );
  });

  it("throws an ApiError with the status on HTTP errors", async () => {
    mockFetch({ ok: false, status: 404 });

    const error = await get("lookup.php", schema).catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(404);
  });

  it("throws an ApiError without status on network failures", async () => {
    mockFetch(new TypeError("Network request failed"));

    const error = await get("lookup.php", schema).catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBeUndefined();
  });

  it("throws an ApiError when the response doesn't match the schema", async () => {
    mockFetch({ json: () => Promise.resolve({ ok: "yes" }) });

    await expect(get("lookup.php", schema)).rejects.toThrow(
      "Unexpected response from lookup.php",
    );
  });
});
