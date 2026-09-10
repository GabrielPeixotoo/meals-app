import { store } from "@/store/redux/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
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
  );
}
