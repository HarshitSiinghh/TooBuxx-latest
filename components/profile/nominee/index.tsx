
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

import { getNomineeStatusApi } from "@/services/nominee";

import { NomineeSection } from "./NomineeSection";
import PendingKYC from "./components/pendingstate";
import ApprovedKYC from "./components/aprovestate";

type Status = "pending" | "approved" | "rejected" | null;

export default function NomineeIndex() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<Status>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [nominee, setNominee] = useState<any>(null);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {

    try {
      const res = await getNomineeStatusApi();

      if (res?.success) {
        const nomineeData = res.nominee_kyc;

        if (nomineeData) {
       
          setIsSubmitted(true);
          setStatus(nomineeData.status);
          setNominee(nomineeData); // approved page ke liye
        } else {
          setIsSubmitted(false);
          setStatus(null);
          setNominee(null);
        }
      } else {
        setIsSubmitted(false);
        setStatus(null);
        setNominee(null);
      }
    } catch (e) {
   
      setIsSubmitted(false);
      setStatus(null);
      setNominee(null);
    } finally {
      setLoading(false);
    }
  };

if (loading) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#062530",
      }}
    >
      <ActivityIndicator size="large" color="#facc15" />
    </View>
  );
}

  // ⏳ Pending first (highest priority)
  if (status === "pending") return <PendingKYC />;

  // ✅ Approved
  if (status === "approved") return <ApprovedKYC nominee={nominee} />;

  // ❌ Not submitted OR rejected → show form
  return <NomineeSection onSuccess={checkStatus} />;
}
