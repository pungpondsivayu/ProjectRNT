import { View, Text, ScrollView, Image, Platform, Pressable } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon } from "react-native-heroicons/outline";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

function Navbar(){
  const navigate = useNavigation()
  return (
    <View className="mx-4 flex-row justify-between items-center mb-7">
      <Pressable>
        <Image
          source={require("../../assets/images/profile.png")}
          style={{
            height: hp(5),
            width: hp(5),
          }}
        />
      </Pressable>
      <Pressable>
        <BellIcon size={hp(4)} color="gray" />
      </Pressable>
    </View>
  );
}

export default Navbar