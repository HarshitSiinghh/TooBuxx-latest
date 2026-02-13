import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { ArrowLeft } from "lucide-react-native"; // Updated Icon
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
    price: "        Gold",
    route: { pathname: "/metals/gold/engine" } as any,
    colors: ["#634702", "#FFD700", "#8C6A00"],
  },
  {
    id: "silver",
    price: "        Silver",
    route: { pathname: "/metals/silver/engine" } as any,
    colors: ["#2C2C2C", "#E8E8E8", "#4A4A4A"],
  },
  {
    id: "platinum",
    price: "        Platinum",
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
            <TouchableOpacity
              style={styles.btn}
              onPress={() => router.push(item.route)}
            >
              <Text style={styles.btnText}>BUY NOW</Text>
            </TouchableOpacity>
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
        const wealth = Number(wallet.total_wealth || 0);

        setTotalDeposit(deposit);
        setInvestmentValue(wealth);
        setProfit(wealth - deposit);
      }
    } catch (e) {
      console.log("wallet error", e);
    }
  };

  useEffect(() => {
    loadWallet();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* SYNCED HEADER */}
      <View style={styles.navBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color="#9ca3af" />
          </TouchableOpacity>
          
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.navTitle}>CHOOSE HOW YOU INVEST</Text>
            {/* <Text style={styles.navSubtitle}>CHOOSE HOW YOU INVEST</Text> */}
          </View>
        </View>
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

                <TouchableOpacity
                  onPress={() => router.push("/portfolio")}
                  style={styles.seePortfolioBtn}
                >
                  <Ionicons name="add-circle" size={20} color="#000" />
                  <Text style={styles.addMoneyText}>See Portfolio</Text>
                </TouchableOpacity>
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
                    ₹0
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
  /* ===== SYNCED HEADER ===== */
  navBar: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 45,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(16,78,100,0.6)",
  },
  backBtn: {
    padding: 10,
    backgroundColor: "#104e64",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  navTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
  },
  navSubtitle: {
    color: "#facc15",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
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
    borderWidth: 1,
    borderColor: "#104e64",
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
  seePortfolioBtn: {
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
    borderWidth: 1,
    borderColor: "rgba(16,78,100,0.4)",
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    marginBottom: 4,
    fontWeight: "700",
    letterSpacing: 1,
  },
  statValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 16,
    marginLeft: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  /* Card Styles */
  card: {
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  cardInner: {
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  liveWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: "#FF4B4B",
  },
  liveText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "900",
  },
  middleRow: {
    marginVertical: 12,
  },
  price: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
  },
  btnText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "900",
  },
});