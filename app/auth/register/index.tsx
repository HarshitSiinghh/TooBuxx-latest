
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
  ActivityIndicator,
  Alert,
  StatusBar
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

import { registerApi } from "@/services/auth";

const { width } = Dimensions.get('window');

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const handleSignUp = async () => {
    const { username, email, phone, password, confirmPassword, referral } = formData;
    if (!username || !email || !phone || !password) {
      return Alert.alert("Missing fields", "Please fill all required fields");
    }
    if (password !== confirmPassword) {
      return Alert.alert("Password mismatch", "Passwords do not match");
    }

    try {
      setLoading(true);
      const data = await registerApi({
        username,
        email,
        password,
        mobile: phone,
        referral,
      });

      if (!data.success) {
        return Alert.alert("Register failed", data.message || "Try again");
      }
      router.push({ pathname: "/auth/register/VirefyOPT", params: { email } });
    } catch (err) {
      Alert.alert("Error", "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.iconCircle}>
                <ShieldCheck color="#a855f7" size={28} />
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
                  <User color="#9ca3af" size={16} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="johndoe"
                    placeholderTextColor="#4b5563"
                    onChangeText={(val) => handleChange('username', val)}
                  />
                </View>
              </View>

              {/* Referral */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>REFERRAL</Text>
                <View style={[styles.inputWrapper, { borderColor: 'rgba(234, 179, 8, 0.3)' }]}>
                  <Ticket color="#eab308" size={16} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="GOLD2026"
                    placeholderTextColor="#4b5563"
                    onChangeText={(val) => handleChange('referral', val)}
                  />
                </View>
              </View>

              {/* Email */}
              <View style={styles.inputGroupFull}>
                <Text style={styles.label}>EMAIL ADDRESS</Text>
                <View style={styles.inputWrapper}>
                  <Mail color="#9ca3af" size={16} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="john@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#4b5563"
                    onChangeText={(val) => handleChange('email', val)}
                  />
                </View>
              </View>

              {/* Phone */}
              <View style={styles.inputGroupFull}>
                <Text style={styles.label}>PHONE NUMBER</Text>
                <View style={styles.inputWrapper}>
                  <Phone color="#9ca3af" size={16} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="+91 00000 00000"
                    keyboardType="phone-pad"
                    placeholderTextColor="#4b5563"
                    onChangeText={(val) => handleChange('phone', val)}
                  />
                </View>
              </View>

              {/* Password */}
              <View style={styles.inputGroupFull}>
                <Text style={styles.label}>PASSWORD</Text>
                <View style={styles.inputWrapper}>
                  <LockKeyhole color="#9ca3af" size={16} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    secureTextEntry
                    placeholderTextColor="#4b5563"
                    onChangeText={(val) => handleChange('password', val)}
                  />
                </View>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputGroupFull}>
                <Text style={styles.label}>CONFIRM PASSWORD</Text>
                <View style={styles.inputWrapper}>
                  <LockKeyhole color="#9ca3af" size={16} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    secureTextEntry
                    placeholderTextColor="#4b5563"
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
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text style={styles.buttonText}>CREATE YOUR  ACCOUNT</Text>
                  <ArrowRight color="#fff" size={18} />
                </>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity style={styles.footerLink} onPress={() => router.push("/auth/login")}>
              <Text style={styles.footerText}>
                Already an investor? <Text style={styles.linkText}>LOG IN</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.copyright}>© 2026 TOOBUX</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0118' },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#15052d',
    borderRadius: 32, // More balanced rounding
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  header: { alignItems: 'center', marginBottom: 25 },
  iconCircle: {
    width: 56, height: 56,
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.2)',
  },
  title: {
    color: '#fff', fontSize: 24, fontWeight: '900',
    fontStyle: 'italic', letterSpacing: -0.5,
  },
  subtitle: {
    color: '#9ca3af', fontSize: 10, fontWeight: '700',
    letterSpacing: 1.5, marginTop: 4, textAlign: 'center',
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  inputGroup: { width: '48%', marginBottom: 16 },
  inputGroupFull: { width: '100%', marginBottom: 16 },
  label: {
    color: '#6B7280', fontSize: 10, fontWeight: '800',
    letterSpacing: 1, marginBottom: 6, marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#0a0118', borderRadius: 14,
    paddingHorizontal: 12, height: 52,
    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#fff', fontSize: 14, fontWeight: '600' },
  button: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#7c3aed', height: 58, borderRadius: 16,
    marginTop: 10, gap: 10,
    shadowColor: '#7c3aed', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: '900', letterSpacing: 1 },
  footerLink: { marginTop: 24, alignItems: 'center' },
  footerText: { color: '#9ca3af', fontSize: 13 },
  linkText: { color: '#a855f7', fontWeight: '900' },
  copyright: {
    textAlign: 'center', color: '#4b5563', fontSize: 10,
    fontWeight: '700', letterSpacing: 2, marginTop: 30,
  },
});