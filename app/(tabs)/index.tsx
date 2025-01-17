import { View, Text, ScrollView, Image, Platform } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon } from "react-native-heroicons/outline";
import Navbar from "@/components/layout/Navbar";
import Service from "@/components/home/Service";

function Home() {
  const ios  = Platform.OS === "ios"
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        <View className="mx-4 mb-7">
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
      </ScrollView>
    </View>
  );
}

export default Home;
