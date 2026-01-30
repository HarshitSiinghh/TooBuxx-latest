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
        {/* Modal Card */}
        <TouchableOpacity activeOpacity={1} style={styles.card}>
          
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={20} color="#6b7280" />
          </TouchableOpacity>

          <View style={styles.content}>
            {/* Success Icon */}
            <View style={styles.iconWrapper}>
              <CheckCircle size={32} color="#22c55e" />
            </View>

            {/* Title */}
            <Text style={styles.title}>WEALTH ENGINE ACTIVATED</Text>
            
            {/* Description */}
            <Text style={styles.description}>
              ₹{amount.toLocaleString()} will now be invested daily in digital gold.
            </Text>

            {/* Tagline with Sparkles */}
            <View style={styles.taglineRow}>
              <Sparkles size={16} color="#818cf8" />
              <Text style={styles.taglineText}>DISCIPLINE BUILDS EMPIRES</Text>
            </View>

            {/* Action Button */}
            <TouchableOpacity
              onPress={onClose}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>LET’S GROW</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
 export default SipSuccessModal
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(10, 0, 26, 0.8)', // #0a001a/80
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1a003d',
    borderRadius: 40,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
    // Elevation for Android, Shadows for iOS
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  closeButton: {
    position: 'absolute',
    right: 24,
    top: 24,
    padding: 8,
    borderRadius: 99,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  content: {
    alignItems: 'center',
    marginTop: 10,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(34, 197, 94, 0.1)', // green-500/10
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#9ca3af', // gray-400
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },
  taglineText: {
    color: '#818cf8', // indigo-400
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 1.5,
  },
  actionButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#4f46e5', // indigo-600
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
});