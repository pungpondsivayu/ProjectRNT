import { View, Text, ScrollView, Image, Platform, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Service from "@/components/home/Service";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

function Home() {
  //use hook
  const router = useRouter();
  const { authState , onLogout} = useAuth();

  //setting value
  const ios = Platform.OS === "ios";

  //function
  async function Logout(){
    if(!onLogout) return null;
    const response = await onLogout();
    if(response){
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "SUCCESS",
        textBody: `Logout successfully.`,
      });
      setTimeout(() => {
        router.push("/(tabs)")
      }, 1500);
    }else{
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "ERROR",
        textBody: `Something went wrong.`,
      });
    }
  } 
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        <View className="mb-7 mx-4">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello, Pungpond!
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold tesxt-neutral-600"
            >
              Friends thinking
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            about <Text className="text-sky-600">health</Text>
          </Text>
        </View>
        <View className="mb-7">
          <Service />
        </View>
        {authState?.authenticated && (
          <View className="mb-7 mx-4">
            <Pressable className="bg-sky-600 flex justify-center items-center py-5 rounded-lg" onPress={() => {
              Logout();
            }}>
              <Text
                style={{
                  fontSize: hp(1.7),
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Log out
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default Home;
