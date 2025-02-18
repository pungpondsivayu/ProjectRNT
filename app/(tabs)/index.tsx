import { View, Text, ScrollView, Image, Platform, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Service from "@/components/home/Service";
import { useRouter } from "expo-router";

function Home() {
  //use hook
  const router = useRouter();

  //setting value
  const ios = Platform.OS === "ios";
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
        <View>
          <TouchableOpacity
            onPress={() => {
              router.push("/auth");
            }}
          >
            <Text>Auth</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
