import { ILogin, IRegister } from "@/@types/auth/AuthType";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/controllers/Auth.Controllers";
import { setLoggedInUser } from "@/redux/slice/auth.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Children, createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";

interface Authprops {
  authState?: { token: string | null; authenticated: boolean | null };
  onLogin?: (values:ILogin) => Promise<any>
  onRegister?: (values:IRegister) => Promise<any>
  onLogout? : () => Promise<any>
}

const AuthContext = createContext<Authprops>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const dispatch = useDispatch();
  const [signup] = useRegisterMutation();
  const [signin] = useLoginMutation();

  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const login = async (values:ILogin) => {
    try{
      const response = await signin(values);
      if(response.data){
        const { data } = response
        setAuthState({
          token : data.accessToken,
          authenticated : true
        });
        dispatch(setLoggedInUser(data.user))
        await AsyncStorage.setItem("token", data.accessToken);
      } 
      return response
    }catch(e){
      console.log(e);
    }
  }

const register = async (value: IRegister) => {
  try {
    return await signup(value);
  } catch (e) {
    console.log(e);
  }
};

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setAuthState({
      token : null,
      authenticated : false
    })
    return true
  }
  

  const value = {
    authState,
    onLogin : login,
    onLogout : logout,
    onRegister : register
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
