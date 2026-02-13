import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import  { useEffect, useState } from "react";
import LottieView from "lottie-react-native";

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
import LivePriceCards from "./home/PriceCard";
 import PortfolioSummary from "./home/PortfolioSummary";
export default function Home() {


   const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fake loading (ya api load hone tak)
    
      setLoading(false);
    ; // 1.5 sec loader
  }, []);
  if (loading) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#062530",
      }}
    >
      <LottieView
        source={require("../../assets/gold.json")}
        autoPlay
        loop
        style={{ width: 180, height: 180 }}
      />
    </View>
  );
}

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

        {/* <Plan /> */}
        {/* <LivePriceCards/> */}
        {/* <PortfolioSummary/> */}
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
    // backgroundColor: "#1a003d",


    backgroundColor: "#062530",
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
