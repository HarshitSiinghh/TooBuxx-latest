import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const VersionSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Version 1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 36,
    alignItems: "center",
  },

  text: {
    color: "#9ca3af", 
    fontSize: 11,
    textAlign: "center",
  },
});
