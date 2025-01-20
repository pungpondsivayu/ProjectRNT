import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { CalendarIcon } from "react-native-heroicons/outline";

const CalendarWithMonthYearPicker = () => {

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 30 }}
      >
        <View className="mb-7 mx-4 flex flex-row justify-between ">
          <Text className="font-semibold" style={{ fontSize: 18 }}>
            Mood Calendar
          </Text>
          <TouchableOpacity>
            <CalendarIcon size={25} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CalendarWithMonthYearPicker;
