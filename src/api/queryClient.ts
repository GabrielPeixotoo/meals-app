import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "./client";

const MAX_RETRIES = 2;

function isClientError(error: Error) {
  return error instanceof ApiError && !!error.status && error.status < 500;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Recipes rarely change, so cached data stays fresh for a while
      staleTime: 1000 * 60 * 10,
      // A 4xx will fail the same way again, so only retry network/server errors
      retry: (failureCount, error) =>
        !isClientError(error) && failureCount < MAX_RETRIES,
    },
  },
});
