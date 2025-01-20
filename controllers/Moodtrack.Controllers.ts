import { Imoodtrack } from "@/@types/moodtrack/Imoodtrack";
import { BaseApi } from "@/helpers/controller/ConfigQuery";
import { parseDateByMode } from "@/helpers/controller/date/GetDate";
import { setArticle } from "@/redux/slice/article.slice";

export const MoodtrackController = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    AddMood: builder.mutation({
      query: (Data: Imoodtrack) => ({
        url: `/mood`,
        method: "POST",
        body: {
          ...Data,
        },
        providesTags: ["Moodtrack"],
      }),
    }),
    GetMoodByDate: builder.query({
      query: (data) => {
        const value = parseDateByMode(data , "getfullmonth")
        return {
          url: `/mood?date_like=${value}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useAddMoodMutation, useGetMoodByDateQuery } = MoodtrackController;