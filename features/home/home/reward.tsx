// import React from "react";
// import { View, Text, StyleSheet, Pressable } from "react-native";
// import { useRouter } from "expo-router";

// export const EarnReward = () => {
//   const router = useRouter();
//   return (
//     <View style={styles.section}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.heading}>Earn Rewards</Text>
//         <Text style={styles.remaining}>Spinning remaining 5</Text>
//       </View>

//       {/* Info */}
//       <View style={styles.info}>
//         <Text style={styles.title}>You played all your Spin</Text>
//         <Text style={styles.subtitle}>Today spins: 0/5</Text>
//       </View>

//       {/* Action */}
//       <View style={styles.actionRow}>
//         <View style={{ flex: 1 }}>
//           <Pressable style={styles.button} onPress={()=>router.push('/spin-and-win/spin-wheel')}>
//             <Text style={styles.buttonText}>Play & Win More Rewards</Text>
//           </Pressable>

//           <View style={styles.footerRow}>
//             <Text style={styles.yellowText}>
//               Unlock your financial freedom
//             </Text>
//             <Pressable>
//               <Text style={styles.link}>Save now</Text>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// /* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   section: {
//     backgroundColor: "#1a003d",
//     padding: 12,
//     marginTop: 8,
//   },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },

//   heading: {
//     color: "white",
//     fontSize: 20,
//     fontWeight: "800",
//   },

//   remaining: {
//     color: "#d1d5db",
//     fontSize: 12,
//   },

//   info: {
//     marginBottom: 16,
//   },

//   title: {
//     color: "#d8b4fe",
//     fontSize: 18,
//     fontWeight: "700",
//   },

//   subtitle: {
//     color: "#c084fc",
//     marginTop: 4,
//     fontSize: 13,
//   },

//   actionRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   button: {
//     backgroundColor: "white",
//     paddingVertical: 10,
//     paddingHorizontal: 18,
//     borderRadius: 10,
//     alignSelf: "flex-start",
//     marginBottom: 10,
//   },

//   buttonText: {
//     color: "#2e2059",
//     fontWeight: "600",
//     fontSize: 13,
//   },

//   footerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   yellowText: {
//     color: "#facc15",
//     fontWeight: "600",
//     fontSize: 12,
//   },

//   link: {
//     color: "white",
//     fontSize: 12,
//     textDecorationLine: "underline",
//   },
// });





// import { router } from '@/.expo/types/router';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export  function EarnReward() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Earn Rewards</Text>
        <Text style={styles.remainingText}>Spinning remaining 5</Text>
      </View>

      {/* CONTENT CARD */}
      <View style={styles.card}>
        <View style={styles.mainInfo}>
          <Text style={styles.highlightText}>
            You played all your Spin
          </Text>
          <Text style={styles.subText}>Today spins: 0/5</Text>
        </View>

        {/* ACTION AREA */}
        <View style={styles.actionArea}>
          <TouchableOpacity 
            activeOpacity={0.8}
    onPress={()=>router.push('/spin-and-win/spin-wheel')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Play & Win More Rewards</Text>
          </TouchableOpacity>
          
          <Text style={styles.yellowHint}>
            Unlock your financial freedom
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a003d',
    padding: 12,
    width: '100%',
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900', // Equivalent to font-extrabold
  },
  remainingText: {
    color: '#d1d5db',
    fontSize: 12,
  },
  card: {
    // In React Native, we apply the card styles directly if it's the main container
    // Matching the desktop bg-[#2f2360] logic for mobile premium feel
    backgroundColor: '#2f2360',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  mainInfo: {
    marginBottom: 16,
  },
  highlightText: {
    color: '#d8b4fe', // purple-300
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  subText: {
    color: '#a855f7', // purple-400
    fontSize: 14,
    marginTop: 4,
  },
  actionArea: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  buttonText: {
    color: '#2e2059',
    fontWeight: '700',
    fontSize: 14,
  },
  yellowHint: {
    color: '#facc15', // yellow-400
    fontWeight: '600',
    fontSize: 12,
  },
});