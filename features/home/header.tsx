import React, { useState, useEffect ,useCallback} from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter,useFocusEffect } from "expo-router";
import { getGoldPriceApi } from "@/services/goldprice";

 import { useNotificationStore } from "@/store/notificationstore";
// import { useNotificationStore } from "@/store/notificationStore";

const Header = () => {
  const [goldPrice, setGoldPrice] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { inboxUnread, txnUnread, loadCounts } = useNotificationStore();
  const totalUnread = inboxUnread + txnUnread;

  // useEffect(() => {
  //   loadGoldPrice();
  //   loadCounts(); // 🔥 app open pe unread count
  // }, []);

  const loadGoldPrice = async () => {
    try {
      const res = await getGoldPriceApi();
      if (res?.success) {
        setGoldPrice(res.data?.price_per_gram);
      }
    } catch (e) {
      console.log("Gold price error:", e);
    }
  };
useFocusEffect(
useCallback(() => {
// first call when screen focused
loadGoldPrice();
loadCounts();


// auto refresh gold price every 15 sec
const interval = setInterval(() => {
loadGoldPrice();
}, 15000);


// cleanup when screen loses focus
return () => clearInterval(interval);
}, [])
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
            <Text style={styles.goldPrice}>
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











const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1a003d",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 50,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
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

  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconBtn: {
    backgroundColor: "#2a0055",
    padding: 8,
    borderRadius: 999,
  },

  avatarBtn: {
    backgroundColor: "#2a0055",
    padding: 6,
    borderRadius: 999,
  },

  centerBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#30055a",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  liveRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  liveText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  goldLabel: {
    color: "white",
    fontSize: 11,
  },

  goldPrice: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },
});
