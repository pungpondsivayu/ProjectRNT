import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Pressable,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { EyeSlashIcon, EyeIcon } from "react-native-heroicons/outline";
import Checkbox from 'expo-checkbox';
import { router } from "expo-router";
const signup = () => {
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(true);
  const [isCheaskBox, setIsCheackBox] = useState<boolean>(false);
  const ios = Platform.OS == "ios"
  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          className="flex mx-6"
          style={{
            flex: 1,
            marginVertical: ios ? hp(4) : hp(2),
          }}
        >
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
              Name
            </Text>
            <View className="w-full h-14 text-black border rounded-lg items-center justify-center">
              <TextInput
                placeholder="Enter your name"
                className="text-black pl-6 w-full"
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
              Email address
            </Text>
            <View className="w-full h-14 text-black border rounded-lg items-center justify-center">
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
            <View className="w-full h-14 text-black border rounded-lg items-center justify-center">
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
            <View className="w-full h-14 text-black border rounded-lg flex flex-row items-center justify-between px-6">
              <TextInput
                placeholder="Enter your password"
                secureTextEntry={isPasswordShow}
                className="text-black"
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
          <View className="flex flex-row my-2 items-center  ">
            <Checkbox
              className="mr-2"
              value={isCheaskBox}
              onValueChange={setIsCheackBox}
              color={isCheaskBox ? "#0284c7" : ""}
            />
            <Text>I agree to the terms and condition</Text>
          </View>
          <Pressable className="mb-1 mt-3 bg-[#0284c7] flex-row justify-center items-center py-5 rounded-lg font-semibold">
            <Text className="text-white text-lg">Sign up</Text>
          </Pressable>
          <View className="flex flex-row items-center my-5">
            <View className="flex flex-1 h-[1px] bg-gray-400 mx-3"></View>
            <Text>Or Sign up with</Text>
            <View className="flex flex-1 h-[1px] bg-gray-400 mx-3"></View>
          </View>
          <View className="flex-row justify-center">
            <TouchableOpacity className="flex-1 flex-row justify-center items-center h-14 border border-gray-400 mr-1 rounded-xl">
              <Image
                source={require("@/assets/images/Facebook.png")}
                style={{
                  height: hp(4),
                  width: hp(4),
                  marginRight: 8,
                }}
              />
              <Text>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row justify-center items-center h-14 border border-gray-400 mr-1 rounded-xl">
              <Image
                source={require("@/assets/images/Google.png")}
                style={{
                  height: hp(4),
                  width: hp(4),
                  marginRight: 8,
                }}
              />
              <Text>Google</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center my-6">
            <Text
              style={{
                fontSize: hp(1.6),
                color: "black",
                marginRight: 6,
              }}
            >
              Already have an account
            </Text>
            <Pressable onPress={() => router.push("/auth/signin")}>
              <Text
                style={{
                  fontSize: hp(1.6),
                  color: "#0284c7",
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default signup;
