import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import {
  CalendarIcon,
  XMarkIcon,
  PlusIcon,
  CameraIcon
} from "react-native-heroicons/outline";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import MoodList from "@/components/moodtrack/MoodList";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import Modal from "react-native-modal";
import dayjs from "dayjs";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Formik } from "formik";
import { Validation } from "@/validation/moodtrack/Validation";
import { parseDateByMode } from "@/helpers/controller/date/GetDate";
import { IMentalHealth } from "@/@types/moodtrack/Imoodtrack";
import { useAddMoodMutation, useGetMoodbyDateQuery } from "@/controllers/Moodtrack.Controllers";
import { useLocalSearchParams, useRouter } from "expo-router";
import Slider from '@react-native-community/slider';
import { useSelector } from "react-redux";
import { selectAllLoggedIn } from "@/redux/slice/auth.slice";
import {
  ALERT_TYPE,
  Toast,
} from "react-native-alert-notification";
import { Audio } from 'expo-av'
import { MoodData } from "./MoodData";
import { useAuth } from "@/context/AuthContext";

const upsert = () => {
  //use hook
  const userData = useSelector(selectAllLoggedIn)[0];
  const router = useRouter();

  //setting value
  const [activeMood, setActiveMood] = useState<number>(0);
  const [moodData, setMoodData] = useState<IMentalHealth>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState<DateType>(dayjs());
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const item = useLocalSearchParams();
  const { authState } = useAuth();
  const initialValues: IMentalHealth = {
    mood: moodData ? moodData.mood : MoodData[activeMood].name,
    feeling: moodData ? moodData.feeling : "",
    stress_level: moodData ? moodData.stress_level : 0,
    sleep_hours: moodData ? moodData.sleep_hours : 0,
    exercise_minutes: moodData ? moodData.exercise_minutes : 0,
    social_interaction_score: moodData ? moodData?.social_interaction_score : 0,
    notes: moodData ? moodData.notes : "",
    userId: moodData ? moodData.userId : userData && userData.id,
    date: moodData
      ? moodData.date
      : `${parseDateByMode(
          date?.toString() ?? new Date().toString(),
          "getfulldate"
        )}`,
  };

  //use queryc
  const [AddMood] = useAddMoodMutation();
  const { data, error } = useGetMoodbyDateQuery(
    typeof item?.date === "string" ? item?.date.toString() : ""
  );

  //function
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function FetchDataByDate() {
    if (data && !error) {
      setMoodData(data);
    }
  }

  useEffect(() => {
    FetchDataByDate();
    console.log(moodData);
  }, [data, item]);

  async function HandleSubmit(values: IMentalHealth) {
    const response = await AddMood({
      id: 0,
      mood: values.mood,
      feeling: values.feeling,
      stress_level: values.stress_level,
      sleep_hours: values.sleep_hours,
      exercise_minutes: values.exercise_minutes,
      social_interaction_score: values.social_interaction_score,
      notes: values.notes,
      userId: values.userId,
      date: values.date,
    });
    if (response.data) {
      const { sound } = await Audio.Sound.createAsync(
        require("@/assets/sound/success.mp3")
      );
      await sound.playAsync();
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "SUCCESS",
        textBody: `Moodtrack create successfully.`,
      });
      setTimeout(() => {
        router.replace({
          pathname: "/moodtrack",
          params: { refresh: "0" },
        });
      }, 1500);
    } else {
      const { sound } = await Audio.Sound.createAsync(
        require("@/assets/sound/failed.mp3")
      );
      await sound.playAsync();
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "ERROR",
        textBody: `Failed to create a moodtrack.`,
      });
    }
  }

  function Popup() {
    return (
      <Modal
        isVisible={isModalVisible}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        animationIn={"fadeInDown"}
      >
        <View
          style={{ height: hp(51), borderRadius: 35 }}
          className="bg-white p-9"
        >
          <TouchableOpacity
            className="flex items-end mb-7"
            onPress={toggleModal}
          >
            <XMarkIcon size={hp(3.5)} color={"gray"} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
            }}
          >
            <DateTimePicker
              mode="single"
              date={date}
              onChange={(params) => setDate(params.date)}
            />
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <Pressable
                onPress={() => setDate(new Date())}
                className="flex flex-row justify-end"
              >
                <Text
                  className="font-semibold text-sky-800"
                  style={{
                    fontSize: hp(2),
                  }}
                >
                  Today
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  useEffect(() => {
    // if (!authState?.authenticated) {
    //   return router.replace("/auth")
    // }
  }, []);

  return (
    <View className="flex-1 bg-white">
      <Popup />
      <View className="flex justify-center items-center mb-7">
        <LottieView
          autoPlay
          source={MoodData[activeMood].animation}
          style={{
            width: wp(70),
            height: hp(30),
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 150,
          paddingTop: 30,
          paddingHorizontal: 16,
        }}
        className="bg-white rounded-3xl"
      >
        <View className="mb-7 mx-4 flex flex-row justify-between">
          <View className="flex flex-row gap-1">
            <Text
              className="font-semibold flex"
              style={{
                fontSize: hp(2.3),
              }}
            >
              Moodtracker
            </Text>
            <View className="bg-green-600 rounded-md p-2">
              <Text className="text-white">New</Text>
            </View>
          </View>
          <TouchableOpacity onPress={toggleModal}>
            <CalendarIcon size={hp(3)} color={"blue"} />
          </TouchableOpacity>
        </View>
        <View className="mb-7">
          <MoodList
            mood={MoodData}
            activeMood={activeMood}
            setActiveMood={setActiveMood}
          />
        </View>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: IMentalHealth) => HandleSubmit(values)}
          validationSchema={Validation}
          enableReinitialize
        >
          {({
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            values,
            errors,
          }) => (
            <View>
              <View className="mx-4 mb-7">
                <Text
                  className="font-semibold text-neutral-400 mb-2"
                  style={{
                    fontSize: hp(1.5),
                  }}
                >
                  How are you Feeling?
                </Text>
                <View>
                  <TextInput
                    multiline={true}
                    numberOfLines={50}
                    style={{
                      height: 180,
                      textAlignVertical: "top",
                      padding: 10,
                      fontSize: hp(1.8),
                    }}
                    placeholder="How are you feceling today"
                    className={`rounded-xl bg-neutral-100 ${
                      errors.feeling ? "border border-red-600" : ""
                    }`}
                    onChangeText={handleChange("feeling")}
                    onBlur={handleBlur("feeling")}
                    value={values.feeling}
                  />
                </View>
              </View>
              <View className="mx-4 mb-7">
                <View className="flex flex-row justify-between">
                  <Text
                    className="font-semibold text-neutral-400 mb-2"
                    style={{
                      fontSize: hp(1.5),
                    }}
                  >
                    Stress level
                  </Text>
                  <Text className="font-bold">{values.stress_level}</Text>
                </View>
                <View>
                  <Slider
                    className="w-full h-10"
                    minimumValue={0}
                    maximumValue={10}
                    minimumTrackTintColor="#0284c7"
                    maximumTrackTintColor="#000000"
                    onValueChange={(e) => {
                      setFieldValue("stress_level", e);
                    }}
                    step={1}
                    value={values.stress_level}
                  />
                </View>
              </View>
              <View className="mx-4 mb-7">
                <View className="flex flex-row justify-between">
                  <Text
                    className="font-semibold text-neutral-400 mb-2"
                    style={{
                      fontSize: hp(1.5),
                    }}
                  >
                    Sleep hours
                  </Text>
                  <Text className="font-bold">{values.sleep_hours}</Text>
                </View>
                <View>
                  <Slider
                    className="w-full h-10"
                    minimumValue={0}
                    maximumValue={10}
                    minimumTrackTintColor="#0284c7"
                    maximumTrackTintColor="#000000"
                    onValueChange={(e) => {
                      setFieldValue("sleep_hours", e);
                    }}
                    step={1}
                    value={values.sleep_hours}
                  />
                </View>
              </View>
              <View className="mx-4 mb-7">
                <View className="flex flex-row justify-between">
                  <Text
                    className="font-semibold text-neutral-400 mb-2"
                    style={{
                      fontSize: hp(1.5),
                    }}
                  >
                    Exercise minutes
                  </Text>
                  <Text className="font-bold">{values.exercise_minutes}</Text>
                </View>
                <View>
                  <Slider
                    className="w-full h-10"
                    minimumValue={0}
                    maximumValue={10}
                    minimumTrackTintColor="#0284c7"
                    maximumTrackTintColor="#000000"
                    onValueChange={(e) => {
                      setFieldValue("exercise_minutes", e);
                    }}
                    step={1}
                    value={values.exercise_minutes}
                  />
                </View>
              </View>
              <View className="mx-4 mb-7">
                <View className="flex flex-row justify-between">
                  <Text
                    className="font-semibold text-neutral-400 mb-2"
                    style={{
                      fontSize: hp(1.5),
                    }}
                  >
                    Social interaction score
                  </Text>
                  <Text className="font-bold">
                    {values.social_interaction_score}
                  </Text>
                </View>
                <View>
                  <Slider
                    className="w-full h-10"
                    minimumValue={0}
                    maximumValue={10}
                    minimumTrackTintColor="#0284c7"
                    maximumTrackTintColor="#000000"
                    onValueChange={(e) => {
                      setFieldValue("social_interaction_score", e);
                    }}
                    step={1}
                    value={values.social_interaction_score}
                  />
                </View>
              </View>
              <View className="mx-4 mb-7">
                <Text
                  className="font-semibold text-neutral-400 mb-2"
                  style={{
                    fontSize: hp(1.5),
                  }}
                >
                  Notes
                </Text>
                <View>
                  <TextInput
                    multiline={true}
                    numberOfLines={50}
                    style={{
                      height: 180,
                      textAlignVertical: "top",
                      padding: 10,
                      fontSize: hp(1.8),
                    }}
                    placeholder="Notes."
                    className={`rounded-xl bg-neutral-100 ${
                      errors.notes ? "border border-red-600" : ""
                    }`}
                    onChangeText={handleChange("notes")}
                    onBlur={handleBlur("notes")}
                    value={values.notes}
                  />
                </View>
              </View>
              <View className="flex items-center">
                <TouchableOpacity
                  onPress={(event: GestureResponderEvent) => {
                    handleSubmit();
                  }}
                >
                  <LinearGradient
                    colors={[
                      MoodData[activeMood].color[0],
                      MoodData[activeMood].color[1],
                      MoodData[activeMood].color[2],
                    ]}
                    style={{
                      padding: hp(1.5),
                      borderRadius: 100,
                    }}
                  >
                    <PlusIcon size={hp(5)} color={"white"} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default upsert;
