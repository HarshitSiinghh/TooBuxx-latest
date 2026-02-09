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


const styles = StyleSheet.create({
  wrapper: {
    marginTop: 12,
    backgroundColor: "#062530",
  },

  card: {
    backgroundColor: "#104e64",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",

    // subtle depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  left: {
    flex: 1,
    gap: 10,
  },

  heading: {
    color: "#facc15", // gold
    fontWeight: "800",
    borderBottomWidth: 2,
    borderBottomColor: "#facc15",
    alignSelf: "flex-start",
    paddingBottom: 2,
    fontSize: 13,
  },

  white: {
    color: "#ffffff",
  },

  title: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },

  yellow: {
    color: "#facc15",
  },

  referBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#facc15", // gold CTA
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
    color: "#062530", // dark teal text
    fontWeight: "800",
    fontSize: 12,
  },

  right: {
    marginLeft: 10,
  },

  image: {
    width: 110,
    height: 90,
    resizeMode: "contain",
    opacity: 0.95,
  },
});
