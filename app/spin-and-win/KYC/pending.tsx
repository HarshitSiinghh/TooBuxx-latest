

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






// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0a001a', // ✅ global app background
//   },

//   /* HEADER */
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255,255,255,0.06)',
//     backgroundColor: '#0a001a',
//   },
//   backCircle: {
//     backgroundColor: 'rgba(255,255,255,0.06)',
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.12)',
//     padding: 8,
//   },
//   headerTextContainer: {
//     marginLeft: 15,
//     flex: 1,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '900',
//     letterSpacing: 1,
//   },
//   headerSub: {
//     color: '#818cf8', // ✅ indigo accent (app wide)
//     fontSize: 10,
//     fontWeight: '800',
//     textTransform: 'uppercase',
//   },
//   sslBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(74,222,128,0.12)',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 20,
//     gap: 4,
//     borderWidth: 1,
//     borderColor: 'rgba(74,222,128,0.25)',
//   },
//   sslText: {
//     color: '#4ade80',
//     fontSize: 8,
//     fontWeight: '900',
//     letterSpacing: 1,
//   },

//   /* CONTENT */
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },

//   /* MAIN CARD */
//   card: {
//     backgroundColor: 'rgba(255,255,255,0.04)', // ✅ glass card
//     borderRadius: 32,
//     padding: 36,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 20 },
//     shadowOpacity: 0.45,
//     shadowRadius: 30,
//     elevation: 12,
//   },

//   /* ICON */
//   iconWrapper: {
//     width: 100,
//     height: 100,
//     marginBottom: 28,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   pingEffect: {
//     position: 'absolute',
//     width: 86,
//     height: 86,
//     borderRadius: 43,
//     borderWidth: 1,
//     borderColor: 'rgba(250,204,21,0.35)',
//   },
//   iconCircle: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: 'rgba(250,204,21,0.08)',
//     borderWidth: 1,
//     borderColor: 'rgba(250,204,21,0.45)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   /* TEXT */
//   textWrapper: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   mainTitle: {
//     color: 'white',
//     fontSize: 22,
//     fontWeight: '900',
//     textAlign: 'center',
//     textTransform: 'uppercase',
//     letterSpacing: -0.5,
//   },
//   messageBox: {
//     marginTop: 16,
//   },
//   description: {
//     color: '#9ca3af',
//     fontSize: 14,
//     lineHeight: 22,
//     textAlign: 'center',
//     textTransform: 'uppercase',
//     fontWeight: '500',
//   },
//   highlight: {
//     color: '#facc15',
//     fontWeight: '900',
//   },

//   /* STATUS */
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 10,
//     marginBottom: 40,
//   },
//   statusText: {
//     color: '#facc15',
//     fontSize: 11,
//     fontWeight: '900',
//     textTransform: 'uppercase',
//     letterSpacing: 1.5,
//   },

//   /* BUTTON */
//   backButton: {
//     width: '100%',
//     backgroundColor: 'rgba(255,255,255,0.06)',
//     paddingVertical: 18,
//     borderRadius: 18,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.12)',
//   },
//   backButtonText: {
//     color: 'white',
//     fontWeight: '900',
//     letterSpacing: 2,
//     fontSize: 11,
//   },

//   /* FOOTER */
//   bankGradeText: {
//     textAlign: 'center',
//     color: '#4b5563',
//     fontSize: 10,
//     fontWeight: '900',
//     letterSpacing: 4,
//     marginBottom: 20,
//   },
// });







const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#062530",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#104e64",
    backgroundColor: "#062530",
  },
  backCircle: {
    backgroundColor: "rgba(16,78,100,0.35)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#104e64",
    padding: 8,
  },
  headerTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1,
  },
  headerSub: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  sslBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(74,222,128,0.14)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(74,222,128,0.35)",
  },
  sslText: {
    color: "#4ade80",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
  },

  /* CONTENT */
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  /* MAIN CARD */
  card: {
    backgroundColor: "#0b3442",
    borderRadius: 32,
    padding: 36,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#104e64",
    shadowColor: "#041d26",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.55,
    shadowRadius: 30,
    elevation: 12,
  },

  /* ICON */
  iconWrapper: {
    width: 100,
    height: 100,
    marginBottom: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  pingEffect: {
    position: "absolute",
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.45)",
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(250,204,21,0.12)",
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  /* TEXT */
  textWrapper: {
    alignItems: "center",
    marginBottom: 24,
  },
  mainTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: -0.5,
  },
  messageBox: {
    marginTop: 16,
  },
  description: {
    color: "#8fbac4",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  highlight: {
    color: "#facc15",
    fontWeight: "900",
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
    color: "#facc15",
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },

  /* BUTTON */
  backButton: {
    width: "100%",
    backgroundColor: "rgba(16,78,100,0.35)",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#104e64",
  },
  backButtonText: {
    color: "#ffffff",
    fontWeight: "900",
    letterSpacing: 2,
    fontSize: 11,
  },

  /* FOOTER */
  bankGradeText: {
    textAlign: "center",
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 4,
    marginBottom: 20,
  },
});
