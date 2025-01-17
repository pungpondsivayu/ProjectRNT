import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import Animated, { FadeInDown } from 'react-native-reanimated';

interface ServiceItem {
  name: string;
  icon: React.JSX.Element;
}

const ServiceCard = ({ item, index }: { item: ServiceItem; index: number }) => {
  const isEven = index % 3 == 0;
  return (
    <Animated.View
    entering={FadeInDown.delay(index * 100)
      .duration(600)
      .springify()
      .damping(15)}
  >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: 8,
          paddingRight: 8,
        }}
        className="flex justify-center mb-4"
      >
        <View
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(20),
            borderRadius: 35,
          }}
          className="bg-black/5 object-cover"
        >
          <Text
            style={{ fontSize: hp(1.5) }}
            className="font-semibold ml-2 text-neutral-600"
          >
            dasdsa
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default ServiceCard