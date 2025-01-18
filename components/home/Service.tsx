import { View, Text } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from '@react-native-seoul/masonry-list';
import ServiceCard from './ServiceCard';
import { BellIcon } from 'react-native-heroicons/outline';

const ServiceData = [
  {
    name: "Check for disease yourself by AI",
    icon: <BellIcon size={hp(4)} color="gray" />,
    path : "cheakdisease"
  },
  {
    name: "Search for a hospital",
    icon: <BellIcon size={hp(4)} color="gray" />,
    path : "searchhospital"
  },
  {
    name: "Mood tracker",
    icon: <BellIcon size={hp(4)} color="gray" />,
    path : "moodtrack"
  },
  {
    name: "Follow up on medication",
    icon: <BellIcon size={hp(4)} color="gray" />,
    path : "followmedication"
  },
];

const Service = () => {
  return (
    <View className="mx-4">
       <MasonryList
          data={ServiceData}
          keyExtractor={(item): any => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }: { item: any; i: number }) => (
            <ServiceCard item={item} index={i} />
          )}
          onEndReachedThreshold={0.1}
        />
    </View>
  );
}

export default Service