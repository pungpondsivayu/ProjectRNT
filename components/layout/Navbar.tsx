import { View, Text, ScrollView, Image, Platform } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon } from "react-native-heroicons/outline";

function Navbar(){
  return (
    <View className="mx-4 flex-row justify-between items-center mb-7">
      <Image
        source={require("../../assets/images/profile.png")}
        style={{
          height: hp(5),
          width: hp(5),
        }}
      />
      <BellIcon size={hp(4)} color="gray" />
    </View>
  );
}

export default Navbar