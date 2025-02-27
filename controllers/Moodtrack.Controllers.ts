import { Imoodtrack } from "@/@types/moodtrack/Imoodtrack";
import { BaseApi } from "@/helpers/controller/ConfigQuery";
import { parseDateByMode } from "@/helpers/controller/date/GetDate";
export const MoodtrackController = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    AddMood: builder.mutation({
      query: (Data: Imoodtrack) => ({
        url: `/mood`,
        method: "POST",
        body: {
          ...Data,
        },
        invalidatesTags : ["Moodtrack"]
      }),
    }),
    GetMood: builder.query({

      query: () => {
        return {
          url: `/mood`,
          method: "GET",
        };
      },
      providesTags : ["Moodtrack"]
    }),
  }),
});

export const { useAddMoodMutation, useGetMoodQuery } = MoodtrackController;