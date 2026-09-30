// Screen tests live outside src/app, where Expo Router would treat them as routes
import Search from "@/app/(drawer)/search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, userEvent } from "@testing-library/react-native";
import { ReactNode } from "react";

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  ...jest.requireActual("expo-router"),
  useRouter: () => ({ push: mockPush }),
}));

const pastaSalad = {
  idMeal: "52777",
  strMeal: "Mediterranean Pasta Salad",
  strMealThumb: "https://x",
};

function mockSearchResponse(meals: object[] | null) {
  globalThis.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ meals }),
    } as Response),
  ) as unknown as typeof fetch;
}

async function renderSearch() {
  const queryClient = new QueryClient({
    defaultOptions: {
      // No retries, and no 5-minute cache timer keeping Jest alive
      queries: { retry: false, gcTime: Infinity },
    },
  });
  const QueryProvider = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  await render(<Search />, { wrapper: QueryProvider });
  return screen.getByLabelText("Search meals by name");
}

// The input is debounced, so results take a bit longer than findBy's default
const DEBOUNCE_TIMEOUT = { timeout: 2000 };

describe("Search screen", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("asks for a query before searching", async () => {
    mockSearchResponse([]);
    await renderSearch();

    expect(
      screen.getByText("Search meals by name, like “pasta”."),
    ).toBeOnTheScreen();
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("shows results and opens the selected meal", async () => {
    const user = userEvent.setup();
    mockSearchResponse([pastaSalad]);
    const input = await renderSearch();

    await user.type(input, "pasta");
    const result = await screen.findByText(
      "Mediterranean Pasta Salad",
      {},
      DEBOUNCE_TIMEOUT,
    );
    await user.press(result);

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("search.php?s=pasta"),
    );
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/meal_details",
      params: { id: "52777" },
    });
  });

  it("tells the user when nothing matches", async () => {
    const user = userEvent.setup();
    mockSearchResponse(null);
    const input = await renderSearch();

    await user.type(input, "zzz");

    expect(
      await screen.findByText(
        "No meals found for “zzz”.",
        {},
        DEBOUNCE_TIMEOUT,
      ),
    ).toBeOnTheScreen();
  });

  it("shows an error with a retry button when the request fails", async () => {
    const user = userEvent.setup();
    globalThis.fetch = jest.fn(() =>
      Promise.reject(new TypeError("Network request failed")),
    ) as unknown as typeof fetch;
    const input = await renderSearch();

    await user.type(input, "pasta");

    expect(
      await screen.findByText("Something went wrong", {}, DEBOUNCE_TIMEOUT),
    ).toBeOnTheScreen();
    expect(screen.getByText("Try again")).toBeOnTheScreen();
  });
});
