import { View, StyleSheet, LayoutChangeEvent, Platform } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabbarButton from "./TabbarButton";
import { useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const ios = Platform.OS === "ios";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [dimemstions, setDimenstions] = useState({ height: 20, width: 100 });

  const buttonWodth = dimemstions.width / state.routes.length;

  const onTabbarLayout = (e : LayoutChangeEvent) => {
    setDimenstions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  }

  const tabPotitionX = useSharedValue(0);

  const aniamtionStyle = useAnimatedStyle(() => {
    return {
        transform : [{
            translateX : tabPotitionX.value
        }]
    }
  })
  
  return (
    <View style={styles.tabber} onLayout={onTabbarLayout}>
        <Animated.View style={[aniamtionStyle , {
            position : "absolute",
            backgroundColor : "#0284c7",
            borderRadius : 30,
            marginHorizontal : 12,
            height : dimemstions.height - 15,
            width : buttonWodth   -25
        }]}/>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label : any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
            tabPotitionX.value = withSpring(buttonWodth * index, {
              duration: 1500,
            });
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabbarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? "#FFF" : "#222"}
            label={label}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabber: {
    position: "absolute",
    bottom: ios ? hp(4) : hp(2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 80,
    paddingVertical : 10,
    borderRadius : 35,
  },
});
