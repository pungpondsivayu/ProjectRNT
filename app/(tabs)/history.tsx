import { View, Text, Platform, ScrollView } from 'react-native'
import React from 'react'
import Animated  from "react-native-reanimated";

const history = () => {
  const ios  = Platform.OS === "ios"
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        <Text>
          dasdasdasdasds
        </Text>
      </ScrollView>
    </View>
  );
}

export default history