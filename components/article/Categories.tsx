import { IArticleCategory } from '@/@types/article/ArticleType';
import React from 'react'
import {  ScrollView, Text, TouchableOpacity, View } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInRight } from "react-native-reanimated";

type Props = {
  category: IArticleCategory[];
  activeCategory: Number | undefined;
  FillterArticleByCategory: (activeCategory: number) => void;
};
function Category({ category, FillterArticleByCategory, activeCategory }: Props) {
  return (
    <Animated.View entering={FadeInRight.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {category &&
          category.map((item, index) => {
            const isActive = item.id == activeCategory;
            const ActiveClass = isActive ? "bg-sky-600" : "border border-sky-600 bg-transparent text-sky-600";
            return (
              item.isUsed && (
                <TouchableOpacity
                  key={index}
                  className={`flex items-center p-3 rounded-2xl outline-none ${ActiveClass}`}
                  onPress={() => FillterArticleByCategory(item.id)}
                  style={{
                    marginRight: wp(2),
                  }}
                >
                  <Text
                    className={`font-semibold ${isActive ? "text-white" : ""}`}
                    style={{ fontSize: hp(1.6) }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )
            );
          })}
      </ScrollView>
    </Animated.View>
  );
}

export default Category