import { Stack } from "expo-router/stack";
import "../global.css";
import { useEffect, useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Drawer from "expo-router/drawer";
import { AlertNotificationRoot } from "react-native-alert-notification";

export default function Layout() {
  const [headerStatus, setHeaderStatus] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setHeaderStatus(!headerStatus);
    }, 2000);
  }, []);

  return (
    <AlertNotificationRoot>
      <Provider store={store}>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerShown: headerStatus,
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false, headerTitle: "Home" }}
            />
            <Stack.Screen
              name="auth"
              options={{ headerShown: false, headerTitle: "auth" }}
            />
          </Stack>
        </AuthProvider>
      </Provider>
    </AlertNotificationRoot>
  );
}
