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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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

const { width, height } = Dimensions.get('window');
const router = useRouter();
export default function KYCVerify() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handlePickDocument = () => {
    // In a real app, use: import * as DocumentPicker from 'expo-document-picker';
    // const result = await DocumentPicker.getDocumentAsync({});
    setSelectedFile("aadhar_front.jpg"); // Mocking file selection
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- BACKGROUND GLOWS --- */}
      <View style={[styles.bgGlow, styles.topGlow]} />
      <View style={[styles.bgGlow, styles.bottomGlow]} />

      {/* --- PREMIUM HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
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

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* --- MAIN CARD --- */}
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
              {/* Full Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>FULL NAME (AS PER AADHAR)</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter full name"
                    placeholderTextColor="#4b5563"
                  />
                  <BadgeCheck color="rgba(129, 140, 248, 0.3)" size={18} />
                </View>
              </View>

              {/* Email & Phone Row */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                  <Text style={styles.label}>EMAIL ADDRESS</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="email@example.com"
                    placeholderTextColor="#4b5563"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>PHONE NUMBER</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="+91 ..."
                    placeholderTextColor="#4b5563"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              <View style={styles.divider} />

              {/* Document Type & Upload */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                  <Text style={styles.label}>DOCUMENT TYPE</Text>
                  <TouchableOpacity style={styles.pickerTrigger}>
                    <Text style={styles.pickerValue}>Select ID</Text>
                    <ChevronDown color="#6b7280" size={16} />
                  </TouchableOpacity>
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>UPLOAD PROOF</Text>
                  <TouchableOpacity 
                    onPress={handlePickDocument}
                    style={[
                      styles.uploadBox, 
                      selectedFile ? styles.uploadBoxActive : styles.uploadBoxInactive
                    ]}
                  >
                    {selectedFile ? (
                      <View style={styles.fileRow}>
                        <View style={styles.fileInfo}>
                          <CheckCircle2 color="#818cf8" size={14} />
                          <Text numberOfLines={1} style={styles.fileName}>{selectedFile}</Text>
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
            </View>

            {/* Submission Area */}
            <View style={styles.submissionArea}>
              <View style={styles.isoBadge}>
                <ShieldCheck color="#818cf8" size={16} />
                <Text style={styles.isoText}>
                  YOUR DATA IS STORED IN ISO 27001 CERTIFIED SERVERS AND WILL ONLY BE USED FOR VERIFICATION.
                </Text>
              </View>

              <TouchableOpacity style={styles.verifyButton} activeOpacity={0.8}>
                <Text style={styles.verifyButtonText}>VERIFY IDENTITY</Text>
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
  bgGlow: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.1,
  },
  topGlow: {
    top: -50,
    right: -50,
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: '#4f46e5',
  },
  bottomGlow: {
    bottom: -50,
    left: -50,
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: '#9333ea',
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
  headerTitleContainer: {
    marginLeft: 15,
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
    letterSpacing: 1,
    marginTop: 2,
  },
  sslBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.2)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 15,
  },
  fingerprintBox: {
    padding: 12,
    backgroundColor: 'rgba(129, 140, 248, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(129, 140, 248, 0.2)',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
  },
  cardSubtitle: {
    color: '#6b7280',
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 2,
  },
  formStack: {
    gap: 20,
  },
  inputGroup: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#6b7280',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 10,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 20,
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginVertical: 10,
  },
  pickerTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  pickerValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  uploadBox: {
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    justifyContent: 'center',
    minHeight: 48,
  },
  uploadBoxInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  uploadBoxActive: {
    backgroundColor: 'rgba(129, 140, 248, 0.1)',
    borderColor: 'rgba(129, 140, 248, 0.5)',
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
    marginTop: 40,
    gap: 20,
  },
  isoBadge: {
    flexDirection: 'row',
    backgroundColor: 'rgba(129, 140, 248, 0.05)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(129, 140, 248, 0.1)',
    gap: 10,
  },
  isoText: {
    flex: 1,
    color: 'rgba(165, 180, 252, 0.5)',
    fontSize: 9,
    fontWeight: 'bold',
    lineHeight: 14,
  },
  verifyButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 18,
    borderRadius: 40,
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#374151',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 4,
  },
});