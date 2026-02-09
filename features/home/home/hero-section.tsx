import React, { useState, useEffect,useCallback } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getGoldPriceApi } from "@/services/goldprice";
import { getProfileApi } from "@/services/profile";
import { useRouter,useFocusEffect } from "expo-router";
import { useProfileStore } from "@/store/profileStore";
import { getPortfolioApi } from "@/services/portfolio";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
export const HeroSection = () => {
  const router = useRouter();
  const profile = useProfileStore((s) => s.profile);
const [priceTrend, setPriceTrend] = useState<"up" | "down" | "same">("same");
const [prevPrice, setPrevPrice] = useState<number | null>(null);


  const [goldPrice, setGoldPrice] = useState<number | null>(null);
  const [totalGold, setTotalGold] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  const [dailyValue, setDailyValue] = useState(0);
  const [walletBalance, setWalletBalance] = useState<number | null>(null); // ✅ NEW

  

  useFocusEffect(
  useCallback(() => {
    loadGoldPrice();
    loadWallet();
     loadPortfolio(); 

    const interval = setInterval(() => {
      loadGoldPrice();
    }, 5000);

    return () => clearInterval(interval);
  }, [])
);



const loadPortfolio = async () => {
  try {
    const res = await getPortfolioApi();

    if (res?.success) {
      console.log("PORTFOLIO 👉", res);

      const total =
        Number(res?.gold_24K?.current_value || 0) +
        Number(res?.gold_22K?.current_value || 0) +
        Number(res?.gold_18K?.current_value || 0) +
        Number(res?.silver?.current_value || 0) +
        Number(res?.platinum?.current_value || 0);

      setTotalSavings(total);
    }
  } catch (e) {
    console.log("Portfolio error:", e);
  }
};

  useEffect(() => {
    if (goldPrice !== null) {
      setDailyValue(totalGold * goldPrice);
    }
  }, [goldPrice, totalGold]);
const loadGoldPrice = async () => {
  try {
    const res = await getGoldPriceApi();
    if (res?.success) {
      const newPrice = Number(res.data?.market_sell_price);

      setPrevPrice(prev => {
        if (prev !== null) {
          if (newPrice > prev) setPriceTrend("up");
          else if (newPrice < prev) setPriceTrend("down");
          else setPriceTrend("same");
        }
        return newPrice;
      });

      setGoldPrice(newPrice);
    }
  } catch (e) {
    console.log("Gold price error:", e);
  }
};



  const loadWallet = async () => {
  try {
    const res = await getProfileApi();
    console.log("FULL PROFILE 👉", res?.data);
    console.log("WALLET 👉", res?.data?.wallet);

    const wallet = res?.data?.wallet;

    if (wallet) {
      setTotalGold(Number(wallet.total_gold_grams || 0));
    setWalletBalance(Number(wallet.total_money_balance));
    }
  } catch (e) {
    console.log("Wallet load error:", e);
  }
};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>WELCOME BACK</Text>
          <View style={styles.nameRow}>
            <Text style={styles.hello}>Hello, </Text>
            <Text style={styles.userNameText}>
              {profile?.username || "User"}
            </Text>
          </View>
        </View>
      </View>

      {/* Card */}
      <LinearGradient
        


        colors={["#104e64", "#062530"]}   // 🔥 NEW THEME GRADIENT
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.card}
      >
        <View style={styles.liveTagRow}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.greenDot} />
            <Text style={styles.firstGoldText}>
              {walletBalance !== null ? `Wallet: ₹${walletBalance}` : "Loading wallet..."}
            </Text>
            <MaterialCommunityIcons
              name="wallet"
              size={16}
              color="#facc15"
              style={{ marginLeft: 4 }}
            />
          </View>

          <Pressable
            style={styles.depositBtnWrap}
            onPress={() => router.push("/paymentsDetails/deposite")}
          >
            <LinearGradient
              colors={["#facc15", "#f59e0b", "#a855f7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.depositBtn}
            >
            <MaterialCommunityIcons name="wallet" size={16} color="#facc15" />

<MaterialCommunityIcons
  name="wallet-plus"
  size={14}
  color="#062530"
/>

              <Text style={styles.depositText}>DEPOSIT</Text>
            </LinearGradient>
          </Pressable>
        </View>

        <View style={styles.savingsRow}>
          <View style={styles.savingsInfo}>
            <Text style={styles.savingsLabel}>TOTAL  SAVINGS</Text>
           

<Text style={styles.amount}>
  ₹{totalSavings.toFixed(2)}
</Text>


            {/* <Text style={styles.grams}>{totalGold}gm in 24K Gold</Text> */}
          </View>
        </View>
      </LinearGradient>

      {/* Buttons */}
      <View style={styles.actionButtonsRow}>
        <Pressable
          style={styles.withdrawBtn}
          onPress={() => router.push("/withdraw")}
        >
          <Text style={styles.btnTextLight}>WITHDRAW</Text>
        </Pressable>

        <Pressable
          style={styles.savingBtnWrapper}
          onPress={() => router.push("/abc/pricecard")}
        >
          <LinearGradient
            colors={["#BF953F", "#FCF6BA", "#B38728", "#FBF5B7", "#AA771C"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.savingBtnGradient}
          >
            <Text style={styles.btnTextDark}>Start Investing </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};


// const styles = StyleSheet.create({
//   container: {
//     // backgroundColor: "#1a003d",
//       backgroundColor: "#062530",
//     padding: 16,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 24,
//   },
//   welcomeText: {
//     fontSize: 10,
//     fontWeight: "900",
//     // color: "#6b7280",
//       color: "#8fbac4",
//     letterSpacing: 2,
//   },
//   nameRow: {
//     flexDirection: "row",
//     alignItems: "baseline",
//   },
//   hello: {
//     // color: "white",
//      color: "#ffffff",
//     fontSize: 20,
//     fontWeight: "900",
//   },
//   userNameText: {
//     fontSize: 20,
//     fontWeight: "900",
//     // color: "#a855f7",
//      color: "#facc15"
//   },
//   card: {
//     borderRadius: 32,
//     padding: 24,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.05)",
//     overflow: "hidden",
//   },
//   liveTagRow: {
//     justifyContent: "space-between",
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 24,
//   },
//   priceUp: {
//   color: "#22c55e", // green ↑
// },

// priceDown: {
//   color: "#ef4444", // red ↓
// },

//   greenDot: {
//     height: 6,
//     width: 6,
//     backgroundColor: "#22c55e",
//     borderRadius: 3,
//     marginRight: 8,
//   },
//   firstGoldText: {
//     // color: "#9ca3af",
//       color: "#c7e4ec",
//     fontSize: 10,
//     fontWeight: "900",
//     letterSpacing: 1.5,
//   },
//   depositBtnWrap: {
//     borderRadius: 999,
//     overflow: "hidden",
//   },amount: {
//   color: "#ffffff", // default (same price)
//   fontWeight: "900",
//   fontSize: 32,
// },

//   depositBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//   },
//   depositText: {
//     color: "#2a0a00",
//     fontSize: 10,
//     fontWeight: "900",
//     letterSpacing: 1,
//   },
//   savingsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//   },
//   savingsInfo: {
//     flex: 1,
//   },
//   savingsLabel: {
//     fontSize: 10,
//     fontWeight: "900",
//     color: "rgba(168,85,247,0.5)",
//     letterSpacing: 1.2,
//     marginBottom: 4,
//   },

//   grams: {
//     color: "rgba(251,191,36,0.8)",
//     fontSize: 12,
//     fontWeight: "700",
//     marginTop: 4,
//   },
//   /* Fixed Action Buttons Row */
//   actionButtonsRow: {
//     flexDirection: "row",
//     gap: 12,
//     marginTop: 24,
//     width: '100%',
//   },
//   withdrawBtn: {
//     flex: 1,
//     height: 52,
//     borderRadius: 14,
//     borderWidth: 1.5,
//     borderColor: "rgba(255, 255, 255, 0.2)",
//     backgroundColor: "rgba(255, 255, 255, 0.05)",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   btnTextLight: {
//     color: "#FFFFFF",
//     fontSize: 13,
//     fontWeight: "900",
//     letterSpacing: 1,
//     textTransform: "uppercase",
//   },
//   savingBtnWrapper: {
//     flex: 1,
//     height: 52,
//     borderRadius: 14,
//     overflow: 'hidden',
//     elevation: 8,
//     shadowColor: "#FFD700",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//   },
//   savingBtnGradient: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "rgba(255, 215, 0, 0.3)",
//   },
//   btnTextDark: {
//     color: "#1a003d",
//     fontSize: 13,
//     fontWeight: "900",
//     letterSpacing: 1,
//     textTransform: "uppercase",
//   },
// });




const styles = StyleSheet.create({
  container: {
    backgroundColor: "#062530",
    padding: 16,
  },

  /* ================= HEADER ================= */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },

  welcomeText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#8fbac4",
    letterSpacing: 2,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  hello: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
  },

  userNameText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#facc15",
  },

  /* ================= HERO CARD ================= */
  card: {
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: "#104e64",
    overflow: "hidden",
  },

  liveTagRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  greenDot: {
    height: 6,
    width: 6,
    backgroundColor: "#22c55e",
    borderRadius: 3,
    marginRight: 8,
  },

  firstGoldText: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  /* ================= PRICE ================= */
  amount: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 32,
  },

  priceUp: {
    color: "#22c55e",
  },

  priceDown: {
    color: "#ef4444",
  },

  savingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  savingsInfo: {
    flex: 1,
  },

  savingsLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#8fbac4",
    letterSpacing: 1.2,
    marginBottom: 4,
  },

  grams: {
    color: "rgba(250,204,21,0.85)",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },

  /* ================= DEPOSIT BUTTON ================= */
  depositBtnWrap: {
    borderRadius: 999,
    overflow: "hidden",
  },

  depositBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  depositText: {
    color: "#062530",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },

  /* ================= ACTION BUTTONS ================= */
  actionButtonsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    width: "100%",
  },

  withdrawBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#104e64",

    alignItems: "center",
    justifyContent: "center",
  },

  btnTextLight: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  savingBtnWrapper: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#facc15",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },

  savingBtnGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.35)",
  },

  btnTextDark: {
    color: "#062530",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
