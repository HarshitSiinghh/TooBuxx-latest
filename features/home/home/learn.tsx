// import React from "react";
// import { View, Text, StyleSheet, Image, Pressable } from "react-native";

// export const Learn = () => {
//   return (
//     <View style={styles.wrapper}>
//       <View style={styles.card}>
//         {/* Left Section */}
//         <View style={styles.left}>
//           <Text style={styles.title}>Learn in a minute</Text>

//           <Text style={styles.desc}>
           
//           </Text>

//           <Pressable style={styles.button}>
//             <Text style={styles.buttonText}>Watch</Text>
//           </Pressable>
//         </View>

//         {/* Right Section Image */}
//         <View style={styles.right}>
//           <Image
//             source={require("../../../images/gold-coin.png")}
//             style={styles.image}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// /* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   wrapper: {
//     width: "100%",
//     backgroundColor: "#1a003d",
//     marginTop: 12,
//   },

//   card: {
//     backgroundColor: "#2f2360",
//     borderRadius: 14,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     minHeight: 150,
//   },

//   left: {
//     flex: 1,
//     justifyContent: "space-between",
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "white",
//   },

//   desc: {
//     color: "#a78bfa",
//     fontSize: 12,
//     lineHeight: 16,
//     marginVertical: 10,
//   },

//   button: {
//     backgroundColor: "#4b26b4",
//     paddingVertical: 8,
//     paddingHorizontal: 22,
//     borderRadius: 10,
//     alignSelf: "flex-start",
//   },

//   buttonText: {
//     color: "white",
//     fontWeight: "600",
//     fontSize: 13,
//   },

//   right: {
//     marginLeft: 10,
//   },

//   image: {
//     height: 90,
//     width: 90,
//     resizeMode: "contain",
//   },
// });





import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export  function Learn() {
  const router = useRouter();
  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity 
        activeOpacity={0.9} 
        style={styles.card}
        onPress={() => console.log('Navigate to Learn Content')}
      >
        <View style={styles.textStack}>
          <Text style={styles.title}>Learn in a minute</Text>
          
          {/* Equivalent to md:block - typically shown on larger mobile screens/tablets */}
          {width > 400 && (
            <Text style={styles.subtitle}>MASTER YOUR GOLD JOURNEY</Text>
          )}

          <TouchableOpacity 
            activeOpacity={0.7} 
            style={styles.button}
            onPress={() => console.log('Watch Now Pressed')}
          >
            <Text style={styles.buttonText}>WATCH NOW</Text>
          </TouchableOpacity>
        </View>

        <Image 
          source={require('../../../images/gold-coin.png')} 
          style={styles.coinImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    padding: 16,
  },
  card: {
    backgroundColor: '#2f2360',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 40,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  textStack: {
    flex: 1,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'rgba(216, 180, 254, 0.4)', // purple-300/40
    letterSpacing: 1.5,
  },
  button: {
    backgroundColor: '#9333ea', // purple-600
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  coinImage: {
    height: 96,
    width: 96,
    marginLeft: 16,
  },
});