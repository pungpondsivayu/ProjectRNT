import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { analyzeStressTrend } from "@/helpers/controller/Moottrack/ProcessReportData";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  MegaphoneIcon,
  ShareIcon,
  DocumentIcon,
} from "react-native-heroicons/outline";
import { BarChart } from "react-native-gifted-charts";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

const index = () => {
  //use Hook
  const item: any = useLocalSearchParams();

  //setting value
  const chartData = JSON.parse(decodeURIComponent(item.data));
  const response = analyzeStressTrend(item.dateMode, chartData) || {};

  // function
  async function exportPDF() {
    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
          </head>
        <body style="text-align: center;">
        <div>
          <p class="text-center text-xl mt-10">รายงานความเครียด</p>
          <p class="text-center text-xl mt-10">คำแนะนำ : ${
            response && "recommendations" in response
              ? response.recommendations
              : ""
          }</p>
              <p class="text-center text-xl mt-10">ค่าสูงสุด : ${
                response && "summary" in response
                  ? response.summary.maxStress
                  : ""
              }</p>
          <p class="text-center text-xl mt-10">ค่าต่ำสุด : ${
            response && "summary" in response ? response.summary.minStress : ""
          }</p>
          <p class="text-center text-xl mt-10">ค่าเฉลี่ย : ${
            response && "summary" in response
              ? response.summary.averageStress
              : ""
          }</p>
          <div class="overflow-x-auto">
            <table class="table table-zebra">
                <thead>
                  <tr>
                    <th>label</th>
                    <th>value</th>
                  </tr>
                </thead>
                <tbody>
                ${chartData.map((item: any, index: number) => {
                  return `
                    <tr>
                      <td>${item.label}</td>
                      <td>${item.value}</td>
                    </tr>
                    `;
                })}
                </tbody>
            </table>
          </div>
        </div>
        </body>
        <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

      </html>
`;

    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  }
  return (
    <View className="bg-white flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
          paddingTop: 30,
          paddingHorizontal: 16,
        }}
      >
        <View className="mb-4">
          <View className="flex-1 flex-row justify-between items-center mb-5">
            <Text
              className="font-semibold text-gray-400"
              style={{
                fontSize: hp(2),
              }}
            >
              Report {item.dateMode} Chart
            </Text>
            <TouchableOpacity
              className="flex flex-row items-center gap-2"
              onPress={() => exportPDF()}
            >
              <ShareIcon color={"blue"} size={hp(3)} />
              <Text
                style={{
                  color: "blue",
                  fontSize: hp(1.7),
                  fontWeight: "bold",
                }}
              >
                PDF
              </Text>
            </TouchableOpacity>
          </View>
          {item.mode == "StressLevel" && (
            <View className="mb-10">
              <BarChart
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
          )}
          <View>
            <View className="flex flex-row items-center gap-3 mb-7">
              <MegaphoneIcon color={"sky"} size={hp(5)} />
              <Text
                style={{ fontSize: hp(3) }}
                className="text-blue-600 font-semibold"
              >
                Recommend
              </Text>
            </View>
            <Text
              style={{
                fontSize: hp(1.7),
              }}
            >
              {response && "recommendations" in response
                ? response.recommendations
                : ""}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;
