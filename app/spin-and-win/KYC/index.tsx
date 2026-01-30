import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { getKycStatusApi } from "@/services/kyc";
// import { KYCPending12 } from "./components/KYCPending12";
import KYCPending12 from "./pending";
import  KYCVerified12 from "./aprove"
// import { KYCVerified12 } from "./components/KYCVerified12";
import VerifyKYC from "./verifyKYC"; // tumhara KYC form page

type Status = "pending" | "approved" | "rejected" | null;

export default function KycIndex() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<Status>(null);
  const [kyc, setKyc] = useState<any>(null);

  useEffect(() => {
    const loadKyc = async () => {
      try {
        const res = await getKycStatusApi();

        if (res?.success && res?.kyc) {
          setKyc(res.kyc);
          setStatus(res.kyc.status);
        } else {
          setStatus(null); // no kyc → show form
        }
      } catch (e) {
        console.log("❌ KYC STATUS ERROR:", e);
        setStatus(null);
      } finally {
        setLoading(false);
      }
    };

    loadKyc();
  }, []);

if (loading) {
  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1a003d",   // ✅ yahan background color
    }}>
      <ActivityIndicator size="large" color="#a855f7" />
    </View>
  );
}

  // ✅ STATUS BASED RENDERING (NO ROUTES)

  if (status === "pending") {
    return <KYCPending12 />;
  }

  if (status === "approved") {
    return <KYCVerified12 />;
  }

  if (status === "rejected" || status === null) {
    return <VerifyKYC />; // rejected or first time user
  }

  return null;
}
