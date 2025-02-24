import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { EyeSlashIcon, EyeIcon } from "react-native-heroicons/outline";
import Checkbox from 'expo-checkbox';
const signup = () => {
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(true);
  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex mx-6">
          <View className="my-6">
            <Text
              style={{
                fontSize: hp(2.4),
                fontWeight: "bold",
                marginVertical: 12,
                color: "black",
              }}
            >
              Create Account
            </Text>
            <Text
              style={{
                fontSize: hp(1.6),
                color: "black",
              }}
            >
              Connect with your friend today!
            </Text>
          </View>
          <View className="mb-3">
            <Text
              style={{
                fontSize: hp(1.8),
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Email address
            </Text>
            <View className="w-full h-12 text-black border rounded-lg items-center justify-center">
              <TextInput
                placeholder="Enter your email address"
                className="text-black pl-6 w-full"
                keyboardType={"email-address"}
              />
            </View>
          </View>
          <View className="mb-3">
            <Text
              style={{
                fontSize: hp(1.8),
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Phone number
            </Text>
            <View className="w-full h-12 text-black border rounded-lg items-center justify-center">
              <TextInput
                placeholder="Enter your phone number"
                className="text-black pl-6 w-full"
                keyboardType={"numeric"}
              />
            </View>
          </View>
          <View className="mb-3">
            <Text
              style={{
                fontSize: hp(1.8),
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Password
            </Text>
            <View className="w-full h-12 text-black border rounded-lg flex flex-row items-center justify-between px-6">
              <TextInput
                placeholder="Enter your phone number"
                className="text-black"
                keyboardType={"numeric"}
                secureTextEntry={isPasswordShow}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordShow(!isPasswordShow)}
              >
                {isPasswordShow ? (
                  <EyeSlashIcon size={hp(3)} color={"black"} />
                ) : (
                  <EyeIcon size={hp(3)} color={"black"} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row my-2">
              <Checkbox className="mr-2"/>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default signup;
