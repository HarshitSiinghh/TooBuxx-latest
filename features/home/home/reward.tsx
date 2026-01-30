import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export  function EarnReward() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Earn Rewards</Text>
        <Text style={styles.remainingText}>Spinning Remaining 5</Text>
      </View>

      {/* CONTENT CARD */}
      <View style={styles.card}>
        <View style={styles.mainInfo}>
          <Text style={styles.highlightText}>
            You played all your Spin
          </Text>
          <Text style={styles.subText}>Today spins: 0/5</Text>
        </View>

        {/* ACTION AREA */}
        <View style={styles.actionArea}>
          <TouchableOpacity 
            activeOpacity={0.8}
    onPress={()=>router.push('/spin-and-win/spin-wheel')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Play & Win More Rewards</Text>
          </TouchableOpacity>
          
          <Text style={styles.yellowHint}>
            Unlock your financial freedom
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a003d',
    padding: 12,
    width: '100%',
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900', // Equivalent to font-extrabold
  },
remainingText: {
  color: '#d1d5db',
  fontSize: 12,

  backgroundColor: 'rgba(209, 213, 219, 0.15)', // transparent gray
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 12,
  overflow: 'hidden', // important for Android to clip corners
},

  card: {
    // In React Native, we apply the card styles directly if it's the main 
    backgroundColor: '#2f2360',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  mainInfo: {
    marginBottom: 16,
  },
  highlightText: {
    color: '#d8b4fe', // purple-300
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  subText: {
    color: '#a855f7', // purple-400
    fontSize: 14,
    marginTop: 4,
  },
  actionArea: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  buttonText: {
    color: '#2e2059',
    fontWeight: '700',
    fontSize: 14,
  },
  yellowHint: {
    color: '#facc15', // yellow-400
    fontWeight: '600',
    fontSize: 12,
  },
});