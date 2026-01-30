import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import AutoInvestCard from "../home/auto-invest";
import Header from "./header";

import { About } from "./home/about";
import { HeroSection } from "./home/hero-section";
import { Learn } from "./home/learn";
import { Plan } from "./home/plan";
import { Referral } from "./home/referal";
// import { EarnReward } from "./home/reward";
 import EarnReward from "./home/reward";
import { StartSaving } from "./home/saving";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <HeroSection />

        <View style={styles.row}>
          <EarnReward />
          <Learn />
        </View>

        <Plan />
        <About />
        {/* <SavingsSteps /> */}

        <View style={styles.row}>
          <Referral />
          <StartSaving />
        </View>

        <AutoInvestCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a003d",
  },

  scroll: {
    paddingTop: 70,
    paddingBottom: 10,
    gap: 16,
  },

  row: {
    gap: 16,
  },
});
