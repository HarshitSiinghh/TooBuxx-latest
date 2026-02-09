
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import {
//   Coins,
//   Zap,
//   ChevronRight,
//   MoveLeft,
//   Gift,
// } from "lucide-react-native";
// import { useRouter } from "expo-router";

// import { getMyPointsApi, RewardNotification } from "@/services/rewards";
// import { BASE_URL } from "@/constants/api";

// export default function RewardsHub() {
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);
//   const [points, setPoints] = useState(0);
//   const [percentage, setPercentage] = useState(0);
//   const [notifications, setNotifications] = useState<RewardNotification[]>([]);

//   useEffect(() => {
//     loadMyPoints();
//   }, []);

//   const loadMyPoints = async () => {
//     try {
//       const res = await getMyPointsApi();

//       if (res.success) {
//         setPoints(res.data.total_points);
//         setPercentage(res.data.percentage_increase);
//         setNotifications(res.data.latest_notifications || []);
//       }
//     } catch (e) {
//       console.log("❌ REWARDS HUB ERROR:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#fbbf24" />
//         <Text style={{ color: "#fbbf24", marginTop: 10 }}>
//           Loading rewards...
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" />

//       {/* ===== HEADER ===== */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
//           <MoveLeft color="#d1d5db" size={20} />
//         </TouchableOpacity>

//         <View style={{ marginLeft: 14 }}>
//           <Text style={styles.headerTitle}>Rewards Hub</Text>
//           <Text style={styles.headerSub}>EARN POINTS FOR 24K GOLD</Text>
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContent}>

//         {/* ===== BALANCE CARD ===== */}
//         <View style={styles.balanceCard}>
//           <View style={styles.balanceRow}>
//             <View style={styles.coinIconContainer}>
//               <Coins color="#eab308" size={32} />
//             </View>
//             <View>
//               <Text style={styles.pointsText}>{points.toLocaleString()}</Text>
//               <Text style={styles.pointsSub}>AVAILABLE POINTS</Text>
//             </View>
//           </View>

//           <View style={styles.progressSection}>
//             <View style={styles.progressInfo}>
//               <Text style={styles.tierText}>LOYALTY PROGRESS</Text>
//               <Text style={styles.tierText}>{percentage}%</Text>
//             </View>

//             <View style={styles.progressBarBg}>
//               <View
//                 style={[
//                   styles.progressBarFill,
//                   { width: `${Math.min(percentage, 100)}%` },
//                 ]}
//               />
//             </View>
//           </View>
//         </View>

//         {/* ===== BACKEND REWARD NOTIFICATIONS ===== */}
//         <View style={styles.rewardsSection}>
//           <Text style={styles.sectionTitle}>LATEST REWARDS</Text>

//           {notifications.map((item) => (
//             <TouchableOpacity
//               key={item.id}
//               activeOpacity={0.7}
//               style={styles.rewardItem}
//             >
//               <View style={styles.rewardIconBox}>
//                 <Gift color="#a855f7" size={22} />
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={styles.rewardTitle}>{item.title}</Text>
//                 <Text style={styles.rewardDesc}>{item.message}</Text>
//               </View>

//               <View style={{ alignItems: "flex-end" }}>
//                 <Text style={styles.rewardPoints}>+{item.points}</Text>
//                 <ChevronRight color="#374151" size={16} />
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* ===== CTA ===== */}
//         <TouchableOpacity style={styles.convertButton}   onPressOut={()=> router.push("/profile/my-point")} activeOpacity={0.85}>
//           <Text style={styles.convertButtonText}>CONVERT POINTS TO GOLD</Text>
//           <Zap color="#fff" size={18} />
//         </TouchableOpacity>

//         <Text style={styles.poweredBy}>POWERED BY TOOBUX</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// /* ===================== STYLES ===================== */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1a003d",
//   },

//   loader: {
//     flex: 1,
//     backgroundColor: "#1a003d",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 14,
//     backgroundColor: "rgba(26,0,61,0.9)",
//     borderBottomWidth: 1,
//     borderBottomColor: "rgba(255,255,255,0.06)",
//   },
//   backButton: {
//     padding: 10,
//     backgroundColor: "rgba(255,255,255,0.05)",
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.12)",
//   },
//   headerTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "900",
//   },
//   headerSub: {
//     color: "#a855f7",
//     fontSize: 10,
//     fontWeight: "bold",
//     letterSpacing: 1,
//     marginTop: 2,
//   },

//   scrollContent: {
//     padding: 20,
//     paddingBottom: 50,
//   },

//   balanceCard: {
//     backgroundColor: "rgba(255,255,255,0.03)",
//     borderRadius: 28,
//     padding: 22,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.1)",
//     marginBottom: 28,
//   },
//   balanceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//   },
//   coinIconContainer: {
//     width: 58,
//     height: 58,
//     backgroundColor: "rgba(234,179,8,0.1)",
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: "rgba(234,179,8,0.2)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   pointsText: {
//     color: "#fff",
//     fontSize: 30,
//     fontWeight: "900",
//   },
//   pointsSub: {
//     color: "#a855f7",
//     fontSize: 10,
//     fontWeight: "bold",
//     letterSpacing: 1,
//   },

//   progressSection: {
//     marginTop: 22,
//   },
//   progressInfo: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   tierText: {
//     color: "#6b7280",
//     fontSize: 10,
//     fontWeight: "900",
//     textTransform: "uppercase",
//   },
//   progressBarBg: {
//     height: 8,
//     backgroundColor: "rgba(255,255,255,0.06)",
//     borderRadius: 4,
//     overflow: "hidden",
//   },
//   progressBarFill: {
//     height: "100%",
//     backgroundColor: "#9333ea",
//   },

//   rewardsSection: {
//     gap: 12,
//   },
//   sectionTitle: {
//     color: "#4b5563",
//     fontSize: 10,
//     fontWeight: "900",
//     letterSpacing: 2,
//     marginBottom: 6,
//     marginLeft: 4,
//   },
//   rewardItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255,255,255,0.02)",
//     borderRadius: 22,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.06)",
//     gap: 14,
//   },
//   rewardIconBox: {
//     width: 46,
//     height: 46,
//     borderRadius: 14,
//     backgroundColor: "rgba(168,85,247,0.12)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   rewardTitle: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "900",
//   },
//   rewardDesc: {
//     color: "#6b7280",
//     fontSize: 11,
//     fontWeight: "bold",
//     marginTop: 2,
//   },
//   rewardPoints: {
//     color: "#facc15",
//     fontSize: 12,
//     fontWeight: "900",
//     marginBottom: 2,
//   },

//   convertButton: {
//     marginTop: 28,
//     backgroundColor: "#7c3aed",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 18,
//     borderRadius: 22,
//     gap: 10,
//   },
//   convertButtonText: {
//     color: "#fff",
//     fontSize: 13,
//     fontWeight: "900",
//     letterSpacing: 1,
//   },
//   poweredBy: {
//     textAlign: "center",
//     color: "#374151",
//     fontSize: 10,
//     fontWeight: "900",
//     letterSpacing: 3,
//     marginTop: 36,
//   },
// });





import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Coins,
  Zap,
  ChevronRight,
  MoveLeft,
  Gift,
} from "lucide-react-native";
import { useRouter ,Href} from "expo-router";

import { getMyPointsApi, RewardNotification } from "@/services/rewards";

type BonusItem = {
  id: number;
  title: string;
  description: string;
  points: number;
  icon: string;
  color: string;
  route: Href;   // 👈 important
};

const bonusData: BonusItem[] = [
  {
    id: 1,
    title: "Welcome Bonus",
    description: "Get a 10 Points Welcome Bonus",
    points: 10,
    icon: "medal",
    color: "#00E676",
    route: "/spin-and-win/referral",
  },
  {
    id: 2,
    title: "First Sip Bonus",
    description: "On starting your first saving",
    points: 50,
    icon: "coin",
    color: "#FFA000",
    route: "/metals/gold/engine",
  },
  {
    id: 3,
    title: "Refer & Earn",
    description: "Invite friends & earn rewards",
    points: 30,
    icon: "gift",
    color: "#FF6D00",
    route: "/spin-and-win/referral",
  },
  {
    id: 4,
    title: "Spin & Win",
    description: "Get a free spin every week",
    points: 100,
    icon: "spin",
    color: "#C77DFF",
    route: "/spin-and-win/spin-wheel",
  },
];



export default function RewardsHub() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const [percentage, setPercentage] = useState(0);
  // const [notifications, setNotifications] = useState<RewardNotification[]>([]);

  useEffect(() => {
    loadMyPoints();
  }, []);

  const loadMyPoints = async () => {
    try {
      const res = await getMyPointsApi();

      if (res.success) {
        setPoints(res.data.total_points);
        // setPercentage(res.data.percentage_increase);
        // setNotifications(res.data.latest_notifications || []);
      }
    } catch (e) {
      console.log("❌ REWARDS HUB ERROR:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={{ color: "#10b981", marginTop: 10, fontWeight: '700' }}>
          Loading rewards...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MoveLeft color="#94a3b8" size={20} />
        </TouchableOpacity>

        <View style={{ marginLeft: 14 }}>
          <Text style={styles.headerTitle}>Rewards Hub</Text>
          <Text style={styles.headerSub}>EARN POINTS FOR 24K GOLD</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* ===== BALANCE CARD ===== */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceRow}>
            <View style={styles.coinIconContainer}>
              <Coins color="#10b981" size={32} />
            </View>
            <View>
              <Text style={styles.pointsText}>{points.toLocaleString()}</Text>
              <Text style={styles.pointsSub}>AVAILABLE POINTS</Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressInfo}>
              <Text style={styles.tierText}>LOYALTY PROGRESS</Text>
              <Text style={[styles.tierText, { color: '#10b981' }]}>{percentage}%</Text>
            </View>

            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${Math.min(percentage, 100)}%` },
                ]}
              />
            </View>
          </View>
        </View>

        {/* ===== LATEST REWARDS ===== */}
        <View style={styles.rewardsSection}>
          <Text style={styles.sectionTitle}>LATEST REWARDS</Text>

          {bonusData.map((item) => (
            <TouchableOpacity
             onPress={()=>router.push(item.route)}
              key={item.id}
              activeOpacity={0.7}
              style={styles.rewardItem}
            >
              <View style={styles.rewardIconBox}>
                <Gift color="#0ea5e9" size={22} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.rewardTitle}>{item.title}</Text>
                <Text style={styles.rewardDesc}>{item.description}</Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.rewardPoints}>+{item.points}</Text>
                <ChevronRight color="#475569" size={16} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ===== CTA ===== */}
        <TouchableOpacity 
          style={styles.convertButton}   
          onPressOut={()=> router.push("/profile/my-point")} 
          activeOpacity={0.85}
        >
          <Text style={styles.convertButtonText}>CONVERT POINTS TO GOLD</Text>
          <Zap color="#fff" size={18} />
        </TouchableOpacity>

        <Text style={styles.poweredBy}>POWERED BY TOOBUX</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#062530", // deep navy luxury bg
  },

  loader: {
    flex: 1,
    backgroundColor: "#062530",
    justifyContent: "center",
    alignItems: "center",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#062530",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  backButton: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
  },

  headerSub: {
    color: "#facc15", // gold accent
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 2,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },

  /* ===== BALANCE CARD ===== */
  balanceCard: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.25)", // gold border
    marginBottom: 28,
  },

  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  coinIconContainer: {
    width: 58,
    height: 58,
    backgroundColor: "rgba(250,204,21,0.12)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  pointsText: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "900",
  },

  pointsSub: {
    color: "#94a3b8",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  /* PROGRESS */
  progressSection: {
    marginTop: 22,
  },

  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  tierText: {
    color: "#94a3b8",
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase",
  },

  progressBarBg: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 4,
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: "#facc15", // gold progress bar
  },

  /* ===== REWARD LIST ===== */
  rewardsSection: {
    gap: 12,
  },

  sectionTitle: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 6,
    marginLeft: 4,
  },

  rewardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    gap: 14,
  },

  rewardIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "rgba(250,204,21,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  rewardTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },

  rewardDesc: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },

  rewardPoints: {
    color: "#22c55e",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 2,
  },

  /* ===== CTA BUTTON ===== */
  convertButton: {
    marginTop: 28,
    backgroundColor: "#facc15", // gold button
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    borderRadius: 22,
    gap: 10,
    shadowColor: "#facc15",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },

  convertButtonText: {
    color: "#070c1a",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
  },

  poweredBy: {
    textAlign: "center",
    color: "#475569",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 3,
    marginTop: 36,
  },
});
