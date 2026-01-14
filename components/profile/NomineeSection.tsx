// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   Pressable,
//   ScrollView,
//   Platform,
// } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { Picker } from "@react-native-picker/picker";

// import { Navigation, PromoModel } from "@/store/store";
//  import { useRouter } from "expo-router";


// export const NomineeForm = () => {
//   const { setOpen } = Navigation();
//   const { setSetting } = PromoModel();
//  const router = useRouter();
//   const [fullName, setFullName] = useState("");
//   const [dob, setDob] = useState("");
//   const [relationship, setRelationship] = useState("");
//   const [phone, setPhone] = useState("");
//   const [documentType, setDocumentType] = useState("");
//   const [file, setFile] = useState<any>(null);

//   const pickDocument = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setFile(result.assets[0]);
//     }
//   };

//   const handleSubmit = () => {
//     // same logic place as form submit
//     console.log({
//       fullName,
//       dob,
//       relationship,
//       phone,
//       documentType,
//       file,
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.wrapper}>
//       <View style={styles.form}>
//         {/* ========== Header ========== */}
//         <View style={styles.header}>
//           {/* <Pressable
//             style={styles.back}
//             onPress={() => {
//               setOpen("profile");
//               setSetting(null);
//             }}
//           >
//             <Feather name="arrow-left" size={22} color="white" />
//           </Pressable> */}
//            <Pressable onPress={() => router.back()}        style={styles.back}>
//             <Feather name="arrow-left" size={22} color="white" />
//                 </Pressable>


//           <Text style={styles.heading}>Add a Nominee</Text>
//         </View>

//         {/* ========== Full Name ========== */}
//         <View style={styles.field}>
//           <Text style={styles.label}>Full Name</Text>
//           <TextInput
//             value={fullName}
//             onChangeText={setFullName}
//             placeholder="Enter full name"
//             placeholderTextColor="#9CA3AF"
//             style={styles.input}
//           />
//         </View>

//         {/* ========== DOB ========== */}
//         <View style={styles.field}>
//           <Text style={styles.label}>Date of Birth</Text>
//           <TextInput
//             value={dob}
//             onChangeText={setDob}
//             placeholder="YYYY-MM-DD"
//             placeholderTextColor="#9CA3AF"
//             style={styles.input}
//           />
//         </View>

//         {/* ========== Relationship ========== */}
//         <View style={styles.field}>
//           <Text style={styles.label}>Relationship Type</Text>
//           <View style={styles.pickerBox}>
//             <Picker
//               selectedValue={relationship}
//               onValueChange={(v) => setRelationship(v)}
//               dropdownIconColor="#9CA3AF"
//               style={styles.picker}
//             >
//               <Picker.Item label="Select Relation Type" value="" />
//               <Picker.Item label="Father" value="father" />
//               <Picker.Item label="Mother" value="mother" />
//               <Picker.Item label="Wife" value="wife" />
//               <Picker.Item label="Son" value="son" />
//               <Picker.Item label="Daughter" value="daughter" />
//             </Picker>
//           </View>
//         </View>

//         {/* ========== Phone ========== */}
//         <View style={styles.field}>
//           <Text style={styles.label}>Phone Number</Text>
//           <TextInput
//             value={phone}
//             onChangeText={setPhone}
//             placeholder="Enter phone number"
//             placeholderTextColor="#9CA3AF"
//             keyboardType="phone-pad"
//             style={styles.input}
//           />
//         </View>

//         {/* ========== Document Type ========== */}
//         <View style={styles.field}>
//           <Text style={styles.label}>Document Type</Text>
//           <View style={styles.pickerBox}>
//             <Picker
//               selectedValue={documentType}
//               onValueChange={(v) => setDocumentType(v)}
//               dropdownIconColor="#9CA3AF"
//               style={styles.picker}
//             >
//               <Picker.Item label="Select Document Type" value="" />
//               <Picker.Item label="Aadhar Card" value="aadhar" />
//               <Picker.Item label="PAN Card" value="pan" />
//               <Picker.Item label="Passport" value="passport" />
//               <Picker.Item label="Voter ID" value="voter" />
//               <Picker.Item label="Driving License" value="license" />
//             </Picker>
//           </View>
//         </View>

//         {/* ========== Upload ========== */}
//         <View style={styles.field}>
//           <Text style={styles.label}>Upload Document</Text>

//           <Pressable style={styles.uploadBtn} onPress={pickDocument}>
//             <Feather name="upload" size={18} color="#6366F1" />
//             <Text style={styles.uploadText}>
//               {file ? "File Selected" : "Select File"}
//             </Text>
//           </Pressable>
//         </View>

//         {/* ========== Submit ========== */}
//         <Pressable style={styles.submitBtn} onPress={handleSubmit}>
//           <Text style={styles.submitText}>Submit</Text>
//         </Pressable>
//       </View>
//     </ScrollView>
//   );
// };

// /* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   wrapper: {
//     flexGrow: 1,
//     backgroundColor: "#1a003d",
//     justifyContent: "center",
//     padding: 16,
//   },

//   form: {
//     backgroundColor: "#2f2360",
//     borderRadius: 18,
//     padding: 20,
//   },

//   header: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//   },

//   back: {
//     position: "absolute",
//     left: 0,
//   },

//   heading: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//   },

//   field: {
//     marginBottom: 14,
//   },

//   label: {
//     color: "white",
//     fontSize: 13,
//     marginBottom: 6,
//     fontWeight: "500",
//   },

//   input: {
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     paddingVertical: Platform.OS === "ios" ? 12 : 8,
//     color: "white",
//   },

//   pickerBox: {
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     borderRadius: 10,
//     overflow: "hidden",
//   },

//   picker: {
//     color: "white",
//   },

//   uploadBtn: {
//     flexDirection: "row",
//     gap: 8,
//     borderWidth: 1,
//     borderColor: "#6366F1",
//     borderRadius: 10,
//     paddingVertical: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   uploadText: {
//     color: "#6366F1",
//     fontWeight: "600",
//   },

//   submitBtn: {
//     backgroundColor: "#4f46e5",
//     paddingVertical: 12,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 10,
//   },

//   submitText: {
//     color: "white",
//     fontSize: 15,
//     fontWeight: "700",
//   },
// });











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
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
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

const { width, height } = Dimensions.get('window');

export function NomineeSection() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    relationship: '',
    phone: '',
    idType: '',
  });
   const router = useRouter();

  const pickDocument = async () => {
    // In a real app, use: DocumentPicker.getDocumentAsync()
    // Simulating file selection:
    setSelectedFile("nominee_id_proof.pdf");
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- BACKGROUND DECORATIVE ELEMENTS --- */}
      <View style={[styles.bgOrb, styles.topOrb]} />
      <View style={[styles.bgOrb, styles.bottomOrb]} />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft color="#9ca3af" size={20} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>ADD NOMINEE</Text>
          <Text style={styles.headerSub}>BENEFICIARY MANAGEMENT</Text>
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
          <View style={styles.formCard}>
            <View style={styles.topGlowLine} />

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
              {/* Full Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>LEGAL FULL NAME</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter nominee's full name"
                  placeholderTextColor="#4b5563"
                  value={formData.fullName}
                  onChangeText={(txt) => setFormData({...formData, fullName: txt})}
                />
              </View>

              {/* DOB and Relationship Row */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                  <Text style={styles.label}>DATE OF BIRTH</Text>
                  <TouchableOpacity style={styles.pickerTrigger}>
                    <Text style={styles.pickerText}>YYYY-MM-DD</Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>RELATIONSHIP</Text>
                  <TouchableOpacity style={styles.pickerTrigger}>
                    <Text style={styles.pickerText}>Choose Relation</Text>
                    <ChevronDown color="#6b7280" size={16} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Phone Number */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>PHONE NUMBER</Text>
                <View style={styles.phoneInputWrapper}>
                  <TextInput
                    style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
                    placeholder="XXXXX XXXXX"
                    placeholderTextColor="#4b5563"
                    keyboardType="numeric"
                    maxLength={10}
                  />
                  <View style={styles.mobileBadge}>
                    <Text style={styles.mobileBadgeText}>MOBILE</Text>
                  </View>
                </View>
              </View>

              {/* ID Type and Document Row */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                  <Text style={styles.label}>ID PROOF TYPE</Text>
                  <TouchableOpacity style={styles.pickerTrigger}>
                    <Text style={styles.pickerText}>Select ID</Text>
                    <ChevronDown color="#6b7280" size={16} />
                  </TouchableOpacity>
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
                        <Text numberOfLines={1} style={styles.fileName}>{selectedFile}</Text>
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
            </View>

            {/* Submit Section */}
            <View style={styles.footerSection}>
              <View style={styles.securityNote}>
                <ShieldCheck color="#eab308" size={18} />
                <Text style={styles.securityText}>
                  DATA IS ENCRYPTED WITH BANK-GRADE SECURITY PROTOCOLS FOR YOUR PRIVACY.
                </Text>
              </View>

              <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
                <Text style={styles.submitButtonText}>SUBMIT NOMINEE INFORMATION</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.copyrightText}>
            © 2026 XYZ GOLD FINTECH SOLUTIONS
          </Text>
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
  bgOrb: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.1,
  },
  topOrb: {
    top: -height * 0.1,
    left: -width * 0.1,
    width: width,
    height: width,
    backgroundColor: '#9333ea',
  },
  bottomOrb: {
    bottom: -height * 0.1,
    right: -width * 0.1,
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: '#4f46e5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(26, 0, 61, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
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
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
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
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 24,
    overflow: 'hidden',
  },
  topGlowLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
  },
  formTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 15,
  },
  iconBox: {
    padding: 12,
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.2)',
  },
  formTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
  formSub: {
    color: '#6b7280',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
  inputStack: {
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
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 20,
    paddingVertical: 14,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pickerTrigger: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerText: {
    color: '#4b5563',
    fontSize: 13,
    fontWeight: 'bold',
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingRight: 12,
  },
  mobileBadge: {
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.2)',
  },
  mobileBadgeText: {
    color: '#a855f7',
    fontSize: 8,
    fontWeight: '900',
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
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    borderColor: 'rgba(168, 85, 247, 0.5)',
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
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    gap: 5,
  },
  fileName: {
    flex: 1,
    color: '#d8b4fe',
    fontSize: 11,
    fontWeight: '900',
  },
  footerSection: {
    marginTop: 40,
    gap: 20,
  },
  securityNote: {
    flexDirection: 'row',
    backgroundColor: 'rgba(234, 179, 8, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.1)',
    borderRadius: 16,
    padding: 12,
    gap: 10,
  },
  securityText: {
    flex: 1,
    color: '#fef08a',
    fontSize: 9,
    fontWeight: 'bold',
    lineHeight: 14,
  },
  submitButton: {
    backgroundColor: '#7c3aed',
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  copyrightText: {
    textAlign: 'center',
    color: '#374151',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 4,
    marginTop: 40,
    paddingHorizontal: 20,
  },
});