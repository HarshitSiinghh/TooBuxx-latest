import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import { Info, Zap } from "lucide-react-native";
// If using Expo: import { LinearGradient } from 'expo-linear-gradient';
// If bare React Native: import LinearGradient from 'react-native-linear-gradient';

interface IdleProps {
  localPrice: number | "";
  setLocalPrice: (val: number | "") => void;
  handleActivate: () => void;
}

 const WeeklyIdleView = ({ localPrice, setLocalPrice, handleActivate }: IdleProps) => {
  const quickAmounts = [500, 1000, 2500, 5000, 10000];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.titleLine}>ACCELERATE</Text>
        {/* Note: Native doesn't support gradient text easily without extra libs, 
            so we use a themed color here */}
        <Text style={[styles.titleLine, styles.highlightText]}>WEEKLY.</Text>
        <Text style={styles.subtitle}>
          Frequent deposits reduce market risk and build reserves faster.
        </Text>
      </View>

      {/* Input Card */}
      <View style={styles.card}>
        <View style={styles.inputHeader}>
          <Text style={styles.inputLabel}>SELECT WEEKLY DEPOSIT</Text>
          <Info size={14} color="#4b5563" />
        </View>

        {/* Amount Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            style={styles.textInput}
            value={localPrice === "" ? "" : localPrice.toString()}
            placeholder="0.00"
            placeholderTextColor="#1f2937"
            keyboardType="numeric"
            onChangeText={(val) => setLocalPrice(val === "" ? "" : Number(val))}
          />
        </View>

        {/* Quick Select Grid */}
        <View style={styles.grid}>
          {quickAmounts.map((amt) => {
            const isSelected = localPrice === amt;
            return (
              <TouchableOpacity
                key={amt}
                onPress={() => setLocalPrice(amt)}
                style={[
                  styles.gridItem,
                  isSelected ? styles.gridItemActive : styles.gridItemInactive
                ]}
              >
                <Text style={[
                  styles.gridText,
                  isSelected ? styles.gridTextActive : styles.gridTextInactive
                ]}>
                  ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity 
          onPress={handleActivate}
          activeOpacity={0.8}
          style={styles.activateBtn}
        >
          {/* If using LinearGradient, wrap the content with it */}
          <Text style={styles.activateBtnText}>ACTIVATE WEEKLY SIP</Text>
          <Zap size={20} color="white" fill="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};


 export default WeeklyIdleView
const styles = StyleSheet.create({
  container: {
    gap: 24,
    maxWidth: 600,
  },
  header: {
    gap: 8,
  },
  titleLine: {
    fontSize: 40,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#FFFFFF',
    lineHeight: 40,
    letterSpacing: -1,
  },
  highlightText: {
    color: '#818cf8', // Indigo-400 fallback for gradient
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    maxWidth: 300,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 32,
    padding: 24,
    gap: 24,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#6b7280',
    letterSpacing: 1.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 8,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '900',
    color: '#374151',
    marginRight: 12,
  },
  textInput: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FFFFFF',
    flex: 1,
    padding: 0,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridItem: {
    flex: 1,
    minWidth: '30%', // Grid-like behavior
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  gridItemActive: {
    backgroundColor: '#4f46e5',
    borderColor: '#6366f1',
  },
  gridItemInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  gridText: {
    fontSize: 12,
    fontWeight: '900',
  },
  gridTextActive: { color: '#FFFFFF' },
  gridTextInactive: { color: '#6b7280' },
  activateBtn: {
    backgroundColor: '#4f46e5',
    flexDirection: 'row',
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  activateBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    fontStyle: 'italic',
  },
});