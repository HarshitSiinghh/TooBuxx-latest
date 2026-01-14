import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
 import { useRouter } from "expo-router";

export const Referral = () => {
  const router = useRouter();
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* ========== Left Section ========== */}
        <View style={styles.left}>
          <Text style={styles.heading}>
            Refer & <Text style={styles.white}>Earn ₹100</Text>
          </Text>

          <Text style={styles.title}>
            Earn <Text style={styles.yellow}>money every day</Text>
          </Text>

          <Pressable style={styles.referBtn}  onPress={()=>router.push('/spin-and-win/referral')}>
            <Image
              source={require("../../../images/whatsapp.webp")}
              style={styles.whatsapp}
            />
            <Text style={styles.referText}>Refer Now</Text>
          </Pressable>
        </View>

        {/* ========== Right Section ========== */}
        <View style={styles.right}>
          <Image
            source={require("../../../images/refer-earn.png")}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 12,
  },

  card: {
    backgroundColor: "#2f2360",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flex: 1,
    gap: 10,
  },

  heading: {
    color: "#fcd535",
    fontWeight: "700",
    borderBottomWidth: 2,
    borderBottomColor: "#fcd535",
    alignSelf: "flex-start",
    paddingBottom: 2,
    fontSize: 13,
  },

  white: {
    color: "white",
  },

  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },

  yellow: {
    color: "#fcd535",
  },

  referBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#3a1b7a",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  whatsapp: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },

  referText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },

  right: {
    marginLeft: 10,
  },

  image: {
    width: 110,
    height: 90,
    resizeMode: "contain",
  },
});
