import React from "react";
import { ScrollView, Image, TouchableOpacity, View, Text, ImageSourcePropType } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInRight } from "react-native-reanimated";

interface IMood {
  id : number;
  name: string;
  emoji: ImageSourcePropType;
}

type Props = {
  mood: IMood[];
  activeMood : number;
  setActiveMood : React.Dispatch<React.SetStateAction<number>>;
};
function MoodList({ mood ,activeMood , setActiveMood}: Props) {
  return (
    <Animated.View entering={FadeInRight.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {mood &&
          mood.map((item, index) => {
            const isActive = index == activeMood;
            const ActiveClass = isActive ? "border border-sky-500 rounded-2xl" : "";
            return (
              <TouchableOpacity
                key={index}
                className={`flex items-center ${ActiveClass}`}
                style={{
                  marginRight: wp(2),
                }}
                onPress={() => setActiveMood(index)}
              >
                <View className={`p-[6px]`}>
                  <Image
                    source={item.emoji}
                    style={{
                      width: wp(26),
                      height: hp(13),
                      objectFit: "contain",
                    }}
                  />
                  <Text className="text-center text-neutral-600">
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </Animated.View>
  );
}

export default MoodList;
