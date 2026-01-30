import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import { AlertTriangle, X } from "lucide-react-native";

interface StopModalProps {
  onConfirm: () => void;
  onClose: () => void;
  isOpen: boolean; // Added to control visibility via React Native Modal
}

 const StopModal = ({ onConfirm, onClose, isOpen }: StopModalProps) => {
  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop with Blur approximation */}
      <TouchableOpacity 
        activeOpacity={1} 
        style={styles.backdrop} 
        onPress={onClose}
      >
        {/* Modal Body */}
        <View style={styles.centeredView}>
          <TouchableOpacity 
            activeOpacity={1} 
            style={styles.modalView}
          >
            {/* Close Icon */}
            <TouchableOpacity 
              onPress={onClose} 
              style={styles.closeButton}
            >
              <X size={24} color="#6b7280" />
            </TouchableOpacity>

            <View style={styles.content}>
              {/* Alert Icon */}
              <View style={styles.iconCircle}>
                <AlertTriangle size={40} color="#ef4444" />
              </View>

              <View style={styles.textSection}>
                <Text style={styles.titleText}>STOP WEALTH ENGINE?</Text>
                <Text style={styles.descriptionText}>
                  Stopping will reset your current monthly streak. Your compounding progress will be interrupted.
                </Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonStack}>
                <TouchableOpacity
                  onPress={onConfirm}
                  activeOpacity={0.8}
                  style={styles.confirmBtn}
                >
                  <Text style={styles.confirmBtnText}>CONFIRM STOP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onClose}
                  activeOpacity={0.7}
                  style={styles.cancelBtn}
                >
                  <Text style={styles.cancelBtnText}>KEEP SAVING</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  centeredView: {
    width: '100%',
    maxWidth: 400,
  },
  modalView: {
    backgroundColor: '#1a003d',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 32,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    zIndex: 10,
  },
  content: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '900',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  descriptionText: {
    color: '#9ca3af',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  buttonStack: {
    width: '100%',
    gap: 12,
  },
  confirmBtn: {
    backgroundColor: '#dc2626',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
  },
  confirmBtnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
    fontStyle: 'italic',
  },
  cancelBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
});

 export default StopModal