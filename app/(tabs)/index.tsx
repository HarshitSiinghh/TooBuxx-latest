import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "@/features/home/HomeScreen";
export default function HomeTab() {
  return (
 <SafeAreaView style={{ flex: 1, backgroundColor: "#062530" }}>

      {/* <ManualDepositMobile /> */}
      < HomeScreen/>
    </SafeAreaView>
  );
}
