import { Stack } from "expo-router/stack";
import "../global.css";
import { useEffect, useState } from "react";

export default function Layout() {
  const [headerStatus, setHeaderStatus] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setHeaderStatus(!headerStatus)
    }, 2000);
  }, [])
  
  return (
    // <Provider store={store}>
      <Stack screenOptions={{
        headerShown : headerStatus,
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false , headerTitle : "Home" }} />
        </Stack>
    // </Provider>
  );
}
