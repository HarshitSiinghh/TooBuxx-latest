import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  Wallet,
  ArrowUpRight,
  Landmark,
  Info,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react-native';
// import { useReducer } from 'react';
// import { useRouter } from '@/.expo/types/router';

import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function WithdrawalForm() {
  const [amount, setAmount] = useState("");
  const availableBalance = 12450.75;
 const router = useRouter();
  const handleWithdraw = () => {
    console.log("Withdrawal Requested:", amount);
  };

  const calculateFees = () => (Number(amount) * 0.005).toFixed(2);
  const calculatePayout = () => (Number(amount) * 0.995).toFixed(2);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={[styles.bgOrb, styles.topOrb]} />
      <View style={[styles.bgOrb, styles.bottomOrb]} />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            onPress={() =>router.back()}
            style={styles.backButton}
          >
            <ArrowLeft color="#9ca3af" size={20} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>WITHDRAW FUNDS</Text>
            <Text style={styles.headerSub}>INSTANT PAYOUT HUB</Text>
          </View>
        </View>
        <Info color="#4b5563" size={20} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- BALANCE OVERVIEW CARD --- */}
        <View style={styles.balanceCard}>
          <View>
            <Text style={styles.balanceLabel}>AVAILABLE FOR WITHDRAWAL</Text>
            <Text style={styles.balanceValue}>₹{availableBalance.toLocaleString()}</Text>
          </View>
          <View style={styles.walletIconBox}>
            <Wallet color="#a855f7" size={32} />
          </View>
        </View>

        {/* --- WITHDRAWAL FORM --- */}
        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <View style={styles.transactionIconBox}>
              <ArrowUpRight color="#818cf8" size={24} />
            </View>
            <View>
              <Text style={styles.formTitle}>TRANSACTION DETAILS</Text>
              <Text style={styles.formSubTitle}>Funds will be credited to your bank</Text>
            </View>
          </View>

          <View style={styles.inputSection}>
            <View style={styles.inputHeader}>
              <Text style={styles.inputLabel}>ENTER AMOUNT</Text>
              <View style={styles.currencyBadge}>
                <Text style={styles.currencyText}>INR</Text>
              </View>
            </View>
            
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor="#374151"
              keyboardType="numeric"
            />

            <View style={styles.percentageContainer}>
              {[0.25, 0.5, 1].map((percent) => (
                <TouchableOpacity
                  key={percent}
                  onPress={() => setAmount((availableBalance * percent).toFixed(2))}
                  style={styles.percentButton}
                >
                  <Text style={styles.percentButtonText}>
                    {percent === 1 ? 'MAX' : `${percent * 100}%`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bank Info */}
          <View style={styles.bankInfoCard}>
            <View style={styles.bankInfoLeft}>
              <View style={styles.bankIconBox}>
                <Landmark color="#818cf8" size={20} />
              </View>
              <View>
                <Text style={styles.bankLabel}>DESTINATION BANK</Text>
                <Text style={styles.bankName}>HDFC Bank •••• 9901</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.changeText}>CHANGE</Text>
            </TouchableOpacity>
          </View>

          {/* Fees Breakdown */}
          <View style={styles.breakdown}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Withdrawal Fee (0.5%)</Text>
              <Text style={styles.breakdownValue}>- ₹{calculateFees()}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.breakdownRow}>
              <Text style={styles.netPayoutLabel}>NET PAYOUT AMOUNT</Text>
              <Text style={styles.netPayoutValue}>₹{calculatePayout()}</Text>
            </View>
          </View>

          {/* Action Area */}
          <View style={styles.footerAction}>
            <View style={styles.alertBox}>
              <AlertCircle color="#818cf8" size={18} />
              <Text style={styles.alertText}>
                TRANSFERS ARE PROCESSED WITHIN 2-4 HOURS. BANK HOLIDAYS MAY AFFECT PROCESSING TIMES.
              </Text>
            </View>

            <TouchableOpacity 
              onPress={handleWithdraw}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>CONFIRM WITHDRAWAL</Text>
            </TouchableOpacity>

            <View style={styles.secureBadge}>
              <ShieldCheck color="rgba(34, 197, 94, 0.5)" size={14} />
              <Text style={styles.secureText}>VERIFIED SECURE TRANSACTION</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.copyrightText}>© 2026 XYZ GOLD FINTECH SOLUTIONS</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a003d',
  },
  bgOrb: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.1,
  },
  topOrb: {
    top: -50,
    right: -50,
    width: width * 0.8,
    height: width * 0.7,
    backgroundColor: '#9333ea',
  },
  bottomOrb: {
    bottom: -100,
    left: -50,
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: '#4f46e5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(26, 0, 61, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerText: {
    marginLeft: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  headerSub: {
    color: '#a855f7',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 2,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  balanceCard: {
    backgroundColor: '#240056',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  balanceLabel: {
    color: '#d8b4fe',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 8,
  },
  balanceValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  walletIconBox: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 24,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 12,
  },
  transactionIconBox: {
    padding: 10,
    backgroundColor: 'rgba(129, 140, 248, 0.1)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(129, 140, 248, 0.2)',
  },
  formTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  formSubTitle: {
    color: '#6b7280',
    fontSize: 9,
    fontWeight: 'bold',
  },
  inputSection: {
    marginBottom: 30,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputLabel: {
    color: '#6b7280',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 2,
  },
  currencyBadge: {
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  currencyText: {
    color: '#a855f7',
    fontSize: 9,
    fontWeight: '900',
  },
  amountInput: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
  },
  percentageContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },
  percentButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  percentButtonText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  bankInfoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 30,
  },
  bankInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bankIconBox: {
    padding: 10,
    backgroundColor: 'rgba(129, 140, 248, 0.1)',
    borderRadius: 12,
  },
  bankLabel: {
    color: '#6b7280',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },
  bankName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  changeText: {
    color: '#a855f7',
    fontSize: 9,
    fontWeight: '900',
  },
  breakdown: {
    gap: 12,
    paddingHorizontal: 8,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  breakdownLabel: {
    color: '#6b7280',
    fontSize: 10,
    fontWeight: 'bold',
  },
  breakdownValue: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    width: '100%',
  },
  netPayoutLabel: {
    color: '#a855f7',
    fontSize: 12,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  netPayoutValue: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
  },
  footerAction: {
    marginTop: 40,
    gap: 20,
  },
  alertBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(129, 140, 248, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(129, 140, 248, 0.1)',
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  alertText: {
    flex: 1,
    color: '#c7d2fe',
    fontSize: 9,
    fontWeight: 'bold',
    lineHeight: 14,
  },
  confirmButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 20,
    borderRadius: 32,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
  },
  secureBadge: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  secureText: {
    color: '#374151',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  copyrightText: {
    color: '#374151',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 3,
  },
});