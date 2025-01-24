import { View, Text, StyleSheet, GestureResponderEvent , Pressable} from "react-native";
import React, { useEffect } from "react";
import { PlatformPressable } from "@react-navigation/elements";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { icon } from "./icon";

interface props {
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  onLongPress: ((event: GestureResponderEvent) => void) | null | undefined;
  isFocused: boolean;
  routeName: string;
  color: string;
  label: string;
}

const TabbarButton = ({
  onPress,
  onLongPress,
  isFocused,
  color,
  routeName,
  label,
}: props) => {
  const scale = useSharedValue(0);

  



  const animationTextStyle = useAnimatedStyle(() => {
    const opacity  = interpolate(scale.value , [0,1] , [1,0])
    return {
      opacity,
    };
  })

  const animationIconStyle = useAnimatedStyle(() => {
    const  scaleValue = interpolate(scale.value , [0,1] , [1, 1.2])
    const top = interpolate(scale.value , [0, 1] , [1 , 9])
    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
      top: top,
    };
  })
  useEffect(() => {
    scale.value =  withSpring(typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused , {
        duration : 350 
    }) 
  }, [scale , isFocused])
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabberItem}
    >
      <Animated.View style={animationIconStyle }>
        {icon[routeName]({
          color : isFocused ? "#0284c7" : "#222"
        })}
      </Animated.View>
      <Animated.Text
        style={[{ color: isFocused ? "#0284c7" : "#222" ,  fontSize : 12}, animationTextStyle]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabbarButton;
const styles = StyleSheet.create({
  tabberItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
