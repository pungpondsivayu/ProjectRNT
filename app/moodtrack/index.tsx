import { View, Text , ScrollView, Dimensions, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  LineChart,
} from "react-native-chart-kit";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CalendarIcon, XMarkIcon } from 'react-native-heroicons/outline';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import Modal from 'react-native-modal';
import dayjs from 'dayjs';
import { useGetMoodByDateQuery } from '@/controllers/Moodtrack.Controllers';
import { Imoodtrack } from '@/@types/moodtrack/Imoodtrack';
const index = () => {
  const screenWidth = Dimensions.get("window").width;
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState<DateType>(dayjs());
  const { data, isError } = useGetMoodByDateQuery(date?.toString());
  const [carlendatData, setarClendatData] = useState<Imoodtrack>();
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function Popup() {
    return (
      <Modal
        isVisible={isModalVisible}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        animationIn={"fadeInDown"}
      >
        <View
          style={{ height: hp(50), borderRadius: 35 }}
          className="bg-white p-9"
        >
          <TouchableOpacity
            className="flex items-end mb-7"
            onPress={toggleModal}
          >
            <XMarkIcon size={hp(3.5)} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
            }}
          >
            <DateTimePicker
              mode="single"
              date={date}
              onChange={(params) => {
                setDate(params.date);
                console.log(params.date);
                toggleModal();
              }}
              initialView="month"
            />
          </View>
        </View>
      </Modal>
    );
  }

  function GetData(){
    if(data && !isError){
      setarClendatData(data)
      console.log(data)
    }
  }

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


  useEffect(() => {
    GetData();
  }, [date])

  return (
    <View className="flex-1 bg-white">
      <Popup />
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
            <TouchableOpacity onPress={toggleModal}>
              <CalendarIcon size={hp(3)} />
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