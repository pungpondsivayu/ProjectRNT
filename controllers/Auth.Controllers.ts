import { ILogin, IRegister } from "@/@types/auth/AuthType";
import { BaseApi } from "@/helpers/controller/ConfigQuery";

export const AuthController = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    Register: builder.mutation({
      query: (values: IRegister) => {
        return {
          url: `/register`,
          method: "POST",
          body: {
            ...values,
          },
          invalidatesTags: ["Auth"],
        };
      },
    }),
    Login: builder.mutation({
      query: (values: ILogin) => {
        return {
          url: `/login`,
          method: "POST",
          body: {
            ...values,
          },
          invalidatesTags: ["Auth"],
        };
      },
    }),
  }),
});

export const { useRegisterMutation , useLoginMutation} = AuthController;