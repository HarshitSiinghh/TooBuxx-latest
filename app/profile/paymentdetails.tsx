import { SafeAreaView } from "react-native-safe-area-context";
import PaymentDetailsPage from "@/components/profile/payments";

export default function PaymentTab() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1a003d" }}>
      <PaymentDetailsPage />
    </SafeAreaView>
  );
}