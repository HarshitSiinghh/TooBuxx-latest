import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
export const Plan = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Gold <Text style={styles.white}>Saving Plans</Text>
      </Text>

      {/* ===== Plan 1 ===== */}
      <LinearGradient
        colors={["#5f37cb", "#9b59b6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.left}>
          <View style={styles.iconWrap}>
            <Image
              source={require("../../../images/box1.webp")}
              style={styles.planImg}
            />
          </View>

         <Pressable onPress={()=>router.push('/savings/daily-savings')}> 

           <View>
            <Text style={styles.title}>Save Daily</Text>

            <View style={styles.row}>
              <Text style={styles.subText}>Start from</Text>
              <Feather name="dollar-sign" size={14} color="white" />
              <Text style={styles.subText}>500/day</Text>
            </View>
          </View>
         </Pressable>
        </View>

        <View style={styles.rightIcon}>
          <Feather name="chevron-right" size={18} color="white" />
        </View>
      </LinearGradient>

      {/* ===== Plan 2 ===== */}
      <LinearGradient
        colors={["#d4a017", "#ffdf6b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.left}>
          <View style={styles.iconWrap}>
            <Image
              source={require("../../../images/box1.webp")}
              style={styles.planImg}
            />
          </View>

       <Pressable onPress={()=>router.push('/savings/monthly')}>

           <View>
            <Text style={styles.title}>Save Monthly</Text>

            <View style={styles.row}>
              <Text style={styles.subText}>Start from</Text>
              <Feather name="dollar-sign" size={14} color="white" />
              <Text style={styles.subText}>5000/month</Text>
            </View>
          </View>
       </Pressable>
        </View>

        <View style={styles.rightIcon}>
          <Feather name="chevron-right" size={18} color="white" />
        </View>
      </LinearGradient>

      {/* ===== Plan 3 ===== */}
      <LinearGradient
        colors={["#11998e", "#38ef7d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.left}>
          <View style={styles.iconWrap}>
            <Image
              source={require("../../../images/box1.webp")}
              style={styles.planImg}
            />
          </View>
<Pressable onPress={()=>router.push('/savings/instant-saving')}>


  
          <View>
            <Text style={styles.title}>Flexible Saving</Text>

            <View style={styles.row}>
              <Text style={styles.subText}>Start from</Text>
              <Feather name="dollar-sign" size={14} color="white" />
              <Text style={styles.subText}>Any amount</Text>
            </View>
          </View>
</Pressable>
        </View>

        <View style={styles.rightIcon}>
          <Feather name="chevron-right" size={18} color="white" />
        </View>
      </LinearGradient>
    </View>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a003d",
    padding: 16,
    marginTop: 8,
  },

  heading: {
    color: "#facc15",
    fontWeight: "700",
    marginBottom: 12,
    fontSize: 15,
  },

  white: {
    color: "white",
  },

  card: {
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    minHeight: 100,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconWrap: {
    height: 56,
    width: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  planImg: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },

  title: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },

  subText: {
    color: "white",
    fontSize: 12,
  },

  rightIcon: {
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
});





