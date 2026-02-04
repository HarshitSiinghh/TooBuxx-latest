
// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   FlatList,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Feather } from "@expo/vector-icons";
// import { useRouter, Href } from "expo-router";

// /* ================= TYPES ================= */
// interface PriceItem {
//   id: string;
//   name: string;
//   purity?: string;
//   price: number;
//   change: number;
//   colors: readonly [string, string, ...string[]];
//   route: Href;
// }

// /* ================= DATA (METALLIC LUSTRE COLORS) ================= */
// const PRICE_DATA: PriceItem[] = [
//   {
//     id: "gold",
//     name: "Gold",
//     purity: "24K",
//     price: 16708,
//     change: 0.83,route:
//     { pathname: "/metals/silver/engine" },
//     // Gold Shine
//     colors: ["#634702", "#FFD700", "#8C6A00"],
//   },
//   {
//     id: "silver",
//     name: "Silver",
//     price: 308,
//     change: 1.54,
//     route: { pathname: "/metals/silver/engine" },
//     // Silver Shine
//     colors: ["#2C2C2C", "#E8E8E8", "#4A4A4A"],
//   },
//   {
//     id: "platinum",
//     name: "Platinum",
//     price: 7708,
//     change: 3.34,
//     route: { pathname: "/metals/platinium/engine" },
//     // Platinum Shine
//     colors: ["#1A1A1A", "#7F8C8D", "#000000"],
//   },
// ];

// /* ================= CARD ================= */
// const PriceCard: React.FC<{ item: PriceItem }> = ({ item }) => {
//   const router = useRouter();

//   return (
//     <LinearGradient
//       colors={item.colors}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//       style={styles.card}
//     >
//       <View style={styles.cardInner}>
//         {/* Top Row */}
//         <View style={styles.topRow}>
//           <View style={styles.liveWrap}>
//             <View style={styles.dot} />
//             <Text style={styles.liveText}>LIVE PRICE</Text>
//           </View>

//           {item.purity ? (
//             <View style={styles.purityBadge}>
//               <Text style={styles.purity}>{item.purity}</Text>
//             </View>
//           ) : null}
//         </View>

//         {/* Metal Name & Price */}
//         <View style={styles.middleRow}>
//           <Text style={styles.metalName}>{item.name}</Text>
//           <Text style={styles.price}>
//             ₹{item.price.toLocaleString("en-IN")}
//           </Text>
//         </View>

//         {/* Bottom Row */}
//         <View style={styles.bottomRow}>
//           <View style={styles.changeWrap}>
//             <Feather name="trending-up" size={12} color="#2ecc71" />
//             <Text style={styles.change}>+{item.change}%</Text>
//           </View>

//           <Pressable
//             style={styles.btn}
//             onPress={() => router.push(item.route)}
//           >
//             <Text style={styles.btnText}>BUY NOW</Text>
//           </Pressable>
//         </View>
//       </View>
//     </LinearGradient>
//   );
// };

// /* ================= SCREEN ================= */
// const LivePriceCards: React.FC = () => {
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={PRICE_DATA}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <PriceCard item={item} />}
//         ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
//         showsVerticalScrollIndicator={false}
//         scrollEnabled={false}
//       />
//     </View>
//   );
// };

// export default LivePriceCards;

// /* ================= STYLES ================= */

// // export default LivePriceCards;
// /* ================= STYLES ================= */const styles = StyleSheet.create({
//   container: {
//     padding: 12, // 16 se 12 kiya
//     backgroundColor: "#062530", 
//   },
//   card: {
//     borderRadius: 14, // 20 se 14 kiya
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.15)',
//   },
//   cardInner: {
//     padding: 12, // Sabse important: 18 se 12 kiya (Height shrink hogi)
//     backgroundColor: 'rgba(0,0,0,0.12)', 
//   },
//   topRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   liveWrap: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     paddingHorizontal: 6, // 8 se 6
//     paddingVertical: 3,   // 4 se 3
//     borderRadius: 5,
//     gap: 4,
//   },
//   dot: {
//     width: 5, // 6 se 5
//     height: 5,
//     borderRadius: 5,
//     backgroundColor: "#FF4B4B", 
//     shadowColor: '#FF4B4B',
//     shadowRadius: 3,
//     shadowOpacity: 0.8,
//   },
//   liveText: {
//     color: "#fff",
//     fontSize: 9, // 10 se 9
//     fontWeight: '800',
//     letterSpacing: 0.5,
//   },
//   purityBadge: {
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     paddingHorizontal: 6,
//     paddingVertical: 1,
//     borderRadius: 5,
//   },
//   purity: {
//     color: "#fff",
//     fontSize: 9, // 11 se 9
//     fontWeight: '700',
//   },
//   middleRow: {
//     marginVertical: 6, // 12 se kam karke 6 kiya (Space bachegi)
//   },
//   metalName: {
//     color: 'rgba(255,255,255,0.7)',
//     fontSize: 10, // 12 se 10
//     fontWeight: '700',
//     letterSpacing: 0.8,
//   },
//   price: {
//     color: "#fff",
//     fontSize: 22, // 30 se 22 kiya (Major height reduction)
//     fontWeight: "800",
//     textShadowColor: 'rgba(0, 0, 0, 0.4)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 3,
//   },
//   bottomRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 2, // 4 se 2
//   },
//   changeWrap: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 3,
//   },
//   change: {
//     color: "#2ecc71",
//     fontSize: 12, // 14 se 12
//     fontWeight: "700",
//   },
//   btn: {
//     backgroundColor: "#fff", 
//     paddingHorizontal: 12, // 16 se 12
//     paddingVertical: 5,    // 8 se 5
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 2,
//     marginBottom:10,
//   },
//   btnText: {
//     color: "#000",
//     fontSize: 10, // 12 se 10
//     fontWeight: "800",
//   },
// });




import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useRouter, Href } from "expo-router";

/* ================= TYPES ================= */
interface PriceItem {
  id: string;
  name: string;
  purity?: string;
  price: number;
  change: number;
  colors: readonly [string, string, ...string[]];
  route: Href;
}

/* ================= DATA ================= */
const PRICE_DATA: PriceItem[] = [
  {
    id: "gold",
    name: "Gold",
    purity: "24K",
    price: 16708,
    change: 0.83,
    route: { pathname: "/metals/silver/engine" },
    colors: ["#634702", "#FFD700", "#8C6A00"],
  },
  {
    id: "silver",
    name: "Silver",
    price: 308,
    change: 1.54,
    route: { pathname: "/metals/silver/engine" },
    colors: ["#2C2C2C", "#E8E8E8", "#4A4A4A"],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 7708,
    change: 3.34,
    route: { pathname: "/metals/platinium/engine" },
    colors: ["#1A1A1A", "#7F8C8D", "#000000"],
  },
];

/* ================= CARD ================= */
const PriceCard: React.FC<{ item: PriceItem }> = ({ item }) => {
  const router = useRouter();

  return (
    <LinearGradient
      colors={item.colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.cardInner}>
        {/* Percentage Change moved to Corner */}
        <View style={styles.changeWrap}>
          <Feather name="trending-up" size={12} color="#2ecc71" />
          <Text style={styles.change}>+{item.change}%</Text>
        </View>

        {/* Top Row */}
        <View style={styles.topRow}>
          <View style={styles.liveWrap}>
            <View style={styles.dot} />
            <Text style={styles.liveText}>LIVE PRICE</Text>
          </View>

          {item.purity ? (
            <View style={styles.purityBadge}>
              <Text style={styles.purity}>{item.purity}</Text>
            </View>
          ) : null}
        </View>

        {/* Metal Name & Price */}
        <View style={styles.middleRow}>
          <Text style={styles.metalName}>{item.name}</Text>
          <Text style={styles.price}>
            ₹{item.price.toLocaleString("en-IN")}
          </Text>
        </View>

        {/* Bottom Row */}
        <View style={styles.bottomRow}>
          <View /> 
          <Pressable
            style={styles.btn}
            onPress={() => router.push(item.route)}
          >
            <Text style={styles.btnText}>BUY NOW</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

/* ================= SCREEN ================= */
const LivePriceCards: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={PRICE_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PriceCard item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};

export default LivePriceCards;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#062530", 
  },
  card: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  cardInner: {
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.12)', 
    position: 'relative', // Added for absolute positioning of child
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 60, // Space so it doesn't hit the percentage corner
  },
  liveWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    gap: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#FF4B4B", 
    shadowColor: '#FF4B4B',
    shadowRadius: 3,
    shadowOpacity: 0.8,
  },
  liveText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  purityBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 5,
  },
  purity: {
    color: "#fff",
    fontSize: 9,
    fontWeight: '700',
  },
  middleRow: {
    marginVertical: 6,
  },
  metalName: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  price: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
  },
  changeWrap: {
    position: 'absolute', // Positioned in corner
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    zIndex: 10,
  },
  change: {
    color: "#2ecc71",
    fontSize: 12,
    fontWeight: "700",
  },
  btn: {
    backgroundColor: "#fff", 
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 10,
  },
  btnText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "800",
  },
});