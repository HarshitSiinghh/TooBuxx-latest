import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
//   BlurView 
} from 'react-native';
import { Pause, X } from "lucide-react-native"; // Note the -native package

interface PauseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

 const PauseConfirmationModal = ({ isOpen, onClose, onConfirm }: PauseModalProps) => {
  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <TouchableOpacity 
        activeOpacity={1} 
        style={styles.backdrop} 
        onPress={onClose}
      >
        {/* Content Container */}
        <View style={styles.centeredView}>
          <TouchableOpacity 
            activeOpacity={1} 
            style={styles.modalView}
          >
            {/* Close Button */}
            <TouchableOpacity 
              onPress={onClose} 
              style={styles.closeButton}
            >
              <X size={20} color="#6b7280" />
            </TouchableOpacity>

            <View style={styles.content}>
              {/* Icon Section */}
              <View style={styles.iconContainer}>
                <Pause size={32} color="#eab308" />
              </View>

              {/* Text Section */}
              <Text style={styles.title}>PAUSE ENGINE?</Text>
              <Text style={styles.subtitle}>
                Your wealth engine will temporarily stop compounding.
              </Text>

              {/* Action Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  onPress={onClose}
                  style={[styles.button, styles.cancelButton]}
                >
                  <Text style={styles.cancelButtonText}>CANCEL</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onConfirm}
                  style={[styles.button, styles.confirmButton]}
                >
                  <Text style={styles.confirmButtonText}>PAUSE NOW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// const styles = StyleSheet.create({
//   backdrop: {
//     flex: 1,
//     backgroundColor: 'rgba(10, 0, 26, 0.8)', // Matches #0a001a/80
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 24,
//   },
//   centeredView: {
//     width: '100%',
//     maxWidth: 400,
//   },
//   modalView: {
//     backgroundColor: '#1a003d',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     borderRadius: 40,
//     padding: 32,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.5,
//     shadowRadius: 20,
//     elevation: 10,
//   },
//   closeButton: {
//     position: 'absolute',
//     right: 24,
//     top: 24,
//     padding: 8,
//     borderRadius: 99,
//   },
//   content: {
//     alignItems: 'center',
//   },
//   iconContainer: {
//     width: 64,
//     height: 64,
//     backgroundColor: 'rgba(234, 179, 8, 0.1)',
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
//     color: '#ffffff',
//     textTransform: 'uppercase',
//     marginBottom: 12,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#9ca3af',
//     textAlign: 'center',
//     marginBottom: 32,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     gap: 12,
//     width: '100%',
//   },
//   button: {
//     flex: 1,
//     paddingVertical: 16,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cancelButton: {
//     backgroundColor: 'rgba(255, 255, 255, 0.05)',
//   },
//   confirmButton: {
//     backgroundColor: '#eab308',
//   },
//   cancelButtonText: {
//     color: '#ffffff',
//     fontSize: 12,
//     fontWeight: '900',
//   },
//   confirmButtonText: {
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

  centeredView: {
    width: "100%",
    maxWidth: 400,
  },

  modalView: {
    backgroundColor: "#0b3442", // glass card
    borderWidth: 1,
    borderColor: "#104e64",
    borderRadius: 40,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 10,
  },

  closeButton: {
    position: "absolute",
    right: 24,
    top: 24,
    padding: 8,
    borderRadius: 99,
  },

  content: {
    alignItems: "center",
  },

  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: "rgba(250,204,21,0.15)", // gold tint
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
    marginBottom: 12,
  },

  subtitle: {
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

  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButton: {
    backgroundColor: "rgba(16,78,100,0.35)",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  confirmButton: {
    backgroundColor: "#facc15",
  },

  cancelButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
  },

  confirmButtonText: {
    color: "#062530",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
  },
});


 export default PauseConfirmationModal