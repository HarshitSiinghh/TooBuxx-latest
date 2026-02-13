import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform 
} from 'react-native';
import { AlertTriangle, X } from "lucide-react-native";

interface StopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

 const StopConfirmationModal = ({ isOpen, onClose, onConfirm }: StopModalProps) => {
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
        {/* Modal Container */}
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
              {/* Alert Icon */}
              <View style={styles.iconContainer}>
                <AlertTriangle size={40} color="#ef4444" />
              </View>

              <View style={styles.textSection}>
                <Text style={styles.title}>STOP WEEKLY SIP?</Text>
                <Text style={styles.description}>
                  By stopping your weekly growth plan, you lose the{' '}
                  <Text style={styles.highlightText}>compound velocity</Text> and your automated gold accumulation will cease.
                </Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonStack}>
                <TouchableOpacity
                  onPress={onConfirm}
                  activeOpacity={0.9}
                  style={styles.confirmBtn}
                >
                  <Text style={styles.confirmBtnText}>CONFIRM STOP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onClose}
                  activeOpacity={0.7}
                  style={styles.returnBtn}
                >
                  <Text style={styles.returnBtnText}>RETURN TO ACCOUNT</Text>
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
//     backgroundColor: 'rgba(10, 0, 26, 0.9)', // Matches #0a001a/90
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
//     borderRadius: 40, // rounded-[2.5rem]
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     padding: 32,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 20 },
//     shadowOpacity: 0.5,
//     shadowRadius: 50,
//     elevation: 15,
//     position: 'relative',
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
//     width: 80,
//     height: 80,
//     backgroundColor: 'rgba(239, 68, 68, 0.1)', // red-500/10
//     borderRadius: 32, // rounded-[2rem]
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(239, 68, 68, 0.2)',
//     marginBottom: 24,
//   },
//   textSection: {
//     alignItems: 'center',
//     marginBottom: 32,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: '900',
//     fontStyle: 'italic',
//     color: '#ffffff',
//     textAlign: 'center',
//     textTransform: 'uppercase',
//     letterSpacing: -1,
//     marginBottom: 12,
//   },
//   description: {
//     fontSize: 14,
//     color: '#9ca3af',
//     textAlign: 'center',
//     lineHeight: 22,
//     fontWeight: '500',
//     paddingHorizontal: 10,
//   },
//   highlightText: {
//     color: '#  ', // purple-400
//     fontWeight: '900',
//     fontStyle: 'italic',
//   },
//   buttonStack: {
//     width: '100%',
//     gap: 12,
//   },
//   confirmBtn: {
//     backgroundColor: '#dc2626', // red-600
//     paddingVertical: 18,
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#dc2626',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.4,
//     shadowRadius: 20,
//     elevation: 8,
//   },
//   confirmBtnText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '900',
//     letterSpacing: 2, // tracking-[0.2em]
//   },
//   returnBtn: {
//     backgroundColor: 'rgba(255, 255, 255, 0.05)',
//     paddingVertical: 18,
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   returnBtnText: {
//     color: '#9ca3af',
//     fontSize: 12,
//     fontWeight: '900',
//     letterSpacing: 2,
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
    backgroundColor: "#0b3442",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#104e64",
    padding: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.45,
    shadowRadius: 50,
    elevation: 15,
    position: "relative",
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
  },

  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(239,68,68,0.15)",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.35)",
    marginBottom: 24,
  },

  textSection: {
    alignItems: "center",
    marginBottom: 32,
  },

  title: {
    fontSize: 26,
    fontWeight: "900",
    fontStyle: "italic",
    color: "#ffffff",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: -1,
    marginBottom: 12,
  },

  description: {
    fontSize: 14,
    color: "#8fbac4",
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "500",
    paddingHorizontal: 10,
  },

  highlightText: {
    color: "#facc15",
    fontWeight: "900",
    fontStyle: "italic",
  },

  buttonStack: {
    width: "100%",
    gap: 12,
  },

  confirmBtn: {
    backgroundColor: "#dc2626",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#dc2626",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },

  confirmBtnText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
  },

  returnBtn: {
    backgroundColor: "rgba(16,78,100,0.35)",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  returnBtnText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
  },
});

 export default StopConfirmationModal