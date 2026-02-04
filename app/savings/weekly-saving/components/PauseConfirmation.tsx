import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import { Pause, X } from "lucide-react-native"; // Note: lucide-react-native

interface PauseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

 const PauseConfirmationModal = ({ isOpen, onClose, onConfirm }: PauseModalProps) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <TouchableOpacity 
        style={styles.backdrop} 
        activeOpacity={1} 
        onPress={onClose}
      >
        {/* Content Container (Prevents click propagation) */}
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
          
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={20} color="#6b7280" />
          </TouchableOpacity>

          <View style={styles.content}>
            {/* Icon Circle */}
            <View style={styles.iconWrapper}>
              <Pause size={32} color="#eab308" />
            </View>

            {/* Header & Body */}
            <Text style={styles.title}>PAUSE ENGINE?</Text>
            <Text style={styles.description}>
              Your wealth engine will temporarily stop compounding.
            </Text>

            {/* Action Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={onClose}
                style={[styles.btn, styles.btnCancel]}
              >
                <Text style={styles.btnTextCancel}>CANCEL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onConfirm}
                style={[styles.btn, styles.btnConfirm]}
              >
                <Text style={styles.btnTextConfirm}>PAUSE NOW</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

 export default PauseConfirmationModal

// const styles = StyleSheet.create({
//   backdrop: {
//     flex: 1,
//     backgroundColor: 'rgba(10, 0, 26, 0.8)', // #0a001a/80
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 24,
//   },
//   modalContainer: {
//     width: '100%',
//     maxWidth: 400,
//     backgroundColor: '#1a003d',
//     borderRadius: 40, // 2.5rem approx
//     padding: 32,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     position: 'relative',
//     elevation: 10, // Shadow for Android
//     shadowColor: '#000', // Shadow for iOS
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.5,
//     shadowRadius: 20,
//   },
//   closeButton: {
//     position: 'absolute',
//     right: 24,
//     top: 24,
//     padding: 8,
//     borderRadius: 99,
//     backgroundColor: 'rgba(255, 255, 255, 0.05)',
//   },
//   content: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   iconWrapper: {
//     width: 64,
//     height: 64,
//     backgroundColor: 'rgba(234, 179, 8, 0.1)', // yellow-500/10
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(234, 179, 8, 0.2)',
//     marginBottom: 24,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '900',
//     fontStyle: 'italic',
//     color: '#FFFFFF',
//     textTransform: 'uppercase',
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 14,
//     color: '#9ca3af', // gray-400
//     textAlign: 'center',
//     marginBottom: 32,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     gap: 12,
//     width: '100%',
//   },
//   btn: {
//     flex: 1,
//     height: 56,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   btnCancel: {
//     backgroundColor: 'rgba(255, 255, 255, 0.05)',
//   },
//   btnConfirm: {
//     backgroundColor: '#eab308', // yellow-500
//   },
//   btnTextCancel: {
//     color: '#FFFFFF',
//     fontSize: 12,
//     fontWeight: '900',
//   },
//   btnTextConfirm: {
//     color: '#000000',
//     fontSize: 12,
//     fontWeight: '900',
//   },
// });






const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(6,37,48,0.9)", // #062530 overlay
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  modalContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#0b3442",
    borderRadius: 40,
    padding: 32,
    borderWidth: 1,
    borderColor: "#104e64",
    position: "relative",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
  },

  closeButton: {
    position: "absolute",
    right: 24,
    top: 24,
    padding: 8,
    borderRadius: 99,
    backgroundColor: "rgba(16,78,100,0.35)",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  content: {
    alignItems: "center",
    marginTop: 20,
  },

  iconWrapper: {
    width: 64,
    height: 64,
    backgroundColor: "rgba(250,204,21,0.15)",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.35)",
    marginBottom: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "900",
    fontStyle: "italic",
    color: "#ffffff",
    textTransform: "uppercase",
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: "#8fbac4",
    textAlign: "center",
    marginBottom: 32,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },

  btn: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  btnCancel: {
    backgroundColor: "rgba(16,78,100,0.35)",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  btnConfirm: {
    backgroundColor: "#facc15",
  },

  btnTextCancel: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "900",
  },

  btnTextConfirm: {
    color: "#062530",
    fontSize: 12,
    fontWeight: "900",
  },
});
