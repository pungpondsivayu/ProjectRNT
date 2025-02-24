import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";

const index = () => {
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          marginVertical: hp(5),
        }}
      >
        <View className="flex-row justify-center mb-7">
          <Image
            source={require("@/assets/images/AuthWelcome.jpg")}
            style={{
              height: hp(45),
              objectFit: "contain",
            }}
          />
        </View>
        <View className="mx-7">
          <Text
            style={{
              fontWeight: 800,
              fontSize: hp(5),
              color: "#0284c7",
            }}
          >
            Let's Get
          </Text>
          <Text
            style={{
              fontWeight: 800,
              fontSize: hp(5),
              color: "#0284c7",
            }}
          >
            Started
          </Text>
          <View
            style={{
              marginVertical: 22,
            }}
          >
            <Text
              style={{
                fontSize: hp(1.6),
              }}
            >
              Smart healthcare services taking
            </Text>
            <Text
              style={{
                fontSize: hp(1.6),
              }}
            >
              care of you everywhere at all times
            </Text>
            <Pressable className="mt-7 bg-[#0284c7] py-4 rounded-lg" onPress={() => {
              router.push("/auth/signup")
            }}> 
              <Text className="text-center text-white">Join Now</Text>
            </Pressable>
            <View className="flex-row mt-4 justify-center">
              <Text>Already have an account ? </Text>
              <Pressable>
                <Text
                  style={{
                    fontSize: hp(1.6),
                    fontWeight: 800,
                  }}
                >
                  Login
                </Text>
              </Pressable>
            </View>
            <View className="flex-row mt-4 justify-center">
              <Pressable onPress={() => router.push("/(tabs)")}>
                <Text>Access without signing in</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
