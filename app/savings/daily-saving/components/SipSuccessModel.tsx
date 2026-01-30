import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { CheckCircle, X, Sparkles } from "lucide-react-native";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

 const SipSuccessModal = ({ isOpen, onClose, amount }: SuccessModalProps) => {
  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop Layer */}
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
              {/* Success Icon */}
              <View style={styles.iconContainer}>
                <CheckCircle size={32} color="#22c55e" />
              </View>

              {/* Text Content */}
              <Text style={styles.title}>WEALTH ENGINE ACTIVATED</Text>
              
              <Text style={styles.description}>
                ₹{amount.toLocaleString()} will now be invested daily in digital gold.
              </Text>

              {/* Motivational Tag */}
              <View style={styles.tagRow}>
                <Sparkles size={16} color="#818cf8" />
                <Text style={styles.tagText}>DISCIPLINE BUILDS EMPIRES</Text>
              </View>

              {/* Action Button */}
              <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.8}
                style={styles.primaryButton}
              >
                <Text style={styles.buttonText}>LET’S GROW</Text>
              </TouchableOpacity>
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
    backgroundColor: 'rgba(10, 0, 26, 0.8)', // Matches #0a001a/80
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
    gap: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#ffffff',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#818cf8',
    letterSpacing: 1.5,
  },
  primaryButton: {
    backgroundColor: '#4f46e5',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});

 export default SipSuccessModal