import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Categories from "@/components/article/Categories";
import Article from "@/components/article/Article";
import { useGetArticleCategoriesQuery, useGetArticleQuery } from "@/controllers/Article.Controllers";
import { IArticleCategory } from "@/@types/article/ArticleType"

import { useSelector } from "react-redux";
import { selectAllsetArticle } from "@/redux/slice/article.slice";

export default function article() {
  const [activeCategory, setActiveCategory] = useState<Number | undefined>(1);
  const [category, setCategory] = useState<IArticleCategory[]>([]);
  const [article, setArtitle] = useState<IArticleCategory[]>([]);
  const { currentData: categoryData, error:categoryDatacategoryError } = useGetArticleCategoriesQuery(null);
  const { currentData: articleData, error:articleError } = useGetArticleQuery(activeCategory); 
  const articldara = useSelector(selectAllsetArticle);
  // console.log(articleData)
  function GetCategories() { 
    if (categoryData && !categoryDatacategoryError) {
      setCategory(categoryData);
    }
  }
  
  function GetArticles(){
    console.log(articldara)
    if (articleData && !articleError) {
      setArtitle(articldara);
    }
  }

  const FillterArticleByCategory = (activeCategory: number) => {
    setActiveCategory(activeCategory)
  };



  useEffect(() => {
    GetCategories();
  }, [categoryData]);

  useEffect(() => {
    GetArticles();
  }, [articleData , activeCategory]);

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px] mb-7">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor="gray"
            style={{
              fontSize: hp(1.7),
            }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>
        <View className="mb-7">
          <Categories
            category={category}
            activeCategory={activeCategory}
            FillterArticleByCategory={FillterArticleByCategory}
          />
        </View>
        <View className="mb-7">
          <Article article={article}/>
        </View>
      </ScrollView>
    </View>
  );
}
