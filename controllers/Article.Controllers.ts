import { BaseApi } from "@/helpers/controller/ConfigQuery";
import { setArticle } from "@/redux/slice/article.slice";

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
      query: category => ({
        url: `/article?category=${category}`,
        method: "GET",
      }),
      providesTags: ["Article"],
      async onQueryStarted(queryArgument, { dispatch, queryFulfilled }) {
        try {
          const { data: response }: any = await queryFulfilled;
          response && dispatch(setArticle(response));
        } catch (error) {
          console.error("Failed to add post:", error);
        }
      },
    }),
  }),
});

export const { useGetArticleCategoriesQuery, useGetArticleQuery } =
  ArticleCategoryController;