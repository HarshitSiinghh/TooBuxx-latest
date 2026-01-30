

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Lock, X,Eye, EyeOff } from "lucide-react-native";
import { changePasswordApi } from "@/services/profile";
import CustomAlert from "./changepasswordalertmodel";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const ChangePasswordModal = ({ visible, onClose }: Props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("error");
  const [closeAfterAlert, setCloseAfterAlert] = useState(false);

  /* ================= LOGIC (UNCHANGED) ================= */
  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" = "error",
    shouldClose = false
  ) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertType(type);
    setCloseAfterAlert(shouldClose);
    setAlertVisible(true);
  };

  const resetFields = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    if (closeAfterAlert) {
      resetFields();
      onClose();
      setCloseAfterAlert(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      showAlert("Error", "All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      showAlert("Error", "Please enter same new password");
      return;
    }
    try {
      setLoading(true);
      const res = await changePasswordApi({
        old_password: oldPassword,
        new_password: newPassword,
      });
      setLoading(false);
      if (!res.success) {
        showAlert("Error", res.message || "Current password is wrong");
        return;
      }
      showAlert("Success", "Password changed successfully", "success", true);
    } catch (err) {
      setLoading(false);
      showAlert("Error", "Server not reachable");
    }
  };

  /* ================= UI ENHANCEMENTS ================= */
  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <View style={styles.card}>
          {/* ---------- HEADER ---------- */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
               <Text style={styles.title}>Update Password</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X color="#9ca3af" size={20} />
            </TouchableOpacity>
          </View>

          <Text style={styles.subTitle}>Enter your current and new password below to update security.</Text>

          {/* ---------- INPUTS ---------- */}
          <View style={styles.form}>
            <View style={styles.inputWrapper}>
              <Lock size={18} color="#7c3aed" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Current password"
                placeholderTextColor="#4b5563"
                
                value={oldPassword}
                onChangeText={setOldPassword}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Lock size={18} color="#7c3aed" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="New password"
                placeholderTextColor="#4b5563"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Lock size={18} color="#7c3aed" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                placeholderTextColor="#4b5563"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>

          {/* ---------- BUTTON ---------- */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Confirm Change</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* 🔥 CUSTOM ALERT */}
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        type={alertType}
        onClose={handleAlertClose}
      />
    </Modal>
  );
};

export default ChangePasswordModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(2, 6, 23, 0.9)", // Darker glass effect
    justifyContent: "center", // Center focus
    alignItems: "center",
    paddingHorizontal: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#0f172a", // Match profile card color
    padding: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#1e293b",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  subTitle: {
    color: "#9ca3af",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 24,
  },

  closeBtn: {
    backgroundColor: "#1e293b",
    padding: 6,
    borderRadius: 10,
  },

  form: { gap: 16 },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 56,
  },

  inputIcon: { marginRight: 12 },

  input: {
    flex: 1,
    height: "100%",
    color: "#f9fafb",
    fontSize: 15,
  },

  button: {
    backgroundColor: "#7c3aed",
    borderRadius: 18,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#7c3aed",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});



// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Modal,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { Lock, X, Eye, EyeOff, ShieldCheck } from "lucide-react-native";
// import { changePasswordApi } from "@/services/profile";
// import CustomAlert from "./changepasswordalertmodel";

// type Props = {
//   visible: boolean;
//   onClose: () => void;
// };

// const ChangePasswordModal = ({ visible, onClose }: Props) => {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   // 👁 show / hide states
//   const [showOld, setShowOld] = useState(false);
//   const [showNew, setShowNew] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   // 🔔 custom alert states
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [alertTitle, setAlertTitle] = useState("");
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertType, setAlertType] = useState<"success" | "error">("error");
//   const [closeAfterAlert, setCloseAfterAlert] = useState(false);

//   /* ================= LOGIC (UNCHANGED) ================= */
//   const showAlert = (
//     title: string,
//     message: string,
//     type: "success" | "error" = "error",
//     shouldClose = false
//   ) => {
//     setAlertTitle(title);
//     setAlertMessage(message);
//     setAlertType(type);
//     setCloseAfterAlert(shouldClose);
//     setAlertVisible(true);
//   };

//   const resetFields = () => {
//     setOldPassword("");
//     setNewPassword("");
//     setConfirmPassword("");
//     setShowOld(false);
//     setShowNew(false);
//     setShowConfirm(false);
//   };

//   const handleAlertClose = () => {
//     setAlertVisible(false);
//     if (closeAfterAlert) {
//       resetFields();
//       onClose();
//       setCloseAfterAlert(false);
//     }
//   };

//   const handleChangePassword = async () => {
//     if (!oldPassword || !newPassword || !confirmPassword) {
//       showAlert("Error", "All fields are required");
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       showAlert("Error", "Please enter same new password");
//       return;
//     }
//     try {
//       setLoading(true);
//       const res = await changePasswordApi({
//         old_password: oldPassword,
//         new_password: newPassword,
//       });
//       setLoading(false);
//       if (!res.success) {
//         showAlert("Error", res.message || "Current password is wrong");
//         return;
//       }
//       showAlert("Success", "Password changed successfully", "success", true);
//     } catch (err) {
//       setLoading(false);
//       showAlert("Error", "Server not reachable");
//     }
//   };

//   /* ================= UI ENHANCEMENTS ================= */
//   return (
//     <Modal visible={visible} transparent animationType="fade">
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.overlay}
//       >
//         <View style={styles.card}>
//           {/* ---------- HEADER ---------- */}
//           <View style={styles.header}>
//             <View style={styles.titleContainer}>
//               <ShieldCheck size={22} color="#7c3aed" />
//               <Text style={styles.title}>Update Password</Text>
//             </View>
//             <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
//               <X color="#9ca3af" size={20} />
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.subTitle}>
//             Secure your account by choosing a strong, unique password.
//           </Text>

//           {/* ---------- FORM ---------- */}
//           <View style={styles.form}>
//             {/* Current Password */}
//             <View style={styles.inputWrapper}>
//               <Lock size={18} color="#7c3aed" style={styles.inputIcon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Current password"
//                 placeholderTextColor="#4b5563"
//                 secureTextEntry={!showOld}
//                 value={oldPassword}
//                 onChangeText={setOldPassword}
//               />
//               <TouchableOpacity onPress={() => setShowOld(!showOld)} style={styles.eyeIcon}>
//                 {showOld ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
//               </TouchableOpacity>
//             </View>

//             {/* New Password */}
//             <View style={styles.inputWrapper}>
//               <Lock size={18} color="#7c3aed" style={styles.inputIcon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="New password"
//                 placeholderTextColor="#4b5563"
//                 secureTextEntry={!showNew}
//                 value={newPassword}
//                 onChangeText={setNewPassword}
//               />
//               <TouchableOpacity onPress={() => setShowNew(!showNew)} style={styles.eyeIcon}>
//                 {showNew ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
//               </TouchableOpacity>
//             </View>

//             {/* Confirm Password */}
//             <View style={styles.inputWrapper}>
//               <Lock size={18} color="#7c3aed" style={styles.inputIcon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Confirm new password"
//                 placeholderTextColor="#4b5563"
//                 secureTextEntry={!showConfirm}
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//               />
//               <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeIcon}>
//                 {showConfirm ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* ---------- ACTION BUTTON ---------- */}
//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleChangePassword}
//             disabled={loading}
//             activeOpacity={0.8}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>Confirm Changes</Text>
//             )}
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>

//       <CustomAlert
//         visible={alertVisible}
//         title={alertTitle}
//         message={alertMessage}
//         type={alertType}
//         onClose={handleAlertClose}
//       />
//     </Modal>
//   );
// };

// export default ChangePasswordModal;

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(2, 6, 23, 0.95)", // Deep transparent overlay
//     justifyContent: "center", // Centered for premium feel
//     alignItems: "center",
//     paddingHorizontal: 24,
//   },

//   card: {
//     width: "100%",
//     backgroundColor: "#0f172a",
//     borderRadius: 30,
//     padding: 24,
//     borderWidth: 1,
//     borderColor: "#1e293b",
//     shadowColor: "#7c3aed",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.2,
//     shadowRadius: 20,
//     elevation: 10,
//   },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },

//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },

//   title: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "800",
//   },

//   subTitle: {
//     color: "#94a3b8",
//     fontSize: 13,
//     lineHeight: 18,
//     marginBottom: 24,
//   },

//   closeBtn: {
//     backgroundColor: "#1e293b",
//     padding: 6,
//     borderRadius: 10,
//   },

//   form: {
//     gap: 16,
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

//   inputIcon: {
//     marginRight: 10,
//   },

//   input: {
//     flex: 1,
//     height: "100%",
//     color: "#f9fafb",
//     fontSize: 15,
//   },

//   eyeIcon: {
//     padding: 4,
//   },

//   button: {
//     backgroundColor: "#7c3aed",
//     borderRadius: 18,
//     height: 56,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 24,
//     shadowColor: "#7c3aed",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 4,
//   },

//   buttonText: {
//     color: "#fff",
//     fontWeight: "800",
//     fontSize: 16,
//     letterSpacing: 0.5,
//   },
// });