
import { SafeAreaView } from "react-native-safe-area-context";
import DailySaving from "../savings/daily-saving";

export default function HistoryTab() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1a003d" }}>
      {/* <DailyGoldSavings /> */}
      <DailySaving />
    </SafeAreaView>
  );
}
