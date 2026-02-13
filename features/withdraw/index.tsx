import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useWithdraw } from "./hooks/useWithdraw";

import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AmountInput from "./components/AmountInput";
import AuthorizeButton from "./components/AuthorizeButton";
import KaratSheet from "./components/KaratSheet";
import MetalTabs from "./components/MetalTabs";
import PaymentMethod from "./components/PaymentMethod";
import PlanTabs from "./components/PlanTabs";

export default function WithdrawScreen() {
  const w = useWithdraw();


  const handleWithdraw = async (): Promise<boolean> => {
    if (w.exceedsBalance) {
      alert("Insufficient balance in this plan");
      return false;
    }

    try {
      console.log("WITHDRAW PAYLOAD 👉", {
        metal: w.metal,
        karat: w.karat,
        plan: w.plan,
        amount: w.amount,
        grams: w.grams,
        payoutMethod: w.payoutMethod,
      });

      await w.handleWithdraw(); // 🔥 REAL BACKEND CALL
      return true;
    } catch (err) {
      console.log("Withdraw error", err);
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.abc}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* 🔥 ALWAYS SHOW METAL TABS */}
        <MetalTabs metal={w.metal} onChange={w.setMetal} />

        {w.metal && (
          <View
            style={{
              marginTop: 15,
              padding: 12,
              backgroundColor: "rgba(255, 255, 255, 0.05)", // Subtle card background
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "rgba(156, 163, 175, 0.2)", // Faint border
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              {/* Label with metal type */}
              <Text
                style={{
                  color: "#9CA3AF",
                  fontSize: 11,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                {w.metal} Holdings
              </Text>

              {/* Weight Display */}
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "700",
                  marginTop: 2,
                }}
              >
                {w.availableBalance}{" "}
                <Text style={{ fontSize: 13, color: "#FFD700" }}>g</Text>
              </Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              {/* Value Label */}
              <Text style={{ color: "#9CA3AF", fontSize: 11 }}>
                Current Value
              </Text>

              {/* Rupee Value with a ni laace accent */}
              <View
                style={{
                  backgroundColor: "rgba(0, 230, 168, 0.15)",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 6,
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: "#00E6A8",
                    fontSize: 14,
                    fontWeight: "700",
                  }}
                >
                  ₹ ₹
                  {w.availableRupees.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* 🔥 GOLD KARAT POPUP */}
        {w.metal === "gold" && !w.karat && (
          <KaratSheet visible onSelect={w.setKarat} />
        )}

        {/* 🔥 IF METAL NOT SELECTED → STOP HERE */}
        {!w.metal ? null /* 🔥 IF GOLD BUT KARAT NOT SELECTED → STOP */ : w.metal ===
            "gold" && !w.karat ? null : (
          <>
            <PlanTabs plan={w.plan} onChange={w.setPlan} />

            <AmountInput amount={w.amount} onChange={w.setAmount} />

            {w.metal && (
              <Text
                style={{
                  color: "#FFD700",
                  fontSize: 14,
                  fontWeight: "700",
                  marginTop: 12,
                  marginBottom: 6,
                }}
              >
                You are withdrawing {w.metal.toUpperCase()}
              </Text>
            )}

            {/* <PayoutSummary
              amount={w.amount}
              grams={w.grams}
              pricePerGram={w.pricePerGram}
            /> */}

            {/* <PaymentMethod
              value={w.payoutMethod}
              onChange={w.setPayoutMethod}
            />
            
            */}
           <PaymentMethod
  value={w.payoutMethod}
  onChange={w.setPayoutMethod}
  payout={w.payout}
/>


            <AuthorizeButton
              disabled={!w.canWithdraw}
              onPress={handleWithdraw}
              onSuccessReset={w.resetWithdraw}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0B0B0B",
  },
  abc: {
    backgroundColor: "#062530",
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
});
