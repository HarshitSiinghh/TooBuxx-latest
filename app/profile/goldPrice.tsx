// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import {
//     Dimensions,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { getGoldPriceApi } from '@/services/goldprice'; // Note: Is API ko metal name handle karne ke liye update karna pad sakta hai
// import { Stack, useRouter } from 'expo-router';
// import {
//     Bell,
//     MoveLeft,
//     RefreshCcw,
//     ShieldCheck,
//     TrendingUp,
//     Zap,
// } from 'lucide-react-native';
// import {
//     VictoryArea,
//     VictoryAxis,
//     VictoryChart,
//     VictoryVoronoiContainer
// } from 'victory-native';

// const { width } = Dimensions.get('window');

// interface DataPoint {
//     day: string;
//     price: number;
// }

// // Metal ke hisaab se dummy data structure
// const METAL_DATA_MAP: { [metal: string]: { [timeframe: string]: DataPoint[] } } = {
//     "GOLD": {
//         "1W": [{ day: '3rd', price: 13800 }, { day: '9th', price: 14048 }],
//         "1M": [{ day: '1st', price: 12500 }, { day: '30th', price: 14048 }],
//         "6M": [{ day: 'Aug', price: 11000 }, { day: 'Jan', price: 14048 }],
//         "1Y": [{ day: 'Q1', price: 10500 }, { day: 'Q4', price: 14048 }],
//         "3Y": [{ day: '2023', price: 8500 }, { day: '2026', price: 14048 }],
//         "5Y": [{ day: '2021', price: 6500 }, { day: '2026', price: 14048 }],
//     },
//     "SILVER": {
//         "1W": [{ day: '3rd', price: 780 }, { day: '9th', price: 820 }],
//         "1M": [{ day: '1st', price: 700 }, { day: '30th', price: 820 }],
//         "6M": [{ day: 'Aug', price: 650 }, { day: 'Jan', price: 820 }],
//         "1Y": [{ day: 'Q1', price: 600 }, { day: 'Q4', price: 820 }],
//         "3Y": [{ day: '2023', price: 500 }, { day: '2026', price: 820 }],
//         "5Y": [{ day: '2021', price: 400 }, { day: '2026', price: 820 }],
//     },
//     "PLATINUM": {
//         "1W": [{ day: '3rd', price: 3100 }, { day: '9th', price: 3250 }],
//         "1M": [{ day: '1st', price: 2900 }, { day: '30th', price: 3250 }],
//         "6M": [{ day: 'Aug', price: 2800 }, { day: 'Jan', price: 3250 }],
//         "1Y": [{ day: 'Q1', price: 2700 }, { day: 'Q4', price: 3250 }],
//         "3Y": [{ day: '2023', price: 2500 }, { day: '2026', price: 3250 }],
//         "5Y": [{ day: '2021', price: 2200 }, { day: '2026', price: 3250 }],
//     }
// };

// export default function MetalPricePage() {
//     const router = useRouter();
//     const [activeMetal, setActiveMetal] = useState("GOLD");
//     const [activeTimeframe, setActiveTimeframe] = useState("1W");
//     const [isRefreshing, setIsRefreshing] = useState(false);
//     const [price, setPrice] = useState<number | null>(null);

//     // Dynamic colors based on selection
//     const themeColor = useMemo(() => {
//         if (activeMetal === "SILVER") return "#cbd5e1";
//         if (activeMetal === "PLATINUM") return "#94a3b8";
//         return "#facc15"; // Gold
//     }, [activeMetal]);

//     useEffect(() => {
//         loadPrice();
//     }, [activeMetal]); // Reload jab metal change ho

//     const loadPrice = async () => {
//         try {
//             // Agar aapki API metal support karti hai toh yahan pass karein
//             const res = await getGoldPriceApi();
//             if (res?.success) {
//                 // Temporary logic: agar API sirf gold deti hai toh silver/platinum ke liye dummy set kar rahe hain
//                 if (activeMetal === "GOLD") setPrice(res.data.market_sell_price || 14048);
//                 else if (activeMetal === "SILVER") setPrice(820);
//                 else setPrice(3250);
//             }
//         } catch (err) {
//             console.log("❌ API ERROR:", err);
//         }
//     };

//     const currentData = useMemo(() =>
//         METAL_DATA_MAP[activeMetal][activeTimeframe] || METAL_DATA_MAP[activeMetal]["1W"],
//     [activeMetal, activeTimeframe]);

//     const handleRefresh = useCallback(async () => {
//         setIsRefreshing(true);
//         await loadPrice();
//         setIsRefreshing(false);
//     }, [activeMetal]);

//     return (
//         <SafeAreaView style={styles.container}>
//             <Stack.Screen options={{ headerShown: false }} />

//             {/* Header */}
//             <View style={styles.header}>
//                 <View style={styles.headerLeft}>
//                     <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
//                         <MoveLeft color="#d1d5db" size={24} />
//                     </TouchableOpacity>
//                     <View style={styles.titleStack}>
//                         <Text style={styles.headerTitle}>{activeMetal} Price</Text>
//                         <Text style={[styles.headerSubtitle, { color: themeColor }]}>LIVE MARKET RATES</Text>
//                     </View>
//                 </View>
//                 <TouchableOpacity style={styles.alertButton}>
//                     <Bell color={themeColor} size={18} />
//                     <Text style={styles.alertText}>SET ALERT</Text>
//                 </TouchableOpacity>
//             </View>

//             <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

//                 {/* 1. NEW METAL TABS */}
//                 <View style={styles.metalTabContainer}>
//                     {['GOLD', 'SILVER', 'PLATINUM'].map((metal) => (
//                         <TouchableOpacity
//                             key={metal}
//                             onPress={() => setActiveMetal(metal)}
//                             style={[
//                                 styles.metalTab,
//                                 activeMetal === metal && { borderBottomColor: themeColor, borderBottomWidth: 2 }
//                             ]}
//                         >
//                             <Text style={[
//                                 styles.metalTabText,
//                                 activeMetal === metal && { color: '#ffffff' }
//                             ]}>
//                                 {metal}
//                             </Text>
//                         </TouchableOpacity>
//                     ))}
//                 </View>

//                 {/* Main Chart Card */}
//                 <View style={styles.chartCard}>
//                     <View style={styles.priceRow}>
//                         <View>
//                             <Text style={styles.labelText}>LIVE {activeMetal} PRICE</Text>
//                             <Text style={[styles.priceText, { color: themeColor }]}>
//                                 {price ? `₹ ${price} /g` : "Loading..."}
//                             </Text>
//                             <View style={styles.changeRow}>
//                                 <TrendingUp color="#22c55e" size={16} />
//                                 <Text style={styles.changeText}>{activeTimeframe} Change 1.8%</Text>
//                             </View>
//                         </View>
//                         <TouchableOpacity onPress={handleRefresh}>
//                             <RefreshCcw
//                                 color="#9ca3af"
//                                 size={24}
//                                 style={isRefreshing ? { transform: [{ rotate: '45deg' }] } : {}}
//                             />
//                         </TouchableOpacity>
//                     </View>

//                     {/* Chart Section */}
//                     <View style={styles.chartContainer}>
//                         <VictoryChart
//                             width={width - 60}
//                             height={250}
//                             containerComponent={<VictoryVoronoiContainer />}
//                         >
//                             <VictoryArea
//                                 data={currentData}
//                                 x="day"
//                                 y="price"
//                                 style={{
//                                     data: {
//                                         fill: `${themeColor}33`, // Adding transparency
//                                         stroke: themeColor,
//                                         strokeWidth: 3
//                                     }
//                                 }}
//                                 animate={{ duration: 500 }}
//                             />
//                             <VictoryAxis
//                                 style={{
//                                     axis: { stroke: "transparent" },
//                                     tickLabels: { fill: "#6b7280", fontSize: 10 }
//                                 }}
//                             />
//                         </VictoryChart>
//                     </View>

//                     {/* Timeframe Selectors */}
//                     <View style={styles.timeframeContainer}>
//                         {['1W', '1M', '6M', '1Y', '3Y', '5Y'].map((time) => (
//                             <TouchableOpacity
//                                 key={time}
//                                 onPress={() => setActiveTimeframe(time)}
//                                 style={[styles.timeButton, activeTimeframe === time && { backgroundColor: themeColor }]}
//                             >
//                                 <Text style={[
//                                     styles.timeButtonText,
//                                     activeTimeframe === time && { color: '#062530' }
//                                 ]}>
//                                     {time}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                 </View>

//                 {/* Savings Journey Card */}
//                 <View style={[styles.savingsCard, { borderColor: themeColor + '44' }]}>
//                     <View style={styles.goldBarContainer}>
//                         <View style={[styles.goldBar, { backgroundColor: themeColor }]}>
//                             <Text style={styles.goldBarText}>{activeMetal === 'GOLD' ? '24K' : '999'}</Text>
//                         </View>
//                     </View>
//                     <Text style={styles.savingsTitle}>Start your{"\n"}{activeMetal.toLowerCase()} savings</Text>
//                     <TouchableOpacity style={[styles.saveButton, { backgroundColor: themeColor }]}>
//                         <Zap color="#062530" size={20} fill="#062530" />
//                         <Text style={styles.saveButtonText}>SAVE NOW</Text>
//                     </TouchableOpacity>
//                 </View>

//                 {/* Badges */}
//                 <View style={styles.badgeGrid}>
//                     {[
//                         { icon: ShieldCheck, color: "#22c55e", text: "100% SAFE & SECURE" },
//                         { icon: TrendingUp, color: themeColor, text: `${activeMetal} SAVINGS PLAN` },
//                         { icon: RefreshCcw, color: "#60a5fa", text: "WITHDRAW ANYTIME" }
//                     ].map((badge, idx) => (
//                         <View key={idx} style={styles.badge}>
//                             <badge.icon color={badge.color} size={20} />
//                             <Text style={styles.badgeText}>{badge.text}</Text>
//                         </View>
//                     ))}
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#062530" },
//     header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, borderBottomWidth: 1, borderBottomColor: "rgba(16,78,100,0.6)" },
//     headerLeft: { flexDirection: "row", alignItems: "center" },
//     iconButton: { padding: 8, backgroundColor: "#104e64", borderRadius: 12 },
//     titleStack: { marginLeft: 12 },
//     headerTitle: { color: "#ffffff", fontSize: 18, fontWeight: "900" },
//     headerSubtitle: { fontSize: 10, fontWeight: "bold", letterSpacing: 1 },
//     alertButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#104e64", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
//     alertText: { color: "#ffffff", fontSize: 10, fontWeight: "bold", marginLeft: 6 },
//     scrollContent: { padding: 20 },

//     // Metal Tabs Styles
//     metalTabContainer: { flexDirection: 'row', backgroundColor: '#041e27', borderRadius: 16, marginBottom: 20, padding: 4, borderWidth: 1, borderColor: '#104e64' },
//     metalTab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
//     metalTabText: { color: '#9ca3af', fontSize: 12, fontWeight: '900', letterSpacing: 1 },

//     chartCard: { backgroundColor: "#0b2f3a", borderRadius: 32, padding: 24, borderWidth: 1, borderColor: "#104e64" },
//     priceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },
//     labelText: { color: "#9ca3af", fontSize: 10, fontWeight: "bold", letterSpacing: 1 },
//     priceText: { fontSize: 32, fontWeight: "900", fontStyle: "italic", marginVertical: 4 },
//     changeRow: { flexDirection: "row", alignItems: "center" },
//     changeText: { color: "#22c55e", fontSize: 12, fontWeight: "bold", marginLeft: 4 },
//     chartContainer: { height: 220, alignItems: "center", justifyContent: "center" },
//     timeframeContainer: { flexDirection: "row", backgroundColor: "#041e27", borderRadius: 16, padding: 4, marginTop: 20, borderWidth: 1, borderColor: "#104e64" },
//     timeButton: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 12 },
//     timeButtonText: { color: "#9ca3af", fontSize: 12, fontWeight: "bold" },

//     savingsCard: { backgroundColor: "#083344", borderRadius: 32, padding: 30, marginTop: 20, borderWidth: 1, overflow: "hidden" },
//     goldBarContainer: { marginBottom: 16, alignItems: "flex-start" },
//     goldBar: { width: 80, height: 45, borderRadius: 8, transform: [{ rotate: "-15deg" }], alignItems: "center", justifyContent: "center" },
//     goldBarText: { color: "#062530", fontSize: 20, fontWeight: "900" },
//     savingsTitle: { color: "#ffffff", fontSize: 24, fontWeight: "900", lineHeight: 28 },
//     saveButton: { flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 16, borderRadius: 16, marginTop: 15 },
//     saveButtonText: { color: "#062530", fontWeight: "900", marginLeft: 8 },
//     badgeGrid: { marginTop: 20 },
//     badge: { flexDirection: "row", alignItems: "center", backgroundColor: "#041e27", padding: 16, borderRadius: 16, marginBottom: 10, borderWidth: 1, borderColor: "#104e64" },
//     badgeText: { color: "#9ca3af", fontSize: 10, fontWeight: "bold", marginLeft: 12 },
// });

import { getGoldPriceApi } from "@/services/goldprice";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  Bell,
  MoveLeft,
  RefreshCcw,
  TrendingUp,
  Zap
} from "lucide-react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart
} from "victory-native";

const { width } = Dimensions.get("window");

interface DataPoint {
  day: string;
  price: number;
}

// Realistic chart data with proper market fluctuations
const METAL_DATA_MAP: {
  [metal: string]: { [timeframe: string]: DataPoint[] };
} = {
  GOLD: {
    "1W": [
      { day: "Mon", price: 13850 },
      { day: "Tue", price: 13920 },
      { day: "Wed", price: 13880 },
      { day: "Thu", price: 14050 },
      { day: "Fri", price: 14020 },
      { day: "Sat", price: 13990 },
      { day: "Sun", price: 14048 },
    ],
    "1M": [
      { day: "Wk1", price: 12800 },
      { day: "Wk2", price: 13200 },
      { day: "Wk3", price: 13500 },
      { day: "Wk4", price: 14048 },
    ],
    "6M": [
      { day: "Aug", price: 11500 },
      { day: "Sep", price: 12200 },
      { day: "Oct", price: 12800 },
      { day: "Nov", price: 13400 },
      { day: "Dec", price: 13700 },
      { day: "Jan", price: 14048 },
    ],
    "1Y": [
      { day: "Q1", price: 10800 },
      { day: "Q2", price: 11500 },
      { day: "Q3", price: 12500 },
      { day: "Q4", price: 14048 },
    ],
    "3Y": [
      { day: "2023", price: 9200 },
      { day: "2024", price: 11500 },
      { day: "2025", price: 13200 },
      { day: "2026", price: 14048 },
    ],
    "5Y": [
      { day: "2021", price: 7500 },
      { day: "2022", price: 8800 },
      { day: "2023", price: 9500 },
      { day: "2024", price: 11800 },
      { day: "2025", price: 13000 },
      { day: "2026", price: 14048 },
    ],
  },
  SILVER: {
    "1W": [
      { day: "Mon", price: 795 },
      { day: "Tue", price: 802 },
      { day: "Wed", price: 798 },
      { day: "Thu", price: 815 },
      { day: "Fri", price: 812 },
      { day: "Sat", price: 818 },
      { day: "Sun", price: 820 },
    ],
    "1M": [
      { day: "Wk1", price: 730 },
      { day: "Wk2", price: 765 },
      { day: "Wk3", price: 790 },
      { day: "Wk4", price: 820 },
    ],
    "6M": [
      { day: "Aug", price: 680 },
      { day: "Sep", price: 710 },
      { day: "Oct", price: 745 },
      { day: "Nov", price: 775 },
      { day: "Dec", price: 795 },
      { day: "Jan", price: 820 },
    ],
    "1Y": [
      { day: "Q1", price: 620 },
      { day: "Q2", price: 680 },
      { day: "Q3", price: 750 },
      { day: "Q4", price: 820 },
    ],
    "3Y": [
      { day: "2023", price: 520 },
      { day: "2024", price: 650 },
      { day: "2025", price: 740 },
      { day: "2026", price: 820 },
    ],
    "5Y": [
      { day: "2021", price: 450 },
      { day: "2022", price: 520 },
      { day: "2023", price: 580 },
      { day: "2024", price: 680 },
      { day: "2025", price: 760 },
      { day: "2026", price: 820 },
    ],
  },
  PLATINUM: {
    "1W": [
      { day: "Mon", price: 3150 },
      { day: "Tue", price: 3180 },
      { day: "Wed", price: 3165 },
      { day: "Thu", price: 3220 },
      { day: "Fri", price: 3215 },
      { day: "Sat", price: 3240 },
      { day: "Sun", price: 3250 },
    ],
    "1M": [
      { day: "Wk1", price: 2950 },
      { day: "Wk2", price: 3050 },
      { day: "Wk3", price: 3150 },
      { day: "Wk4", price: 3250 },
    ],
    "6M": [
      { day: "Aug", price: 2850 },
      { day: "Sep", price: 2920 },
      { day: "Oct", price: 3000 },
      { day: "Nov", price: 3100 },
      { day: "Dec", price: 3180 },
      { day: "Jan", price: 3250 },
    ],
    "1Y": [
      { day: "Q1", price: 2750 },
      { day: "Q2", price: 2900 },
      { day: "Q3", price: 3050 },
      { day: "Q4", price: 3250 },
    ],
    "3Y": [
      { day: "2023", price: 2550 },
      { day: "2024", price: 2850 },
      { day: "2025", price: 3050 },
      { day: "2026", price: 3250 },
    ],
    "5Y": [
      { day: "2021", price: 2300 },
      { day: "2022", price: 2450 },
      { day: "2023", price: 2600 },
      { day: "2024", price: 2900 },
      { day: "2025", price: 3100 },
      { day: "2026", price: 3250 },
    ],
  },
};

export default function MetalPricePage() {
  const router = useRouter();
  const params = useLocalSearchParams(); // URL se params lene ke liye

  // Initial state URL se lega, agar URL me nahi hai toh "GOLD" default
  const [activeMetal, setActiveMetal] = useState(
    (params.metal as string) || "GOLD",
  );
  const [activeTimeframe, setActiveTimeframe] = useState("1W");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [price, setPrice] = useState<number | null>(null);

  // 1. Dynamic UI Colors
  const themeColor = useMemo(() => {
    if (activeMetal === "SILVER") return "#cbd5e1";
    if (activeMetal === "PLATINUM") return "#94a3b8";
    return "#facc15";
  }, [activeMetal]);

  // 2. Metal switch logic with Route Update
  const handleMetalChange = (metal: string) => {
    setActiveMetal(metal);
    // Page refresh nahi hoga, bas URL update ho jayega
    router.setParams({ metal: metal });
  };

  // 3. API Effect
  useEffect(() => {
    loadPrice();
  }, [activeMetal]);

  const loadPrice = async () => {
    try {
      const res = await getGoldPriceApi();
      if (res?.success) {
        if (activeMetal === "GOLD")
          setPrice(res.data.market_sell_price || 14048);
        else if (activeMetal === "SILVER") setPrice(820);
        else setPrice(3250);
      }
    } catch (err) {
      console.log("❌ API ERROR:", err);
    }
  };

  const currentData = useMemo(
    () =>
      METAL_DATA_MAP[activeMetal][activeTimeframe] ||
      METAL_DATA_MAP[activeMetal]["1W"],
    [activeMetal, activeTimeframe],
  );

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadPrice();
    setIsRefreshing(false);
  }, [activeMetal]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.iconButton}
          >
            <MoveLeft color="#d1d5db" size={24} />
          </TouchableOpacity>
          {/* Fixed: div ko View se replace kiya */}
          <View style={styles.titleStack}>
            <Text style={styles.headerTitle}>{activeMetal} Price</Text>
            <Text style={[styles.headerSubtitle, { color: themeColor }]}>
              LIVE MARKET RATES
            </Text>
          </View>
        </View>
        {/* <TouchableOpacity style={styles.alertButton}>
          <Bell color={themeColor} size={18} />
          <Text style={styles.alertText}>SET ALERT</Text>
        </TouchableOpacity> */}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Metal Selection Tabs - Routing Integrated */}
        <View style={styles.metalTabContainer}>
          {["GOLD", "SILVER", "PLATINUM"].map((metal) => (
            <TouchableOpacity
              key={metal}
              onPress={() => handleMetalChange(metal)}
              style={[
                styles.metalTab,
                activeMetal === metal && {
                  borderBottomColor: themeColor,
                  borderBottomWidth: 3,
                },
              ]}
            >
              <Text
                style={[
                  styles.metalTabText,
                  activeMetal === metal && {
                    color: "#ffffff",
                    fontWeight: "900",
                  },
                ]}
              >
                {metal}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Main Chart Card */}
        <View style={styles.chartCard}>
          <View style={styles.priceRow}>
            <View>
              <Text style={styles.labelText}>LIVE {activeMetal} PRICE</Text>
              <Text style={[styles.priceText, { color: themeColor }]}>
                {price ? `₹ ${price.toLocaleString()} /g` : "Loading..."}
              </Text>
              <View style={styles.changeRow}>
                <TrendingUp color="#22c55e" size={16} />
                <Text style={styles.changeText}>+1.8% Today</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleRefresh}>
              <RefreshCcw
                color={themeColor}
                size={24}
                style={
                  isRefreshing ? { transform: [{ rotate: "180deg" }] } : {}
                }
              />
            </TouchableOpacity>
          </View>

          <View style={styles.chartContainer}>
            <VictoryChart width={width - 60} height={250}>
              <VictoryArea
                data={currentData}
                x="day"
                y="price"
                style={{
                  data: {
                    fill: `${themeColor}33`,
                    stroke: themeColor,
                    strokeWidth: 3,
                  },
                }}
                interpolation="catmullRom"
                animate={{ duration: 500 }}
              />
              <VictoryAxis
                style={{
                  axis: { stroke: "transparent" },
                  tickLabels: { fill: "#6b7280", fontSize: 10 },
                }}
              />
            </VictoryChart>
          </View>

          {/* Timeframe Selectors */}
          <View style={styles.timeframeContainer}>
            {["1W", "1M", "6M", "1Y", "3Y", "5Y"].map((time) => (
              <TouchableOpacity
                key={time}
                onPress={() => setActiveTimeframe(time)}
                style={[
                  styles.timeButton,
                  activeTimeframe === time && { backgroundColor: themeColor },
                ]}
              >
                <Text
                  style={[
                    styles.timeButtonText,
                    activeTimeframe === time && {
                      color: "#062530",
                      fontWeight: "900",
                    },
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Savings Journey Card */}
        <View style={[styles.savingsCard, { borderColor: themeColor + "44" }]}>
          <View style={styles.goldBarContainer}>
            <View style={[styles.goldBar, { backgroundColor: themeColor }]}>
              <Text style={styles.goldBarText}>
                {activeMetal === "GOLD" ? "24K" : "999"}
              </Text>
            </View>
          </View>
          <Text style={styles.savingsTitle}>
            Start your{"\n"}
            {activeMetal.toLowerCase()} savings
          </Text>
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: themeColor }]}
            onPress={() => {
              if (activeMetal.toLowerCase() == "gold") {
                router.push("/savings/instant-saving");
              }
                if (activeMetal.toLowerCase() == "silver") {
                router.push("/metals/silver/engine");
              }
                else {
                router.push("/metals/platinium/engine");
              }
            }}
          >
            <Zap color="#062530" size={20} fill="#062530" />
            <Text style={styles.saveButtonText}>SAVE NOW</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#062530" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(16,78,100,0.6)",
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  iconButton: { padding: 8, backgroundColor: "#104e64", borderRadius: 12 },
  titleStack: { marginLeft: 12 },
  headerTitle: { color: "#ffffff", fontSize: 18, fontWeight: "900" },
  headerSubtitle: { fontSize: 10, fontWeight: "bold", letterSpacing: 1 },
  alertButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#104e64",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  alertText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 6,
  },
  scrollContent: { padding: 20 },

  // Metal Tabs Styles
  metalTabContainer: {
    flexDirection: "row",
    backgroundColor: "#041e27",
    borderRadius: 16,
    marginBottom: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: "#104e64",
  },
  metalTab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  metalTabText: {
    color: "#6b7280",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  chartCard: {
    backgroundColor: "#0b2f3a",
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: "#104e64",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  labelText: {
    color: "#9ca3af",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  priceText: {
    fontSize: 36,
    fontWeight: "900",
    fontStyle: "italic",
    marginVertical: 6,
    letterSpacing: -1,
  },
  changeRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  changeText: {
    color: "#22c55e",
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 6,
  },
  refreshButton: {
    backgroundColor: "#041e27",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#104e64",
  },
  chartContainer: {
    height: 280,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  timeframeContainer: {
    flexDirection: "row",
    backgroundColor: "#041e27",
    borderRadius: 16,
    padding: 6,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#104e64",
  },
  timeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
    marginHorizontal: 2,
  },
  timeButtonText: {
    color: "#6b7280",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  savingsCard: {
    backgroundColor: "#083344",
    borderRadius: 32,
    padding: 30,
    marginTop: 24,
    borderWidth: 2,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  goldBarContainer: {
    marginBottom: 20,
    alignItems: "flex-start",
  },
  goldBar: {
    width: 85,
    height: 48,
    borderRadius: 10,
    transform: [{ rotate: "-15deg" }],
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  goldBarText: {
    color: "#062530",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 1,
  },
  savingsTitle: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "900",
    lineHeight: 32,
    marginBottom: 8,
  },
  savingsSub: {
    color: "rgba(203,213,225,0.8)",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  saveButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  saveButtonText: {
    color: "#062530",
    fontWeight: "900",
    marginLeft: 10,
    fontSize: 14,
    letterSpacing: 1,
  },
  badgeGrid: { marginTop: 24 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#041e27",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#104e64",
  },
  badgeText: {
    color: "#cbd5e1",
    fontSize: 11,
    fontWeight: "bold",
    marginLeft: 14,
    letterSpacing: 0.5,
  },
});
