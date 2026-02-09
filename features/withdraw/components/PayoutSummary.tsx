// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// type Props = {
//   amount: number;        // ₹ user entered
//   grams: number;         // calculated grams
//   pricePerGram?: number; // optional (future use)
// };

// export default function PayoutSummary({
//   amount,
//   grams,
//   pricePerGram,
// }: Props) {
//   // agar amount hi nahi dala → kuch bhi mat dikhao
//   if (!amount || amount <= 0) return null;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Payout Summary</Text>

//       <View style={styles.row}>
//         <Text style={styles.label}>You will sell</Text>
//         <Text style={styles.value}>{grams.toFixed(4)} g</Text>
//       </View>

//       {pricePerGram ? (
//         <View style={styles.row}>
//           <Text style={styles.label}>Price per gram</Text>
//           <Text style={styles.value}>₹ {pricePerGram}</Text>
//         </View>
//       ) : null}

//       <View style={styles.divider} />

//       <View style={styles.row}>
//         <Text style={styles.totalLabel}>You will receive</Text>
//         <Text style={styles.totalValue}>₹ {amount}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 20,
//     padding: 16,
//     borderRadius: 16,
//     backgroundColor: "#121212",
//     borderWidth: 1,
//     borderColor: "#2C2C2C",
//   },

//   title: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#A6A6A6",
//     marginBottom: 12,
//   },

//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },

//   label: {
//     fontSize: 13,
//     color: "#9A9A9A",
//   },

//   value: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: "#FFFFFF",
//   },

//   divider: {
//     height: 1,
//     backgroundColor: "#2C2C2C",
//     marginVertical: 10,
//   },

//   totalLabel: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#D4AF37",
//   },

//   totalValue: {
//     fontSize: 16,
//     fontWeight: "800",
//     color: "#D4AF37",
//   },
// });



// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// type Props = {
//   amount: number;         // ₹ user entered
//   grams: number;          // calculated grams
//   pricePerGram?: number; // optional
// };

// export default function PayoutSummary({
//   amount,
//   grams,
//   pricePerGram,
// }: Props) {
//   // agar amount hi nahi dala → kuch bhi mat dikhao
// const safeAmount = amount || 0;
// const safeGrams = grams || 0;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>PAYOUT SUMMARY</Text>

//       <View style={styles.contentBox}>
//         <View style={styles.row}>
//           <View>
//             <Text style={styles.label}>YOU WILL SELL</Text>
//             {/* <Text style={styles.valueGold}>{grams.toFixed(6)} g</Text> */}
//             <Text style={styles.valueGold}>{safeGrams.toFixed(6)} g</Text>
// <Text>₹ {safeAmount}</Text>

//           </View>
          
//           <View style={{ alignItems: "flex-end" }}>
//             <Text style={styles.label}>ESTIMATED PAYOUT</Text>
//             <Text style={styles.valueGreen}>₹ {amount.toLocaleString()}</Text>
//           </View>
//         </View>

//         {pricePerGram ? (
//           <>
//             <View style={styles.divider} />
//             <View style={styles.footerRow}>
//               <Text style={styles.footerLabel}>Calculated at</Text>
//               <Text style={styles.footerValue}>₹ {pricePerGram} / g</Text>
//             </View>
//           </>
//         ) : null}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 25,
//     width: "100%",
//   },

//   title: {
//     color: "#8fbac4",
//     fontSize: 10,
//     fontWeight: "800",
//     marginBottom: 10,
//     letterSpacing: 1.5,
//   },

//   contentBox: {
//     backgroundColor: "rgba(16,78,100,0.35)", // Reference estimate box color
//     borderRadius: 16,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: "#104e64",
//   },

//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   label: {
//     fontSize: 9,
//     color: "#8fbac4",
//     fontWeight: "800",
//     letterSpacing: 0.5,
//     marginBottom: 4,
//   },

//   valueGold: {
//     color: "#facc15", // Gold color from reference
//     fontSize: 18,
//     fontWeight: "900",
//   },

//   valueGreen: {
//     color: "#22c55e", // Green color for payout amount
//     fontSize: 20,
//     fontWeight: "900",
//   },

//   divider: {
//     height: 1,
//     backgroundColor: "rgba(143,186,196,0.1)",
//     marginVertical: 12,
//   },

//   footerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   footerLabel: {
//     fontSize: 10,
//     color: "#8fbac4",
//     fontWeight: "600",
//   },

//   footerValue: {
//     fontSize: 11,
//     color: "#ffffff",
//     fontWeight: "700",
//   },
// });

 import React from 'react'
 
 type Props = {}
 
 const PayoutSummary = (props: Props) => {
   return 
 }
 
 export default PayoutSummary