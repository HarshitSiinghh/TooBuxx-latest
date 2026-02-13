




import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
// import { WITHDRAW_PLANS } from "../constants/withdraw";
import { Plan } from "../types/withdraw";

type Props = {
  plan: Plan;
  onChange: (plan: Plan) => void;
};
 const WITHDRAW_PLANS = [
  {
    key: "instant",
    label: "Instant",
    // description: "Immediate settlement at current price",
  },
  {
    key: "daily",
    label: "Daily",
    // description: "Processed once every day",
  },
  {
    key: "weekly",
    label: "Weekly",
    // description: "Processed every week",
  },
  {
    key: "monthly",
    label: "Monthly",
    // description: "Processed once a month",
  },
] as const;

export default function PlanTabs({ plan, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CHOOSE WITHDRAWAL PLAN</Text>

      <View style={styles.tabsRow}>
        {WITHDRAW_PLANS.map((item) => {
          const isActive = plan === item.key;

          return (
            <Pressable
              key={item.key}
            onPress={() => onChange(item.key as Plan)}

              style={[
                styles.tab,
                isActive && styles.activeTab,
              ]}
            >
              <View style={styles.headerRow}>
                <Text
                  style={[
                    styles.tabLabel,
                    isActive && styles.activeTabLabel,
                  ]}
                >
                  {item.label.toUpperCase()}
                </Text>
                {isActive && <View style={styles.activeDot} />}
              </View>

              <Text
                style={[
                  styles.description,
                  isActive && styles.activeDescription,
                ]}
              >
                {/* {item.description} */}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingHorizontal: 2, // Halka side space
  },

  title: {
    color: "#8fbac4",
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 16,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },

  tabsRow: {
    flexDirection: "row",
    flexWrap: "wrap", // 4 buttons ko rows mein todne ke liye
    justifyContent: "space-between",
    rowGap: 12, // Vertical gap buttons ke beech
  },

  tab: {
    width: "48%", // Do columns ka perfect setup
    height: 52,    // Sabki height ek dum barabar rahegi
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "rgba(16,78,100,0.25)",
    borderWidth: 1,
    borderColor: "#104e64",
    flexDirection: "row", // Label aur Dot ko ek line mein rakhne ke liye
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  activeTab: {
    backgroundColor: "rgba(250,204,21,0.12)",
    borderColor: "#facc15",
    borderWidth: 1.5,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  tabLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8fbac4",
    letterSpacing: 0.5,
    textAlign: "center",
  },

  activeTabLabel: {
    color: "#facc15",
  },

  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#facc15",
    position: "absolute", // Label se takraye bina corner mein rahega
    top: 8,
    right: 10,
    shadowColor: "#facc15",
    shadowRadius: 4,
    shadowOpacity: 0.6,
  },

  // Description text ab display nahi ho raha, par clean rakha hai
  description: {
    display: 'none', 
  },

  activeDescription: {
    display: 'none',
  },
});