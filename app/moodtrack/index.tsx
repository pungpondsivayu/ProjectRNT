import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BarChart, barDataItem } from "react-native-gifted-charts"
import { parseDateByMode } from "@/helpers/controller/date/GetDate";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import { useGetMoodQuery } from "@/controllers/Moodtrack.Controllers";
import { ProcessDataChart } from "@/helpers/controller/Moottrack/ProcessDataChart";
const index = () => {
  //useHook

  //setting value
  const Period: string[] = ["Daily", "Weekly", "Monthly"];
  const [chartPeriod, setChartPeriod] = useState<string>("Weekly");
  const [chartPeriodSelected, setChartPeriodSelected] = useState<number>(
    Period.indexOf(chartPeriod)
  );
  const [chartData, setChartData] = useState<barDataItem[]>([]);
  const [currenDate, setCurrenDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [chartKey, setChartKey] = useState<number>(0);

  //use query
  const { data, error } = useGetMoodQuery(null);

  //function
  function FetchData() {
    const { startDate, endDate } = GetDateRamge(currenDate);
    const ChartData = ProcessDataChart(
      data,
      startDate.toString(),
      endDate.toString(),
      chartPeriod
    );
    if (ChartData) {
      setChartData(ChartData);
      setChartKey((prev) => prev + 1);
    }
  }

  function GetDateRamge(date: Date) {
    let startDate: any;
    let endDate: any;
    if (chartPeriod == "Weekly") {
      startDate = parseDateByMode(date.toString(), "getstartofweek");
      endDate = parseDateByMode(date.toString(), "getendofweek");
    } else if (chartPeriod == "Daily") {
      startDate = parseDateByMode(date.toString(), "getstartofmonth");
      endDate = parseDateByMode(date.toString(), "getendofmonth");
    } else if (chartPeriod == "Monthly") {
      startDate = parseDateByMode(date.toString(), "getstartofyear");
      endDate = parseDateByMode(date.toString(), "getendofyear");
    }
    setStartDate((prevDate) => (prevDate = new Date(startDate)));
    setEndDate((prevDate) => (prevDate = new Date(endDate)));
    return { startDate, endDate };
  }

  function handlePrevDate() {
    if (chartPeriod == "Weekly")
      setCurrenDate(new Date(currenDate.setDate(currenDate.getDate() - 7)));
    else if (chartPeriod == "Daily")
      setCurrenDate(new Date(currenDate.setDate(currenDate.getDate() - 30)));
    else if (chartPeriod == "Monthly")
      setCurrenDate(new Date(currenDate.setDate(currenDate.getDate() - 365)));
  }

  function handleNextDate() {
    if (chartPeriod == "Weekly")
      setCurrenDate(new Date(currenDate.setDate(currenDate.getDate() + 7)));
    else if (chartPeriod == "Daily")
      setCurrenDate(new Date(currenDate.setDate(currenDate.getDate() + 30)));
    else if (chartPeriod == "Monthly")
      setCurrenDate(new Date(currenDate.setDate(currenDate.getDate() + 365)));
  }

  useEffect(() => {
    FetchData();
  });

  useEffect(() => {
    FetchData();
  }, [currenDate, data, chartPeriod]);

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
              <ChevronLeftIcon
                color={"blue"}
                size={hp(3)}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: hp(2.5),
                letterSpacing: wp(1.2),
              }}
              className="text-gray-300 font-semibold"
            >
              {Period[chartPeriodSelected]}
            </Text>
            <TouchableOpacity onPress={handleNextDate}>
              <ChevronRightIcon
                color={"blue"}
                size={hp(3)}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              className="font-bold text-gray-600"
              style={{
                fontSize: hp(1.8),
              }}
            >
              {(chartPeriod === "Weekly" || chartPeriod === "Daily") &&
                `${startDate.getFullYear()} ${startDate.toLocaleDateString(
                  "en-US",
                  { month: "short" }
                )} ${startDate.getDate()} - ${endDate.getFullYear()} ${endDate.toLocaleDateString(
                  "en-US",
                  { month: "short" }
                )} ${endDate.getDate()}`}
              {chartPeriod === "Monthly" &&
                `${startDate.getFullYear()} ${startDate.toLocaleDateString(
                  "en-US",
                  { month: "short" }
                )} - ${endDate.getFullYear()} ${endDate.toLocaleDateString(
                  "en-US",
                  { month: "short" }
                )}`}
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
              <SegmentedControl
                values={["Day", "Week", "Month"]}
                selectedIndex={chartPeriodSelected}
                onChange={(event) => {
                  setChartPeriodSelected(
                    event.nativeEvent.selectedSegmentIndex
                  );
                  setChartPeriod(
                    Period[event.nativeEvent.selectedSegmentIndex]
                  );
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;
