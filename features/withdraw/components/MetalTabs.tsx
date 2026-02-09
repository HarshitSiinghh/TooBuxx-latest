// import React from "react";
// import { View, Text, Pressable, StyleSheet } from "react-native";
// import { METALS } from "../constants/withdraw";
// import { Metal } from "../hooks/useWithdraw";

// type Props = {
//   metal: Metal | null;   // 🔥 important fix
//   onChange: (metal: Metal) => void;
// };

// export default function MetalTabs({ metal, onChange }: Props) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.row}>
//         {METALS.map((item) => {
//           const active = metal === item.key;

//           return (
//             <Pressable
//               key={item.key}
//               onPress={() => onChange(item.key)}
//               style={[
//                 styles.tab,
//                 active && styles.activeTab,
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.text,
//                   active && styles.activeText,
//                 ]}
//               >
//                 {item.label}
//               </Text>
//             </Pressable>
//           );
//         })}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 12,
//   },

//   row: {
//     flexDirection: "row",
//     gap: 8,
//   },

//   tab: {
//     flex: 1,
//     paddingVertical: 14,
//     borderRadius: 22,
//     backgroundColor: "#1E1E1E",
//     borderWidth: 1,
//     borderColor: "#2C2C2C",
//     alignItems: "center",
//   },

//   activeTab: {
//     backgroundColor: "#104e64",
//     borderColor: "#D4AF37",
//   },

//   text: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#FFFFFF",
//   },

//   activeText: {
//     color: "#D4AF37",
//   },
// });



import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { METALS } from "../constants/withdraw";
import { Metal } from "../hooks/useWithdraw";

type Props = {
  metal: Metal | null;   // 🔥 important fix
  onChange: (metal: Metal) => void;
};

export default function MetalTabs({ metal, onChange }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {METALS.map((item) => {
          const active = metal === item.key;

          return (
            <Pressable
              key={item.key}
              onPress={() => onChange(item.key)}
              style={[
                styles.tab,
                active && styles.activeTab,
              ]}
            >
              <Text
                style={[
                  styles.text,
                  active && styles.activeText,
                ]}
              >
                {item.label}
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
    marginVertical: 12,
  },

  row: {
    flexDirection: "row",
    gap: 8,
  },

  tab: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 22,
    backgroundColor: "#D4AF37",
    borderWidth: 1,
    borderColor: "#2C2C2C",
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#104e64",
    borderColor: "#D4AF37",
  },

  text: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  activeText: {
    color: "#D4AF37",
  },
});
