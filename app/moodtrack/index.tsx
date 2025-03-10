import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BarChart, barDataItem, LineChart, PieChart } from "react-native-gifted-charts";
import { parseDateByMode } from "@/helpers/controller/date/GetDate";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentChartBarIcon
} from "react-native-heroicons/outline";
import { useGetMoodbyIdQuery } from "@/controllers/Moodtrack.Controllers";
import { ProcessMoodChart, ProcessSleepChart, ProcessStressChart } from "@/helpers/controller/Moottrack/ProcessDataChart";
import { router, useNavigation, useRouter } from "expo-router";
import { selectAllLoggedIn } from "@/redux/slice/auth.slice";
import { useSelector } from "react-redux";
import { useAuth } from "@/context/AuthContext";
import { MoodData } from "./MoodData";
import ButtonSheet from "@gorhom/bottom-sheet"
const index = () => {
  //useHook
  const navigation = useNavigation();
  const userData = useSelector(selectAllLoggedIn)[0];
  const { authState } = useAuth();

  //setting value
  const Period: string[] = ["Daily", "Weekly", "Monthly"];
  const [chartPeriod, setChartPeriod] = useState<string>("Weekly");
  const [chartPeriodSelected, setChartPeriodSelected] = useState<number>(
    Period.indexOf(chartPeriod)
  );
  const [chartData, setChartData] = useState<barDataItem[]>([]);
  const [linechartData, setLineChartData] = useState<any[]>([]);
  const [piechartData, setPieChartData] = useState<any[]>([]);
  const [currenDate, setCurrenDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [chartKey, setChartKey] = useState<number>(0);
  const [maxValueLabel, setMaxValueLabel] = useState<string>("");
  const [MaxValue, setMaxValue] = useState<number>(0);
  //use query
  const { data, error, refetch } = useGetMoodbyIdQuery(
    userData ? userData.id : 0
  );

  //function
  function FetchData() {
    const { startDate, endDate } = GetDateRamge(currenDate);
    const ChartData = ProcessStressChart(
      data,
      startDate.toString(),
      endDate.toString(),
      chartPeriod
    );
    const LineData = ProcessSleepChart(
      data,
      startDate.toString(),
      endDate.toString(),
      chartPeriod
    );
    const PieData = ProcessMoodChart(
      data,
      startDate.toString(),
      endDate.toString(),
    );
    if (ChartData && LineData && PieData) {
      setChartData(ChartData);
      setPieChartData(PieData.Data);
      setMaxValue(PieData.MaxValue)
      setMaxValueLabel(PieData.MaxValueLabel)
      setLineChartData(LineData);
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

  const renderDot = (color:string) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
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
          {piechartData &&
            piechartData.map((item, index) => (
              <View className="flex-row items-center w-32" key={index}>
                {renderDot(`${item.color}`)}
                <Text style={{ color: "black" }}>
                  {item.mood}: {parseInt(item.value).toFixed(0)}%
                </Text>
              </View>
            ))}
        </View>
      </>
    );
  };

  useEffect(() => {
    if (!authState?.authenticated) {
      return router.replace("/auth")
    }
  }, []);

  useEffect(() => {
    FetchData();
  }, [currenDate, data, chartPeriod, navigation]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      refetch();
    });
  }, [navigation, data]);

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
        <View className="bg-white p-5 mb-7 rounded-2xl">
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
              {Period[chartPeriodSelected]}
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
          <View className="mb-4">
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
                roundedTop
                roundedBottom
                showReferenceLine1
                referenceLine1Position={5}
                referenceLine1Config={{
                  color: "gray",
                  dashWidth: 2,
                  dashGap: 3,
                }}
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
          <TouchableOpacity
            className="flex flex-row items-center gap-2 justify-end"
            onPress={() =>
              router.push({
                pathname: "/moodtrack/Report",
                params: {
                  data: encodeURIComponent(JSON.stringify(chartData)), // เข้ารหัส JSON
                  mode: "StressLevel",
                  dateMode : chartPeriod
                },
              })
            }
          >
            <DocumentChartBarIcon color={"black"} size={hp(3)} />
            <Text>Report</Text>
          </TouchableOpacity>
        </View>
        <View className="bg-white p-5 mb-7 rounded-2xl">
          <Text
            className="font-semibold text-gray-400"
            style={{
              fontSize: hp(2),
              marginBottom: 20,
            }}
          >
            Mood Chart
          </Text>
          <View className="mb-4">
            <View
              style={{
                marginBottom: 20,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PieChart
                key={chartKey}
                data={piechartData}
                donut
                showGradient
                sectionAutoFocus
                radius={90}
                innerRadius={60}
                innerCircleColor={"#232B5D"}
                isAnimated
                animationDuration={1000}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontSize: 22,
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {MaxValue}%
                      </Text>
                      <Text style={{ fontSize: 14, color: "white" }}>
                        {maxValueLabel}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
            {renderLegendComponent()}
          </View>
          {/* <TouchableOpacity className="flex flex-row items-center gap-2 justify-end">
            <DocumentChartBarIcon color={"black"} size={hp(3)} />
            <Text>Report</Text>
          </TouchableOpacity> */}
        </View>
        <View className="bg-white p-5 mb-7 rounded-2xl">
          <Text
            className="font-semibold text-gray-400"
            style={{
              fontSize: hp(2),
              marginBottom: 20,
            }}
          >
            Sleep Chart
          </Text>
          <View className="mb-4">
            <View
              style={{
                marginBottom: 20,
              }}
            >
              <LineChart
                key={chartKey}
                height={200}
                width={wp(75)}
                areaChart
                data={linechartData}
                curved
                startFillColor="rgb(46, 217, 255)"
                startOpacity={0.8}
                endFillColor="rgb(203, 241, 250)"
                endOpacity={0.3}
                isAnimated
                animationDuration={1500}
                yAxisThickness={0}
                xAxisThickness={0}
                xAxisLabelTextStyle={{ color: "gray" }}
                yAxisLabelContainerStyle={{ color: "gray" }}
                color="skyblue"
                textColor1="black"
                textFontSize={13}
                showVerticalLines
                dataPointsColor="black"
              />
            </View>
          </View>
          {/* <TouchableOpacity className="flex flex-row items-center gap-2 justify-end">
            <DocumentChartBarIcon color={"black"} size={hp(3)} />
            <Text>Report</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default index;
