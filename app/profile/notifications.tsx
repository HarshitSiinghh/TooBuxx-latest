import { SafeAreaView } from "react-native-safe-area-context";
import NotificationPage from "@/components/profile/notification-hovercard";

export default function ProfileTab() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1a003d" }}>
      <NotificationPage />
    </SafeAreaView>
  );
}