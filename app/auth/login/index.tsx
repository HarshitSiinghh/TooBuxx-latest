import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
 import { SafeAreaView } from 'react-native-safe-area-context';
import { ShieldCheck, Mail, LockKeyhole } from 'lucide-react-native';
 import {  useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const router = useRouter();
 
  const handleLogin = () => {
    router.replace("/(tabs)");
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* --- BACKGROUND DECORATIVE ELEMENTS --- */}
      <View style={[styles.bgGlow, styles.topGlow]} />
      <View style={[styles.bgGlow, styles.bottomGlow]} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.cardContainer}>
            <View style={styles.loginCard}>
              {/* Subtle Top Line */}
              <View style={styles.topLine} />

              {/* Header */}
              <View style={styles.header}>
                <View style={styles.iconBox}>
                  <ShieldCheck color="#a855f7" size={24} />
                </View>
                <Text style={styles.title}>USER LOGIN</Text>
                <Text style={styles.subtitle}>ACCESS YOUR GOLD RESERVES</Text>
              </View>

              <View style={styles.form}>
                {/* Email Field */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>EMAIL ADDRESS</Text>
                  <View style={styles.inputWrapper}>
                    <Mail color="#4b5563" size={16} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="name@example.com"
                      placeholderTextColor="#374151"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                </View>

                {/* Password Field */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>SECRET PASSWORD</Text>
                  <View style={styles.inputWrapper}>
                    <LockKeyhole color="#4b5563" size={16} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="••••••••"
                      placeholderTextColor="#374151"
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                    />
                  </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  onPress={handleLogin}
                  activeOpacity={0.8}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>SIGN IN</Text>
                </TouchableOpacity>
              </View>

              {/* Footer Link */}
              <View style={styles.footerLinkContainer}>
                <Text style={styles.footerLinkText}>
                  New to TooBux Gold?{' '}
                  <Text 
                    onPress={() =>  router.push('/auth/register')}
                    style={styles.signUpText}
                  >
                    CREATE ACCOUNT
                  </Text>
                </Text>
              </View>
            </View>

            {/* Copyright */}
            <Text style={styles.copyright}>
              © 2026 TooBux GOLD FINTECH SOLUTIONS
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({  container: {  flex: 1,  backgroundColor: '#1a003d',},flex: { flex: 1,  }, scrollContent: {    flexGrow: 1,  justifyContent: 'center',    padding: 20,  },bgGlow: {    position: 'absolute',    borderRadius: 1000,    opacity: 0.2,  },  topGlow: {    top: -height * 0.1,    left: -width * 0.1,
    width: width,    height: width, backgroundColor: '#9333ea',  },  bottomGlow: {    bottom: -height * 0.1,
    right: -width * 0.1,    width: width * 0.8,    height: width * 0.8,    backgroundColor: '#4f46e5',  },
  cardContainer: {    zIndex: 10,  },  loginCard: {    backgroundColor: 'rgba(255, 255, 255, 0.03)',    borderRadius: 48,    borderWidth: 1,    borderColor: 'rgba(255, 255, 255, 0.1)',    paddingHorizontal: 24,
    paddingVertical: 40,    shadowColor: '#000',    shadowOffset: { width: 0, height: 32 },    shadowOpacity: 0.5,
    shadowRadius: 64,    elevation: 10,    overflow: 'hidden',  },  topLine: {    position: 'absolute',    top: 0,
    left: 0,    right: 0,    height: 1,    backgroundColor: 'rgba(168, 85, 247, 0.4)',  },  header: {    alignItems: 'center',    marginBottom: 40,  },  iconBox: { padding: 12,    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    borderRadius: 16,    borderWidth: 1,    borderColor: 'rgba(168, 85, 247, 0.2)',    marginBottom: 16,  },  title: {    color: '#fff',    fontSize: 28,    fontWeight: '900',    fontStyle: 'italic',    letterSpacing: -0.5,  },
  subtitle: {    color: '#6b7280',    fontSize: 10,    fontWeight: 'bold',    letterSpacing: 2,    marginTop: 8,  },
  form: {    gap: 24,  },  inputGroup: {    width: '100%',  },  label: {    color: '#6b7280',    fontSize: 10,    fontWeight: '900',    letterSpacing: 2,    marginBottom: 8,    marginLeft: 4,  },  inputWrapper: {   flexDirection: 'row',    alignItems: 'center',    backgroundColor: 'rgba(255, 255, 255, 0.05)',    borderRadius: 16, borderWidth: 1,    borderColor: 'rgba(255, 255, 255, 0.1)',    paddingHorizontal: 16,  },  inputIcon: {    marginRight: 12,  },
  input: {    flex: 1,    color: '#fff',    paddingVertical: 16,    fontSize: 14,    fontWeight: 'bold',  },  button: {    marginTop: 16,    backgroundColor: '#7c3aed',      paddingVertical: 20,    borderRadius: 16,    alignItems: 'center',    shadowColor: '#7c3aed',    shadowOffset: { width: 0, height: 10 },    shadowOpacity: 0.4,
    shadowRadius: 20,    elevation: 5,  },  buttonText: {    color: '#fff',    fontSize: 12,    fontWeight: '900',
    letterSpacing: 2,  },  footerLinkContainer: {    marginTop: 32,    alignItems: 'center',  },  footerLinkText: {    color: '#6b7280',    fontSize: 12,  },  signUpText: {    color: '#a855f7',    fontWeight: '900',    letterSpacing: 1,  },  copyright: {    textAlign: 'center',    color: '#374151',    fontSize: 10,    fontWeight: '900',    letterSpacing: 4,    marginTop: 40,  },});

