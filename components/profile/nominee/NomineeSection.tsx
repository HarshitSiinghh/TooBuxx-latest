

import React, { useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronDown,
  Upload,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  X,
  ArrowLeft,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

import { pickImage } from '@/components/ui/pickImage';
import { uploadNomineeApi } from '@/services/nominee';

const { width, height } = Dimensions.get('window');

/* ===================== VALIDATION HELPERS ===================== */

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const d = [
  [0,1,2,3,4,5,6,7,8,9],
  [1,2,3,4,0,6,7,8,9,5],
  [2,3,4,0,1,7,8,9,5,6],
  [3,4,0,1,2,8,9,5,6,7],
  [4,0,1,2,3,9,5,6,7,8],
  [5,9,8,7,6,0,4,3,2,1],
  [6,5,9,8,7,1,0,4,3,2],
  [7,6,5,9,8,2,1,0,4,3],
  [8,7,6,5,9,3,2,1,0,4],
  [9,8,7,6,5,4,3,2,1,0]
];

const p = [
  [0,1,2,3,4,5,6,7,8,9],
  [1,5,7,6,2,8,3,0,9,4],
  [5,8,0,3,7,9,6,1,4,2],
  [8,9,1,6,0,4,3,5,2,7],
  [9,4,5,3,1,2,6,8,7,0],
  [4,2,8,6,5,7,3,9,0,1],
  [2,7,9,3,8,0,6,4,1,5],
  [7,0,4,6,9,1,3,2,5,8]
];

const validateAadhaar = (num: string) => {
  let c = 0;
  const arr = num.split('').reverse().map(Number);
  for (let i = 0; i < arr.length; i++) {
    c = d[c][p[i % 8][arr[i]]];
  }
  return c === 0;
};

const isAbove18 = (dob: string) => {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age >= 18;
};

/* ===================== COMPONENT ===================== */

type Props = { onSuccess?: () => void };

export function NomineeSection({ onSuccess }: Props) {
  const router = useRouter();

  // ---------------- STATES ----------------
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [nomineeName, setNomineeName] = useState('');
  const [nomineeDob, setNomineeDob] = useState('');
  const [nomineeRelation, setNomineeRelation] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [documentPhone, setDocumentPhone] = useState('');

  const [showRelationDrop, setShowRelationDrop] = useState(false);
  const [showIdDrop, setShowIdDrop] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObj, setDateObj] = useState(new Date());

  // ---------------- FILE PICK ----------------
  const pickDocument = async () => {
    try {
      const file = await pickImage();
      if (file) setSelectedFile(file);
    } catch {
      Alert.alert("Error", "File pick cancelled or failed");
    }
  };

  const removeFile = () => setSelectedFile(null);

  // ---------------- INPUT HANDLERS ----------------

  const handleDocumentChange = (text: string) => {
    if (documentType === 'aadhaar') {
      const onlyNumbers = text.replace(/[^0-9]/g, '');
      setDocumentNumber(onlyNumbers.slice(0, 12));
    } else if (documentType === 'pan') {
      const upper = text.toUpperCase().replace(/[^A-Z0-9]/g, '');
      setDocumentNumber(upper.slice(0, 10));
    } else {
      setDocumentNumber(text);
    }
  };

  const handlePhoneChange = (text: string) => {
    const onlyNumbers = text.replace(/[^0-9]/g, '');
    setDocumentPhone(onlyNumbers.slice(0, 10));
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateObj(selectedDate);
      setNomineeDob(selectedDate.toISOString().split('T')[0]);
    }
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {

    if (!isAbove18(nomineeDob)) {
      Alert.alert("Invalid DOB", "Nominee must be at least 18 years old");
      return;
    }

    if (documentType === "pan" && !PAN_REGEX.test(documentNumber)) {
      Alert.alert("Invalid PAN", "Enter valid PAN number (ABCDE1234F)");
      return;
    }

    if (documentType === "aadhaar") {
      if (documentNumber.length !== 12 || !validateAadhaar(documentNumber)) {
        Alert.alert("Invalid Aadhaar", "Enter a valid Aadhaar number");
        return;
      }
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("full_name", nomineeName);
      formData.append("dob", nomineeDob);
      formData.append("relationship", nomineeRelation);
      formData.append("phone", documentPhone);
      formData.append("document_type", documentType);
      formData.append("document_number", documentNumber);

      formData.append("document_image", {
        uri: selectedFile.uri,
        name: selectedFile.fileName || "nominee.jpg",
        type: selectedFile.mimeType || "image/jpeg",
      } as any);

      const res = await uploadNomineeApi(formData);

      if (res?.success) {
        Alert.alert("Success", "Nominee added successfully");
        onSuccess?.();
      } else {
        Alert.alert("Failed", res?.message || "Nominee upload failed");
      }

    } catch {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------

  return (
    
    <SafeAreaView style={styles.container}>
      <View style={[styles.bgOrb, styles.topOrb]} />
      <View style={[styles.bgOrb, styles.bottomOrb]} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#9ca3af" size={20} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>ADD NOMINEE</Text>
          <Text style={styles.headerSub}>BENEFICIARY MANAGEMENT</Text>
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          <View style={styles.formCard}>
            {/* <View style={styles.topGlowLine} /> */}

            <View style={styles.formTitleSection}>
              <View style={styles.iconBox}>
                <UserPlus color="#a855f7" size={24} />
              </View>
              <View>
                <Text style={styles.formTitle}>Nominee Details</Text>
                <Text style={styles.formSub}>Secure your assets for your loved ones</Text>
              </View>
            </View>

            <View style={styles.inputStack}>

              {/* FULL NAME */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>LEGAL FULL NAME</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter nominee's full name"
                  placeholderTextColor="#4b5563"
                  value={nomineeName}
                  onChangeText={setNomineeName}
                />
              </View>

              {/* DOB + RELATION */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                  <Text style={styles.label}>DATE OF BIRTH</Text>

                  <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <TextInput
                      style={styles.input}
                      placeholder="YYYY-MM-DD"
                      placeholderTextColor="#4b5563"
                      value={nomineeDob}
                      editable={false}
                      pointerEvents="none"
                    />
                  </TouchableOpacity>

                  {showDatePicker && (
                    <DateTimePicker
                      value={dateObj}
                      mode="date"
                      display="calendar"
                      onChange={onDateChange}
                      maximumDate={new Date()}
                    />
                  )}
                </View>

                <View style={[styles.inputGroup, { flex: 1, zIndex: 50 }]}>
                  <Text style={styles.label}>RELATIONSHIP</Text>
                  <TouchableOpacity
                    style={styles.pickerTrigger}
                    onPress={() => setShowRelationDrop(!showRelationDrop)}
                  >
                    <Text style={styles.pickerText}>
                      {nomineeRelation || "Choose Relation"}
                    </Text>
                    <ChevronDown color="#6b7280" size={16} />
                  </TouchableOpacity>

                  {showRelationDrop && (
                    <View style={styles.dropdown}>
                      {["mother", "father", "sister", "brother", "husband"].map((item) => (
                        <TouchableOpacity
                          key={item}
                          style={styles.dropItem}
                          onPress={() => {
                            setNomineeRelation(item);
                            setShowRelationDrop(false);
                          }}
                        >
                          <Text style={styles.dropText}>{item.toUpperCase()}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              {/* ID TYPE + FILE */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10, zIndex: 40 }]}>
                  <Text style={styles.label}>ID PROOF TYPE</Text>
                  <TouchableOpacity
                    style={styles.pickerTrigger}
                    onPress={() => setShowIdDrop(!showIdDrop)}
                  >
                    <Text style={styles.pickerText}>
                      {documentType || "Select ID"}
                    </Text>
                    <ChevronDown color="#6b7280" size={16} />
                  </TouchableOpacity>

                  {showIdDrop && (
                    <View style={styles.dropdown}>
                      {["aadhaar", "pan", "passport", "voterid"].map((item) => (
                        <TouchableOpacity
                          key={item}
                          style={styles.dropItem}
                          onPress={() => {
                            setDocumentType(item);
                            setDocumentNumber("");
                            setShowIdDrop(false);
                          }}
                        >
                          <Text style={styles.dropText}>{item.toUpperCase()}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>IDENTITY DOCUMENT</Text>
                  <TouchableOpacity
                    onPress={pickDocument}
                    style={[
                      styles.uploadBox,
                      selectedFile ? styles.uploadBoxActive : styles.uploadBoxInactive
                    ]}
                  >
                    {selectedFile ? (
                      <View style={styles.fileInfo}>
                        <CheckCircle2 color="#a855f7" size={14} />
                        <Text numberOfLines={1} style={styles.fileName}>
                          {selectedFile.fileName || "document.jpg"}
                        </Text>
                        <TouchableOpacity onPress={removeFile}>
                          <X color="#a855f7" size={14} />
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
                  placeholder={
                    documentType === "aadhaar"
                      ? "123412341234"
                      : documentType === "pan"
                      ? "ABCDE1234F"
                      : "Enter document number"
                  }
                  placeholderTextColor="#4b5563"
                  value={documentNumber}
                  onChangeText={handleDocumentChange}
                  keyboardType={documentType === "aadhaar" ? "number-pad" : "default"}
                  maxLength={documentType === "aadhaar" ? 12 : documentType === "pan" ? 10 : 30}
                />
              </View>

              {/* PHONE NUMBER */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>PHONE NUMBER</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter 10-digit mobile number"
                  placeholderTextColor="#4b5563"
                  value={documentPhone}
                  onChangeText={handlePhoneChange}
                  keyboardType="number-pad"
                  maxLength={10}
                />
              </View>

            </View>

            {/* SUBMIT */}
            <View style={styles.footerSection}>
              <View style={styles.securityNote}>
                <ShieldCheck color="#eab308" size={18} />
                <Text style={styles.securityText}>
                  DATA IS ENCRYPTED WITH BANK-GRADE SECURITY PROTOCOLS FOR YOUR PRIVACY.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                activeOpacity={0.8}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text style={styles.submitButtonText}>
                  {loading ? "SUBMITTING..." : "SUBMIT NOMINEE INFORMATION"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.copyrightText}>
            © 2026 TOOBUX  
          </Text>

        </ScrollView>
      </KeyboardAvoidingView>
         {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#a855f7" />
          <Text style={styles.loaderText}>Uploading nominee...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1a003d',
//   },

//   // ❌ Glass orbs removed
//   bgOrb: { display: "none" },
//   topOrb: {},
//   bottomOrb: {},

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#1a003d',
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255,255,255,0.08)',
//   },

//   backButton: {
//     padding: 10,
//     backgroundColor: '#24004f',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.15)',
//   },
// loaderOverlay: {
//   position: "absolute",
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: "rgba(0,0,0,0.6)",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 9999,
// },

// loaderText: {
//   marginTop: 12,
//   color: "#fff",
//   fontSize: 12,
//   fontWeight: "900",
//   letterSpacing: 1,
// },
//   headerTextContainer: {
//     marginLeft: 15,
//   },

//   headerTitle: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '900',
//     letterSpacing: 0.5,
//   },

//   headerSub: {
//     color: '#a855f7',
//     fontSize: 10,
//     fontWeight: 'bold',
//     letterSpacing: 1,
//     marginTop: 2,
//   },

//   scrollContent: {
//     padding: 20,
//     paddingBottom: 40,
//   },

//   formCard: {
//     backgroundColor: '#22004f', // ✅ solid instead of glass
//     borderRadius: 40,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.12)',
//     padding: 24,
//   },

//   topGlowLine: {
//     height: 2,
//     backgroundColor: 'rgba(168, 85, 247, 0.25)',
//   },

//   formTitleSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//     gap: 15,
//   },

//   iconBox: {
//     padding: 12,
//     backgroundColor: '#2b0063',
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(168, 85, 247, 0.35)',
//   },

//   formTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '900',
//   },

//   formSub: {
//     color: '#9ca3af',
//     fontSize: 10,
//     fontWeight: 'bold',
//     marginTop: 2,
//   },

//   inputStack: {
//     gap: 20,
//   },

//   inputGroup: {
//     width: '100%',
//   },

//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },

//   label: {
//     color: '#9ca3af',
//     fontSize: 9,
//     fontWeight: '900',
//     letterSpacing: 1.5,
//     marginBottom: 10,
//     marginLeft: 4,
//   },

//   input: {
//     backgroundColor: '#2a0061',
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.15)',
//     paddingHorizontal: 20,
//     paddingVertical: 14,
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },

//   pickerTrigger: {
//     backgroundColor: '#2a0061',
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.15)',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   pickerText: {
//     color: '#e5e7eb',
//     fontSize: 13,
//     fontWeight: 'bold',
//   },

//   phoneInputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#2a0061',
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.15)',
//     paddingRight: 12,
//   },

//   mobileBadge: {
//     backgroundColor: '#2f006d',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: 'rgba(168, 85, 247, 0.3)',
//   },

//   mobileBadgeText: {
//     color: '#a855f7',
//     fontSize: 8,
//     fontWeight: '900',
//   },

//   uploadBox: {
//     borderRadius: 16,
//     borderWidth: 1.5,
//     borderStyle: 'dashed',
//     justifyContent: 'center',
//     minHeight: 48,
//   },

//   uploadBoxInactive: {
//     backgroundColor: '#240054',
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//   },

//   uploadBoxActive: {
//     backgroundColor: '#2d0066',
//     borderColor: 'rgba(168, 85, 247, 0.6)',
//   },

//   uploadPlaceholder: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 8,
//   },

//   uploadText: {
//     color: '#9ca3af',
//     fontSize: 13,
//     fontWeight: 'bold',
//   },

//   fileInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     gap: 5,
//   },

//   fileName: {
//     flex: 1,
//     color: '#d8b4fe',
//     fontSize: 11,
//     fontWeight: '900',
//   },

//   footerSection: {
//     marginTop: 40,
//     gap: 20,
//   },

//   securityNote: {
//     flexDirection: 'row',
//     backgroundColor: '#2a004f',
//     borderWidth: 1,
//     borderColor: 'rgba(234, 179, 8, 0.2)',
//     borderRadius: 16,
//     padding: 12,
//     gap: 10,
//   },

//   securityText: {
//     flex: 1,
//     color: '#fef08a',
//     fontSize: 9,
//     fontWeight: 'bold',
//     lineHeight: 14,
//   },

//   submitButton: {
//     backgroundColor: '#7c3aed',
//     height: 60,
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   submitButtonText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: '900',
//     letterSpacing: 1,
//   },

//   copyrightText: {
//     textAlign: 'center',
//     color: '#374151',
//     fontSize: 10,
//     fontWeight: '900',
//     letterSpacing: 4,
//     marginTop: 40,
//     paddingHorizontal: 20,
//   },

//   dropdown: {
//     position: "absolute",
//     top: 76,
//     width: "100%",
//     backgroundColor: "#240054",
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: "rgba(168,85,247,0.35)",
//     zIndex: 999,
//     overflow: "hidden",
//   },

//   dropItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: "rgba(255,255,255,0.08)",
//   },

//   dropText: {
//     color: "#e5e7eb",
//     fontSize: 13,
//     fontWeight: "600",
//     letterSpacing: 0.6,
//   },
// });




const styles = StyleSheet.create({
  /* ================= ROOT ================= */
  container: {
    flex: 1,
    backgroundColor: "#062530",
  },

  /* ❌ old orbs disabled */
  bgOrb: { display: "none" },
  topOrb: {},
  bottomOrb: {},

  /* ================= HEADER ================= */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#062530",
    borderBottomWidth: 1,
    borderBottomColor: "#104e64",
  },

  backButton: {
    padding: 10,
    backgroundColor: "rgba(16,78,100,0.35)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  headerTextContainer: {
    marginLeft: 15,
  },

  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  headerSub: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 2,
  },

  /* ================= SCROLL ================= */
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  /* ================= CARD ================= */
  formCard: {
    backgroundColor: "#0b3442",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#104e64",
    padding: 24,
  },

  /* ================= TITLE ================= */
  formTitleSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    gap: 15,
  },

  iconBox: {
    padding: 12,
    backgroundColor: "rgba(250,204,21,0.15)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.35)",
  },

  formTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
  },

  formSub: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "700",
    marginTop: 2,
  },

  /* ================= FORM ================= */
  inputStack: {
    gap: 20,
  },

  inputGroup: {
    width: "100%",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    color: "#8fbac4",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 10,
    marginLeft: 4,
  },

  input: {
    backgroundColor: "rgba(16,78,100,0.35)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#104e64",
    paddingHorizontal: 20,
    paddingVertical: 14,
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },

  /* ================= PICKERS ================= */
  pickerTrigger: {
    backgroundColor: "rgba(16,78,100,0.35)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#104e64",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  pickerText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
  },

  /* ================= UPLOAD ================= */
  uploadBox: {
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: "dashed",
    justifyContent: "center",
    minHeight: 48,
  },

  uploadBoxInactive: {
    backgroundColor: "rgba(16,78,100,0.25)",
    borderColor: "#104e64",
  },

  uploadBoxActive: {
    backgroundColor: "rgba(250,204,21,0.15)",
    borderColor: "#facc15",
  },

  uploadPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  uploadText: {
    color: "#8fbac4",
    fontSize: 13,
    fontWeight: "700",
  },

  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    gap: 6,
  },

  fileName: {
    flex: 1,
    color: "#facc15",
    fontSize: 11,
    fontWeight: "900",
  },

  /* ================= FOOTER ================= */
  footerSection: {
    marginTop: 40,
    gap: 20,
  },

  securityNote: {
    flexDirection: "row",
    backgroundColor: "rgba(16,78,100,0.35)",
    borderWidth: 1,
    borderColor: "rgba(74,222,128,0.35)",
    borderRadius: 16,
    padding: 12,
    gap: 10,
  },

  securityText: {
    flex: 1,
    color: "#d1fae5",
    fontSize: 9,
    fontWeight: "700",
    lineHeight: 14,
  },

  submitButton: {
    backgroundColor: "#facc15",
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#facc15",
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 6,
  },

  submitButtonText: {
    color: "#062530",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
  },

  /* ================= DROPDOWN ================= */
  dropdown: {
    position: "absolute",
    top: 76,
    width: "100%",
    backgroundColor: "#0b3442",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#104e64",
    zIndex: 999,
    overflow: "hidden",
  },

  dropItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },

  dropText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.6,
  },

  /* ================= LOADER ================= */
  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(6,37,48,0.85)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  loaderText: {
    marginTop: 12,
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
  },

  /* ================= FOOTER TEXT ================= */
  copyrightText: {
    textAlign: "center",
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 4,
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
