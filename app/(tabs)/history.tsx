import { SafeAreaView } from "react-native-safe-area-context";
import HistoryScreen from "@/features/history/HistoryScreen";

export default function HistoryTab() {
  return (
   <SafeAreaView style={{ flex: 1, backgroundColor: "#062530" }}>

      <HistoryScreen />
    </SafeAreaView>
  );
}



