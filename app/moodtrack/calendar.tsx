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
import { useNavigation } from "expo-router";
import { MoodData } from "./MoodData";

const CalendarWithMonthYearPicker = () => {
  //use Hook
  const userData = useSelector(selectAllLoggedIn)[0];
  const navigation = useNavigation();

  //setting value
  const [currentData, setCurrentData] = useState<any>([]);
  const [dateData, setDateData] = useState<any>();
  const [selectDate, setSelectDate] = useState<string>("");

  //use query
  const { data, error, refetch } = useGetMoodbyIdQuery(
    userData ? userData.id : 0
    // 1
  );
  
  const { data:dataByDate, error:errorByDate } = useGetMoodbyDateQuery(selectDate);

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

    function handleSelect(day:string) {
      setSelectDate(day)
    }

  useEffect(() => {
    FetchData();
  }, [data, navigation]);

  useEffect(() => {
    if(!errorByDate && dataByDate){
      setDateData(dataByDate)
    }
  }, [dataByDate , selectAllLoggedIn]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      refetch();
    });
  }, [navigation, data]);

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
            // Customize the appearance of the calendar
            style={{
              height: hp(36),
            }}
            // Specify the current date
            current={new Date().toString()}
            // Callback that gets called when the user selects a day
            onDayPress={(day: any) => {
              handleSelect(day.dateString);
            }}
            // Mark specific dates as marked
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
