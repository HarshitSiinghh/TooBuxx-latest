import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHome from "@/features/profile/ProfileHome";

export default function ProfileTab() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1a003d" }}>
      <ProfileHome />
    </SafeAreaView>
  );
}
