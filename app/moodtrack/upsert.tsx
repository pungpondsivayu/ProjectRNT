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
} from "react-native-heroicons/outline";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import MoodList from "@/components/moodtrack/MoodList";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
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
import { Imoodtrack } from "@/@types/moodtrack/Imoodtrack";
import { useAddMoodMutation } from "@/controllers/Moodtrack.Controllers";
import { useRouter } from "expo-router";
const upsert = () => {
  const [activeMood, setActiveMood] = useState<number>(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState<DateType>(dayjs());
  const [AddMood] = useAddMoodMutation();
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const router = useRouter()

  const MoodData = [
    {
      id: 1,
      name: "Happy",
      emoji: "../../assets/images/mood/Happy.png",
      animation: require("../../assets/animation/Mood/Happy.json"),
      color: ["#ffad00", "#ffbe00", "#fbff00"],
    },
    {
      id: 2,
      name: "Sad",
      emoji: "../../assets/images/mood/Sad.png",
      animation: require("../../assets/animation/Mood/Sad.json"),
      color: ["#ffca51", "#e3ff74", "#5af7fc"],
    },
    {
      id: 3,
      name: "Angry",
      emoji: "../../assets/images/mood/Angry.png",
      animation: require("../../assets/animation/Mood/Angry.json"),
      color: ["#f6370a", "#ff7e00", "#fbff00"],
    },
  ];

  const initialValues: Imoodtrack = {
    mood: MoodData[activeMood].name,
    feeling: "",
    date: parseDateByMode(date, "getfulldate"),
  };

  async function HandleSubmit(values: Imoodtrack) {
    const response = await AddMood({
      mood: values.mood,
      feeling: values.feeling,
      date: values.date,
    });
    if(response.data){
      setDate(new Date())
      router.push("/moodtrack/calendar");
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
              <Pressable onPress={() => setDate(new Date())} className="flex flex-row justify-end">
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
        }}
      >
        <View className="mb-7 mx-4 flex flex-row justify-between ">
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
            <CalendarIcon size={hp(3)} />
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
          onSubmit={(values: Imoodtrack) => HandleSubmit(values)}
          validationSchema={Validation}
          enableReinitialize
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              <View className="mx-4 mb-7">
                <Text
                  className="font-semibold text-neutral-400 mb-2"
                  style={{
                    fontSize: hp(1),
                  }}
                >
                  How are you Feeling?
                </Text>
                <View>
                  <TextInput
                    multiline={true}
                    numberOfLines={50}
                    style={{
                      height: 200,
                      textAlignVertical: "top",
                      padding: 10,
                      fontSize: hp(1.8),
                    }}
                    placeholder="How are you feeling today?"
                    className={`bg-neutral-100 ${
                      errors.feeling ? "border border-red-600" : ""
                    }`}
                    onChangeText={handleChange("feeling")}
                    onBlur={handleBlur("feeling")}
                    value={values.feeling}
                  />
                  {errors.feeling && (
                    <Text style={{ fontSize: hp(1.5), color: "red" }}>
                      {errors.feeling}
                    </Text>
                  )}
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
                      padding: hp(3),
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
