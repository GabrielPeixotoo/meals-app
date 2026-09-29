import { z } from "zod";

// Falls back to TheMealDB's public test key so the app runs without a .env
const API_KEY = process.env.EXPO_PUBLIC_MEALDB_API_KEY || "1";
const BASE_URL = `https://www.themealdb.com/api/json/v1/${API_KEY}`;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type QueryParams = Record<string, string>;

export async function get<Schema extends z.ZodType>(
  path: string,
  schema: Schema,
  params?: QueryParams,
): Promise<z.output<Schema>> {
  const query = params ? `?${new URLSearchParams(params)}` : "";

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}/${path}${query}`);
  } catch {
    throw new ApiError("Network request failed. Check your connection.");
  }

  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}`,
      response.status,
    );
  }

  const result = schema.safeParse(await response.json());
  if (!result.success) {
    throw new ApiError(`Unexpected response from ${path}`);
  }

  return result.data;
}
