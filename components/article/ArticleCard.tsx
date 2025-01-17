import { IArticle } from "@/@types/article/ArticleType";
import {  Image, Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

export default function ArticleCatd({item , index} : {
    item : IArticle,
    index : number
  }) {
    return (
      item && (
        <Animated.View
          entering={FadeInDown.delay(index * 100)
            .duration(600)
            .springify()
            .damping(15)}
        >
          <Pressable
            className="flex flex-row mb-10"
            style={{
              gap: wp(3),
            }}
          >
            <Image
              source={{
                uri: item.iamge,
              }}
              style={{
                width: wp(30),
                height: hp(10),
                objectFit: "contain",
                borderRadius: 25,
              }}
            />
            <View
              style={{
                gap: hp(0.7),
              }}
            >
              <Text
                style={{ fontSize: hp(1.5) }}
                className="font-semibold text-gray-300"
              >
                {item.categoryName}
              </Text>
              <Text
                style={{ fontSize: hp(2) }}
                className="font-semibold text-neutral-600"
              >
                {item.name.length > 20
                  ? item.name.slice(0, 20) + "..."
                  : item.name}
              </Text>
              <Text
                style={{ fontSize: hp(1.5) }}
                className="font-semibold text-gray-300"
              >
                12 Sep 2002
              </Text>
            </View>
          </Pressable>
        </Animated.View>
      )
    );
  }