

import { useRouter } from 'expo-router';
import { LockKeyhole, Mail, ShieldCheck } from 'lucide-react-native';

// import { StyleSheet } from 'react-native';
// import { colors } from '@/theme/colors';
//  import { Colors } from '@/constants/theme';
// import { colors } from '@/constants/theme';
import React, { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProfileApi } from "@/services/profile";
import { loginApi } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from '@/store/profileStore';

const { width, height } = Dimensions.get('window');

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setProfile } = useProfileStore();
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Missing fields", "Enter email and password");
    }
    try {
      setLoading(true);
      const data = await loginApi(email, password);
      if (!data.success) {
        return Alert.alert("Login failed", data.message || "Invalid credentials");
      }
      setUser(data.user);  
      const profileRes = await getProfileApi();
      if (profileRes.success) {
        setProfile(profileRes.data.user);
        router.replace("/(tabs)"); 
      } else {
        Alert.alert("Error", "Could not fetch user profile details.");
      }
    } catch (err) {
      Alert.alert("Error", "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.loginCard}>
            
            {/* Header with Circular Icon */}
            <View style={styles.header}>
              <View style={styles.iconCircle}>
                <ShieldCheck color="#a855f7" size={24} />
              </View>
              <Text style={styles.title}>USER LOGIN</Text>
              <Text style={styles.subtitle}>ACCESS YOUR GOLD RESERVES</Text>
            </View>

            <View style={styles.form}>
              {/* Email */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>EMAIL ADDRESS</Text>
                <View style={styles.inputWrapper}>
                  <Mail color="#9ca3af" size={18} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="name@example.com"
                    placeholderTextColor="#4b5563"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>

              {/* Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>SECRET PASSWORD</Text>
                <View style={styles.inputWrapper}>
                  <LockKeyhole color="#9ca3af" size={18} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor="#4b5563"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>

              {/* Gradient-like Button */}
              <TouchableOpacity
                onPress={handleLogin}
                activeOpacity={0.8}
                style={styles.button}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>SIGN IN</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.footerLinkContainer}>
              <Text style={styles.footerLinkText}>
                New to TOOBUX?{' '}
                <Text 
                  onPress={() => router.push('/auth/register')}
                  style={styles.signUpText}
                >
                  CREATE ACCOUNT
                </Text>
              </Text>
            </View>
          </View>

          <Text style={styles.copyright}>
            © 2026 TOOBUX
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0a0118', // Image jaisa deep dark background
//   },
//   flex: {
//     flex: 1,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 24,
//   },
//   loginCard: {
//     backgroundColor: '#15052d', // Image wala purple-black card color
//     borderRadius: 60, // Image ki tarah bahut rounded corners
//     paddingHorizontal: 30,
//     paddingVertical: 50,
//     borderWidth: 1,
//     borderColor: '#241244',
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   iconCircle: {
//     width: 60,
//     height: 60,
//     backgroundColor: '#1e0a3c',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#3a1a6b',
//   },
//   title: {
//     color: '#fff',
//     fontSize: 32,
//     fontWeight: '900',
//     fontStyle: 'italic',
//     letterSpacing: 1,
//   },
//   subtitle: {
//     color: '#9ca3af',
//     fontSize: 10,
//     fontWeight: 'bold',
//     letterSpacing: 2,
//     marginTop: 10,
//     textTransform: 'uppercase',
//   },
//   form: {
//     gap: 25,
//   },
//   inputGroup: {
//     width: '100%',
//   },
//   label: {
//     color: '#9ca3af',
//     fontSize: 11,
//     fontWeight: '800',
//     letterSpacing: 1.5,
//     marginBottom: 10,
//     marginLeft: 5,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#0a0118', 
//     borderRadius: 20,
//     paddingHorizontal: 18,
//     height: 65,
//     borderWidth: 1,
//     borderColor: '#241244',
//   },
//   inputIcon: {
//     marginRight: 15,
//   },
//   input: {
//     flex: 1,
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '600',
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: '#7c3aed', // Purple Button
//     height: 70,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // Glow effect
//     shadowColor: '#7c3aed',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.4,
//     shadowRadius: 15,
//     elevation: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '900',
//     letterSpacing: 2,
//   },
//   footerLinkContainer: {
//     marginTop: 40,
//     alignItems: 'center',
//   },
//   footerLinkText: {
//     color: '#9ca3af',
//     fontSize: 13,
//   },
//   signUpText: {
//     color: '#a855f7',
//     fontWeight: '900',
//   },
//   copyright: {
//     textAlign: 'center',
//     color: '#4b5563',
//     fontSize: 11,
//     fontWeight: 'bold',
//     letterSpacing: 3,
//     marginTop: 40,
//   },
// });







export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#062530",
  },

  flex: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  /* ================= CARD ================= */
  loginCard: {
    backgroundColor: "#0b3442",
    borderRadius: 60,
    paddingHorizontal: 30,
    paddingVertical: 50,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  /* ================= HEADER ================= */
  header: {
    alignItems: "center",
    marginBottom: 40,
  },

  iconCircle: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(16, 78, 100, 0.4)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  title: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: 1,
  },

  subtitle: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 2,
    marginTop: 10,
    textTransform: "uppercase",
  },

  /* ================= FORM ================= */
  form: {
    gap: 25,
  },

  inputGroup: {
    width: "100%",
  },

  label: {
    color: "#8fbac4",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 10,
    marginLeft: 5,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 78, 100, 0.35)",
    borderRadius: 20,
    paddingHorizontal: 18,
    height: 65,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  inputIcon: {
    marginRight: 15,
  },

  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },

  /* ================= BUTTON ================= */
  button: {
    marginTop: 20,
    backgroundColor: "#facc15",
    height: 70,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#facc15",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 8,
  },

  buttonText: {
    color: "#062530",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 2,
  },

  /* ================= FOOTER ================= */
  footerLinkContainer: {
    marginTop: 40,
    alignItems: "center",
  },

  footerLinkText: {
    color: "#8fbac4",
    fontSize: 13,
  },

  signUpText: {
    color: "#facc15",
    fontWeight: "900",
  },

  copyright: {
    textAlign: "center",
    color: "#6b9aa6",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 3,
    marginTop: 40,
  },
});
