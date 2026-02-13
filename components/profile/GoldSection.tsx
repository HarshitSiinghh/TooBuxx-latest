

import React from "react";
import { View, Text, StyleSheet, Image, Pressable, Dimensions } from "react-native";
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
      route: "/savings/daily-saving",
      colors: ["rgba(147,51,234,0.2)", "rgba(147,51,234,0.05)"],
    },
    {
      img: require("../../images/instant-saving.png"),
      title: "Instant Savings",
      route: "/savings/instant-saving",
      colors: ["rgba(37,99,235,0.2)", "rgba(37,99,235,0.05)"],
    },
    {
      img: require("../../images/weekley-saving.webp"),
      title: "Weekly Saving",
      route: "/savings/weekly-saving",
      colors: ["rgba(22,163,74,0.2)", "rgba(22,163,74,0.05)"],
    },
    {
      img: require("../../images/box.webp"),
      title: "Monthly Savings",
      route: "/savings/monthly-saving",
      colors: ["rgba(219,39,119,0.2)", "rgba(219,39,119,0.05)"],
    },
    {
      img: require("../../images/refer-earn.png"),
      title: "Refer & Earn",
      route: "/spin-and-win/referral",
      colors: ["rgba(234,88,12,0.2)", "rgba(234,88,12,0.05)"],
    },
    {
      img: require("../../images/withdrawl.png"),
      title: "Withdraw Saving",
      route: "/savings/withdrawalFrom",
      colors: ["rgba(220,38,38,0.2)", "rgba(220,38,38,0.05)"],
    },
    {
      img: require("../../images/spins.png"),
      title: "Spins",
      route: "/spin-and-win/spin-wheel",
      colors: ["rgba(79,70,229,0.2)", "rgba(79,70,229,0.05)"],
    },
    {
      img: require("../../images/gold-coin.png"),
      title: "Deposit",
      route: "/paymentsDetails/deposite",
      colors: ["rgba(234,179,8,0.2)", "rgba(234,179,8,0.05)"],
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>GOLD SERVICES</Text>

      <View style={styles.container}>
        {goldItems.map((item, index) => (
          <Pressable 
            key={index} 
            style={styles.itemWrap} 
            onPress={() => { router.push(item.route as any) }}
          >
            <LinearGradient
              colors={item.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.item}
            >
              {/* Image Container for visibility */}
              <View style={styles.iconCircle}>
                <Image source={item.img} style={styles.image} />
              </View>
              
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




// const styles = StyleSheet.create({
//   wrapper: {
//     marginTop: 20,
//     paddingHorizontal: 16,
//     marginBottom: 10,
//   },

//   heading: {
//     fontSize: 10,
//     fontWeight: "900",
//     color: "#",
//      paddingVertical:40,
//     letterSpacing: 2,
//     marginBottom: 12,
//     marginLeft: 4,
//   },

//   container: {
//     backgroundColor: "rgba(47, 35, 96, 0.4)", // Dark semi-transparent purple
//     borderRadius: 28,
//     padding: 10,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.05)",
//   },

//   itemWrap: {
//     width: "23.5%", // 4 items per row layout
//     marginBottom: 12,
//   },

//   item: {
//     alignItems: "center",
//     justifyContent: "flex-start",
//     borderRadius: 20,
//     paddingVertical: 12,
//     paddingHorizontal: 4,
//     height: 110, // Increased height to accommodate larger images
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.08)",
//   },

//   iconCircle: {
//     width: 48, // Background circle for icons
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: "rgba(255,255,255,0.03)",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 8,
//   },

//   image: {
//     width: 40, // Increased from 32
//     height: 40,
//     resizeMode: "contain",
//   },

//   title: {
//     color: "#d1d5db",
//     fontSize: 9, // Slightly smaller font to allow bigger image space
//     fontWeight: "800",
//     textAlign: "center",
//     textTransform: "uppercase",
//     letterSpacing: 0.3,
//     lineHeight: 11,
//   },
// });




const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  heading: {
    fontSize: 10,
    fontWeight: "900",
    color: "#facc15",
    letterSpacing: 2,
    marginBottom: 12,
    marginLeft: 6,
  },

  container: {
    backgroundColor: "#0b3442",
    borderRadius: 28,
    padding: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  itemWrap: {
    width: "23.5%", // 4 per row
    marginBottom: 14,
  },

  item: {
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 6,
    height: 116,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  image: {
    width: 42,
    height: 42,
    resizeMode: "contain",
  },

  title: {
    color: "#8fbac4",
    fontSize: 9,
    fontWeight: "900",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    lineHeight: 12,
  },
});
