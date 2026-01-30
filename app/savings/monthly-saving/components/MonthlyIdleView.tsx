import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { Info, Zap } from "lucide-react-native";
import { LinearGradient } from 'expo-linear-gradient'; // Ensure expo-linear-gradient is installed

interface IdleProps {
  localPrice: number | "";
  setLocalPrice: (val: number | "") => void;
  handleActivate: () => void;
  activating:any
}

 const MonthlyIdleView = ({ localPrice, setLocalPrice, handleActivate }: IdleProps) => {
  return (
    <View style={styles.container}>
      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.headerText}>BUILD YOUR</Text>
        <Text style={styles.headerTextGradient}>EMPIRE MONTHLY.</Text>
      </View>

      {/* Main Form Card */}
      <View style={styles.card}>
        <View style={styles.inputSection}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>MONTHLY COMMITMENT</Text>
            <Info size={14} color="#4b5563" />
          </View>

          {/* Amount Input */}
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

        {/* Preset Amount Grid */}
        <View style={styles.grid}>
          {[1000, 2500, 5000, 10000].map((amt) => {
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
                  ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Activation Button */}
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
            <Text style={styles.activateButtonText}>ACTIVATE PLAN</Text>
            <Zap size={18} color="white" fill="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: '100%',
  },
  titleContainer: {
    marginBottom: 24,
  },
  headerText: {
    fontSize: 38,
    fontWeight: '900',
    fontStyle: 'italic',
    color: 'white',
    lineHeight: 36,
    letterSpacing: -1.5,
  },
  headerTextGradient: {
    fontSize: 38,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#818cf8', // Indigo gradient approximation
    lineHeight: 36,
    letterSpacing: -1.5,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 32,
    padding: 24,
  },
  inputSection: {
    marginBottom: 24,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
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
    color: '#4b5563',
    marginRight: 10,
  },
  textInput: {
    fontSize: 42,
    fontWeight: '900',
    color: 'white',
    flex: 1,
    padding: 0,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 28,
  },
  gridButton: {
    flex: 1,
    minWidth: '22%',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 2,
  },
  gridButtonActive: {
    backgroundColor: '#4f46e5',
    borderColor: '#6366f1',
  },
  gridButtonInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  gridButtonText: {
    fontSize: 14,
    fontWeight: '900',
  },
  textWhite: { color: 'white' },
  textGray: { color: '#6b7280' },
  activateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 20,
    gap: 10,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  activateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },
});

 export default MonthlyIdleView