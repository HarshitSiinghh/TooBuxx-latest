
// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   FlatList,
//   SafeAreaView,
//   StatusBar,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Feather, Ionicons } from "@expo/vector-icons";
// import { useRouter, Href } from "expo-router";

// import { useEffect, useState } from "react";
// import { getProfileApi } from "@/services/profile";
// import { getPortfolioApi } from "@/services/portfolio";

// /* ================= TYPES ================= */
// interface PriceItem {
//   id: string;
//   // name: string;
//   purity?: string;
//   price: string;
//   // change: number;
//   colors: readonly [string, string, ...string[]];
//   route: Href;
// }

// /* ================= DATA ================= */
// const PRICE_DATA: PriceItem[] = [
//   {
//     id: "gold",
//     // name: "Gold",
//     // purity: "24K",
//     price: "Digital Gold",
//     // change: 0.83,
//     route: { pathname: "/metals/gold/engine" } as any,
//     colors: ["#634702", "#FFD700", "#8C6A00"],
//   },
//   {
//     id: "silver",
//     // name: "Silver",
//     price: "Digital Silver",
//     // change: 1.54,
//     route: { pathname: "/metals/silver/engine" } as any,
//     colors: ["#2C2C2C", "#E8E8E8", "#4A4A4A"],
//   },
//   {
//     id: "platinum",
//     // name: "Platinum",
//     price: "DIgital Platinium",
//     // change: 3.34,
//     route: { pathname: "/metals/platinium/engine" } as any,
//     colors: ["#1A1A1A", "#7F8C8D", "#000000"],
//   },
// ];

// /* ================= COMPONENTS ================= */

// const PriceCard: React.FC<{ item: PriceItem }> = ({ item }) => {
//   const router = useRouter();
// const [totalDeposit, setTotalDeposit] = useState(0);
// const [investmentValue, setInvestmentValue] = useState(0);
// const [profit, setProfit] = useState(0);
// const loadWallet = async () => {
//   try {
//     const res = await getProfileApi();
//     const wallet = res?.data?.wallet;

//     if (wallet) {
//       const deposit = Number(wallet.total_money_balance || 0);
//       setTotalDeposit(deposit);
//     }
//   } catch (e) {
//     console.log("wallet error", e);
//   }
// };
// const loadPortfolio = async () => {
//   try {
//     const res = await getPortfolioApi();

//     if (res?.success) {
//       const total =
//         Number(res?.gold_24K?.current_value || 0) +
//         Number(res?.gold_22K?.current_value || 0) +
//         Number(res?.gold_18K?.current_value || 0) +
//         Number(res?.silver?.current_value || 0) +
//         Number(res?.platinum?.current_value || 0);

//       setInvestmentValue(total);
//     }
//   } catch (e) {
//     console.log("portfolio error", e);
//   }
// };
// useEffect(() => {
//   setProfit(investmentValue - totalDeposit);
// }, [investmentValue, totalDeposit]);

// useEffect(() => {
//   loadWallet();
//   loadPortfolio();
// }, []);


//   return (
//     <LinearGradient
//       colors={item.colors}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//       style={styles.card}
//     >
//       <Pressable onPress={() => router.push(item.route)}>
//       <View style={styles.cardInner}>
//         <View style={styles.changeWrap}>
//           {/* <Feather name="trending-up" size={12} color="#2ecc71" /> */}
//           <Text style={styles.change}></Text>
//         </View>

//         <View style={styles.topRow}>
//           <View style={styles.liveWrap}>
//             <View style={styles.dot} />
//             <Text style={styles.liveText}>LIVE PRICE</Text>
//           </View>
//           {item.purity && (
//             <View style={styles.purityBadge}>
//               <Text style={styles.purity}>{item.purity}</Text>
//             </View>
//           )}
//         </View>

//         <View style={styles.middleRow}>
//           <Text style={styles.metalName}></Text>
//           <Text style={styles.price}>
//             {item.price}
//           </Text>
//         </View>

//         <View style={styles.bottomRow}>
//           <View />
//           <Pressable style={styles.btn}  onPress={()=>router.push(item.route)}>
//             <Text style={styles.btnText}>BUY NOW</Text>
//           </Pressable>
//         </View>
//       </View>
//       </Pressable>
//     </LinearGradient>
//   );
// };

// /* ================= MAIN SCREEN ================= */
// const LivePriceCards: React.FC = () => {
//   const router = useRouter();

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" />
      
//       {/* --- HEADER --- */}
//       <View style={styles.header}>
//         <Pressable onPress={() => router.back()} style={styles.backBtn}>
//           <Ionicons name="chevron-back" size={24} color="#fff" />
//         </Pressable>
//         <Text style={styles.headerTitle}>Choose How You Invest</Text>
//         <Pressable style={styles.backBtn}>
//           {/* <Feather name="bell" size={20} color="#fff" /> */}
//         </Pressable>
//       </View>

//       <FlatList
//         data={PRICE_DATA}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.scrollContent}
//         ListHeaderComponent={
//           <>
//             {/* --- WALLET SECTION --- */}
//             <View style={styles.walletContainer}>
//               <LinearGradient
//                 colors={["rgba(16,78,100,0.35)","rgba(16,78,100,0.35)", ]}
//                 style={styles.walletCard}
//               >
//                 <View>
//                   <Text style={styles.walletLabel}>Total Balance</Text>
//                   {/* <Text style={styles.walletBalance}>₹1,25,500.00</Text> */}
//                   <Text style={styles.walletBalance}>
//   ₹{totalDeposit.toFixed(2)}
// </Text>

//                 </View>
//                 <Pressable onPress={()=>router.push("/portfolio")} style={styles.addMoneyBtn   } >
//                   <Ionicons name="add-circle" size={20} color="#000" />
//                   <Text style={styles.addMoneyText}>See Portfolio</Text>
//                 </Pressable>
//               </LinearGradient>
              
//               <View style={styles.statsRow}>
//                 <View style={styles.statBox}>
//                   <Text style={styles.statLabel}>Investment</Text>
//                   {/* <Text style={styles.statValue}>₹85,000</Text> */}
//                <Text style={styles.statValue}>
//   ₹{investmentValue.toFixed(2)}
// </Text>
   
//                 </View>
//                 <View style={[styles.statBox, { borderLeftWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }]}>
//                   <Text style={styles.statLabel}>Total Profit</Text>
//                   <Text style={[styles.statValue, { color: '#2ecc71' }]}>+₹4,200</Text>
//                 </View>
//               </View>
//             </View>

//             <Text style={styles.sectionTitle}>Buy Assets</Text>
//           </>
//         }
//         renderItem={({ item }) => <PriceCard item={item} />}
//         ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
//         showsVerticalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// };

// export default LivePriceCards;



import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Href } from "expo-router";
import { getProfileApi } from "@/services/profile";
import { getPortfolioApi } from "@/services/portfolio";

/* ================= TYPES ================= */
interface PriceItem {
  id: string;
  purity?: string;
  price: string;
  colors: readonly [string, string, ...string[]];
  route: Href;
}

/* ================= DATA ================= */
const PRICE_DATA: PriceItem[] = [
  {
    id: "gold",
    price: "Digital Gold",
    route: { pathname: "/metals/gold/engine" } as any,
    colors: ["#634702", "#FFD700", "#8C6A00"],
  },
  {
    id: "silver",
    price: "Digital Silver",
    route: { pathname: "/metals/silver/engine" } as any,
    colors: ["#2C2C2C", "#E8E8E8", "#4A4A4A"],
  },
  {
    id: "platinum",
    price: "Digital Platinum",
    route: { pathname: "/metals/platinium/engine" } as any,
    colors: ["#1A1A1A", "#7F8C8D", "#000000"],
  },
];

/* ================= PRICE CARD ================= */
const PriceCard: React.FC<{ item: PriceItem }> = ({ item }) => {
  const router = useRouter();

  return (
    <LinearGradient
      colors={item.colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Pressable onPress={() => router.push(item.route)}>
        <View style={styles.cardInner}>
          <View style={styles.topRow}>
            <View style={styles.liveWrap}>
              <View style={styles.dot} />
              <Text style={styles.liveText}>LIVE PRICE</Text>
            </View>
          </View>

          <View style={styles.middleRow}>
            <Text style={styles.price}>{item.price}</Text>
          </View>

          <View style={styles.bottomRow}>
            <View />
            <Pressable
              style={styles.btn}
              onPress={() => router.push(item.route)}
            >
              <Text style={styles.btnText}>BUY NOW</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </LinearGradient>
  );
};

/* ================= MAIN SCREEN ================= */
const LivePriceCards: React.FC = () => {
  const router = useRouter();

  const [totalDeposit, setTotalDeposit] = useState(0);
  const [investmentValue, setInvestmentValue] = useState(0);
  const [profit, setProfit] = useState(0);

  /* 🔥 WALLET */
  const loadWallet = async () => {
    try {
      const res = await getProfileApi();
      const wallet = res?.data?.wallet;

      if (wallet) {
        const deposit = Number(wallet.total_money_balance || 0);
        setTotalDeposit(deposit);
      }
    } catch (e) {
      console.log("wallet error", e);
    }
  };

  /* 🔥 PORTFOLIO */
  const loadPortfolio = async () => {
    try {
      const res = await getPortfolioApi();

      if (res?.success) {
        const total =
          Number(res?.gold_24K?.current_value || 0) +
          Number(res?.gold_22K?.current_value || 0) +
          Number(res?.gold_18K?.current_value || 0) +
          Number(res?.silver?.current_value || 0) +
          Number(res?.platinum?.current_value || 0);

        setInvestmentValue(total);
      }
    } catch (e) {
      console.log("portfolio error", e);
    }
  };

  /* 🔥 PROFIT CALC */
  useEffect(() => {
    setProfit(investmentValue - totalDeposit);
  }, [investmentValue, totalDeposit]);

  /* 🔥 LOAD */
  useEffect(() => {
    loadWallet();
    loadPortfolio();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Choose How You Invest</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={PRICE_DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <>
            {/* WALLET CARD */}
            <View style={styles.walletContainer}>
              <LinearGradient
                colors={["rgba(16,78,100,0.35)", "rgba(16,78,100,0.35)"]}
                style={styles.walletCard}
              >
                <View>
                  <Text style={styles.walletLabel}>Total Balance</Text>
                  <Text style={styles.walletBalance}>
                    ₹{totalDeposit.toFixed(2)}
                  </Text>
                </View>

                <Pressable
                  onPress={() => router.push("/portfolio")}
                  style={styles.addMoneyBtn}
                >
                  <Ionicons name="add-circle" size={20} color="#000" />
                  <Text style={styles.addMoneyText}>See Portfolio</Text>
                </Pressable>
              </LinearGradient>

              {/* STATS */}
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Investment</Text>
                  <Text style={styles.statValue}>
                    ₹{investmentValue.toFixed(2)}
                  </Text>
                </View>

                <View
                  style={[
                    styles.statBox,
                    { borderLeftWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
                  ]}
                >
                  <Text style={styles.statLabel}>Total Profit</Text>
                  <Text
                    style={[
                      styles.statValue,
                      { color: profit >= 0 ? "#2ecc71" : "#e74c3c" },
                    ]}
                  >
                    {profit >= 0 ? "+" : "-"}₹{Math.abs(profit).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Buy Assets</Text>
          </>
        }
        renderItem={({ item }) => <PriceCard item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default LivePriceCards;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#062530",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
     paddingTop:30,
     marginTop:10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  scrollContent: {
    padding: 16,
  },
  /* Wallet Styles */
  walletContainer: {
    marginBottom: 24,
  },
  walletCard: {
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  walletLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "600",
  },
  walletBalance: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 4,
  },
  addMoneyBtn: {
    backgroundColor: "#facc15",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4,
  },
  addMoneyText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginTop: 12,
    borderRadius: 15,
    padding: 12,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
    marginLeft:10,
  },
  /* Card Styles */
  card: {
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  cardInner: {
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.12)",
    position: "relative",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 60,
  },
  liveWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    gap: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#FF4B4B",
  },
  liveText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "800",
  },
  purityBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 5,
  },
  purity: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "700",
  },
  middleRow: {
    marginVertical: 6,
  },
  metalName: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    fontWeight: "700",
  },
  price: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  changeWrap: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    zIndex: 10,
  },
  change: {
    color: "#2ecc71",
    fontSize: 12,
    fontWeight: "700",
  },
  btn: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
  },
  btnText: {
    color: "#000",
    fontSize: 11,
    fontWeight: "800",
  },
});