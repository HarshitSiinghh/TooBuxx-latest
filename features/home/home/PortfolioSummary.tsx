// import React from "react";



// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Pressable,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Feather } from "@expo/vector-icons"; // Visual depth ke liye
// import { useRouter } from "expo-router";

// /* ================= TYPES ================= */
// interface PortfolioItem {
//   id: string;
//   metal: string;
//   purity?: string;
//   totalSavings: number;
//   quantity: string;
//   change: number;
//   route:string,
//   colors: readonly [string, string, ...string[]];
// }

// /* ================= DATA (METALLIC SHINE COLORS) ================= */
// const PORTFOLIO_DATA: PortfolioItem[] = [
//   {
//     id: "gold",
//     metal: "GOLD",
//     purity: "24K",
//     totalSavings: 160708,
//     quantity: "24.64 g",
//     change: 0.83,
//      route:"/portfolio/GoldPort",
//     // Real Gold Shine: Dark Gold to Bright Gold to Mid Gold
//     colors: ["#734B00", "#FFD700", "#996515"], 
//   },
//   {
//     id: "silver",
//     metal: "SILVER",
//     totalSavings: 3008,
//     quantity: "204.46 g",
//     change: 1.12,
//     // Chrome/Silver Shine: Cool Greys and White highlights
//     colors: ["#434343", "#E0E0E0", "#606060"], 
   
//      route:"/portfolio/GoldPort",
//   },
//   {
//     id: "platinum",
//     metal: "PLATINUM",
//     totalSavings: 77088,
//     quantity: "204.94 g",
//     change: 3.58,
//     // Platinum: Deep Obsidian to Slate to Gunmetal
//     colors: ["#16161D", "#4B4B4B", "#0F0F0F"], 

//      route:"/portfolio/GoldPort",
//   },
// ];

// /* ================= CARD ================= */
// // const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => {


// //    const router = useRouter()
// //   return (
// //     // Metallic feel ke liye diagonal gradient (0,0 to 1,1)
// //     <LinearGradient 
// //       colors={item.colors} 
// //       start={{ x: 0, y: 0 }} 
// //       end={{ x: 1, y: 1 }} 
// //       style={styles.card}
// //     >
// //       {/* Glossy Overlay - Card ke andar ek light reflection effect */}
// //       <View style={styles.glossyEffect}>
// //         <View style={styles.header}>
// //           <Text style={styles.totalLabel}>TOTAL SAVINGS</Text>
// //           {item.purity && (
// //             <View style={styles.purityBadge}>
// //                <Text style={styles.purityText}>{item.purity}</Text>
// //             </View>
// //           )}
// //         </View>

// //         <Text style={styles.amount}>
// //           ₹{item.totalSavings.toLocaleString("en-IN")}
// //         </Text>

// //         <View style={styles.footer}>
// //           <View>
// //             <Text style={styles.metalLabel}>{item.metal}</Text>
// //             <Text style={styles.quantity}>{item.quantity}</Text>
// //           </View>

// //           <Pressable style={styles.viewBtn}>
// //             <Text style={styles.viewText}>VIEW</Text>
// //             <Feather name="chevron-right" size={12} color="#fff" />
// //           </Pressable>
// //         </View>
// //       </View>
// //     </LinearGradient>
// //   );
// // };

// /* ================= CARD ================= */
// const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => {
//   const router = useRouter();

//   // Function to handle navigation
//   const handlePress = () => {
//     // Agar aap params pass karna chahte hain (e.g. metal type) toh aise:
//     // router.push({ pathname: item.route, params: { metal: item.metal } });
//     router.push(item.route as any); 
//   };

//   return (
//     <Pressable onPress={handlePress}>
//       <LinearGradient 
//         colors={item.colors} 
//         start={{ x: 0, y: 0 }} 
//         end={{ x: 1, y: 1 }} 
//         style={styles.card}
//       >
//         <View style={styles.glossyEffect}>
//           <View style={styles.header}>
//             <Text style={styles.totalLabel}>TOTAL SAVINGS</Text>
//             {item.purity && (
//               <View style={styles.purityBadge}>
//                  <Text style={styles.purityText}>{item.purity}</Text>
//               </View>
//             )}
//           </View>

//           <Text style={styles.amount}>
//             ₹{item.totalSavings.toLocaleString("en-IN")}
//           </Text>

//           <View style={styles.footer}>
//             <View>
//               <Text style={styles.metalLabel}>{item.metal}</Text>
//               <Text style={styles.quantity}>{item.quantity}</Text>
//             </View>

//             {/* View Button now also triggers the same navigation */}
//             <View style={styles.viewBtn}>
//               <Text style={styles.viewText}>VIEW</Text>
//               <Feather name="chevron-right" size={12} color="#fff" />
//             </View>
//           </View>
//         </View>
//       </LinearGradient>
//     </Pressable>
//   );
// };






// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Pressable,
//   Platform,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Feather } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// /* ================= TYPES ================= */
// interface PortfolioItem {
//   id: string;
//   metal: string;
//   purity?: string;
//   totalSavings: number;
//   quantity: string;
//   change: number;
//   route: string; // Dynamic route for each metal
//   colors: readonly [string, string, ...string[]];
// }

// /* ================= UPDATED DATA WITH SEPARATE ROUTES ================= */
// const PORTFOLIO_DATA: PortfolioItem[] = [
//   {
//     id: "gold",
//     metal: "GOLD",
//     purity: "24K",
//     totalSavings: 160708,
//     quantity: "24.64 g",
//     change: 0.83,
//     route: "/portfolio/GoldPort", // Gold specific page
//     colors: ["#734B00", "#FFD700", "#996515"], 
//   },
//   {
//     id: "silver",
//     metal: "SILVER",
//     totalSavings: 3008,
//     quantity: "204.46 g",
//     change: 1.12,
//     route: "/portfolio/SilverPort", // Silver specific page
//     colors: ["#434343", "#E0E0E0", "#606060"], 
//   },
//   {
//     id: "platinum",
//     metal: "PLATINUM",
//     totalSavings: 77088,
//     quantity: "204.94 g",
//     change: 3.58,
//     route: "/portfolio/PlatinumPort", // Platinum specific page
//     colors: ["#16161D", "#4B4B4B", "#0F0F0F"], 
//   },
// ];

// /* ================= IMPROVED CARD COMPONENT ================= */
// const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => {
//   const router = useRouter();

//   const handlePress = () => {
//     if (item.route) {
//       router.push(item.route as any);
//     }
//   };

//   return (
//     <View style={styles.cardWrapper}>
//       <Pressable 
//         onPress={handlePress}
//         style={({ pressed }) => [
//           { transform: [{ scale: pressed ? 0.98 : 1 }], opacity: pressed ? 0.9 : 1 }
//         ]}
//       >
//         <LinearGradient 
//           colors={item.colors} 
//           start={{ x: 0, y: 0 }} 
//           end={{ x: 1, y: 1 }} 
//           style={styles.card}
//         >
//           <View style={styles.header}>
//             <View>
//               <Text style={styles.totalLabel}>TOTAL SAVINGS</Text>
//               <Text style={styles.amount}>
//                 ₹{item.totalSavings.toLocaleString("en-IN")}
//               </Text>
//             </View>
//             {item.purity && (
//               <View style={styles.purityBadge}>
//                  <Text style={styles.purityText}>{item.purity}</Text>
//               </View>
//             )}
//           </View>

//           <View style={styles.footer}>
//             <View>
//               <Text style={styles.metalLabel}>{item.metal}</Text>
//               <Text style={styles.quantity}>{item.quantity}</Text>
//             </View>

//             <View style={styles.viewBtn}>
//               <Text style={styles.viewText}>VIEW</Text>
//               <View style={styles.iconCircle}>
//                 <Feather name="chevron-right" size={12} color="#000" />
//               </View>
//             </View>
//           </View>
//         </LinearGradient>
//       </Pressable>
//     </View>
//   );
// };

// /* ================= SCREEN ================= */
// const PortfolioSummary: React.FC = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Portfolio Summary</Text>

//       <FlatList
//         data={PORTFOLIO_DATA}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <PortfolioCard item={item} />}
//         ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </View>
//   );
// };
// /* ================= SCREEN ================= */
// const PortfolioSummary: React.FC = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Portfolio Summary</Text>

//       <FlatList
//         data={PORTFOLIO_DATA}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <PortfolioCard item={item} />}
//         ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
//         showsVerticalScrollIndicator={false}
//         scrollEnabled={false}
//       />
//     </View>
//   );
// };

// export default PortfolioSummary;

// const styles = StyleSheet.create({
//   container: {
//     padding: 12, // Screen padding matched
//     backgroundColor: '#062530', 
//   },
//   heading: {
//     color: "#fff",
//     fontSize: 16, 
//     fontWeight: "700",
//     marginBottom: 12,
//     letterSpacing: 0.5,
//   },
//   card: {
//     borderRadius: 14, // PriceCard ke identical
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.15)', 
//   },
//   // Iska padding PriceCard ke cardInner (12) se exact match hai
//   glossyEffect: {
//     padding: 12, 
//     backgroundColor: 'rgba(0,0,0,0.12)', 
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     height: 18, // Height sync ki taaki line match kare
//   },
//   totalLabel: {
//     color: "rgba(255,255,255,0.6)",
//     fontSize: 10, // PriceCard ke metalName jaisa small
//     fontWeight: '700',
//     letterSpacing: 0.8,
//     textTransform: 'uppercase',
//   },
//   purityBadge: {
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     paddingHorizontal: 6,
//     paddingVertical: 1,
//     borderRadius: 5,
//   },
//   purityText: {
//     color: "#fff",
//     fontSize: 9,
//     fontWeight: '700',
//   },
//   amount: {
//     color: "#fff",
//     fontSize: 22, // PriceCard ke price (22) se exact match
//     fontWeight: "800",
//     marginVertical: 6, // PriceCard ke middleRow margin (6) jaisa
//     textShadowColor: 'rgba(0, 0, 0, 0.4)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 3,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center", // PriceCard ke bottomRow ki tarah center kiya
//     marginTop: 2, 
//   },
//   metalLabel: {
//     color: "rgba(255,255,255,0.5)",
//     fontSize: 9,
//     fontWeight: '700',
//     textTransform: 'uppercase',
//   },
//   quantity: {
//     color: "#fff",
//     fontSize: 12, // PriceCard ke change text size se match
//     fontWeight: "600",
//   },
  
//   viewBtn: {
//     backgroundColor: "rgba(255,255,255,0.2)", // Glass effect button
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 5,    
//     borderRadius: 10,
//     gap: 3,
//   },
//   viewText: {
//     color: "#fff",
//     fontSize: 10, // PriceCard btnText (10) se match
//     fontWeight: "800",
//   },
// });




import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

/* ================= TYPES ================= */
interface PortfolioItem {
  id: string;
  metal: string;
  purity?: string;
  totalSavings: number;
  quantity: string;
  route: string; // Separate route for each metal
  colors: readonly [string, string, ...string[]];
}

/* ================= DATA WITH SEPARATE ROUTES ================= */
const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "gold",
    metal: "GOLD",
    purity: "24K",
    totalSavings: 160708,
    quantity: "24.64 g",
    route: "/portfolio/GoldPort", // Gold Path
    colors: ["#734B00", "#FFD700", "#996515"], 
  },
  {
    id: "silver",
    metal: "SILVER",
    totalSavings: 3008,
    quantity: "204.46 g",
    route: "/portfolio/SilverPort", // Silver Path
    colors: ["#434343", "#E0E0E0", "#606060"], 
  },
  {
    id: "platinum",
    metal: "PLATINUM",
    totalSavings: 77088,
    quantity: "204.94 g",
    route: "/portfolio/PlatiniumPort", // Platinum Path
    colors: ["#16161D", "#4B4B4B", "#0F0F0F"], 
  },
];

/* ================= CARD ================= */
const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  const router = useRouter();

  const handlePress = () => {
    // Navigates to the unique route defined in PORTFOLIO_DATA
    router.push(item.route as any); 
  };

  return (
    <Pressable onPress={handlePress}>
      <LinearGradient 
        colors={item.colors} 
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }} 
        style={styles.card}
      >
        <View style={styles.glossyEffect}>
          <View style={styles.header}>
            <Text style={styles.totalLabel}>TOTAL SAVINGS</Text>
            {item.purity && (
              <View style={styles.purityBadge}>
                 <Text style={styles.purityText}>{item.purity}</Text>
              </View>
            )}
          </View>

          <Text style={styles.amount}>
            ₹{item.totalSavings.toLocaleString("en-IN")}
          </Text>

          <View style={styles.footer}>
            <View>
              <Text style={styles.metalLabel}>{item.metal}</Text>
              <Text style={styles.quantity}>{item.quantity}</Text>
            </View>

            <View style={styles.viewBtn}>
              <Text style={styles.viewText}>VIEW</Text>
              <Feather name="chevron-right" size={12} color="#fff" />
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

/* ================= SCREEN ================= */
const PortfolioSummary: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Portfolio Summary</Text>

      <FlatList
        data={PORTFOLIO_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PortfolioCard item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};

/* ================= STYLES (MATCHED TO YOUR UI) ================= */
const styles = StyleSheet.create({
  container: {
    padding: 12, 
    backgroundColor: '#062530', 
  },
  heading: {
    color: "#fff",
    fontSize: 16, 
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  card: {
    borderRadius: 14, 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)', 
  },
  glossyEffect: {
    padding: 12, 
    backgroundColor: 'rgba(0,0,0,0.12)', 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 18, 
  },
  totalLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 10, 
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  purityBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 5,
  },
  purityText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: '700',
  },
  amount: {
    color: "#fff",
    fontSize: 22, 
    fontWeight: "800",
    marginVertical: 6, 
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", 
    marginTop: 2, 
  },
  metalLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  quantity: {
    color: "#fff",
    fontSize: 12, 
    fontWeight: "600",
  },
  viewBtn: {
    backgroundColor: "rgba(255,255,255,0.2)", 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,    
    borderRadius: 10,
    gap: 3,
  },
  viewText: {
    color: "#fff",
    fontSize: 10, 
    fontWeight: "800",
  },
});

export default PortfolioSummary;