// import React from "react";
// import { View, Text, StyleSheet, Pressable } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";

// import { Navigation, PromoModel } from "@/store/store";
// import type { ModalType } from "@/store/store";
// interface Props {
//   kycStatus: "pending" | "approved" | "rejected" | null;
// }


// interface Props {
//   kycStatus: "pending" | "approved" | "rejected" | null;
// }


// type SettingCardItem = {
//   id: number;
//   title: string;
//   time: string;
//   icon: any; 
//   trigger: ModalType | null;
//   route: string;
//   colors: [string, string, ...string[]]; // TypeScript fix for LinearGradient
// };

// export const NomineeSection: React.FC<Props> = ({ kycStatus }) => {

//   const { setSetting } = PromoModel();
//   const { setOpen } = Navigation();
//   const router = useRouter();






//   const cards: SettingCardItem[] = [
//   {
//     id: 1,
//     title: "Add a nominee to your account",
//     time: "SAFEGUARD YOUR SAVING FOR THE FUTURE",
//     icon: "user",
//     trigger: "Add a Nominee",
//     route: "/profile/nominee",
//     colors: ["#104e64", "#062530"], // ✅ THEME GRADIENT
//   },
//   {
//     id: 2,
//     title: "Get KYC verified",
//     time: "COMPLETE YOUR KYC TO UNLOCK MORE FEATURES",
//     icon: "shield",
//     trigger: null,
//     route: "/spin-and-win/KYC",
//     colors: ["#0b3442", "#062530"], // ✅ THEME GRADIENT
//   },
// ];

//   // const cards: SettingCardItem[] = [


//   //   {
//   //     id: 1,
//   //     title: "Add a nominee to your account",
//   //     time: "SAFEGUARD YOUR SAVING FOR THE FUTURE",
//   //     icon: "user",
//   //     trigger: "Add a Nominee",
//   //     route: "/profile/nominee",
//   //     colors: ["#2563eb", "#4338ca"], // Blue Gradient
//   //   },
//   //   {
//   //     id: 2,
//   //     title: "Get verified",
//   //     time: "COMPLETE YOUR KYC TO UNLOCK MORE FEATURES",
//   //     icon: "shield",
//   //     trigger: null,
//   //     route: "/spin-and-win/KYC",
//   //     colors: ["#9333ea", "#a21caf"], // Purple Gradient
//   //   },
//   // ];

//   return (
//     <View style={styles.wrapper}>
//       {cards.map((item) => (
//         <Pressable
//           key={item.id}
//           onPress={() => router.push(item.route as any)}
//           // TypeScript Fix for Pressable Style
//           style={({ pressed }) => [
//             styles.pressable,
//             pressed ? { transform: [{ scale: 0.98 }] } : {}
//           ]}
//         >
//           <LinearGradient
//             // TypeScript Fix for Colors
//             colors={item.colors}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.card}
//           >
//             {/* Background Decorative Glow */}
//             <View style={styles.glowCircle} />

//             <View style={styles.contentRow}>
//               {/* Glassmorphism Icon Wrap */}
//               <View style={styles.iconWrap}>
//                 <Feather name={item.icon} size={22} color="white" />
//               </View>

//               <View style={styles.textWrap}>
//                 <Text style={styles.title} numberOfLines={2}>
//                   {item.title}
//                 </Text>
//                 <Text style={styles.time} numberOfLines={2}>
//                   {item.time}
//                 </Text>
//               </View>

//               <Feather name="chevron-right" size={20} color="rgba(255,255,255,0.5)" />
//             </View>
//           </LinearGradient>
//         </Pressable>
//       ))}
//     </View>
//   );
// };

import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import { Navigation, PromoModel } from "@/store/store";
import type { ModalType } from "@/store/store";

interface Props {
  kycStatus: "pending" | "approved" | "rejected" | null;
  nomineeStatus: number; // 👈 0 or 1
}


type SettingCardItem = {
  id: number;
  title: string;
  time: string;
  icon: any;
  trigger: ModalType | null;
  route: string;
  colors: [string, string, ...string[]];
};

export const NomineeSection: React.FC<Props> = ({ kycStatus,nomineeStatus }) => {
  const { setSetting } = PromoModel();
  const { setOpen } = Navigation();
  const router = useRouter();

  // 🔥 base cards
  const hasNominee = nomineeStatus === 1;
  let cards: SettingCardItem[] = [
    {
      id: 1,
       title: hasNominee 
      ? "Show nominee details"
      : "Add a nominee to your account",

    time: hasNominee
      ? "VIEW OR EDIT YOUR NOMINEE"
      : "SAFEGUARD YOUR SAVING FOR THE FUTURE",
      icon: "user",
      trigger: "Add a Nominee",
      route: "/profile/nominee",
      colors: ["#104e64", "#062530"],
    },
  ];

  // 🔥 show KYC card only if NOT approved
  if (kycStatus !== "approved") {
    cards.push({
      id: 2,
      title: "Get KYC verified",
      time: "COMPLETE YOUR KYC TO UNLOCK MORE FEATURES",
      icon: "shield",
      trigger: null,
      route: "/spin-and-win/KYC",
      colors: ["#0b3442", "#062530"],
    });
  }

  return (
    <View style={styles.wrapper}>
      {cards.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => router.push(item.route as any)}
          style={({ pressed }) => [
            styles.pressable,
            pressed ? { transform: [{ scale: 0.98 }] } : {},
          ]}
        >
          <LinearGradient
            colors={item.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.glowCircle} />

            <View style={styles.contentRow}>
              <View style={styles.iconWrap}>
                <Feather name={item.icon} size={22} color="white" />
              </View>

              <View style={styles.textWrap}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.time} numberOfLines={2}>
                  {item.time}
                </Text>
              </View>

              <Feather
                name="chevron-right"
                size={20}
                color="rgba(255,255,255,0.5)"
              />
            </View>
          </LinearGradient>
        </Pressable>
      ))}
    </View>
  );
};




const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 4,
    gap: 16, // Cards ke beech ka gap
    marginTop: 12,
  },
  pressable: {
    borderRadius: 24,
    overflow: "hidden",
  },
  card: {
    padding: 20,
    borderRadius: 24,
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    minHeight: 100,
    justifyContent: 'center'
  },
  glowCircle: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    marginRight: 15,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: -0.2,
    lineHeight: 18,
    marginBottom: 4,
  },
  time: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
});

export default NomineeSection;