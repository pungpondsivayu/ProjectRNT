import Navbar from '@/components/layout/Navbar';
import { store } from '@/redux/store/store';
import { Tabs, useNavigationContainerRef } from 'expo-router';
import { Platform, View } from 'react-native';
import { Provider } from 'react-redux';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { TabBar } from '@/components/layout/Tabbar';

export default function TabLayout() {
  const ios  = Platform.OS === "ios";
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  return (
      <Provider store={store}>
        <View
          className="bg-white"
          style={{
            paddingTop: ios ? 56 : 16,
          }}
        >
          <Navbar />
        </View>
        <Tabs
          screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}
          tabBar={(props) => <TabBar {...props} />}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
            }}
          />
          <Tabs.Screen
            name="article"
            options={{
              title: "Article",
            }}
          />
          <Tabs.Screen
            name="history"
            options={{
              title: "History",
            }}
          />
        </Tabs>
      </Provider>
  );
}
