import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "./client";

const MAX_RETRIES = 2;

function isClientError(error: Error) {
  return error instanceof ApiError && !!error.status && error.status < 500;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      retry: (failureCount, error) =>
        !isClientError(error) && failureCount < MAX_RETRIES,
    },
  },
});
