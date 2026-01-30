import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Check, AlertCircle, Share2, RefreshCcw } from "lucide-react-native";
import { LinearGradient } from 'expo-linear-gradient'; // Or react-native-linear-gradient

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: "SUCCESS" | "ERROR";
  amount: number;
  goldGrams: string;
  onRetry?: () => void;
}

 const PurchaseStatusModal = ({
  isOpen,
  onClose,
  status,
  amount,
  goldGrams,
  onRetry
}: StatusModalProps) => {
  const isSuccess = status === "SUCCESS";

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Backdrop Click-to-Close */}
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose} 
        />

        <View style={styles.modalWrapper}>
          <LinearGradient
            colors={['#2a0066', '#1a003d']}
            style={styles.card}
          >
            <View style={styles.content}>
              {/* Status Icon */}
              <View style={[
                styles.iconCircle,
                { backgroundColor: isSuccess ? '#22c55e' : '#ef4444' }
              ]}>
                {isSuccess ? (
                  <Check size={40} color="white" strokeWidth={3} />
                ) : (
                  <AlertCircle size={40} color="white" />
                )}
              </View>

              {/* Title Section */}
              <View style={styles.headerText}>
                <Text style={styles.title}>
                  {isSuccess ? "PURCHASE SUCCESS" : "PURCHASE FAILED"}
                </Text>
                <Text style={styles.subtitle}>
                  {isSuccess 
                    ? `TXN ID: #GOLD-${Math.floor(Math.random() * 90000)}` 
                    : "PAYMENT ERROR"}
                </Text>
              </View>

              {/* Details Section */}
              {isSuccess ? (
                <View style={styles.detailsBox}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>GOLD ADDED</Text>
                    <Text style={styles.detailValueSuccess}>{goldGrams}g</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>AMOUNT PAID</Text>
                    <Text style={styles.detailValue}>₹{amount.toLocaleString()}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>
                    Insufficient balance or bank server down. Please try again.
                  </Text>
                </View>
              )}

              {/* Action Buttons */}
              <View style={styles.footer}>
                {isSuccess ? (
                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.shareBtn}>
                      <Share2 size={16} color="#d1d5db" />
                      <Text style={styles.shareBtnText}>SHARE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} style={styles.doneBtn}>
                      <Text style={styles.doneBtnText}>DONE</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.errorActions}>
                    <TouchableOpacity onPress={onRetry} style={styles.retryBtn}>
                      <RefreshCcw size={18} color="#1e1b4b" />
                      <Text style={styles.retryBtnText}>TRY AGAIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} style={styles.dismissBtn}>
                      <Text style={styles.dismissBtnText}>DISMISS</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 1, 24, 0.95)',
  },
  modalWrapper: {
    width: '100%',
    maxWidth: 400,
  },
  card: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    padding: 32,
  },
  content: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  headerText: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: 'white',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '900',
    color: '#818cf8',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 8,
  },
  detailsBox: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#9ca3af',
    letterSpacing: 1.5,
  },
  detailValue: {
    fontSize: 20,
    fontWeight: '900',
    fontStyle: 'italic',
    color: 'white',
  },
  detailValueSuccess: {
    fontSize: 20,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#818cf8',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 16,
  },
  errorBox: {
    width: '100%',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  errorText: {
    color: '#fecaca',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  shareBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  shareBtnText: {
    color: '#d1d5db',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  doneBtn: {
    flex: 1,
    height: 56,
    backgroundColor: '#4f46e5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneBtnText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  errorActions: {
    gap: 12,
  },
  retryBtn: {
    width: '100%',
    height: 64,
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  retryBtnText: {
    color: '#1e1b4b',
    fontSize: 14,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  dismissBtn: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismissBtnText: {
    color: '#6b7280',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
});



 export default PurchaseStatusModal