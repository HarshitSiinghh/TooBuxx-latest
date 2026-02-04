// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { Bucket } from "../types";
// import { COLORS, PLATINUM_TABS } from "../constants"; // Assume PLATINUM_TABS constants mein defined hai

// interface Props {
//   active: Bucket;
//   onChange: (b: Bucket) => void;
// }

// export default function PlatinumTabs({ active, onChange }: Props) {
//   // Platinum specific accent color
//   const PLATINUM_ACCENT = COLORS.PLATINUM_ACCENT || "#E5E4E2";

//   return (
//     <View style={styles.container}>
//       <View style={styles.segmentedControl}>
//         {PLATINUM_TABS.map((t) => {
//           const isActive = t.key === active;
//           return (
//             // <TouchableOpacity
//             //   key={t.key}
//             //   activeOpacity={0.7}
//             //   onPress={() => onChange(t.key)}
//             //   style={[
//             //     styles.tab,
//             //     isActive && [styles.activeTab, { backgroundColor: PLATINUM_ACCENT, shadowColor: PLATINUM_ACCENT }],
//             //   ]}
//             // >
//             //   <Text
//             //     style={[
//             //       styles.text,
//             //       isActive && styles.activeText,
//             //     ]}
//             //   >
//             //     {t.label}
//             //   </Text>
//             //   {/* Subtle dot for active state */}
//             //   {isActive && <View style={styles.activeDot} />}
//             // </TouchableOpacity>



//             <TouchableOpacity
//   style={[
//     styles.tab,
//     isActive && { backgroundColor: COLORS.PLATINUM_ACCENT, elevation: 4 } 
//   ]}
// >
//   <Text style={[styles.text, isActive && { color: "#000" }]}>
//     {t.label}
//   </Text>
// </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// }






import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Bucket } from "../types";
import { COLORS, PLATINUM_TABS } from "../constants"; 

interface Props {
  active: Bucket;
  onChange: (b: Bucket) => void;
}

export default function PlatinumTabs({ active, onChange }: Props) {
  // Platinum specific metallic blue accent
  const PLATINUM_ACCENT = COLORS.PLATINUM_ACCENT;

  return (
    <View style={styles.container}>
      <View style={styles.segmentedControl}>
        {PLATINUM_TABS.map((t) => {
          const isActive = t.key === active;
          return (
            <TouchableOpacity
              key={t.key} // FIX: Unique key added to resolve React warning
              activeOpacity={0.7}
              onPress={() => onChange(t.key)}
              style={[
                styles.tab,
                isActive && { 
                  backgroundColor: PLATINUM_ACCENT, // Metallic Blue background
                  elevation: 4,
                  shadowColor: PLATINUM_ACCENT,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                } 
              ]}
            >
              <Text 
                style={[
                  styles.text, 
                  isActive && { color: "#000", fontWeight: "800" } // Black text on Blue looks sharp
                ]}
              >
                {t.label}
              </Text>
              
              {/* Subtle dot for active state indicator */}
              {isActive && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: COLORS.CARD_DARK, 
    padding: 6,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
  },
  activeTab: {
    // Soft glow for the active platinum tab
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    color: COLORS.TEXT_MUTED,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  activeText: {
    color: "#000",
    fontWeight: "800",
  },
  activeDot: {
    position: 'absolute',
    bottom: 6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
  }
});