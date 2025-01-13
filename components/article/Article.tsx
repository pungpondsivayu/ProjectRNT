import { IArticleCategory } from '@/@types/article/ArticleType';
import React from 'react'
import { Text, View } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from '@react-native-seoul/masonry-list';
import ArticleCatd from './ArticleCard';

type Props = {
  article : IArticleCategory[]
}

function Article({ article }: Props) {
  return (
    <View className="mx-4">
      <Text
        style={{
          fontSize: hp(3),
        }}
        className="font-semibold text-neutral-600 mb-3"
      >
        Article
      </Text>
      <View>
        <MasonryList
          data={article}
          keyExtractor={(item): any => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }: { item: any; i: number }) => (
            <ArticleCatd item={item} index={i} />
          )}
          onEndReachedThreshold={0.1}
        />
      </View>
    </View>
  );
}

export default Article