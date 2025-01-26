import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BarChart, barDataItem } from "react-native-gifted-charts";
import { parseDateByMode } from "@/helpers/controller/date/GetDate";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import { processWeeklyData } from "@/helpers/controller/date/ProcessDataChart";
import { useGetMoodQuery } from "@/controllers/Moodtrack.Controllers";

enum Period {
  week = "Week",
}

const index = () => {
  const [chartPeriod, setChartPeriod] = useState<Period>(Period.week);
  const [chartData, setChartData] = useState<barDataItem[]>([]);
  const [currenDate, setCurrenDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [chartKey, setChartKey] = useState<number>(0);
  const { data, error } = useGetMoodQuery(null);

  function FetchData() {
    if (chartPeriod == Period.week) {
      const { startofWeek, endofWeek } = GetWeek(currenDate);
      setStartDate((prevDate) => (prevDate = new Date(startofWeek)));
      setEndDate((prevDate) => (prevDate = new Date(endofWeek))); 
      const ChartData = processWeeklyData(data, startDate.toString(), endDate.toString());
      setChartData(ChartData)
      setChartKey((prev) => prev + 1);
    }
  }

  function GetWeek(date: Date) {
    const startofWeek: any = parseDateByMode(date.toString(), "getstartofweek");
    const endofWeek: any = parseDateByMode(date.toString(), "getendofweek");
    return {
      startofWeek,
      endofWeek,
    };
  }

  function handlePrevDate() {
    setCurrenDate(new Date(currenDate.setDate(currenDate.getDate() - 7)));
  }

  function handleNextDate() {
    setCurrenDate(new Date(currenDate.setDate(currenDate.getDate() + 7)));
  }

  useEffect(() => {
    FetchData();
    setChartKey((prev) => prev + 1)
  }, [currenDate , data]);

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
          paddingTop: 30,
          paddingHorizontal: 16,
        }}
      >
        <View className="bg-white p-5 rounded-2xl">
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 25,
            }}
          >
            <TouchableOpacity onPress={handlePrevDate}>
              <ChevronLeftIcon color={"blue"} size={hp(3)} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: hp(2.5),
                letterSpacing: wp(1.2),
              }}
              className="text-gray-300 font-semibold"
            >
              Weekly
            </Text>
            <TouchableOpacity onPress={handleNextDate}>
              <ChevronRightIcon color={"blue"} size={hp(3)} />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              className="font-bold text-gray-600"
              style={{
                fontSize: hp(1.8),
              }}
            >
              {startDate.toLocaleDateString("en-US", { month: "short" })}{" "}
              {startDate.getDate()}
              {" - "}
              {endDate.toLocaleDateString("en-US", { month: "short" })}{" "}
              {endDate.getDate()}{" "}
            </Text>
            <Text
              className="font-semibold text-gray-400"
              style={{
                fontSize: hp(2),
                marginBottom: 20,
              }}
            >
              Stress Chart
            </Text>
          </View>
          <View>
            <View
              style={{
                marginBottom: 20,
              }}
            >
              <BarChart
                key={chartKey}
                data={chartData}
                height={200}
                width={wp(75)}
                barWidth={18}
                minHeight={3}
                spacing={wp(5)}
                noOfSections={10}
                yAxisThickness={0}
                xAxisThickness={0}
                xAxisLabelTextStyle={{ color: "gray" }}
                yAxisLabelContainerStyle={{ color: "gray" }}
                isAnimated
                animationDuration={1000}
              />
            </View>
            <View>
              <View>
                <SegmentedControl values={["Weekly", "Monthly", "Yearly"]} selectedIndex={0}/>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;
