import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  Easing,
  // SafeAreaView,
} from 'react-native';
 import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, G, ForeignObject, Defs, Filter, FeGaussianBlur, FeOffset, FeMerge, FeMergeNode, Circle } from 'react-native-svg';
import {
  Coffee, Star, Gift, User2, Award, Zap, Heart, Moon, MoveLeft,
} from 'lucide-react-native';

import { useRouter } from "expo-router";

const { width } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.85;

interface Prize {
  label: string;
  icon: any;
  color: string;
}

const prizes: Prize[] = [
  { label: "₹50", icon: Coffee, color: "rgba(248, 113, 113, 0.4)" },
  { label: "₹100", icon: Star, color: "rgba(96, 165, 250, 0.4)" },
  { label: "₹200", icon: Gift, color: "rgba(52, 211, 153, 0.4)" },
  { label: "Free Spin", icon: Award, color: "rgba(244, 114, 182, 0.4)" },
  { label: "₹500", icon: Zap, color: "rgba(251, 191, 36, 0.4)" },
  { label: "Extra Points", icon: Heart, color: "rgba(251, 113, 133, 0.4)" },
  { label: "₹1000", icon: Moon, color: "rgba(129, 140, 248, 0.4)" },
  { label: "Jackpot", icon: User2, color: "rgba(249, 115, 22, 0.4)" },
];

export default function SpinWheel() {
  const [spinning, setSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<string | null>(null);
  const spinAnim = useRef(new Animated.Value(0)).current;
  const lastRotation = useRef(0);
  const router = useRouter();

  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    setSelectedPrize(null);

    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const degreePerPrize = 360 / prizes.length;
    
    // Logic: Current rotation + 8 full turns + index offset
    const totalRotation = lastRotation.current + (360 * 8) + (prizeIndex * degreePerPrize);

    Animated.timing(spinAnim, {
      toValue: totalRotation,
      duration: 5200,
      easing: Easing.bezier(0.15, 0, 0.15, 1),
      useNativeDriver: true,
    }).start(() => {
      setSpinning(false);
      lastRotation.current = totalRotation;

      // Prize calculation logic preserved from original
      const actualIndex = prizes.length - 1 - (prizeIndex % prizes.length);
      const prize = prizes[actualIndex].label;
      setSelectedPrize(prize);

      // Navigation logic
      setTimeout(() => {
        if (["Extra Points", "Free Spin", "Jackpot"].includes(prize)) {
          // navigation.navigate('Rewards'); 
          console.log("Navigating to Rewards");
        } else {
          // navigation.navigate('Dashboard');
          console.log("Navigating to Dashboard");
        }
      }, 2500);
    });
  };

  const rotationInterpolate = spinAnim.interpolate({
    inputRange: [0, 360 * 100], // Handle high rotation values
    outputRange: ['0deg', `${360 * 100}deg`],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}  onPress={()=>router.back()}>
          <MoveLeft color="#d1d5db" size={20} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Daily Rewards</Text>
          <Text style={styles.headerSub}>LUCK WHEEL</Text>
        </View>
      </View>

      {/* Main Glass Card */}
      <View style={styles.glassCard}>
        {/* Simple Glow Effects (Replaced blur filters with opacity/radial layouts) */}
        <View style={[styles.glow, { top: -50, left: -50, backgroundColor: 'rgba(147, 51, 234, 0.15)' }]} />

        <View style={styles.wheelWrapper}>
          <Animated.View style={{ transform: [{ rotate: rotationInterpolate }] }}>
            <Svg viewBox="0 0 200 200" width={WHEEL_SIZE} height={WHEEL_SIZE}>
              {prizes.map((prize, i) => {
                const startAngle = (360 / prizes.length) * i;
                const endAngle = startAngle + 360 / prizes.length;
                const radius = 98;
                
                // SVG Path Math
                const x1 = 100 + radius * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 100 + radius * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 100 + radius * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 100 + radius * Math.sin((Math.PI * endAngle) / 180);

                const midAngle = (startAngle + endAngle) / 2;
                const iconRadius = 70;
                const iconX = 100 + iconRadius * Math.cos((Math.PI * midAngle) / 180);
                const iconY = 100 + iconRadius * Math.sin((Math.PI * midAngle) / 180);

                const Icon = prize.icon;

                return (
                  <G key={i}>
                    <Path
                      d={`M100,100 L${x1},${y1} A${radius},${radius} 0 0 1 ${x2},${y2} Z`}
                      fill={prize.color}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="0.5"
                    />
                    {/* React Native SVG doesn't support ForeignObject well, so we place icons manually */}
                    <G transform={`translate(${iconX}, ${iconY}) rotate(${midAngle + 90})`}>
                       <Icon color="rgba(255,255,255,0.8)" size={14} style={{ marginLeft: -7, marginTop: -7 }} />
                    </G>
                  </G>
                );
              })}
            </Svg>
          </Animated.View>

          {/* Pointer */}
          <View style={styles.pointerContainer}>
            <View style={styles.pointer} />
          </View>

          {/* Center Cap */}
          <View style={styles.centerCap}>
            <View style={styles.centerInner}>
               <View style={styles.centerDot} />
            </View>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          onPress={spin}
          disabled={spinning}
          activeOpacity={0.8}
          style={[styles.spinButton, spinning && styles.spinButtonDisabled]}
        >
          <Text style={[styles.spinButtonText, spinning && { color: '#6b7280' }]}>
            {spinning ? "GOOD LUCK..." : "SPIN NOW"}
          </Text>
        </TouchableOpacity>

        {selectedPrize && (
          <View style={styles.resultContainer}>
            <Text style={styles.congratsText}>CONGRATULATIONS!</Text>
            <View style={styles.prizeBox}>
              <Text style={styles.prizeText}>{selectedPrize}</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          You have <Text style={{ color: '#fff', fontWeight: 'bold' }}>1 free spin</Text> left today
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a003d',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginRight: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
  headerSub: {
    color: '#a855f7',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  glassCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 48,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 30,
    alignItems: 'center',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  wheelWrapper: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  pointerContainer: {
    position: 'absolute',
    top: -10,
    left: '50%',
    marginLeft: -15,
    zIndex: 40,
  },
  pointer: {
    width: 30,
    height: 35,
    backgroundColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    // Triangle shape
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 35,
    borderStyle: 'solid',
    // backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    transform: [{ rotate: '180deg' }]
  },
  centerCap: {
    position: 'absolute',
    width: 56,
    height: 56,
    backgroundColor: '#1a003d',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  centerInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerDot: {
    width: 8,
    height: 8,
    backgroundColor: '#a855f7',
    borderRadius: 4,
  },
  spinButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: '#6366f1', // Fallback for gradient
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinButtonDisabled: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  spinButtonText: {
    color: '#fff',
    fontWeight: '900',
    letterSpacing: 2,
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  congratsText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#9ca3af',
    letterSpacing: 3,
    marginBottom: 8,
  },
  prizeBox: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.2)',
  },
  prizeText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fbbf24',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#6b7280',
    fontSize: 12,
  },
});