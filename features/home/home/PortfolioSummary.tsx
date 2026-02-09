


// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Pressable,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Feather } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// /* ================= TYPES ================= */
// interface PortfolioItem {
//   id: string;
//   metal: string;
//   purity?: string;
//   totalSavings: number;
//   quantity: string;
//   route: string; // Separate route for each metal
//   colors: readonly [string, string, ...string[]];
// }

// /* ================= DATA WITH SEPARATE ROUTES ================= */
// const PORTFOLIO_DATA: PortfolioItem[] = [
//   {
//     id: "gold",
//     metal: "GOLD",
//     purity: "24K",
//     totalSavings: 160708,
//     quantity: "24.64 g",
//     route: "/portfolio/GoldPort", // Gold Path
//     colors: ["#734B00", "#FFD700", "#996515"], 
//   },
//   {
//     id: "silver",
//     metal: "SILVER",
//     totalSavings: 3008,
//     quantity: "204.46 g",
//     route: "/portfolio/SilverPort", // Silver Path
//     colors: ["#434343", "#E0E0E0", "#606060"], 
//   },
//   {
//     id: "platinum",
//     metal: "PLATINUM",
//     totalSavings: 77088,
//     quantity: "204.94 g",
//     route: "/portfolio/PlatiniumPort", // Platinum Path
//     colors: ["#16161D", "#4B4B4B", "#0F0F0F"], 
//   },
// ];

// /* ================= CARD ================= */
// const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => {
//   const router = useRouter();

//   const handlePress = () => {
//     // Navigates to the unique route defined in PORTFOLIO_DATA
//     router.push(item.route as any); 
//   };

//   return (
//     <Pressable onPress={handlePress}>
//       <LinearGradient 
//         colors={item.colors} 
//         start={{ x: 0, y: 0 }} 
//         end={{ x: 1, y: 1 }} 
//         style={styles.card}
//       >
//         <View style={styles.glossyEffect}>
//           <View style={styles.header}>
//             <Text style={styles.totalLabel}>TOTAL SAVINGS</Text>
//             {item.purity && (
//               <View style={styles.purityBadge}>
//                  <Text style={styles.purityText}>{item.purity}</Text>
//               </View>
//             )}
//           </View>

//           <Text style={styles.amount}>
//             ₹{item.totalSavings.toLocaleString("en-IN")}
//           </Text>

//           <View style={styles.footer}>
//             <View>
//               <Text style={styles.metalLabel}>{item.metal}</Text>
//               <Text style={styles.quantity}>{item.quantity}</Text>
//             </View>

//             <View style={styles.viewBtn}>
//               <Text style={styles.viewText}>VIEW</Text>
//               <Feather name="chevron-right" size={12} color="#fff" />
//             </View>
//           </View>
//         </View>
//       </LinearGradient>
//     </Pressable>
//   );
// };

// /* ================= SCREEN ================= */
// const PortfolioSummary: React.FC = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Portfolio Summary</Text>

//       <FlatList
//         data={PORTFOLIO_DATA}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <PortfolioCard item={item} />}
//         ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
//         showsVerticalScrollIndicator={false}
//         scrollEnabled={false}
//       />
//     </View>
//   );
// };

// /* ================= STYLES (MATCHED TO YOUR UI) ================= */
// const styles = StyleSheet.create({
//   container: {
//     padding: 12, 
//     backgroundColor: '#062530', 
//   },
//   heading: {
//     color: "#fff",
//     fontSize: 16, 
//     fontWeight: "700",
//     marginBottom: 12,
//     letterSpacing: 0.5,
//   },
//   card: {
//     borderRadius: 14, 
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.15)', 
//   },
//   glossyEffect: {
//     padding: 12, 
//     backgroundColor: 'rgba(0,0,0,0.12)', 
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     height: 18, 
//   },
//   totalLabel: {
//     color: "rgba(255,255,255,0.6)",
//     fontSize: 10, 
//     fontWeight: '700',
//     letterSpacing: 0.8,
//     textTransform: 'uppercase',
//   },
//   purityBadge: {
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     paddingHorizontal: 6,
//     paddingVertical: 1,
//     borderRadius: 5,
//   },
//   purityText: {
//     color: "#fff",
//     fontSize: 9,
//     fontWeight: '700',
//   },
//   amount: {
//     color: "#fff",
//     fontSize: 22, 
//     fontWeight: "800",
//     marginVertical: 6, 
//     textShadowColor: 'rgba(0, 0, 0, 0.4)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 3,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center", 
//     marginTop: 2, 
//   },
//   metalLabel: {
//     color: "rgba(255,255,255,0.5)",
//     fontSize: 9,
//     fontWeight: '700',
//     textTransform: 'uppercase',
//   },
//   quantity: {
//     color: "#fff",
//     fontSize: 12, 
//     fontWeight: "600",
//   },
//   viewBtn: {
//     backgroundColor: "rgba(255,255,255,0.2)", 
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 5,    
//     borderRadius: 10,
//     gap: 3,
//   },
//   viewText: {
//     color: "#fff",
//     fontSize: 10, 
//     fontWeight: "800",
//   },
// });

// export default PortfolioSummary;


// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Pressable,
//   SafeAreaView,
//   StatusBar,
//   ScrollView,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// /* ================= TYPES ================= */
// interface PortfolioItem {
//   id: string;
//   metal: string;
//   purity?: string;
//   totalSavings: number;
//   quantity: string;
//   route: string;
//   colors: readonly [string, string, ...string[]];
// }

// /* ================= STATIC DATA ================= */
// const PORTFOLIO_DATA: PortfolioItem[] = [
//   {
//     id: "gold",
//     metal: "GOLD",
//     purity: "24K",
//     totalSavings: 160708,
//     quantity: "24.64/g",
//     route: "/portfolio/GoldPort",
//     colors: ["#734B00", "#FFD700", "#996515"],
//   },
//   {
//     id: "silver",
//     metal: "SILVER",
//     totalSavings: 3008,
//     quantity: "204.46/g",
//     route: "/portfolio/SilverPort",
//     colors: ["#434343", "#E0E0E0", "#606060"],
//   },
//   {
//     id: "platinum",
//     metal: "PLATINUM",
//     totalSavings: 77088,
//     quantity: "204.94/g",
//     route: "/portfolio/PlatiniumPort",
//     colors: ["#16161D", "#4B4B4B", "#0F0F0F"],
//   },
// ];

// /* ================= CARD COMPONENT ================= */
// const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => {
//   const router = useRouter();

//   return (
//     <Pressable onPress={() => router.push(item.route as any)}>
//       <LinearGradient
//         colors={item.colors}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.card}
//       >
//         <View style={styles.glossyEffect}>
//           <View style={styles.headerRow}>
//             <Text style={styles.totalLabel}>TOTAL SAVINGS</Text>
//             {item.purity && (
//               <View style={styles.purityBadge}>
//                 <Text style={styles.purityText}>{item.purity}</Text>
//               </View>
//             )}
//           </View>

//           <Text style={styles.amount}>
//             ₹{item.totalSavings.toLocaleString("en-IN")}
//           </Text>

//           <View style={styles.footerRow}>
//             <View>
//               <Text style={styles.metalLabel}>{item.metal}</Text>
//               <Text style={styles.quantity}>{item.quantity}</Text>
//             </View>

//             <View style={styles.viewBtn}>
//               <Text style={styles.viewText}>VIEW DETAILS</Text>
//               <Feather name="arrow-right" size={12} color="#fff" />
//             </View>
//           </View>
//         </View>
//       </LinearGradient>
//     </Pressable>
//   );
// };

// /* ================= MAIN SCREEN ================= */
// const PortfolioSummary: React.FC = () => {
//   const router = useRouter();

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" />

//       {/* --- CUSTOM HEADER --- */}
//       <View style={styles.mainHeader}>
//         <Pressable onPress={() => router.back()} style={styles.backBtn}>
//           <Ionicons name="chevron-back" size={24} color="#fff" />
//         </Pressable>
//         <Text style={styles.headerTitle}>My Portfolio</Text>
//         <Pressable style={styles.backBtn}>
//           {/* <Feather name="pie-chart" size={20} color="#fff" /> */}
//         </Pressable>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        
//         {/* --- TOTAL ASSETS OVERVIEW --- */}
//         {/* <View style={styles.overviewContainer}>
//           <Text style={styles.overviewLabel}>Net Portfolio Value</Text>
//           <Text style={styles.overviewAmount}>₹2,40,804.00</Text>
//           <View style={styles.profitBadge}>
//             <Feather name="trending-up" size={12} color="#2ecc71" />
//             <Text style={styles.profitText}>+12.4% Overall Returns</Text>
//           </View>
//         </View> */}

//         {/* --- QUICK STATS --- */}
 
// <View style={styles.statsGrid}>
//     <View style={styles.statBox}>
//         {/* 'shield-check' sahi hai */}
//         <MaterialCommunityIcons name="shield-check" size={20} color="#facc15" />
//         <Text style={styles.statSub}>Secure</Text>
//         <Text style={styles.statMain}>100%</Text>
//     </View>
//     <View style={styles.statBox}>
//         {/* 'Gold' ko 'gold' kar diya aur fallback ke liye 'medal' ya 'trophy' bhi use kar sakte hain */}
//         <MaterialCommunityIcons name="gold" size={20} color="#facc15" />
//         <Text style={styles.statSub}>Assets</Text>
//         <Text style={styles.statMain}>03</Text>
//     </View>
//     <View style={styles.statBox}>
//         {/* 'clock-outline' sahi hai */}
//         <MaterialCommunityIcons name="clock-outline" size={20} color="#facc15" />
//         <Text style={styles.statSub}>Updated</Text>
//         <Text style={styles.statMain}>Live</Text>
//     </View>
// </View>








//         {/* --- METAL WISE CARDS --- */}
//         <Text style={styles.sectionHeading}> Your Portfolio Summery</Text>
//         {PORTFOLIO_DATA.map((item) => (
//           <View key={item.id} style={{ marginBottom: 12 }}>
//             <PortfolioCard item={item} />
//           </View>
//         ))}

//         {/* --- INFO CARD --- */}
//         <View style={styles.infoCard}>
//            <Feather name="info" size={16} color="rgba(255,255,255,0.6)" />
//            <Text style={styles.infoText}>
//              Your portfolio is updated every 60 seconds based on international market rates.
//            </Text>
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };


// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   SafeAreaView,
//   StatusBar,
//   ScrollView,
//   Modal,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { getPortfolioApi } from "@/services/portfolio";

// /* ================= CARD ================= */
// const PortfolioCard = ({ item, onPurityPress }: any) => {
//   const router = useRouter();

//   return (
//     <Pressable onPress={() => router.push(item.route as any)}>
//       <LinearGradient
//         colors={item.colors}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.card}
//       >
//         <View>
//           <View style={styles.headerRow}>
//             <Text style={styles.totalLabel}>TOTAL SAVINGS</Text>

//             {/* PURITY BUTTON */}
//             {item.metal === "GOLD" && (
//               <Pressable style={styles.purityBadge} onPress={onPurityPress}>
//                 <Text style={styles.purityText}>{item.purity}</Text>
//               </Pressable>
//             )}
//           </View>

//           <Text style={styles.amount}>
//             ₹{item.totalSavings.toLocaleString("en-IN")}
//           </Text>

//           <View style={styles.footerRow}>
//             <View>
//               <Text style={styles.metalLabel}>{item.metal}</Text>
//               <Text style={styles.quantity}>{item.quantity}</Text>
//             </View>

//             <View style={styles.viewBtn}>
//               <Text style={styles.viewText}>VIEW DETAILS</Text>
//               <Feather name="arrow-right" size={12} color="#fff" />
//             </View>
//           </View>
//         </View>
//       </LinearGradient>
//     </Pressable>
//   );
// };

// /* ================= MAIN ================= */
// const PortfolioSummary: React.FC = () => {
//   const router = useRouter();

//   const [portfolio, setPortfolio] = useState<any>(null);
//   const [goldPurity, setGoldPurity] = useState<"24K" | "22K" | "18K">("24K");
//   const [showPurity, setShowPurity] = useState(false);

//   /* 🔥 API LOAD */
//   const loadPortfolio = async () => {
//     try {
//       const res = await getPortfolioApi();
//       if (res?.success) setPortfolio(res);
//     } catch (e) {
//       console.log("portfolio error", e);
//     }
//   };

//   useEffect(() => {
//     loadPortfolio();
//   }, []);

//   /* 🔥 GOLD DATA SELECT */
//   const getGoldData = () => {
//     if (!portfolio) return { grams: 0, value: 0 };

//     if (goldPurity === "24K") return portfolio.gold_24K;
//     if (goldPurity === "22K") return portfolio.gold_22K;
//     if (goldPurity === "18K") return portfolio.gold_18K;

//     return { grams: 0, value: 0 };
//   };

//   const gold = getGoldData();

//   /* ================= DATA ================= */
//   const DATA = [
//     {
//       id: "gold",
//       metal: "GOLD",
//       purity: goldPurity,
//       totalSavings: Number(gold?.current_value || 0),
//       quantity: `${Number(gold?.grams || 0).toFixed(4)} g`,
//       route: "/portfolio/GoldPort",
//       colors: ["#734B00", "#FFD700", "#996515"],
//     },
//     {
//       id: "silver",
//       metal: "SILVER",
//       totalSavings: Number(portfolio?.silver?.current_value || 0),
//       quantity: `${Number(portfolio?.silver?.grams || 0).toFixed(4)} g`,
//       route: "/portfolio/SilverPort",
//       colors: ["#434343", "#E0E0E0", "#606060"],
//     },
//     {
//       id: "platinum",
//       metal: "PLATINUM",
//       totalSavings: Number(portfolio?.platinum?.current_value || 0),
//       quantity: `${Number(portfolio?.platinum?.grams || 0).toFixed(4)} g`,
//       route: "/portfolio/PlatiniumPort",
//       colors: ["#16161D", "#4B4B4B", "#0F0F0F"],
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" />

//       {/* HEADER */}
//       <View style={styles.mainHeader}>
//         <Pressable onPress={() => router.back()}>
//           <Ionicons name="chevron-back" size={24} color="#fff" />
//         </Pressable>
//         <Text style={styles.headerTitle}>My Portfolio</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       <ScrollView>
//         {DATA.map((item) => (
//           <PortfolioCard
//             key={item.id}
//             item={item}
//             onPurityPress={() => setShowPurity(true)}
//           />
//         ))}
//       </ScrollView>

//       {/* 🔥 PURITY POPUP */}
//       <Modal visible={showPurity} transparent animationType="fade">
//         <View style={styles.modalWrap}>
//           <View style={styles.modalCard}>
//             {["24K", "22K", "18K"].map((p) => (
//               <Pressable
//                 key={p}
//                 style={styles.purityOption}
//                 onPress={() => {
//                   setGoldPurity(p as any);
//                   setShowPurity(false);
//                 }}
//               >
//                 <Text style={styles.purityOptionText}>{p} Gold</Text>
//               </Pressable>
//             ))}
//             <Pressable onPress={() => setShowPurity(false)}>
//               <Text style={{ color: "red", marginTop: 10 }}>Cancel</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// // export default PortfolioSummary;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#062530",
//   },
//   modalWrap: {
//     flex: 1,
//     backgroundColor: "#00000088",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalCard: {
//     backgroundColor: "#020617",
//     padding: 20,
//     borderRadius: 14,
//     width: 200,
//   },
//   purityOption: { padding: 12 },
//   purityOptionText: { color: "#fff", fontSize: 16 },
//   mainHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     // paddingVertical: 25,
//     paddingTop:25,
//     marginTop:20,
    
//   },
//   backBtn: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     // backgroundColor: "rgba(255,255,255,0.05)",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   headerTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "800",
//   },
//   scrollPadding: {
//     padding: 16,
//   },
//   /* Overview Styles */
//   overviewContainer: {
//     alignItems: "center",
//     marginVertical: 20,
//     backgroundColor: "rgba(255,255,255,0.03)",
//     padding: 20,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.05)",
//   },
//   overviewLabel: {
//     color: "rgba(255,255,255,0.5)",
//     fontSize: 12,
//     fontWeight: "600",
//     letterSpacing: 1,
//   },
//   overviewAmount: {
//     color: "#fff",
//     fontSize: 32,
//     fontWeight: "900",
//     marginVertical: 8,
//   },
//   profitBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(46, 204, 113, 0.15)",
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 20,
//     gap: 5,
//   },
//   profitText: {
//     color: "#2ecc71",
//     fontSize: 12,
//     fontWeight: "700",
//   },
//   /* Stats Grid */
//   statsGrid: {
//      marginTop:20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 24,
//     gap: 10,
//   },
//   statBox: {
//     flex: 1,
//     backgroundColor: "rgba(255,255,255,0.05)",
//     padding: 12,
//     borderRadius: 15,
//     alignItems: "center",
//   },
//   statSub: {
//     color: "rgba(255,255,255,0.4)",
//     fontSize: 10,
//     marginTop: 4,
//   },
//   statMain: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "700",
//   },
//   sectionHeading: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "800",
//     marginBottom: 16,
//     marginLeft:5,
//   },
//   /* Card Styles */
//   card: {
//     borderRadius: 18,
//     overflow: "hidden",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.15)",
//   },
//   glossyEffect: {
//     padding: 16,
//     backgroundColor: "rgba(0,0,0,0.15)",
//   },
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   totalLabel: {
//     color: "rgba(255,255,255,0.6)",
//     fontSize: 10,
//     fontWeight: "700",
//     letterSpacing: 0.8,
//   },
//   purityBadge: {
//     backgroundColor: "rgba(255,255,255,0.2)",
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 6,
//   },
//   purityText: {
//     color: "#fff",
//     fontSize: 10,
//     fontWeight: "800",
//   },
//   amount: {
//     color: "#fff",
//     fontSize: 26,
//     fontWeight: "900",
//     marginVertical: 10,
//   },
//   footerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//   },
//   metalLabel: {
//     color: "rgba(255,255,255,0.5)",
//     fontSize: 9,
//     fontWeight: "800",
//   },
//   quantity: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "700",
//   },
//   viewBtn: {
//     backgroundColor: "rgba(255,255,255,0.15)",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 12,
//     gap: 5,
//   },
//   viewText: {
//     color: "#fff",
//     fontSize: 10,
//     fontWeight: "800",
//   },
//   infoCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255,255,255,0.02)",
//     padding: 15,
//     borderRadius: 12,
//     marginTop: 10,
//     gap: 10,
//   },
//   infoText: {
//     color: "rgba(255,255,255,0.4)",
//     fontSize: 11,
//     flex: 1,
//     lineHeight: 16,
//      marginTop:30,
//   },
// });

// export default PortfolioSummary;





// SAME IMPORTS (unchanged)
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getPortfolioApi } from "@/services/portfolio";

/* ================= CARD ================= */
const PortfolioCard = ({ item, onPurityPress }: any) => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(item.route as any)}>
      <LinearGradient
        colors={item.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.glossyEffect}>
          <View style={styles.headerRow}>
            <Text style={styles.totalLabel}>TOTAL SAVINGS</Text>

            {item.metal === "GOLD" && (
              <Pressable style={styles.purityBadge} onPress={onPurityPress}>
                <Text style={styles.purityText}>{item.purity}</Text>
              </Pressable>
            )}
          </View>

          <Text style={styles.amount}>
            ₹{item.totalSavings.toLocaleString("en-IN")}
          </Text>

          <View style={styles.footerRow}>
            <View>
              <Text style={styles.metalLabel}>{item.metal}</Text>
              <Text style={styles.quantity}>{item.quantity}</Text>
            </View>

            <View style={styles.viewBtn}>
              <Text style={styles.viewText}>VIEW DETAILS</Text>
              <Feather name="arrow-right" size={12} color="#fff" />
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

/* ================= MAIN ================= */
const PortfolioSummary: React.FC = () => {
  const router = useRouter();

  const [portfolio, setPortfolio] = useState<any>(null);
  const [goldPurity, setGoldPurity] = useState<"24K" | "22K" | "18K">("24K");
  const [showPurity, setShowPurity] = useState(false);

  const loadPortfolio = async () => {
    try {
      const res = await getPortfolioApi();
      if (res?.success) setPortfolio(res);
    } catch (e) {
      console.log("portfolio error", e);
    }
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  const getGoldData = () => {
    if (!portfolio) return { grams: 0, current_value: 0 };

    if (goldPurity === "24K") return portfolio.gold_24K;
    if (goldPurity === "22K") return portfolio.gold_22K;
    if (goldPurity === "18K") return portfolio.gold_18K;
  };

  const gold = getGoldData();

  const DATA = [
    {
      id: "gold",
      metal: "GOLD",
      purity: goldPurity,
      totalSavings: Number(gold?.current_value || 0),
      quantity: `${Number(gold?.grams || 0).toFixed(4)} g`,
      route: "/portfolio/GoldPort",
      colors: ["#734B00", "#FFD700", "#996515"],
    },
    {
      id: "silver",
      metal: "SILVER",
      totalSavings: Number(portfolio?.silver?.current_value || 0),
      quantity: `${Number(portfolio?.silver?.grams || 0).toFixed(4)} g`,
      route: "/portfolio/SilverPort",
      colors: ["#434343", "#E0E0E0", "#606060"],
    },
    {
      id: "platinum",
      metal: "PLATINUM",
      totalSavings: Number(portfolio?.platinum?.current_value || 0),
      quantity: `${Number(portfolio?.platinum?.grams || 0).toFixed(4)} g`,
      route: "/portfolio/PlatiniumPort",
      colors: ["#16161D", "#4B4B4B", "#0F0F0F"],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER (same as before) */}
      <View style={styles.mainHeader}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>My Portfolio</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* STATS */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="shield-check" size={20} color="#facc15" />
            <Text style={styles.statSub}>Secure</Text>
            <Text style={styles.statMain}>100%</Text>
          </View>

          <View style={styles.statBox}>
            <MaterialCommunityIcons name="gold" size={20} color="#facc15" />
            <Text style={styles.statSub}>Assets</Text>
            <Text style={styles.statMain}>03</Text>
          </View>

          <View style={styles.statBox}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#facc15" />
            <Text style={styles.statSub}>Updated</Text>
            <Text style={styles.statMain}>Live</Text>
          </View>
        </View>

        {/* CARDS */}
        {DATA.map((item) => (
          <PortfolioCard
            key={item.id}
            item={item}
            onPurityPress={() => setShowPurity(true)}
          />
        ))}
      </ScrollView>

      {/* PURITY POPUP */}
      <Modal visible={showPurity} transparent animationType="fade">
        <View style={styles.modalWrap}>
          <View style={styles.modalCard}>
            {["24K", "22K", "18K"].map((p) => (
              <Pressable
                key={p}
                style={styles.purityOption}
                onPress={() => {
                  setGoldPurity(p as any);
                  setShowPurity(false);
                }}
              >
                <Text style={styles.purityOptionText}>{p} Gold</Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setShowPurity(false)}>
              <Text style={{ color: "red", marginTop: 10 }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PortfolioSummary;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#062530" },

  mainHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 25,
    marginTop: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "800" },

  statsGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  statSub: { color: "rgba(255,255,255,0.4)", fontSize: 10 },
  statMain: { color: "#fff", fontSize: 14, fontWeight: "700" },

  card: {
    borderRadius: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  glossyEffect: { padding: 16, backgroundColor: "rgba(0,0,0,0.15)" },
  headerRow: { flexDirection: "row", justifyContent: "space-between" },
  totalLabel: { color: "rgba(255,255,255,0.6)", fontSize: 10, fontWeight: "700" },
  purityBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  purityText: { color: "#fff", fontSize: 10, fontWeight: "800" },
  amount: { color: "#fff", fontSize: 26, fontWeight: "900", marginVertical: 10 },
  footerRow: { flexDirection: "row", justifyContent: "space-between" },
  metalLabel: { color: "rgba(255,255,255,0.5)", fontSize: 9, fontWeight: "800" },
  quantity: { color: "#fff", fontSize: 14, fontWeight: "700" },
  viewBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 5,
  },
  viewText: { color: "#fff", fontSize: 10, fontWeight: "800" },

  modalWrap: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "#020617",
    padding: 20,
    borderRadius: 14,
    width: 200,
  },
  purityOption: { padding: 12 },
  purityOptionText: { color: "#fff", fontSize: 16 },
});
