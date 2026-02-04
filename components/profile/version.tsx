import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const VersionSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Version 1.0.0</Text>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 36,
//     alignItems: "center",
//   },

//   text: {
//     color: "#9ca3af", 
//     fontSize: 11,
//     textAlign: "center",
//   },
// });





const styles = StyleSheet.create({
  container: {
    marginBottom: 36,
    alignItems: "center",
    opacity: 0.7,
  },

  text: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    textAlign: "center",
  },
});
