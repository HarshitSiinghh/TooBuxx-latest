import { SafeAreaView } from "react-native-safe-area-context";
// import ProfileHome from "@/features/profile/ProfileHome";
// import MyPoints from "@/components/profile/my-points";
import NotificationPage from "@/components/profile/notification-hovercard";

export default function ProfileTab() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1a003d" }}>
      <NotificationPage />
    </SafeAreaView>
  );
}