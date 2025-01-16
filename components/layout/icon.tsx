import { ClipboardDocumentListIcon, HomeIcon, NewspaperIcon } from "react-native-heroicons/outline";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
export const icon: any = {
  index: (props: any) => <HomeIcon size={hp(3)} {...props} />,
  article: (props: any) => <NewspaperIcon size={hp(3)} {...props} />,
  history: (props: any) => (
    <ClipboardDocumentListIcon size={hp(3)} {...props} />
  ),
};