// import NotificationPage from "@/components/profile/notifications/notification-hovercard";
// import NotificationPage from "@/components/profile/notifications/notification-hovercard";
//  NotificationSettingsPage





import NotificationSettingsPage from "@/components/profile/notifications/notification-settings";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileTab() {
  return (
  //   <SafeAreaView style={{ flex: 1, backgroundColor: "#1a003d" }}>


  
    <SafeAreaView style={{ flex: 1, backgroundColor: "#062530" }}>
      <NotificationSettingsPage />
    </SafeAreaView>
  );
}
