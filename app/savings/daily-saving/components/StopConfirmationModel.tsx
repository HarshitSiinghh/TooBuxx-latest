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
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>; // ✅ kept async
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
              {/* Warning Icon */}
              <View style={styles.iconContainer}>
                <AlertTriangle size={32} color="#ef4444" />
              </View>

             <View style={styles.textContainer}>
  <Text style={styles.title}>STOP WEALTH ENGINE?</Text>
  <Text style={styles.description}>
    Stopping your daily savings will break your{" "}
    <Text style={styles.streakHighlight}>streak</Text> and pause accumulation.
  </Text>
</View>
              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={onClose}
                  style={[styles.button, styles.cancelButton]}
                >
                  <Text style={styles.cancelText}>KEEP SAVING</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onConfirm}
                  style={[styles.button, styles.stopButton]}
                >
                  <Text style={styles.stopText}>STOP ENGINE</Text>
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
    backgroundColor: 'rgba(10, 0, 26, 0.8)', // #0a001a/80
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  centeredView: {
    width: '100%',
    maxWidth: 400,
  },
  modalView: {
    backgroundColor: '#1a003d',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 40,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 24,
    top: 24,
    padding: 8,
    borderRadius: 99,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(239, 68, 68, 0.1)', // red-500/10
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    marginBottom: 24,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  streakHighlight: {
    color: '#f97316', // orange-500
    fontWeight: '700',
  },
  buttonContainer: {
    flexDirection: 'column', // Stacked on mobile for better touch targets
    gap: 12,
    width: '100%',
  },
  button: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  stopButton: {
    backgroundColor: '#dc2626', // red-600
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cancelText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
  },
  stopText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
  },
});
 export default StopConfirmationModal