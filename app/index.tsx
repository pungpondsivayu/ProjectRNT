import { View, Text, ScrollView } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { BounceIn } from "react-native-reanimated";
import { router } from "expo-router";

const index = () => {
 setTimeout(() => {
    router.push("/auth")
  }, 2000);

  return (
    <View className="flex-1 items-center justify-center gap-y-10 bg-white">
      <Animated.View entering={BounceIn.duration(800)}>
        <LottieView
          autoPlay
          source={require("../assets/animation/welcomeAnimation.json")}
          style={{
            width: wp(100),
            height: hp(100),
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
        >
          
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default index;
