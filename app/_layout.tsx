import { Stack } from "expo-router/stack";
import "../global.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";

export default function Layout() {
  return (
    // <Provider store={store}>
      <Stack screenOptions={{
        headerShown : false
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    // </Provider>
  );
}
