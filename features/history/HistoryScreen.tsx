import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  // SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Clock,
  Plus,
  Search,
  Filter,
  ArrowLeft,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const router = useRouter();

const transactions = [
  { id: 1, name: "Deposit", date: "Oct 10, 2025", amount: "+ ₹2,000", type: "credit" },
  { id: 2, name: "Withdrawal", date: "Oct 8, 2025", amount: "- ₹500", type: "debit" },
  { id: 3, name: "Spin Reward", date: "Oct 6, 2025", amount: "+ ₹100", type: "credit" },
  { id: 4, name: "Referral Bonus", date: "Oct 2, 2025", amount: "+ ₹50", type: "credit" },
  { id: 5, name: "Monthly Interest", date: "Sep 30, 2025", amount: "+ ₹120", type: "credit" },
  { id: 6, name: "Gold Purchase", date: "Sep 25, 2025", amount: "- ₹1,000", type: "debit" },
];

export default function History() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Decorative Glows */}
      <View style={[styles.glow, styles.topGlow]} />
      <View style={[styles.glow, styles.bottomGlow]} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() =>router.back()}
          style={styles.backButton}
        >
          <ArrowLeft color="#9ca3af" size={20} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Transaction History</Text>
          <Text style={styles.headerSub}>MONITOR YOUR GOLD GROWTH</Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* PROMO CARD */}
        <View style={styles.promoCard}>
          <View style={styles.topInnerGlow} />
          <View style={styles.promoContent}>
            <View style={styles.imageContainer}>
              <Image 
                source={require('../../images/box.webp')} 
                style={styles.promoImage} 
              />
            </View> //nj
            <View style={styles.promoTextContainer}>
              <Text style={styles.promoLabel}>ACTIVE PORTFOLIO</Text>
              <Text style={styles.promoTitle}>
                Start your Gold Saving <Text style={{color: '#6b7280'}}>today</Text>
              </Text>
              <Text style={styles.promoDesc}>
                Automate your wealth and watch your 24K gold locker grow every second.
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.saveButton} activeOpacity={0.5} onPress={ ()=>router.push("/savings/daily-savings") }>
            <Plus color="#fff" size={18} strokeWidth={3} />
            <Text style={styles.saveButtonText}>SAVE DAILY</Text>
          </TouchableOpacity>
        </View>

        {/* TIMELINE SECTION */}
        <View style={styles.listSection}>
          <View style={styles.listHeader}>
            <View style={styles.timelineBadge}>
              <Clock size={14} color="#a855f7" />
              <Text style={styles.timelineBadgeText}>TIMELINE</Text>
            </View>
            <View style={styles.filterActions}>
              <TouchableOpacity style={styles.iconButton}><Search size={16} color="#9ca3af" /></TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}><Filter size={16} color="#9ca3af" /></TouchableOpacity>
            </View>
          </View>

          <View style={styles.transactionList}>
            {transactions.map((tx, index) => (
              <View 
                key={tx.id} 
                style={[
                  styles.transactionItem, 
                  index === transactions.length - 1 && { borderBottomWidth: 0 }
                ]}
              >
                <View style={styles.txLeft}>
                  <View style={[
                    styles.txIconBox,
                    tx.type === 'credit' ? styles.txCreditIcon : styles.txDebitIcon
                  ]}>
                    {tx.type === 'credit' ? (
                      <ArrowDownCircle color="#4ade80" size={22} />
                    ) : (
                      <ArrowUpCircle color="#f87171" size={22} />
                    )}
                  </View>
                  <View>
                    <Text style={styles.txName}>{tx.name}</Text>
                    <View style={styles.txDateContainer}>
                      <Clock size={10} color="#6b7280" />
                      <Text style={styles.txDate}>{tx.date}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.txRight}>
                  <Text style={[
                    styles.txAmount,
                    tx.type === 'credit' ? {color: '#4ade80'} : {color: '#f87171'}
                  ]}>
                    {tx.amount}
                  </Text>
                  <Text style={styles.txStatus}>COMPLETED</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.footerText}>
          END OF HISTORY • POWERED BY TooBux
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a003d',
  },
  glow: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.1,
  },
  topGlow: {
    // top: -height * 0.1,
    left: -width * 0.1,
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: '#9333ea',
  },
  bottomGlow: {
    // bottom: height * 0.1,
    right: -width * 0.05,
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: '#4f46e5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(26, 0, 61, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  backButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTextContainer: {
    marginLeft: 15,
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
    letterSpacing: 1,
    marginTop: 2,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  promoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 32,
    overflow: 'hidden',
  },
  topInnerGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(168, 85, 247, 0.4)',
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 4,
  },
  promoImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  promoTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  promoLabel: {
    color: '#a855f7',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
  promoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  promoDesc: {
    color: '#9ca3af',
    fontSize: 12,
    lineHeight: 16,
  },
  saveButton: {
    backgroundColor: '#7c3aed',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
  },
  listSection: {
    gap: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 8,
  },
  timelineBadgeText: {
    color: '#d1d5db',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  filterActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  transactionList: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  txIconBox: {
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
  },
  txCreditIcon: {
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    borderColor: 'rgba(74, 222, 128, 0.2)',
  },
  txDebitIcon: {
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    borderColor: 'rgba(248, 113, 113, 0.2)',
  },
  txName: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 15,
  },
  txDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  txDate: {
    color: '#6b7280',
    fontSize: 10,
    fontWeight: 'bold',
  },
  txRight: {
    alignItems: 'flex-end',
  },
  txAmount: {
    fontSize: 16,
    fontWeight: '900',
  },
  txStatus: {
    color: '#374151',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 4,
  },
  footerText: {
    textAlign: 'center',
    color: '#374151',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 3,
    marginTop: 40,
  },
});