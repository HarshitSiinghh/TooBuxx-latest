

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronDown,
  Upload,
  ShieldCheck,
  BadgeCheck,
  Fingerprint,
  CheckCircle2,
  X,
  ArrowLeft,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { pickImage } from '@/components/ui/pickImage';
import { uploadKycApi } from '@/services/kyc';

const { width, height } = Dimensions.get('window');

export default function KYCVerify() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [documentType, setDocumentType] = useState<'pan' | 'aadhar' | 'passport' | 'voterid' | ''>('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---------------- HELPERS ----------------

  const getDocPlaceholder = () => {
    switch (documentType) {
      case "aadhar":
        return "123412341234";
      case "pan":
        return "ABCDE1234F";
      case "passport":
        return "A1234567";
      case "voterid":
        return "ABC1234567";
      default:
        return "Enter document number";
    }
  };

  const handleDocumentNumberChange = (text: string) => {
    let value = text;

    if (documentType === "aadhar") {
      value = value.replace(/[^0-9]/g, "").slice(0, 12);
    }

    if (documentType === "pan") {
      value = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    }

    if (documentType === "passport") {
      value = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 9);
    }

    if (documentType === "voterid") {
      value = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
    }

    setDocumentNumber(value);
  };

  const handlePhoneChange = (text: string) => {
    const onlyNums = text.replace(/[^0-9]/g, "").slice(0, 10);
    setPhone(onlyNums);
  };

  // ---------------- FILE PICK ----------------
  const handlePickDocument = async () => {
    const file = await pickImage();
    if (file) setSelectedFile(file);
  };

  const removeFile = () => setSelectedFile(null);

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {
    if (!fullName || !email || !phone || !documentType || !documentNumber || !selectedFile) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("document_type", documentType);
      formData.append("document_number", documentNumber);
      formData.append("document_image", {
        uri: selectedFile.uri,
        name: selectedFile.fileName || "document.jpg",
        type: selectedFile.mimeType || "image/jpeg",
      } as any);

      const res = await uploadKycApi(formData);

      if (res?.success) {
        Alert.alert("Success", "KYC submitted successfully");
        router.back();
      } else {
        Alert.alert("Failed", res?.message || "KYC upload failed");
      }

    } catch (err) {
      console.log("KYC ERROR:", err);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.bgGlow]} />
      <View style={[styles.bgGlow]} />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color="#9ca3af" size={20} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitleText}>KYC VERIFICATION</Text>
            <Text style={styles.headerSubText}>IDENTITY TRUST CENTER</Text>
          </View>
        </View>
        <View style={styles.sslBadge}>
          <ShieldCheck color="#4ade80" size={12} />
          <Text style={styles.sslText}>SECURE SSL</Text>
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          <View style={styles.mainCard}>
            <View style={styles.cardHeader}>
              <View style={styles.fingerprintBox}>
                <Fingerprint color="#818cf8" size={28} />
              </View>
              <View>
                <Text style={styles.cardTitle}>Identity Details</Text>
                <Text style={styles.cardSubtitle}>PROVIDE DETAILS AS PER GOVERNMENT ID</Text>
              </View>
            </View>

            <View style={styles.formStack}>

              {/* FULL NAME */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>FULL NAME (AS PER AADHAR)</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter full name"
                    placeholderTextColor="#4b5563"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                  <BadgeCheck color="rgba(129, 140, 248, 0.3)" size={18} />
                </View>
              </View>

              {/* EMAIL & PHONE */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                  <Text style={styles.label}>EMAIL ADDRESS</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="email@example.com"
                    placeholderTextColor="#4b5563"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>PHONE NUMBER</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="9876543210"
                    placeholderTextColor="#4b5563"
                    keyboardType="number-pad"
                    value={phone}
                    onChangeText={handlePhoneChange}
                    maxLength={10}
                  />
                </View>
              </View>

              <View style={styles.divider} />

              {/* DOCUMENT TYPE + UPLOAD */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                  <Text style={styles.label}>DOCUMENT TYPE</Text>

                  <TouchableOpacity
                    style={styles.pickerTrigger}
                    onPress={() => setShowDropdown(!showDropdown)}
                  >
                    <Text style={styles.pickerValue}>
                      {documentType ? documentType.toUpperCase() : "Select ID"}
                    </Text>
                    <ChevronDown color="#6b7280" size={16} />
                  </TouchableOpacity>

                  {showDropdown && (
                    <View style={styles.dropdown}>
                      {["pan", "aadhar", "passport", "voterid"].map((item) => (
                        <TouchableOpacity
                          key={item}
                          style={styles.dropItem}
                          onPress={() => {
                            setDocumentType(item as any);
                            setDocumentNumber("");
                            setShowDropdown(false);
                          }}
                        >
                          <Text style={styles.dropText}>{item.toUpperCase()}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>UPLOAD PROOF</Text>

                  <TouchableOpacity
                    onPress={handlePickDocument}
                    style={[
                      styles.uploadBox,
                      selectedFile ? styles.uploadBoxActive : styles.uploadBoxInactive,
                    ]}
                  >
                    {selectedFile ? (
                      <View style={styles.fileRow}>
                        <View style={styles.fileInfo}>
                          <CheckCircle2 color="#818cf8" size={14} />
                          <Text numberOfLines={1} style={styles.fileName}>
                            {selectedFile.fileName || "document.jpg"}
                          </Text>
                        </View>
                        <TouchableOpacity onPress={removeFile} hitSlop={10}>
                          <X color="#818cf8" size={16} />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={styles.uploadPlaceholder}>
                        <Upload color="#9ca3af" size={16} />
                        <Text style={styles.uploadText}>Upload</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* DOCUMENT NUMBER */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>DOCUMENT NUMBER</Text>
                <TextInput
                  style={styles.input}
                  placeholder={getDocPlaceholder()}
                  placeholderTextColor="#4b5563"
                  value={documentNumber}
                  keyboardType={documentType === "aadhar" ? "number-pad" : "default"}
                  onChangeText={handleDocumentNumberChange}
                />
              </View>

            </View>

            {/* SUBMIT */}
            <View style={styles.submissionArea}>
              <View style={styles.isoBadge}>
                <ShieldCheck color="#818cf8" size={16} />
                <Text style={styles.isoText}>
                  YOUR DATA IS STORED IN ISO 27001 CERTIFIED SERVERS AND WILL ONLY BE USED FOR VERIFICATION.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.verifyButton}
                activeOpacity={0.8}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text style={styles.verifyButtonText}>
                  {loading ? "VERIFYING..." : "VERIFY IDENTITY"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>BANK GRADE SECURITY</Text>
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

  // ❌ Glow removed
  bgGlow: {
    display: "none",
  },

  topGlow: {},
  bottomGlow: {},

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1a003d',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },

  headerTitleContainer: {
    marginLeft: 12,
  },

  headerTitleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },

  headerSubText: {
    color: '#818cf8',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },

  sslBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 222, 128, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.25)',
  },

  sslText: {
    color: '#4ade80',
    fontSize: 8,
    fontWeight: '900',
    marginLeft: 4,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  mainCard: {
    backgroundColor: '#22004f', // solid instead of glass
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    padding: 22,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
    gap: 14,
  },

  fingerprintBox: {
    padding: 12,
    backgroundColor: '#2d0066',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(129, 140, 248, 0.4)',
  },

  cardTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
  },

  cardSubtitle: {
    color: '#9ca3af',
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 2,
  },

  formStack: {
    gap: 18,
  },

  inputGroup: {
    width: '100%',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    color: '#9ca3af',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 8,
    marginLeft: 4,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a0061',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 18,
  },

  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 14,
    fontSize: 14,
    fontWeight: 'bold',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 10,
  },

  pickerTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a0061',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  pickerValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  uploadBox: {
    borderRadius: 14,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    justifyContent: 'center',
    minHeight: 48,
  },

  uploadBoxInactive: {
    backgroundColor: '#240054',
    borderColor: 'rgba(255,255,255,0.2)',
  },

  uploadBoxActive: {
    backgroundColor: '#2d0066',
    borderColor: '#818cf8',
  },

  uploadPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  uploadText: {
    color: '#9ca3af',
    fontSize: 13,
    fontWeight: 'bold',
  },

  fileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },

  fileName: {
    color: '#818cf8',
    fontSize: 11,
    fontWeight: '900',
    flex: 1,
  },

  submissionArea: {
    marginTop: 36,
    gap: 18,
  },

  isoBadge: {
    flexDirection: 'row',
    backgroundColor: '#240054',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(129,140,248,0.25)',
    gap: 10,
  },

  isoText: {
    flex: 1,
    color: '#a5b4fc',
    fontSize: 9,
    fontWeight: 'bold',
    lineHeight: 14,
    opacity: 0.7,
  },

  verifyButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 18,
    borderRadius: 40,
    alignItems: 'center',
  },

  verifyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },

  footer: {
    marginTop: 28,
    alignItems: 'center',
  },

  footerText: {
    color: '#374151',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 4,
  },

  dropdown: {
    position: "absolute",
    top: 70,
    width: "100%",
    backgroundColor: '#2a0061',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(129,140,248,0.35)',
    zIndex: 999,
    overflow: "hidden",
  },

  dropItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },

  dropText: {
    color: "#e5e7eb",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.6,
  },
});