import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  StatusBar,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
  Modal,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getPortfolioApi, getPortfolioBreakdownApi } from "@/services/portfolio";

const { width } = Dimensions.get("window");

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

/* ================= COMPONENT: CARD ================= */
const PortfolioCard = ({ item, expanded, onPress, onPurityPress }: any) => {
  
  return (
    <View style={styles.cardContainer}>
      <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}>
        <LinearGradient 
          colors={item.colors} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }} 
          style={styles.card}
        >
          <View style={styles.cardOverlay}>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.metalLabel}>{item.metal}</Text>
                <Text style={styles.totalLabel}>Total Savings</Text>
              </View>

              {item.metal === "GOLD" && (
                <Pressable style={styles.purityBadge} onPress={onPurityPress}>
                  <Text style={styles.purityText}>{item.purity}</Text>
                  <Ionicons name="chevron-down" size={12} color="#fff" />
                </Pressable>
              )}
            </View>

            <Text style={styles.amount}>
              ₹{Number(item.totalSavings || 0).toLocaleString("en-IN")}
            </Text>

            <View style={styles.footerRow}>
              <View style={styles.quantityBadge}>
                <MaterialCommunityIcons name="weight-gram" size={14} color="rgba(255,255,255,0.8)" />
                <Text style={styles.quantity}>{item.quantity}</Text>
              </View>
              
              <View style={[styles.expandIcon, expanded && styles.expandIconRotated]}>
                <Ionicons name="chevron-down" size={20} color="#fff" />
              </View>
            </View>

            {/* ===== DROPDOWN ===== */}
            {expanded && (
              <View style={styles.dropdown}>
                {item.breakdown ? (
                  <View style={styles.breakdownGrid}>
                    <Row label="Instant" value={item.breakdown.instant} />
                    <Row label="Daily" value={item.breakdown.daily} />
                    <Row label="Weekly" value={item.breakdown.weekly} />
                    <Row label="Monthly" value={item.breakdown.monthly} />
                  </View>
                ) : (
                  <Text style={styles.noDataText}>No investment breakdown available</Text>
                )}
              </View>
            )}
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const Row = ({ label, value }: any) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>
      ₹{Number(value || 0).toLocaleString("en-IN")}
    </Text>
  </View>
);

/* ================= MAIN SCREEN ================= */
const PortfolioSummary: React.FC = () => {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [breakdownData, setBreakdownData] = useState<any>(null);
  const [goldPurity, setGoldPurity] = useState<"24K" | "22K" | "18K">("24K");
  const [showPurity, setShowPurity] = useState(false);

  const loadPortfolio = async () => {
    try {
      const res = await getPortfolioApi();
      if (res?.success) setPortfolio(res);
      const bd = await getPortfolioBreakdownApi();
      if (bd?.success) setBreakdownData(bd);
    } catch (e) {
      console.log("API ERROR ❌", e);
    }
  };

  useEffect(() => {
    loadPortfolio();
  }, []);



  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(expanded === id ? null : id);
  };

  const getGoldData = () => {
    if (!portfolio) return { current_value: 0, grams: 0 };
    if (goldPurity === "24K") return portfolio?.gold_24K;
    if (goldPurity === "22K") return portfolio?.gold_22K;
    if (goldPurity === "18K") return portfolio?.gold_18K;
    return { current_value: 0, grams: 0 };
  };

  const goldObj = getGoldData();
  // const goldBreak = breakdownData?.gold?.[goldPurity]?.[`${goldPurity}_Rupee`] || null;
  const goldBreak = useMemo(() => {
  if (!breakdownData?.gold) return null;
  return breakdownData.gold?.[goldPurity]?.[`${goldPurity}_Rupee`] || null;
}, [breakdownData, goldPurity]);


const DATA = useMemo(() => [
  {
    id: "gold",
    metal: "GOLD",
    purity: goldPurity,
    totalSavings: goldObj?.current_value || 0,
    quantity: `${Number(goldObj?.grams || 0).toFixed(4)} g`,
    colors: ["#996515", "#D4AF37", "#734B00"],
    breakdown: goldBreak,
  },
  {
    id: "silver",
    metal: "SILVER",
    totalSavings: portfolio?.silver?.current_value || 0,
    quantity: `${Number(portfolio?.silver?.grams || 0).toFixed(4)} g`,
    colors: ["#434343", "#A9A9A9", "#2C3E50"],
    breakdown: breakdownData?.silver?.silver_Rupee || null,
  },
  {
    id: "platinum",
    metal: "PLATINUM",
    totalSavings: portfolio?.platinum?.current_value || 0,
    quantity: `${Number(portfolio?.platinum?.grams || 0).toFixed(4)} g`,
    colors: ["#2C3E50", "#4B4B4B", "#000000"],
    breakdown: breakdownData?.platinum?.platinum_Rupee || null,
  },
], [portfolio, breakdownData, goldPurity]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.mainHeader}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Asset Portfolio</Text>
        <Pressable style={styles.backBtn}>
          {/* <Ionicons name="notifications-outline" size={22} color="#fff" /> */}
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        {/* STATS SECTION */}
        {/* <View style={styles.statsGrid}>
          <Stat icon="shield-check-outline" label="Secure" value="Verified" />
          <Stat icon="Layers-outline" label="Metals" value="03 Types" />
          <Stat icon="pulse" label="Price" value="Live" />
        </View> */}

        <View style={styles.statsGrid}>
  {/* Sahi names: 'shield-checkmark-outline' aur 'layers-outline' (L lowercase) */}
  <Stat icon="shield-checkmark-outline" label="Secure" value="Verified" />
  <Stat icon="layers-outline" label="Assets" value="03 Types" />
  <Stat icon="stats-chart" label="Market" value="Live" />
</View>

        <Text style={styles.sectionTitle}>Your Holdings</Text>

        {/* CARDS */}
        {DATA.map((item) => (
          <PortfolioCard
            key={item.id}
            item={item}
            expanded={expanded === item.id}
            onPress={() => toggleExpand(item.id)}
            onPurityPress={() => setShowPurity(true)}
          />
        ))}
      </ScrollView>

      {/* PURITY MODAL (Glass Effect Style) */}
      <Modal visible={showPurity} transparent animationType="slide">
        <View style={styles.modalWrap}>
          <Pressable style={styles.modalOverlay} onPress={() => setShowPurity(false)} />
          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Select Gold Purity</Text>
            {["24K", "22K", "18K"].map((p) => (
              <Pressable
                key={p}
                style={[styles.purityOption, goldPurity === p && styles.activeOption]}
                onPress={() => {
                  setGoldPurity(p as any);
                  setShowPurity(false);
                }}
              >
                <Text style={[styles.purityOptionText, goldPurity === p && styles.activeOptionText]}>{p} Gold Standard</Text>
                {goldPurity === p && <Ionicons name="checkmark-circle" size={20} color="#facc15" />}
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const Stat = ({ icon, label, value }: any) => (
  <View style={styles.statBox}>
    <View style={styles.statIconCircle}>
        <Ionicons name={icon} size={18} color="#facc15" />
    </View>
    <Text style={styles.statSub}>{label}</Text>
    <Text style={styles.statMain}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#062530" },

mainHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16, // Thoda gap edges se
    height: 60, // Fixed height for alignment
    paddingTop:25,
    paddingBottom: 10,
    marginTop: Platform.OS === 'android' ? 10 : 0,
  },
  backBtn: { 
    width: 40, 
    height: 40, 
    // backgroundColor: "rgba(255,255,255,0.08)", 
    borderRadius: 10, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "700", letterSpacing: 0.5 },

  sectionTitle: { color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: "600", marginBottom: 15, textTransform: 'uppercase', letterSpacing: 1 },

statsGrid: { 
    flexDirection: "row", 
    justifyContent: "space-between", // Boxes ke beech barabar jagah
    alignItems: "center",
    marginBottom: 25, 
    marginTop: 10,
    width: '100%', // Poori width cover karega lekin boxes fixed honge
  },
 statBox: {
    width: (width - 64) / 3, // Screen width se calculate kiya taaki perfect fit ho (adjust 64 based on padding)
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingVertical: 12, // Height kam karne ke liye vertical padding kam ki
    paddingHorizontal: 8,
    borderRadius: 16,
    alignItems: "center", // Text ko center karne ke liye
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
statIconCircle: { 
    backgroundColor: "rgba(250, 204, 21, 0.1)", 
    padding: 6, 
    borderRadius: 8, 
    marginBottom: 6 
  },
statSub: { 
    color: "rgba(255,255,255,0.4)", 
    fontSize: 10, // Thoda chhota font premium lagta hai
    fontWeight: "500",
    textAlign: 'center'
  },
  statMain: { 
    color: "#fff", 
    fontSize: 13, // Balance size
    fontWeight: "700", 
    marginTop: 2,
    textAlign: 'center'
  },


  cardContainer: {
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  card: { borderRadius: 24, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
  cardOverlay: { padding: 20, backgroundColor: "rgba(0,0,0,0.1)" },

  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: 'flex-start' },
  metalLabel: { color: "#fff", fontSize: 18, fontWeight: "800", letterSpacing: 1 },
  totalLabel: { color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: "500" },

  purityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  purityText: { color: "#fff", fontSize: 12, fontWeight: "700" },

  amount: { color: "#fff", fontSize: 32, fontWeight: "900", marginVertical: 15, letterSpacing: -0.5 },

  footerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  quantityBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6, 
    backgroundColor: 'rgba(255,255,255,0.15)', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 8 
  },
  quantity: { color: "#fff", fontSize: 14, fontWeight: "600" },
  expandIcon: { width: 32, height: 32, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  expandIconRotated: { transform: [{ rotate: '180deg' }] },

  dropdown: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  breakdownGrid: { gap: 8 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 12,
    borderRadius: 12,
  },
  rowLabel: { color: "rgba(255,255,255,0.6)", fontWeight: "500" },
  rowValue: { color: "#fff", fontWeight: "700" },
  noDataText: { color: "rgba(255,255,255,0.5)", textAlign: 'center', fontStyle: 'italic' },

  modalWrap: { flex: 1, justifyContent: "flex-end" },
  modalOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.6)" },
  modalCard: {
    backgroundColor: "#062530",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  modalHandle: { width: 40, height: 5, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, alignSelf: 'center', marginBottom: 20 },
  modalTitle: { color: "#fff", fontSize: 20, fontWeight: "700", marginBottom: 20, textAlign: 'center' },
  purityOption: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 18, 
    backgroundColor: 'rgba(255,255,255,0.05)', 
    borderRadius: 16, 
    marginBottom: 10 
  },
  activeOption: { backgroundColor: 'rgba(250, 204, 21, 0.15)', borderWidth: 1, borderColor: '#facc15' },
  purityOptionText: { color: "rgba(255,255,255,0.8)", fontSize: 16, fontWeight: "600" },
  activeOptionText: { color: "#facc15" },
});

export default PortfolioSummary;