import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
} from "react-native";

const steps = [
  {
    id: 1,
    title: "Select Your Amount.",
    description: "Choose an amount you want to save.",
    img: require("@/images/howitworks_screen1_bw.avif"),
  },
  {
    id: 2,
    title: "Choose Savings Option.",
    description: "Select Daily, Weekly, or Monthly Savings.",
    img: require("@/images/howitworks_screen2_bw.avif"),
  },
  {
    id: 3,
    title: "Enjoy Savings in 24K Gold!",
    description:
      "Share permission & watch your savings grow safely in your Gold Locker!",
    img: require("@/images/howitworks_screen3_bw.avif"),
  },
];

export default function SavingsSteps() {
  const animations = useRef(
    steps.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const anims = animations.map((anim, i) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 700,
        delay: i * 300,
        useNativeDriver: true,
      })
    );

    Animated.stagger(200, anims).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Savings Made Simple in 3 Steps!
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.stepsRow}>
          {steps.map((step, index) => {
            const translateY = animations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [40, 0],
            });

            return (
              <Animated.View
                key={step.id}
                style={[
                  styles.card,
                  {
                    opacity: animations[index],
                    transform: [{ translateY }],
                  },
                ]}
              >
                <Image source={step.img} style={styles.image} />

                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>{step.id}</Text>
                </View>

                <Text style={styles.title}>{step.title}</Text>
                <Text style={styles.desc}>{step.description}</Text>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingVertical: 30,
  },

  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 24,
  },

  stepsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 20,
  },

  card: {
    width: 260,
    backgroundColor: "#2f2360",
    borderRadius: 24,
    padding: 16,
    alignItems: "center",
  },

  image: {
    width: 220,
    height: 360,
    borderRadius: 22,
    resizeMode: "cover",
    marginBottom: 14,
  },

  numberCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#8b5cf6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  numberText: {
    color: "white",
    fontWeight: "800",
  },

  title: {
    color: "#c4b5fd",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },

  desc: {
    color: "#d1d5db",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
});
