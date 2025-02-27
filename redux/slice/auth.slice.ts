import { createEntityAdapter, createSlice  } from "@reduxjs/toolkit"
import { RootState } from "../store/store";
import { IUser } from "@/@types/user/UserType";

export const userAdepter = createEntityAdapter<IUser>();

export const AuthSlice =  createSlice({
    name : "userAuth",
    initialState : userAdepter.getInitialState(),
    reducers : {
        setLoggedInUser : userAdepter.addOne,
        LogoutUser : userAdepter.removeAll
    }
})

export const { setLoggedInUser , LogoutUser } = AuthSlice.actions
export const {
  selectAll: selectAllLoggedIn,
  selectById: selectLoggedInById,
  selectEntities: selectLoggedInEntities,
  selectIds: selectLoggedInIds,
  selectTotal: selectTotalLoggedIn,
} = userAdepter.getSelectors<RootState>((state) => state.AuthapiAuthStore);
export const authRedcer = AuthSlice.reducer


