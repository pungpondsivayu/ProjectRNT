import { IArticle } from "@/@types/article/ArticleType";
import {  Image, Pressable, Text, View } from "react-native";
import Animated, { FadeInDown , FadeOutDown } from "react-native-reanimated";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

export default function ArticleCatd({item , index} : {
    item : IArticle,
    index : number
  }) {
    const isEven = index % 2 == 0;
    return (
      <Animated.View
        entering={FadeInDown.delay(index * 100)
          .duration(600)
          .springify()
          .damping(15)}
      >
        <Pressable
          style={{
            width: "100%",
            paddingLeft: isEven ? 0 : 8,
            paddingRight: isEven ? 8 : 0,
            gap: hp(1),
          }}
          className="flex justify-center mb-4"
        >
          <Image
            source={{
              uri: item.iamge,
            }}
            style={{
              width: "100%",
              height: index % 3 == 0 ? hp(25) : hp(35),
              borderRadius: 25,
              objectFit: "cover",
            }}
            className="bg-black/5"
          />
          <Text
            style={{ fontSize: hp(1.5) }}
            className="font-semibold ml-2 text-neutral-600"
          >
            {item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name}
          </Text>
        </Pressable>
      </Animated.View>
    );
  }