import { IMentalHealth } from "@/@types/moodtrack/Imoodtrack";
import { BaseApi } from "@/helpers/controller/ConfigQuery";
import { parseDateByMode } from "@/helpers/controller/date/GetDate";
import { date } from "yup";
export const MoodtrackController = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    AddMood: builder.mutation({
      query: (Data: IMentalHealth) => ({
        url: `/mood`,
        method: "POST",
        body: {
          ...Data,
        },
        invalidatesTags: ["Moodtrack"],
      }),
    }),
    GetMood: builder.query({
      query: () => {
        return {
          url: `/mood`,
          method: "GET",
        };
      },
      providesTags: ["Moodtrack"],
    }),
    GetMoodbyId: builder.query({
      query: (userId: number) => {
        return {
          url: `/mood?userId_like=${userId}`,
          method: "GET",
        };
      },
      providesTags: ["Moodtrack"],
    }),
    GetMoodbyDate: builder.query({
      query: (date: string) => {
        return {
          url: `/mood?date=${date}`,
          method: "GET",
        };
      },
      providesTags: ["Moodtrack"],
    }),
  })
});

export const { useAddMoodMutation, useGetMoodQuery , useGetMoodbyIdQuery , useGetMoodbyDateQuery } = MoodtrackController;
