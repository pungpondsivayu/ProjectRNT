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
      <Tabs
        screenOptions={{ headerShown: false , tabBarStyle : {
          display : "none"
        }}} 
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
      </Tabs>
    </Provider>
  );
}
