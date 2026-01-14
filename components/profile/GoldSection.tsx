import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
 import { useRouter } from "expo-router";

type GoldItem = {
  img: any;
  title: string;
  colors: [string, string];
  route: string;
};

export const GoldSection = () => {
  const router = useRouter();
  const goldItems: GoldItem[] = [
    {
      img: require("../../images/box.webp"),
      title: "Daily Savings",
      route :"/savings/daily-savings",
      colors: ["rgba(147,51,234,0.3)", "rgba(88,28,135,0.3) "],
      
    },
    {
      img: require("../../images/instant-saving.png"),
      title: "Instant Savings",
      route :"/savings/instant-saving",
      colors: ["rgba(37,99,235,0.3)", "rgba(30,64,175,0.3)" ],
      
    },
    {
      img: require("../../images/weekley-saving.webp"),
      title: "Weekly Saving",
      route :"/savings/weekly",
      colors: ["rgba(22,163,74,0.3)", "rgba(21,128,61,0.3)" ],
      
    },
    {
      img: require("../../images/box.webp"),
      title: "Monthly Savings",
      route :"/savings/monthly",
      colors: ["rgba(219,39,119,0.3)", "rgba(157,23,77,0.3) "],
      
    },
    {
      img: require("../../images/refer-earn.png"),
      title: "Refer & Earn",
      route :"/spin-and-win/referral",
      colors: ["rgba(234,88,12,0.3)", "rgba(154,52,18,0.3)" ],
      
    },
    {
      img: require("../../images/withdrawl.png"),
      title: "Withdraw Saving",
      route :"/savings/withdrawalFrom",
      colors: ["rgba(220,38,38,0.3)", "rgba(153,27,27,0.3)" ],
      
    },
    {
      img: require("../../images/spins.png"),
      title: "Spins",
      route :"/spin-and-win/spin-wheel",
      colors: ["rgba(79,70,229,0.3)", "rgba(55,48,163,0.3)" ],
      
    },
    {
      img: require("../../images/gold-coin.png"),
      title: "Rewards",
      route :"/profile/reward",
      colors: ["rgba(234,179,8,0.3)", "rgba(161,98,7,0.3)"] ,
      
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Gold</Text>

      <View style={styles.container}>
        {goldItems.map((item, index) => (
          <Pressable key={index} style={styles.itemWrap} 
          onPress={ ()=>{router.push(item.route as any ) }}>
            <LinearGradient
              colors={item.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.item}
            >
              <Image source={item.img} style={styles.image} />
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
            </LinearGradient>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 12,
    paddingHorizontal: 16,
  },

  heading: {
    color: "#fcd34d",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },

  container: {
    backgroundColor: "#2f2360",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  itemWrap: {
    width: "22%", // ~4 items per row
    marginBottom: 16,
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 6,
  },

  image: {
    width: 44,
    height: 44,
    resizeMode: "contain",
    marginBottom: 6,
  },

  title: {
    color: "#d1d5db",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
  },
});
