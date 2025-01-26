import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { CalendarIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CalendarWithMonthYearPicker = () => {

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
          <TouchableOpacity>
            <CalendarIcon size={hp(3)} color={"blue"} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CalendarWithMonthYearPicker;
