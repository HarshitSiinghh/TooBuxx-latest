import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { User, ArrowLeft, Camera, Mail, Phone, ShieldCheck } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { useProfileStore } from "@/store/profileStore";
import { updateProfileApi } from "@/services/profile";
import { BASE_URL_PROFILE_PIC } from "@/constants/api";
import ChangePasswordModal from "./ChangePasswordModal";

const ChangeProfile = () => {
  const router = useRouter();
  const profile = useProfileStore((s) => s.profile);
  const setProfile = useProfileStore((s) => s.setProfile);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [loading, setLoading] = useState(false);

  /* ================= LOGIC (UNCHANGED) ================= */     
  useEffect(() => {
    if (profile) {
      setFullName(profile.username || "");
      setPhone(profile.phone || "");
      setEmail(profile.email || "");
    }
  }, [profile]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Allow gallery access");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleUpdate = async () => {
    if (!fullName && !phone && !image) {
      Alert.alert("Nothing to update");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      if (fullName) formData.append("username", fullName);
      if (phone) formData.append("phone", phone);
      if (image) {
        formData.append("profile_photo", {
          uri: image.uri,
          name: "profile.jpg",
          type: "image/jpeg",
        } as any);
      }
      const res = await updateProfileApi(formData);
      if (!res.success) {
        Alert.alert("Update failed", res.message || "Try again");
        setLoading(false);
        return;
      }
      setProfile(res.user);
      setLoading(false);
      Alert.alert("Success", "Profile updated successfully", [
        { text: "OK", onPress: () => { if (router.canGoBack()) router.back(); } },
      ]);
    } catch (err) {
      setLoading(false);
      Alert.alert("Error", "Server not reachable");
    }
  };

  /* ================= UI (ENHANCED LOOK) ================= */
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.push("/(tabs)/settings")} 
          style={styles.backButton}
        >
          <ArrowLeft size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ---------- AVATAR SECTION ---------- */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarCircle}>
                {image ? (
                  <Image source={{ uri: image.uri }} style={styles.avatarImage} />
                ) : profile?.profile_photo ? (
                  <Image
                    source={{
                      uri: profile.profile_photo.startsWith("http")
                        ? profile.profile_photo
                        : `${BASE_URL_PROFILE_PIC}${profile.profile_photo}`,
                    }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <User size={50} color="#7c3aed" />
                )}
              </View>
              <TouchableOpacity style={styles.cameraBadge} onPress={pickImage} activeOpacity={0.8}>
                <Camera size={18} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>{fullName || "Premium User"}</Text>
            <View style={styles.badgeRow}>
               {/* <ShieldCheck size={14} color="#10b981" /> */}
             
            </View>
          </View>

          {/* ---------- FORM CARD ---------- */}
          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>FULL NAME</Text>
              <View style={styles.inputWrapper}>
                <User size={18} color="#7c3aed" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your name"
                  placeholderTextColor="#4b5563"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
              <View style={[styles.inputWrapper, styles.lockedInput]}>
                <Mail size={18} color="#4b5563" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: "#64748b" }]}
                  value={email}
                  editable={false}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>PHONE NUMBER</Text>
              <View style={styles.inputWrapper}>
                <Phone size={18} color="#7c3aed" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  placeholder="Enter phone number"
                  placeholderTextColor="#4b5563"
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.securityButton}
              onPress={() => setShowPasswordModal(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.securityButtonText}>Change Password & Security</Text>
            </TouchableOpacity>
          </View>

          {/* ---------- ACTION BUTTONS ---------- */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleUpdate}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => router.back()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ChangePasswordModal
        visible={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </SafeAreaView>
  );
};

export default ChangeProfile;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#020617" },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     paddingTop:37,
//   },
//   backButton: {
//     backgroundColor: "#1e293b",
//     padding: 8,
//     borderRadius: 12,
//   },
//   headerTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "800",
//     letterSpacing: 0.5,
//     textTransform: "uppercase",
//   },

//   scrollContent: { paddingBottom: 40, paddingHorizontal: 20 },

//   avatarSection: { alignItems: "center", marginTop: 10, marginBottom: 30 },
//   avatarWrapper: {
//     position: "relative",
//     shadowColor: "#7c3aed",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 20,
//     elevation: 10,
//   },
//   avatarCircle: {
//     width: 110,
//     height: 110,
//     borderRadius: 55,
//     backgroundColor: "#0f172a",
//     borderWidth: 3,
//     borderColor: "#1e293b",
//     justifyContent: "center",
//     alignItems: "center",
//     overflow: "hidden",
//   },
//   avatarImage: { width: "100%", height: "100%" },
//   cameraBadge: {
//     position: "absolute",
//     bottom: 0,
//     right: 5,
//     backgroundColor: "#7c3aed",
//     borderRadius: 15,
//     padding: 8,
//     borderWidth: 3,
//     borderColor: "#020617",
//   },
//   userName: { color: "#fff", fontSize: 22, fontWeight: "800", marginTop: 15 },
//   badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
//   userStatus: { color: "#10b981", fontSize: 13, fontWeight: "600" },

//   card: {
//     backgroundColor: "#0f172a",
//     borderRadius: 24,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: "#1e293b",
//   },
//   inputGroup: { marginBottom: 20 },
//   label: {
//     color: "#9ca3af",
//     fontSize: 11,
//     fontWeight: "700",
//     marginBottom: 8,
//     marginLeft: 4,
//     letterSpacing: 1,
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#020617",
//     borderWidth: 1,
//     borderColor: "#334155",
//     borderRadius: 16,
//     paddingHorizontal: 15,
//     height: 56,
//   },
//   lockedInput: { backgroundColor: "#0f172a", borderColor: "#1e293b", opacity: 0.7 },
//   inputIcon: { marginRight: 12 },
//   input: { flex: 1, color: "#f9fafb", fontSize: 15, fontWeight: "500" },

//   securityButton: {
//     marginTop: 10,
//     backgroundColor: "#1e1b4b",
//     borderWidth: 1,
//     borderColor: "#4338ca",
//     borderStyle: "dashed",
//     borderRadius: 16,
//     paddingVertical: 14,
//     alignItems: "center",
//   },
//   securityButtonText: { color: "#a5b4fc", fontWeight: "600", fontSize: 14 },

//   buttonContainer: { marginTop: 30 },
//   submitButton: {
//     backgroundColor: "#7c3aed",
//     borderRadius: 18,
//     height: 60,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#7c3aed",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   submitButtonText: { color: "#fff", fontWeight: "800", fontSize: 16, letterSpacing: 0.5 },
//   cancelButton: { marginTop: 16, alignItems: "center", padding: 10 },
//   cancelButtonText: { color: "#64748b", fontWeight: "600", fontSize: 15 },
// });






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#062530",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 37,
  },

  backButton: {
    backgroundColor: "#104e64",
    padding: 8,
    borderRadius: 12,
  },

  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },

  /* ================= AVATAR ================= */

  avatarSection: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },

  avatarWrapper: {
    position: "relative",
    shadowColor: "#facc15",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },

  avatarCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#0b2f3a",
    borderWidth: 3,
    borderColor: "#104e64",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
  },

  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 5,
    backgroundColor: "#facc15",
    borderRadius: 15,
    padding: 8,
    borderWidth: 3,
    borderColor: "#062530",
  },

  userName: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 15,
  },

  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 4,
  },

  userStatus: {
    color: "#22c55e",
    fontSize: 13,
    fontWeight: "600",
  },

  /* ================= CARD ================= */

  card: {
    backgroundColor: "#0b2f3a",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    color: "#9ca3af",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 1,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#041e27",
    borderWidth: 1,
    borderColor: "#104e64",
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 56,
  },

  lockedInput: {
    backgroundColor: "#0b2f3a",
    borderColor: "#104e64",
    opacity: 0.7,
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
  },

  /* ================= SECURITY ================= */

  securityButton: {
    marginTop: 10,
    backgroundColor: "rgba(250, 204, 21, 0.08)",
    borderWidth: 1,
    borderColor: "#facc15",
    borderStyle: "dashed",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },

  securityButtonText: {
    color: "#facc15",
    fontWeight: "600",
    fontSize: 14,
  },

  /* ================= ACTION BUTTONS ================= */

  buttonContainer: {
    marginTop: 30,
  },

  submitButton: {
    backgroundColor: "#facc15",
    borderRadius: 18,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#facc15",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },

  submitButtonText: {
    color: "#062530",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.5,
  },

  cancelButton: {
    marginTop: 16,
    alignItems: "center",
    padding: 10,
  },

  cancelButtonText: {
    color: "#9ca3af",
    fontWeight: "600",
    fontSize: 15,
  },
});
