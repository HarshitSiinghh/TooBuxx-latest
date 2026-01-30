import NotificationPage from "@/components/profile/notifications";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileTab() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1a003d" }}>
      <NotificationPage />
    </SafeAreaView>
  );
}
