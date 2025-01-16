import { BaseApi } from "@/helpers/controller/ConfigQuery";
import { setArticle } from "@/redux/slice/article.slice";

export const ArticleCategoryController = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticleCategories: builder.query({
      query: () => ({
        url: `/category`,
        method: "GET",
      }), providesTags: ["Categories"],
    }),
    getArticle: builder.query({
      query: Data => {
        const { activeCategory:category , searchArticle:search } = Data
        let param = `?category=${category}`
        search ? param += `&name_like=${search}` : ""
        return {
          url: `/article${param}`,
          method: "GET",
        };
      },
      providesTags: (result, error, Data) => [
        { type: "Article", id: Data.activeCategory },
      ],
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
  