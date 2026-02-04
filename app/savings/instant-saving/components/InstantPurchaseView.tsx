import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Zap } from "lucide-react-native";

interface InstantProps {
  localPrice: number | "";
  setLocalPrice: (val: number | "") => void;
  handlePurchase: () => void;
  isProcessing: boolean;
}

 const InstantPurchaseView = ({
  localPrice,
  setLocalPrice,
  handlePurchase,
  isProcessing,
}: InstantProps) => {
  const quickAmounts = [100, 500, 1000, 2000, 5000, 10000];

  return (
    <View style={styles.container}>
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <Text style={styles.titleLine}>SAVE INSTANTLY,</Text>
        <Text style={[styles.titleLine, styles.highlightText]}>GROW FASTER.</Text>
      </View>

      {/* INPUT CARD */}
      <View style={styles.card}>
        <View style={styles.inputHeader}>
          <Text style={styles.inputLabel}>DEPOSIT AMOUNT</Text>
          <View style={styles.goldBadge}>
            <View style={styles.pulseDot} />
            <Text style={styles.goldBadgeText}>24K PURE GOLD</Text>
          </View>
        </View>

        {/* AMOUNT INPUT */}
        <View style={styles.inputWrapper}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            style={styles.textInput}
            value={localPrice === "" ? "" : localPrice.toString()}
            placeholder="0.00"
            placeholderTextColor="#1f2937"
            keyboardType="numeric"
            onChangeText={(val) => setLocalPrice(val === "" ? "" : Number(val))}
            editable={!isProcessing}
          />
        </View>

        {/* QUICK SELECT GRID - FIXED 3 COLUMN LOGIC */}
        <View style={styles.grid}>
          {quickAmounts.map((amt) => {
            const isSelected = localPrice === amt;
            return (
              <TouchableOpacity
                key={amt}
                onPress={() => setLocalPrice(amt)}
                activeOpacity={0.7}
                disabled={isProcessing}
                style={[
                  styles.gridItem,
                  isSelected ? styles.gridItemActive : styles.gridItemInactive,
                ]}
              >
                <Text
                  style={[
                    styles.gridText,
                    isSelected ? styles.gridTextActive : styles.gridTextInactive,
                  ]}
                >
                  ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* PURCHASE BUTTON */}
        <TouchableOpacity
          onPress={handlePurchase}
          disabled={!localPrice || isProcessing}
          activeOpacity={0.8}
          style={[
            styles.purchaseBtn,
            (!localPrice || isProcessing) && styles.disabledBtn,
          ]}
        >
          {isProcessing ? (
            <ActivityIndicator color="white" style={{ marginRight: 8 }} />
          ) : (
            <Text style={styles.purchaseBtnText}>CONFIRM PURCHASE</Text>
          )}
          <Zap
            size={20}
            color="white"
            fill="white"
            style={isProcessing ? { opacity: 0.5 } : {}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
 export default InstantPurchaseView







// const styles = StyleSheet.create({
//   container: {
//     gap: 20,
//   },
//   header: {
//     gap: 2,
//   },
//   titleLine: {
//     fontSize: 34,
//     fontWeight: '900',
//     fontStyle: 'italic',
//     color: '#FFFFFF',
//     lineHeight: 36,
//     letterSpacing: -1,
//   },
//   highlightText: {
//     color: '#818cf8',
//   },
//   card: {
//     backgroundColor: 'rgba(255, 255, 255, 0.03)',
//     borderRadius: 32,
//     padding: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   inputHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   inputLabel: {
//     fontSize: 10,
//     fontWeight: '900',
//     color: '#6b7280',
//     letterSpacing: 1,
//   },
//   goldBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//   },
//   pulseDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 6,
//     backgroundColor: '#eab308',
//   },
//   goldBadgeText: {
//     fontSize: 10,
//     fontWeight: '700',
//     color: '#eab308',
//     fontStyle: 'italic',
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 2,
//     borderBottomColor: '#312e81',
//     paddingBottom: 4,
//     marginBottom: 24,
//   },
//   currencySymbol: {
//     fontSize: 24,
//     fontWeight: '900',
//     color: '#374151',
//     marginRight: 10,
//   },
//   textInput: {
//     fontSize: 40,
//     fontWeight: '900',
//     color: '#FFFFFF',
//     flex: 1,
//     padding: 0,
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginHorizontal: -4,
//     marginBottom: 24,
//   },
//   gridItem: {
//     width: '30.6%', // Fixed width for 3 columns
//     height: 48,
//     margin: '1.3%',
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1.5,
//   },
//   gridItemActive: {
//     backgroundColor: '#4f46e5',
//     borderColor: '#818cf8',
//   },
//   gridItemInactive: {
//     backgroundColor: 'rgba(255, 255, 255, 0.05)',
//     borderColor: 'transparent',
//   },
//   gridText: {
//     fontSize: 13,
//     fontWeight: '900',
//   },
//   gridTextActive: {
//     color: '#FFFFFF',
//   },
//   gridTextInactive: {
//     color: '#6b7280',
//   },
//   purchaseBtn: {
//     backgroundColor: '#4f46e5',
//     flexDirection: 'row',
//     height: 60,
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 12,
//     shadowColor: '#4f46e5',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 15,
//     elevation: 8,
//   },
//   disabledBtn: {
//     opacity: 0.5,
//   },
//   purchaseBtnText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '900',
//     fontStyle: 'italic',
//   },
// });





const styles = StyleSheet.create({
  container: {
    gap: 20,
  },

  header: {
    gap: 2,
  },

  titleLine: {
    fontSize: 34,
    fontWeight: "900",
    fontStyle: "italic",
    color: "#ffffff",
    lineHeight: 36,
    letterSpacing: -1,
  },

  highlightText: {
    color: "#facc15", // gold highlight
  },

  card: {
    backgroundColor: "#0b3442",
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  inputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  inputLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#8fbac4",
    letterSpacing: 1,
  },

  goldBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: "#facc15",
  },

  goldBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#facc15",
    fontStyle: "italic",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#104e64",
    paddingBottom: 4,
    marginBottom: 24,
  },

  currencySymbol: {
    fontSize: 24,
    fontWeight: "900",
    color: "#facc15",
    marginRight: 10,
  },

  textInput: {
    fontSize: 40,
    fontWeight: "900",
    color: "#ffffff",
    flex: 1,
    padding: 0,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
    marginBottom: 24,
  },

  gridItem: {
    width: "30.6%", // same 3-column logic
    height: 48,
    margin: "1.3%",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },

  gridItemActive: {
    backgroundColor: "rgba(250,204,21,0.25)",
    borderColor: "#facc15",
  },

  gridItemInactive: {
    backgroundColor: "rgba(16,78,100,0.25)",
    borderColor: "#104e64",
  },

  gridText: {
    fontSize: 13,
    fontWeight: "900",
  },

  gridTextActive: {
    color: "#ffffff",
  },

  gridTextInactive: {
    color: "#8fbac4",
  },

  purchaseBtn: {
    backgroundColor: "#facc15",
    flexDirection: "row",
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowColor: "#facc15",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 8,
  },

  disabledBtn: {
    opacity: 0.5,
  },

  purchaseBtnText: {
    color: "#062530",
    fontSize: 16,
    fontWeight: "900",
    fontStyle: "italic",
  },
});
