import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_BACKEND_URL, BASE_BACKEND_URL_IOS } from "../../common/SD"
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
 
const Token = AsyncStorage.getItem("token");
export const BaseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: Platform.OS === "android" ? BASE_BACKEND_URL : BASE_BACKEND_URL_IOS,
    headers: {Authorization: `Bearer ${Token}`},
  }),
  tagTypes: ["Categories", "Article" , "Moodtrack" , "Auth"],
  endpoints: (builder) => ({}),
});