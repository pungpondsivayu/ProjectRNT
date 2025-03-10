import { ChartPieIcon, PlusIcon, CalendarIcon } from "react-native-heroicons/outline";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
export const icon: any = {
  index: (props: any) => <ChartPieIcon size={hp(3)} {...props} />,
  upsert: (props: any) => (
    <PlusIcon size={hp(3)} {...props} />
  ),
  calendar: (props: any) => <CalendarIcon size={hp(3)} {...props} />,
};

