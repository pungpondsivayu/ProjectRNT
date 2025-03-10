import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Calendar, CalendarProps } from "react-native-calendars";
import { useSelector } from "react-redux";
import { selectAllLoggedIn } from "@/redux/slice/auth.slice";
import { useGetMoodbyDateQuery, useGetMoodbyIdQuery } from "@/controllers/Moodtrack.Controllers";
import { router, useNavigation } from "expo-router";
import { MoodData } from "./MoodData";
import { useAuth } from "@/context/AuthContext";
import { IMentalHealth } from "@/@types/moodtrack/Imoodtrack";

const CalendarWithMonthYearPicker = () => {
  //use Hook
  const userData = useSelector(selectAllLoggedIn)[0];
  const navigation = useNavigation();
  const { authState } = useAuth();
  //setting value
  const [currentData, setCurrentData] = useState<any>([]);
  const [moodData, setMoodData] = useState<IMentalHealth>();
  

  //use query
  const { data, error, refetch } = useGetMoodbyIdQuery(
    // userData ? userData.id : 0
    1
  );
  
  //function
  function FetchData() {
    if (data && !error) {
      const transformedData: Record<string, any> = {}; // กำหนดให้เป็น Object
      data.forEach((e: any) => {
        transformedData[e.date] = {
          selected: true,
          marked: true,
          selectedColor: MoodData.find(m => m.name == e.mood)?.RefColor,
        };
      });
      setCurrentData(transformedData); // ส่ง Object ตรงๆ
    }
  }

  const renderDot = (color:string) => {
      return (
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 100,
            backgroundColor: color,
            marginRight: 10,
          }}
        />
      );
    };
  
    const renderLegendComponent = () => {
      return (
        <>
          <View className="flex-row mb-3 items-center justify-center">
            {MoodData &&
              MoodData.map((item, index) => (
                <View className="flex-row items-center w-32" key={index}>
                  {renderDot(`${item.RefColor}`)}
                  <Text style={{ color: "black" }}>{item.name}</Text>
                </View>
              ))}
          </View>
        </>
      );
    };

  useEffect(() => {
    FetchData();
  }, [data, navigation]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      refetch();
    });
  }, [navigation, data]);


  useEffect(() => {
    // if (!authState?.authenticated) {
    //   return router.replace("/auth")
    // }
  }, []);

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
          paddingTop: 30,
          paddingHorizontal: 16,
        }}
      >
        <View className="mb-7 flex flex-row justify-between ">
          <Text className="font-semibold" style={{ fontSize: 18 }}>
            Mood Calendar
          </Text>
        </View>
        <View className="mb-7">
          <Calendar
            style={{
              height: hp(36),
            }}
            current={new Date().toString()}
            markedDates={
              currentData && !Array.isArray(currentData) ? currentData : {}
            }
          />
        </View>
        <View className="mb-7">{renderLegendComponent()}</View>
      </ScrollView>
    </View>
  );
};

export default CalendarWithMonthYearPicker;
