



import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
} from 'react-native';
import { Info, Zap } from "lucide-react-native";
import { LinearGradient } from 'expo-linear-gradient';

interface IdleProps {
  localPrice: number | "";
  setLocalPrice: (val: number | "") => void;
  handleActivate: () => void;
}

 const SipIdleView = ({ localPrice, setLocalPrice, handleActivate }: IdleProps) => {
  return (
    <View style={styles.container}>
      {/* Hero Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>SMALL STEPS.</Text>
        <Text style={styles.headerTextGradient}>GIANT WEALTH.</Text>
      </View>

      {/* Main Card */}
      <View style={styles.card}>
        <View style={styles.inputSection}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>SELECT DAILY INVESTMENT</Text>
            <Info size={14} color="#4b5563" />
          </View>

          {/* Currency Input Container */}
          <View style={styles.inputWrapper}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.textInput}
              value={localPrice === "" ? "" : String(localPrice)}
              onChangeText={(val) => setLocalPrice(val === "" ? "" : Number(val))}
              placeholder="0.00"
              placeholderTextColor="#374151"
              keyboardType="numeric"
              selectionColor="#6366f1"
            />
          </View>
        </View>

        {/* Amount Presets Grid */}
        <View style={styles.grid}>
          {[10, 50, 100, 500].map((amt) => {
            const isSelected = localPrice === amt;
            return (
              <TouchableOpacity
                key={amt}
                onPress={() => setLocalPrice(amt)}
                activeOpacity={0.7}
                style={[
                  styles.gridButton,
                  isSelected ? styles.gridButtonActive : styles.gridButtonInactive,
                ]}
              >
                <Text style={[
                  styles.gridButtonText,
                  isSelected ? styles.textWhite : styles.textGray
                ]}>
                  ₹{amt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Activate Button with Gradient */}
        <TouchableOpacity 
          onPress={handleActivate} 
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#4f46e5', '#2563eb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.activateButton}
          >
            <Text style={styles.activateButtonText}>ACTIVATE ENGINE</Text>
            <Zap size={20} color="white" fill="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  headerContainer: {
    gap: 4,
  },
  headerText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  headerTextGradient: {
    color: '#818cf8',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 28,
    padding: 24,
    gap: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  inputSection: {
    gap: 12,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    color: '#6b7280',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  currencySymbol: {
    color: 'white',
    fontSize: 24,
    fontWeight: '900',
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontSize: 24,
    fontWeight: '900',
    padding: 0,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  gridButtonActive: {
    backgroundColor: 'rgba(99,102,241,0.2)',
    borderColor: 'rgba(99,102,241,0.4)',
  },
  gridButtonInactive: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: 'rgba(255,255,255,0.08)',
  },
  gridButtonText: {
    fontSize: 16,
    fontWeight: '800',
  },
  textWhite: {
    color: 'white',
  },
  textGray: {
    color: '#6b7280',
  },
  activateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 18,
    borderRadius: 16,
  },
  activateButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

 export default SipIdleView