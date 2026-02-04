import React, { useState, useEffect ,useCallback} from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter,useFocusEffect } from "expo-router";
import { getGoldPriceApi } from "@/services/goldprice";

 import { useNotificationStore } from "@/store/notificationstore";
// import { useNotificationStore } from "@/store/notificationStore";

const Header = () => {

const [priceTrend, setPriceTrend] = useState<"up" | "down" | "same">("same");const [prevPrice, setPrevPrice] = useState<number | null>(null);

  
  const [goldPrice, setGoldPrice] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { inboxUnread, txnUnread, loadCounts } = useNotificationStore();
  const totalUnread = inboxUnread + txnUnread;

  // useEffect(() => {
  //   loadGoldPrice();
  //   loadCounts(); // 🔥 app open pe unread count
  // }, []);

  // const loadGoldPrice = async () => {
  //   try {
  //     const res = await getGoldPriceApi();
  //     if (res?.success) {
  //       setGoldPrice(res.data?.price_per_gram);
  //     }
  //   } catch (e) {
  //     console.log("Gold price error:", e);
  //   }
  // };




  const loadGoldPrice = useCallback(async () => {
  try {
    const res = await getGoldPriceApi();
    if (res?.success) {
      const newPrice = res.data?.price_per_gram;

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
}, []);


useFocusEffect(
useCallback(() => {
// first call when screen focused
loadGoldPrice();
loadCounts();


// auto refresh gold price every 15 sec
const interval = setInterval(() => {
loadGoldPrice();
}, 5000);


// cleanup when screen loses focus
return () => clearInterval(interval);
}, [loadGoldPrice])
);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <View style={styles.header}>
      {/* Left */}
      <View style={styles.left}>
        <Pressable
          onPress={() => router.push("/(tabs)/settings")}
          style={styles.avatarBtn}
        >
          <Feather name="user" size={18} color="white" />
        </Pressable>
      </View>

      {/* Center */}
      <Pressable onPress={() => router.push("/profile/goldPrice")}>
        <View style={styles.centerBox}>
          <View style={styles.liveRow}>
            <MaterialCommunityIcons
              name="access-point"
              size={18}
              color="#e26a75"
            />
            <Text style={styles.liveText}>Live</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={styles.goldLabel}>Gold Price</Text>
            {/* <Text style={styles.goldPrice}>
              {goldPrice ? `₹ ${goldPrice} /gm` : "Loading..."}
            </Text> */}

            <Text
  style={[
    styles.goldPrice,
    priceTrend === "up" && styles.priceUp,
    priceTrend === "down" && styles.priceDown,
  ]}
>
  {goldPrice ? `₹ ${goldPrice} /gm` : "Loading..."}
</Text>

          </View>
        </View>
      </Pressable>

      {/* Right */}
      <View style={styles.right}>
        <Pressable
          onPress={() => {
            toggleMenu();
            router.push("/profile/notifications");
          }}
          style={styles.iconBtn}
        >
          <Feather name="bell" size={18} color="white" />

          {/* 🔥 BADGE */}
          {totalUnread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {totalUnread > 9 ? "9+" : totalUnread}
              </Text>
            </View>
          )}
        </Pressable>

        <Pressable
          onPress={() => {
            toggleMenu();
            router.push("/profile/my-point");
          }}
          style={styles.iconBtn}
        >
          <Feather name="shield" size={18} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;











// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: "#1a003d",
//     height: 56,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 14,
//     position: "absolute",
//     top: 0,
//     width: "100%",
//     zIndex: 50,
//   },

//   left: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   badge: {
// position: "absolute",
// top: 4,
// right: 4,
// backgroundColor: "#dc2626",
// minWidth: 16,
// height: 16,
// borderRadius: 8,
// alignItems: "center",
// justifyContent: "center",
// paddingHorizontal: 4,
// },


// badgeText: {
// color: "white",
// fontSize: 9,
// fontWeight: "900",
// },

//   right: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },

//   iconBtn: {
//     backgroundColor: "#2a0055",
//     padding: 8,
//     borderRadius: 999,
//   },

//   avatarBtn: {
//     backgroundColor: "#2a0055",
//     padding: 6,
//     borderRadius: 999,
//   },

//   centerBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     backgroundColor: "#30055a",
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },

//   liveRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },

//   liveText: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   goldLabel: {
//     color: "white",
//     fontSize: 11,
//   },

//   goldPrice: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "700",
//   },
// });






// const styles = StyleSheet.create({
//   header: {
//     // Purana: #1a003d -> Naya: Deep Dark Teal
//     backgroundColor: "#062530", 
//     height: 56,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 14,
//     position: "absolute",
//     top: 0,
//     width: "100%",
//     zIndex: 50,
//   },

//   left: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },

//   badge: {
//     position: "absolute",
//     top: 4,
//     right: 4,
//     backgroundColor: "#dc2626", // Red badge (ye change nahi kiya taaki notice ho)
//     minWidth: 16,
//     height: 16,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 4,
//   },

//   badgeText: {
//     color: "white",
//     fontSize: 9,
//     fontWeight: "900",
//   },

//   right: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },

//   iconBtn: {
//     // Purana: #2a0055 -> Naya: Secondary Teal
//     backgroundColor: "#104e64", 
//     padding: 8,
//     borderRadius: 999,
//   },

//   avatarBtn: {
//     // Purana: #2a0055 -> Naya: Secondary Teal
//     backgroundColor: "#104e64", 
//     padding: 6,
//     borderRadius: 999,
//   },
// priceUp: {
//   color: "#22c55e", // GREEN 📈
// },

// priceDown: {
//   color: "#ef4444", // RED 📉
// },

//   centerBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     // Purana: #30055a -> Naya: Transparent effect ya dark teal
//     backgroundColor: "rgba(16, 78, 100, 0.4)", // Thoda transparent teal jaisa image mein hai
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#104e64", // Border line for better look
//   },

//   liveRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },

//   liveText: {
//     color: "#ff4d4d", // 'Live' text ko thoda bright rakha hai
//     fontSize: 10,
//     fontWeight: "bold",
//     textTransform: "uppercase",
//   },

//   goldLabel: {
//     color: "#ffffff",
//     fontSize: 10,
//     opacity: 0.8, // Thoda fade effect
//   },

//   goldPrice: {
//     color: "#ff4d4d", // Price ko image ki tarah red/pink tone diya hai
//     fontSize: 12,
//     fontWeight: "800",
//   },
// });








const styles = StyleSheet.create({
  /* ================= HEADER BAR ================= */
  header: {
    backgroundColor: "#062530", // 🌑 Main app background
    // height: 56,
    
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 50,
  },

  /* ================= LEFT ================= */
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  avatarBtn: {
    backgroundColor: "#104e64", // 🟦 Card color
    padding: 6,
    borderRadius: 999,
  },

  /* ================= CENTER ================= */
  centerBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(16, 78, 100, 0.45)", // glass effect
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  liveRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  liveText: {
    color: "#ff4d4d", // 🔴 LIVE indicator
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  goldLabel: {
    color: "#ffffff",
    fontSize: 10,
    opacity: 0.8,
  },

  goldPrice: {
    color: "#ffffff", // default
    fontSize: 12,
    fontWeight: "800",
  },

  /* ================= PRICE TREND ================= */
  priceUp: {
    color: "#22c55e", // 📈 Green
  },

  priceDown: {
    color: "#ef4444", // 📉 Red
  },

  /* ================= RIGHT ================= */
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconBtn: {
    backgroundColor: "#104e64",
    padding: 8,
    borderRadius: 999,
  },

  /* ================= BADGE ================= */
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#dc2626",
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },

  badgeText: {
    color: "white",
    fontSize: 9,
    fontWeight: "900",
  },
});
