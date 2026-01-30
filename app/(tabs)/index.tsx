import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "@/features/home/HomeScreen";
export default function HomeTab() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1a003d" }}>
      {/* <ManualDepositMobile /> */}
      < HomeScreen/>
    </SafeAreaView>
  );
}
