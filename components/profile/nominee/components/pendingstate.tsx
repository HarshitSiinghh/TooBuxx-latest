import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { MoveLeft, Clock, ShieldAlert } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const PendingKYC = ({   }) => {
  // Logic: Pulse animation for the pending icon
  const pulseAnim = useRef(new Animated.Value(1)).current;

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
  }, []);
const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* --- PREMIUM HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity hitSlop={20}  onPress={()=>router.push("/(tabs)")} >
          <MoveLeft size={20}      color="#9ca3af" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}> NOMINEE KYC STATUS</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          {/* Status Icon */}
          <Animated.View style={[styles.iconContainer, { transform: [{ scale: pulseAnim }] }]}>
            <View style={styles.iconCircle}>
              <Clock size={60} color="#c084fc" strokeWidth={1.5} />
            </View>
            <View style={styles.statusBadge}>
              <ShieldAlert size={16} color="white" />
            </View>
          </Animated.View>

          {/* Text Content */}
          <View style={styles.textWrapper}>
            <Text style={styles.mainTitle}>Verification Pending</Text>
            <View style={styles.messageBox}>
              <Text style={styles.description}>
                Your  <Text style={styles.highlight}> Nominee KYC is pending</Text>. 
                Please wait until it is approved by our compliance team.
              </Text>
            </View>
          </View>

          {/* Info Footer */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Typically takes 24-48 hours for review.
            </Text>
          </View>

          {/* Action Button */}
          <TouchableOpacity 
            style={styles.backButton}
        
          >
            <Text style={styles.backButtonText}   onPress={()=>router.push("/(tabs)")}>BACK TO DASHBOARD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a003d',
    
    paddingVertical: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#2f2360',
    borderRadius: 40,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    shadowColor: '#a855f7',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 10,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 30,
  },
  iconCircle: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: '#1a003d',
    borderWidth: 2,
    borderColor: 'rgba(168, 85, 247, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#eab308', // Amber color for "pending/warning"
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#2f2360',
  },
  textWrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  mainTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  messageBox: {
    paddingHorizontal: 10,
  },
  description: {
    color: 'rgba(216, 180, 254, 0.7)',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  highlight: {
    color: '#c084fc',
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: 'rgba(26, 0, 61, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 40,
  },
  infoText: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  backButton: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButtonText: {
    color: 'white',
    fontWeight: '900',
    letterSpacing: 2,
    fontSize: 12,
  },
});

export default PendingKYC;