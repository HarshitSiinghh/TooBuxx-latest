import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
 import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  LockKeyhole, 
  Mail, 
  User, 
  Phone, 
  Ticket, 
  ShieldCheck,
  ArrowRight 
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');
const router = useRouter();

export default function SignUpPage({ navigation }: any) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    referral: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSignUp = () => {
    // Logic: Navigate to VerifyOTP as per original code
    console.log("Form Data:", formData);
    // navigation.navigate('VerifyOTP');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- BACKGROUND ORBS --- */}
      <View style={[styles.orb, styles.topOrb]} />
      <View style={[styles.orb, styles.bottomOrb]} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <ShieldCheck color="#818cf8" size={24} />
              </View>
              <Text style={styles.title}>CREATE ACCOUNT</Text>
              <Text style={styles.subtitle}>START YOUR 24K GOLD JOURNEY TODAY</Text>
            </View>

            {/* Form Fields */}
            <View style={styles.grid}>
              {/* Username */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>USERNAME</Text>
                <View style={styles.inputWrapper}>
                  <User color="#4b5563" size={16} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="johndoe"
                    placeholderTextColor="#374151"
                    onChangeText={(val) => handleChange('username', val)}
                  />
                </View>
              </View>

              {/* Referral */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>REFERRAL CODE (OPTIONAL)</Text>
                <View style={[styles.inputWrapper, { borderColor: 'rgba(234, 179, 8, 0.2)' }]}>
                  <Ticket color="#eab308" size={16} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="GOLD2026"
                    placeholderTextColor="#374151"
                    onChangeText={(val) => handleChange('referral', val)}
                  />
                </View>
              </View>

              {/* Email */}
              <View style={styles.inputGroupFull}>
                <Text style={styles.label}>EMAIL ADDRESS</Text>
                <View style={styles.inputWrapper}>
                  <Mail color="#4b5563" size={16} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="john@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#374151"
                    onChangeText={(val) => handleChange('email', val)}
                  />
                </View>
              </View>

              {/* Phone */}
              <View style={styles.inputGroupFull}>
                <Text style={styles.label}>PHONE NUMBER</Text>
                <View style={styles.inputWrapper}>
                  <Phone color="#4b5563" size={16} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="+91 00000 00000"
                    keyboardType="phone-pad"
                    placeholderTextColor="#374151"
                    onChangeText={(val) => handleChange('phone', val)}
                  />
                </View>
              </View>

              {/* Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>PASSWORD</Text>
                <View style={styles.inputWrapper}>
                  <LockKeyhole color="#4b5563" size={16} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    secureTextEntry
                    placeholderTextColor="#374151"
                    onChangeText={(val) => handleChange('password', val)}
                  />
                </View>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>CONFIRM PASSWORD</Text>
                <View style={styles.inputWrapper}>
                  <LockKeyhole color="#4b5563" size={16} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    secureTextEntry
                    placeholderTextColor="#374151"
                    onChangeText={(val) => handleChange('confirmPassword', val)}
                  />
                </View>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity 
              onPress={handleSignUp}
              activeOpacity={0.8} 
              style={styles.button}
            >
              <Text style={styles.buttonText}>CREATE YOUR VAULT</Text>
              <ArrowRight color="#fff" size={16} />
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity 
              onPress={() => navigation?.navigate('SignIn')}
              style={styles.footerLink}
            >
              <Text style={styles.footerText}>
                Already an investor? <Text style={styles.linkText} onPress={()=>router.push("/auth/login")}>LOG IN</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a003d',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  orb: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.1,
  },
  topOrb: {
    top: -height * 0.05,
    right: -width * 0.05,
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: '#4f46e5',
  },
  bottomOrb: {
    bottom: -height * 0.05,
    left: -width * 0.05,
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: '#9333ea',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    padding: 12,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.2)',
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: -1,
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  inputGroup: {
    width: '48%',
    marginBottom: 16,
  },
  inputGroupFull: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    color: '#6b7280',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: '700',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4f46e5',
    paddingVertical: 18,
    borderRadius: 16,
    marginTop: 20,
    gap: 10,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
  },
  footerLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#6b7280',
    fontSize: 12,
  },
  linkText: {
    color: '#818cf8',
    fontWeight: '900',
  },
});