import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import {
  Ticket,
  Zap,
  Star,
  Info,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react-native';
 import { useRouter } from 'expo-router';
 const router = useRouter();

const { width } = Dimensions.get('window');

const activeOffers = [
  { 
    code: "GOLD2026", 
    desc: "Get ₹50 extra gold on first save", 
    expiry: "Ends in 2 days", 
    icon: <Star color="#facc15" size={24} /> 
  },
  { 
    code: "FESTIVE10", 
    desc: "10% off on processing fees", 
    expiry: "Ends in 5 days", 
    icon: <Zap color="#a855f7" size={24} /> 
  },
];

export  function PromoCode() {
  const [promoCode, setPromoCode] = useState("");

  const handleApply = () => {
    console.log("Applying code:", promoCode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft color="#9ca3af" size={20} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>PROMO HUB</Text>
            <Text style={styles.headerSub}>UNLOCK EXCLUSIVE 24K REWARDS</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Info color="#4b5563" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- REDEEM CARD --- */}
        <View style={styles.redeemCard}>
          <View style={styles.glowEffect} />
          
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <Ticket color="#a855f7" size={24} />
            </View>
            <Text style={styles.cardTitle}>REDEEM CODE</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                value={promoCode}
                onChangeText={(text) => setPromoCode(text.toUpperCase())}
                placeholder="ENTER CODE (E.G. GOLD50)"
                placeholderTextColor="#4b5563"
                autoCapitalize="characters"
                selectionColor="#a855f7"
              />
              {promoCode.length > 3 && (
                <View style={styles.checkIcon}>
                  <CheckCircle2 color="#22c55e" size={22} />
                </View>
              )}
            </View>

            <TouchableOpacity 
              onPress={handleApply}
              activeOpacity={0.8}
              style={styles.applyButton}
            >
              <Text style={styles.applyButtonText}>APPLY REWARD</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.termsText}>
            By applying, you agree to our Promotion Terms & Conditions.
          </Text>
        </View>

        {/* --- OFFERS SECTION --- */}
        <View style={styles.offersSection}>
          <Text style={styles.sectionLabel}>AVAILABLE FOR YOU</Text>
          
          {activeOffers.map((offer, idx) => (
            <TouchableOpacity 
              key={idx} 
              activeOpacity={0.7}
              style={styles.offerCard}
            >
              <View style={styles.offerRow}>
                <View style={styles.offerLeft}>
                  <View style={styles.offerIconBox}>
                    {offer.icon}
                  </View>
                  <View style={styles.offerTextContent}>
                    <Text style={styles.offerCode}>{offer.code}</Text>
                    <Text style={styles.offerDesc}>{offer.desc}</Text>
                  </View>
                </View>
                <View style={styles.expiryBadge}>
                  <Text style={styles.expiryText}>{offer.expiry}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- HINT CARD --- */}
        <View style={styles.hintCard}>
          <View style={styles.hintIconBox}>
            <Star color="#1a003d" size={24} fill="#1a003d" />
          </View>
          <Text style={styles.hintText}>
            Check your notifications daily for personalized promo codes!
          </Text>
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
    fontSize: 20,
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
  redeemCard: {
    backgroundColor: '#240056',
    borderRadius: 40,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    marginBottom: 32,
  },
  glowEffect: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(147, 51, 234, 0.15)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  iconBox: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  inputContainer: {
    gap: 16,
  },
  textInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: '#1a003d',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 16,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  checkIcon: {
    position: 'absolute',
    right: 15,
  },
  applyButton: {
    backgroundColor: '#7c3aed',
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
  },
  termsText: {
    color: '#4b5563',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 16,
  },
  offersSection: {
    gap: 16,
  },
  sectionLabel: {
    color: '#4b5563',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    marginLeft: 8,
  },
  offerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 32,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  offerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  offerIconBox: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  offerTextContent: {
    flex: 1,
  },
  offerCode: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  offerDesc: {
    color: '#9ca3af',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 4,
  },
  expiryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  expiryText: {
    color: '#6b7280',
    fontSize: 8,
    fontWeight: '900',
  },
  hintCard: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderRadius: 32,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    gap: 16,
  },
  hintIconBox: {
    width: 48,
    height: 48,
    backgroundColor: '#facc15',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-10deg' }],
  },
  hintText: {
    flex: 1,
    color: '#c7d2fe',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 18,
  },
});