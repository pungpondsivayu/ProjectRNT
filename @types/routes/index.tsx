import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

// welcome screen navigate
export type WelcomeStackNavigatorParamList = {
  "(tabs)": undefined;
  index : undefined
};

export type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  WelcomeStackNavigatorParamList,
  "(tabs)"
>;
// end welcome screen navigate



// service screen navigate
export type ServiceStackNavigatorParamList = {
  "Cheakdisease": undefined;
  "Followmedication": undefined;
  "Moodtrack": undefined;
  "Searchhospital": undefined;
};

export type ServiceScreenNavigationProp =
  NativeStackNavigationProp<ServiceStackNavigatorParamList>;
// end service screen navigate
