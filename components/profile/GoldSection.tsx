// import React from "react";
// import { View, Text, StyleSheet, Image, Pressable } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
//  import { useRouter } from "expo-router";

// type GoldItem = {
//   img: any;
//   title: string;
//   colors: [string, string];
//   route: string;
// };

// export const GoldSection = () => {
//   const router = useRouter();
//   const goldItems: GoldItem[] = [
//     {
//       img: require("../../images/box.webp"),
//       title: "Daily Savings",
//       route :"/savings/daily-savings",
//       colors: ["rgba(147,51,234,0.3)", "rgba(88,28,135,0.3) "],
      
//     },
//     {
//       img: require("../../images/instant-saving.png"),
//       title: "Instant Savings",
//       route :"/savings/instant-saving",
//       colors: ["rgba(37,99,235,0.3)", "rgba(30,64,175,0.3)" ],
      
//     },
//     {
//       img: require("../../images/weekley-saving.webp"),
//       title: "Weekly Saving",
//       route :"/savings/weekly",
//       colors: ["rgba(22,163,74,0.3)", "rgba(21,128,61,0.3)" ],
      
//     },
//     {
//       img: require("../../images/box.webp"),
//       title: "Monthly Savings",
//       route :"/savings/monthly",
//       colors: ["rgba(219,39,119,0.3)", "rgba(157,23,77,0.3) "],
      
//     },
//     {
//       img: require("../../images/refer-earn.png"),
//       title: "Refer & Earn",
//       route :"/spin-and-win/referral",
//       colors: ["rgba(234,88,12,0.3)", "rgba(154,52,18,0.3)" ],
      
//     },
//     {
//       img: require("../../images/withdrawl.png"),
//       title: "Withdraw Saving",
//       route :"/savings/withdrawalFrom",
//       colors: ["rgba(220,38,38,0.3)", "rgba(153,27,27,0.3)" ],
      
//     },
//     {
//       img: require("../../images/spins.png"),
//       title: "Spins",
//       route :"/spin-and-win/spin-wheel",
//       colors: ["rgba(79,70,229,0.3)", "rgba(55,48,163,0.3)" ],
      
//     },
//     {
//       img: require("../../images/gold-coin.png"),
//       title: "Deposite",
//       route :"/paymentsDetails/deposite",
//       colors: ["rgba(234,179,8,0.3)", "rgba(161,98,7,0.3)"] ,
      
//     },
//   ];

//   return (
//     <View style={styles.wrapper}>
//       <Text style={styles.heading}>Gold</Text>

//       <View style={styles.container}>
//         {goldItems.map((item, index) => (
//           <Pressable key={index} style={styles.itemWrap} 
//           onPress={ ()=>{router.push(item.route as any ) }}>
//             <LinearGradient
//               colors={item.colors}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={styles.item}
//             >
//               <Image source={item.img} style={styles.image} />
//               <Text style={styles.title} numberOfLines={2}>
//                 {item.title}
//               </Text>
//             </LinearGradient>
//           </Pressable>
//         ))}
//       </View>
//     </View>
//   );
// };

// /* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   wrapper: {
//     marginTop: 12,
//     paddingHorizontal: 16,
//   },

//   heading: {
//     color: "#fcd34d",
//     fontSize: 14,
//     fontWeight: "700",
//     marginBottom: 8,
//   },

//   container: {
//     backgroundColor: "#2f2360",
//     borderRadius: 18,
//     padding: 14,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },

//   itemWrap: {
//     width: "22%", // ~4 items per row
//     marginBottom: 16,
//   },

//   item: {
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 14,
//     paddingVertical: 12,
//     paddingHorizontal: 6,
//   },

//   image: {
//     width: 44,
//     height: 44,
//     resizeMode: "contain",
//     marginBottom: 6,
//   },

//   title: {
//     color: "#d1d5db",
//     fontSize: 11,
//     fontWeight: "600",
//     textAlign: "center",
//   },
// });


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

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  heading: {
    fontSize: 10,
    fontWeight: "900",
    color: "#a855f7",
     paddingVertical:40,
    letterSpacing: 2,
    marginBottom: 12,
    marginLeft: 4,
  },

  container: {
    backgroundColor: "rgba(47, 35, 96, 0.4)", // Dark semi-transparent purple
    borderRadius: 28,
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  itemWrap: {
    width: "23.5%", // 4 items per row layout
    marginBottom: 12,
  },

  item: {
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 4,
    height: 110, // Increased height to accommodate larger images
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  iconCircle: {
    width: 48, // Background circle for icons
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.03)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  image: {
    width: 40, // Increased from 32
    height: 40,
    resizeMode: "contain",
  },

  title: {
    color: "#d1d5db",
    fontSize: 9, // Slightly smaller font to allow bigger image space
    fontWeight: "800",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.3,
    lineHeight: 11,
  },
});