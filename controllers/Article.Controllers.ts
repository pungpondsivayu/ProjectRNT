import { BaseApi } from "@/helpers/controller/ConfigQuery";

export const ArticleCategoryController = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticleCategories: builder.query({
      query: () => ({
        url: `/category`,
        method: "GET",
      }), 
      providesTags: ["Categories"],
    }),
    getArticle: builder.query({
      query: Data => {
        const { activeCategory:category , searchArticle:search } = Data
        let param = ``
        category != 1 ? param = `?category=${category}` : ""
        search ? param += `&name_like=${search}` : ""
        category == 1 && search ? param = `?name_like=${search}` : ""
        return {
          url: `/article${param}`,
          method: "GET",
        };
      },
      providesTags: (result, error, Data) => [
        { type: "Article", id: Data.activeCategory },
      ],
    })
  }),
});

export const { useGetArticleCategoriesQuery, useGetArticleQuery } =
  ArticleCategoryController;
  