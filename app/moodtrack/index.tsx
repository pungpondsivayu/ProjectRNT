import { View, Text , ScrollView, Dimensions, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  LineChart,
} from "react-native-chart-kit";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CalendarIcon } from 'react-native-heroicons/outline';


const index = () => {
  const screenWidth = Dimensions.get("window").width;
  const dataSet = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        data: [1, 2, 3, 4, 5, 4],
        color: (opacity = 1) => `rgba(2 ,132 ,199, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Moodtrack"], // optional
  };


  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
          paddingTop: 30,
        }}
      >
        <View>
          <View className="mb-7 mx-4 flex flex-row justify-between ">
            <Text
              className="font-semibold"
              style={{
                fontSize: hp(2.3),
              }}
            >
              Mood Chart
            </Text>
            <TouchableOpacity>
              <CalendarIcon size={hp(3)} color={"blue"} />
            </TouchableOpacity>
          </View>
          <View className="mb-7">
            <LineChart
              data={dataSet}
              width={screenWidth}
              height={220}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(2, 132, 199, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default index