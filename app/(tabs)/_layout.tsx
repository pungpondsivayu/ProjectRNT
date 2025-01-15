import Navbar from '@/components/layout/Navbar';
import { store } from '@/redux/store/store';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useNavigationContainerRef } from 'expo-router';
import { Platform, View } from 'react-native';
import { Provider } from 'react-redux';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { BookOpenIcon, HomeIcon, NewspaperIcon, PaperAirplaneIcon, PaperClipIcon, QueueListIcon } from 'react-native-heroicons/outline';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function TabLayout() {
  const ios  = Platform.OS === "ios"
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
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "หน้าแรก",
            tabBarIcon: ({ color }) => (
              <HomeIcon size={hp(2.5)} strokeWidth={3} color="gray" />
            ),
          }}
        />
        <Tabs.Screen
          name="article"
          options={{
            title: "บทความ",
            tabBarIcon: ({ color }) => (
              <BookOpenIcon size={hp(2.5)} strokeWidth={3} color="gray" />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "ประวัติ",
            tabBarIcon: ({ color }) => (
              <QueueListIcon size={hp(2.5)} strokeWidth={3} color="gray" />
            ),
          }}
        />
      </Tabs>
    </Provider>
  );
}
