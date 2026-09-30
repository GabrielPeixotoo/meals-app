import { queryClient } from "@/api/queryClient";
import { useAppStateFocus } from "@/hooks/useAppStateFocus";
import { store } from "@/store/redux/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  useAppStateFocus();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Stack
          screenOptions={{
            title: "",
            headerStyle: {
              backgroundColor: "#9d19fb",
            },
          }}
        >
          <Stack.Screen
            name="(drawer)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </Provider>
    </QueryClientProvider>
  );
}
