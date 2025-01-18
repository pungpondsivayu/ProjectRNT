import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { BounceIn } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { WelcomeScreenNavigationProp } from "@/@types/routes";



const index = () => {
  const navigate = useNavigation<WelcomeScreenNavigationProp>();
  setTimeout(() => {
    navigate.navigate("(tabs)")
  }, 2000);

  return (
    <View className="flex-1 items-center justify-center gap-y-10 bg-white">
      <Animated.View entering={BounceIn.duration(800)}>
        <LottieView
          autoPlay
          source={require("../assets/common/welcomeAnimation.json")}
          style={{
            width: wp(100),
            height: hp(100),
          }}
        />
      </Animated.View>
    </View>
  );
};

export default index;
