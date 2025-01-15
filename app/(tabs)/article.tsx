import { GestureResponderEvent, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { Formik } from "formik";
import { IArticleCategory } from "@/@types/article/ArticleType";
import { useSelector } from "react-redux";
import { selectAllsetArticle } from "@/redux/slice/article.slice";
import Categories from "@/components/article/Categories";
import Article from "@/components/article/Article";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  useGetArticleCategoriesQuery,
  useGetArticleQuery,
} from "@/controllers/Article.Controllers";

export default function article() {
  const [activeCategory, setActiveCategory] = useState<Number | undefined>(1);
  const [searchArticle , setSearchArticle] = useState<string | undefined>("")
  const [category, setCategory] = useState<IArticleCategory[]>([]);
  const [article, setArtitle] = useState<IArticleCategory[]>([]);
  const articldara = useSelector(selectAllsetArticle);
  const { currentData: categoryData, error: categoryDatacategoryError } =
    useGetArticleCategoriesQuery(null);
  const { currentData: articleData, error: articleError } = useGetArticleQuery(
    {activeCategory , searchArticle},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  function GetCategories() {
    if (categoryData && !categoryDatacategoryError) {
      setCategory(categoryData);
    }
  }

  function GetArticles() {
    if (articleData && !articleError) {
      setArtitle(articleData);
    }
  }

  const FillterArticleByCategory = (activeCategory: number) => {
    setActiveCategory(activeCategory);
  };

  useEffect(() => {
    GetCategories();
  }, [categoryData]);

  useEffect(() => {
    GetArticles();
  }, [articleData, activeCategory , searchArticle]);

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        <Formik
          initialValues={{ searchAricle: "" }}
          onSubmit={(values) => setSearchArticle(values.searchAricle)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px] mb-7">
              <TextInput
                placeholder="Search any article"
                placeholderTextColor="gray"
                style={{
                  fontSize: hp(1.7),
                }}
                className="flex-1 text-base mb-1 pl-3 tracking-wider"
                onChangeText={handleChange("searchAricle")}
                onBlur={handleBlur("searchAricle")}
                value={values.searchAricle}
              />
              <View className="bg-white rounded-full p-3">
                <TouchableOpacity
                  onPress={(event: GestureResponderEvent) => {
                    handleSubmit();
                  }}
                >
                  <MagnifyingGlassIcon
                    size={hp(2.5)}
                    strokeWidth={3}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>

        <View className="mb-7">
          <Categories
            category={category}
            activeCategory={activeCategory}
            FillterArticleByCategory={FillterArticleByCategory}
          />
        </View>
        <View className="mb-7">
          <Article article={article} />
        </View>
      </ScrollView>
    </View>
  );
}
