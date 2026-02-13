// import React from "react";
// import { View, Text, StyleSheet, Pressable } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import { Navigation, View as ViewType } from "@/store/store";

// type HelpItem = {
//   icon: keyof typeof Feather.glyphMap;
//   label: string;
//   trigger: ViewType;
// };

// export const GetHelpSection = () => {
//   const { setOpen } = Navigation();

//   const helpItems: HelpItem[] = [
//     { icon: "help-circle", label: "FAQs", trigger: null },
//     { icon: "message-circle", label: "Contact Us", trigger: "contactUs" },
//     { icon: "file-text", label: "Terms & Conditions", trigger: null },
//     { icon: "shield", label: "Privacy Policy", trigger: null },
//     { icon: "phone", label: "Support Hotline", trigger: null },
//   ];

//   const handlePress = (trigger: ViewType) => {
//     if (trigger) setOpen(trigger);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Get Help</Text>

//       <View style={styles.list}>
//         {helpItems.map((item, i) => (
//           <Pressable
//             key={i}
//             style={styles.item}
//             onPress={() => handlePress(item.trigger)}
//           >
//             <Feather name={item.icon} size={18} color="#9CA3AF" />
//             <Text style={styles.label}>{item.label}</Text>
//           </Pressable>
//         ))}
//       </View>
//     </View>
//   );
// };

// /* ================= STYLES ================= */

// // const styles = StyleSheet.create({
// //   container: {
// //     backgroundColor: "#1a003d",
// //     padding: 12,
// //     borderRadius: 28
// //   },

// //   heading: {
// //     color: "white",
// //     fontSize: 14,
// //     fontWeight: "800",
// //     marginBottom: 8,
// //   },

// //   list: {
// //     gap: 4,
// //   },

// //   item: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 10,
// //     paddingVertical: 10,
// //     paddingHorizontal: 10,
// //     borderRadius: 12,
// //   },

// //   label: {
// //     color: "#d1d5db",
// //     fontSize: 13,
// //     fontWeight: "500",
// //   },
// // });




// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#0b3442",
//     padding: 16,
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: "#104e64",
//   },

//   heading: {
//     color: "#ffffff",
//     fontSize: 14,
//     fontWeight: "900",
//     letterSpacing: 0.6,
//     marginBottom: 12,
//   },

//   list: {
//     gap: 6,
//   },

//   item: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     paddingVertical: 12,
//     paddingHorizontal: 12,
//     borderRadius: 14,
//     backgroundColor: "rgba(255,255,255,0.03)",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.06)",
//   },

//   label: {
//     color: "#8fbac4",
//     fontSize: 13,
//     fontWeight: "600",
//     letterSpacing: 0.3,
//   },
// });

import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
// TanStack hatao, Expo Router lagao
import { Href, useRouter } from "expo-router"; 
import { Navigation, View as ViewType } from "@/store/store";

type HelpItem = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  trigger: ViewType | string;
  isRoute?: Href;
};

export const GetHelpSection = () => {
  const { setOpen } = Navigation();
  const router = useRouter(); // Expo Router hook

  const helpItems: HelpItem[] = [
    { icon: "help-circle", label: "FAQs", trigger: null },
    // Expo Router path
    { icon: "message-circle", label: "Contact Us", trigger: "/profile/contact-us", isRoute: "/profile/contact-us" },
    { icon: "file-text", label: "Terms & Conditions", trigger: null },
    { icon: "shield", label: "Privacy Policy", trigger: null },
    { icon: "phone", label: "Support Hotline", trigger: null },
  ];

  const handlePress = (item: HelpItem) => {
    if (item.isRoute && typeof item.trigger === "string") {
      // Expo Router navigation
      router.push(item.trigger as any); 
    } else if (item.trigger) {
      setOpen(item.trigger as ViewType);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>GET HELP</Text>

      <View style={styles.list}>
        {helpItems.map((item, i) => (
          <Pressable
            key={i}
            style={({ pressed }) => [
              styles.item,
              pressed && { opacity: 0.8, backgroundColor: "rgba(255,255,255,0.06)" }
            ]}
            onPress={() => handlePress(item)}
          >
            <View style={[styles.iconCircle, item.label === "Contact Us" && styles.activeIconCircle]}>
              <Feather 
                name={item.icon} 
                size={16} 
                color={item.label === "Contact Us" ? "#8fbac4": "#8fbac4"} 
              />
            </View>
            
            <Text style={[
              styles.label, 
              item.label === "Contact Us" && { color: "#8fbac4" }
            ]}>
              {item.label}
            </Text>
            
            <Feather name="chevron-right" size={14} color="rgba(255,255,255,0.15)" style={{marginLeft: 'auto'}} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0b3442",
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    marginTop: 20
  },
  heading: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 14,
    marginLeft: 4,
    textTransform: "uppercase",
  },
  list: {
    gap: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.03)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  activeIconCircle: {
    borderColor: "rgba(0, 210, 255, 0.2)",
    backgroundColor: "rgba(0, 210, 255, 0.05)",
  },
  label: {
    color: "#8fbac4",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 12,
  },
});