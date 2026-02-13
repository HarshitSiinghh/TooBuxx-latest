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
    width: "100%",
    padding: 16,
    backgroundColor: "#062530",
  },

  card: {
    backgroundColor: "#0b3442", // glass card
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#104e64",
    paddingVertical: 40,
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },

  textStack: {
    flex: 1,
    gap: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ffffff",
  },

  subtitle: {
    fontSize: 10,
    fontWeight: "900",
    color: "#8fbac4",
    letterSpacing: 1.5,
  },

  button: {
    backgroundColor: "#facc15",
    alignSelf: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 4,

    shadowColor: "#facc15",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },

  buttonText: {
    color: "#062530",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  coinImage: {
    height: 96,
    width: 96,
    marginLeft: 16,
    opacity: 0.95,
  },
});
