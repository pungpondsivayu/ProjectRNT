import { store } from '@/redux/store/store';
import { Tabs, useNavigationContainerRef } from 'expo-router';
import { Platform  } from 'react-native';
import { Provider } from 'react-redux';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { TabBar } from '@/components/layout/moodtrack/Tabbar';
import { useEffect } from 'react';

export default function TabLayout() {
  const ios  = Platform.OS === "ios"
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  return (
    <Provider store={store}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "blue",
          headerShown: false,
          headerTitle: "Moodtracker",
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Chart",
          }}
        />
        <Tabs.Screen
          name="upsert"
          options={{
            title: "Add",
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
          }}
        />
      </Tabs>
    </Provider>
  );
}
