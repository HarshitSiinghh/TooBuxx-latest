

import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Animated,
  Easing,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MoveLeft, FileClock, Loader2, ShieldCheck } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const PendingKYC = () => {
  const router = useRouter();
  
  // ✅ Animation logic preserved
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          hitSlop={20} 
          onPress={() => router.back()}
          style={styles.backCircle}
        >
          <MoveLeft size={20} color="#9ca3af" />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>KYC STATUS</Text>
          <Text style={styles.headerSub}>Identity Trust Center</Text>
        </View>

        <View style={styles.sslBadge}>
           <ShieldCheck size={12} color="#4ade80" />
           <Text style={styles.sslText}>SECURE</Text>
        </View>
      </View>

      <View style={styles.content}>

        <View style={styles.card}>

          {/* ICON */}
          <View style={styles.iconWrapper}>
             <Animated.View style={[styles.pingEffect, { transform: [{ scale: pulseAnim }] }]} />
             <View style={styles.iconCircle}>
                <FileClock size={40} color="#facc15" strokeWidth={1.5} />
             </View>
          </View>

          {/* TEXT */}
          <View style={styles.textWrapper}>
            <Text style={styles.mainTitle}>KYC UNDER REVIEW</Text>
            <View style={styles.messageBox}>
              <Text style={styles.description}>
                OUR COMPLIANCE TEAM IS CURRENTLY <Text style={styles.highlight}>VERIFYING YOUR DOCUMENTS</Text>. 
                PLEASE WAIT UNTIL THE PROCESS IS COMPLETE.
              </Text>
            </View>
          </View>

          {/* STATUS */}
          <View style={styles.statusContainer}>
             <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Loader2 color="#facc15" size={16} />
             </Animated.View>
             <Text style={styles.statusText}>VERIFICATION IN PROGRESS</Text>
          </View>

          {/* BUTTON */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>RETURN TO DASHBOARD</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.bankGradeText}>BANK GRADE SECURITY</Text>
    </SafeAreaView>
  );
};

export default PendingKYC;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a003d',
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  backCircle: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 8
  },
  headerTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  headerTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  headerSub: {
    color: '#a855f7',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  sslBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74,222,128,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  sslText: {
    color: '#4ade80',
    fontSize: 8,
    fontWeight: '900',
  },

  /* CONTENT */
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  /* MAIN CARD */
  card: {
    backgroundColor: "#160531",
    borderRadius: 28,
    padding: 36,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  /* ICON */
  iconWrapper: {
    width: 100,
    height: 100,
    marginBottom: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  pingEffect: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.25)",
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1a003d",
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  /* TEXT */
  textWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  messageBox: {
    marginTop: 15,
  },
  description: {
    color: '#9ca3af',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  highlight: {
    color: '#facc15',
    fontWeight: 'bold',
  },

  /* STATUS */
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 40,
  },
  statusText: {
    color: '#facc15',
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },

  /* BUTTON */
  backButton: {
    width: '100%',
    backgroundColor: "#1a003d",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  backButtonText: {
    color: 'white',
    fontWeight: '900',
    letterSpacing: 2,
    fontSize: 11,
  },

  /* FOOTER */
  bankGradeText: {
    textAlign: 'center',
    color: '#374151',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 4,
    marginBottom: 20,
  },
});