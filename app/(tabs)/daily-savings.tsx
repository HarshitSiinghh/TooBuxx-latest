// import HistoryScreen from "@/features/history/HistoryScreen";

// export default function HistoryTab() {
//   return <HistoryScreen />;
// }

//  import DailySavingScreen from "@/features/daily-savings/Daily-SavingScreen";
//  export default function DailySavingsTab() {
//    return <DailySavingScreen />;
//  }
import { SafeAreaView } from "react-native-safe-area-context";
// import HistoryScreen from "@/features/history/HistoryScreen";
// import DailyGoldSavings from "@/features/daily-savings/Daily-SavingScreen";
import DailySaving from "../savings/daily-savings";

export default function HistoryTab() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1a003d" }}>
      {/* <DailyGoldSavings /> */}
      <DailySaving />
    </SafeAreaView>
  );
}
