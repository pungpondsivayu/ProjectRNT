import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_BACKEND_URL, BASE_BACKEND_URL_IOS } from "../../common/SD"
import { Platform } from "react-native";
 
export const BaseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: Platform.OS === "android" ? BASE_BACKEND_URL : BASE_BACKEND_URL_IOS,
    baseUrl: BASE_BACKEND_URL,
  }),
  tagTypes: ["Categories", "Article"],
  endpoints: (builder) => ({}),
});