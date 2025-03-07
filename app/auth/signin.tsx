import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  GestureResponderEvent,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { ILogin } from "@/@types/auth/AuthType";
import { Formik } from "formik";
import { LoginReq } from "@/validation/auth/Validation";
import {
  ALERT_TYPE,
  Toast,
} from "react-native-alert-notification";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAuth } from "@/context/AuthContext";
import { Audio } from 'expo-av'
const signin = () => {
  // use hook
  const { authState , onLogin } = useAuth();

  //setting value
  const [isCheaskBox, setIsCheackBox] = useState<boolean>(false);
  const ios = Platform.OS == "ios";
  const initialValues: ILogin = {
    email: "",
    password: "",
  };
  // use redux query

  //function
  async function HandleSubmit(values: ILogin) {
    try {
      if(!onLogin) return null;
      const response = await onLogin(values);
      if (response.data) {
        const { sound } = await Audio.Sound.createAsync(require("@/assets/sound/success.mp3"))
        await sound.playAsync();
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "SUCCESS",
          textBody: `Login successfully.`,
        });
        setTimeout(() => {
          router.push("/(tabs)")
        }, 1500);
      } else {
        const error = response.error as FetchBaseQueryError;
        const { sound } = await Audio.Sound.createAsync(require("@/assets/sound/failed.mp3"))
        await sound.playAsync();
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "ERROR",
          textBody: `${error.data}`,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

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
              Welcome back
            </Text>
            <Text
              style={{
                fontSize: hp(1.6),
                color: "black",
              }}
            >
              Hey good to see ou again
            </Text>
          </View>
          <Formik
            initialValues={initialValues}
            onSubmit={(values: ILogin) => HandleSubmit(values)}
            validationSchema={LoginReq}
            enableReinitialize
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View>
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
                  <View
                    className={`w-full h-14 ${
                      errors.email ? "border border-red-600" : ""
                    } text-black border rounded-lg items-center justify-center`}
                  >
                    <TextInput
                      placeholder="Enter your email address"
                      className="text-black pl-6 w-full"
                      keyboardType={"email-address"}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
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
                  <View
                    className={`w-full h-14 ${
                      errors.password ? "border border-red-600" : ""
                    } text-black border rounded-lg items-center justify-center`}
                  >
                    <TextInput
                      placeholder="Enter your email password"
                      className="text-black pl-6 w-full"
                      keyboardType={"default"}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      secureTextEntry
                    />
                  </View>
                </View>
                <View className="flex flex-row my-2 items-center  ">
                  <Checkbox
                    className="mr-2"
                    value={isCheaskBox}
                    onValueChange={setIsCheackBox}
                    color={isCheaskBox ? "#0284c7" : ""}
                  />
                  <Text>Remember me</Text>
                </View>
                <Pressable
                  className="mb-1 mt-3 bg-[#0284c7] flex-row justify-center items-center py-5 rounded-lg font-semibold"
                  onPress={(event: GestureResponderEvent) => {
                    handleSubmit();
                  }}
                >
                  <Text className="text-white text-lg">Sign up</Text>
                </Pressable>
              </View>
            )}
          </Formik>
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
              Dont't have an account ?
            </Text>
            <Pressable onPress={() => router.push("/auth/signup")}>
              <Text
                style={{
                  fontSize: hp(1.6),
                  color: "#0284c7",
                  fontWeight: "bold",
                }}
              >
                Regioster
              </Text>
            </Pressable>
          </View>
          <View className="flex-row justify-center my-6">
            <Pressable onPress={() => router.push("/(tabs)")}>
              <Text
                style={{
                  fontSize: hp(1.6),
                  color: "#0284c7",
                  fontWeight: "bold",
                }}
              >
                Access without signing in
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default signin;
