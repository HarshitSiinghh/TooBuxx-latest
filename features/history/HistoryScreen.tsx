import React, { useEffect, useMemo, useState,useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Clock,
  Plus,
  Search,
  ArrowLeft,
  ChevronDown,
} from "lucide-react-native";
import { useRouter,useFocusEffect } from "expo-router";

import { getMoneyTransactionsApi } from "@/services/transaction";

const { width } = Dimensions.get("window");

type Txn = {
  id: number;
  transaction_id: string;
  title: string;
  type: "credit" | "debit";
  amount: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  rawType: string;
  created_at: string;
};

const TYPE_OPTIONS = ["ALL", "DEPOSIT", "WITHDRAWAL"];

export default function History() {
  const router = useRouter();

  const [transactions, setTransactions] = useState<Txn[]>([]);
  const [loading, setLoading] = useState(true);

  const [typeFilter, setTypeFilter] = useState("ALL");
  const [typeOpen, setTypeOpen] = useState(false);

  /* ================= LOAD TRANSACTIONS ================= */

  // useEffect(() => {
  //   loadTransactions();
  // }, []);

  const loadTransactions = async () => {
    try {
      const res = await getMoneyTransactionsApi();
      console.log("TRANSACTIONS 👉", res);

      if (res?.success && Array.isArray(res.data)) {
        const mapped = res.data.map((tx: any, index: number) => ({
          id: index + 1,
          transaction_id: tx.transaction_id,
          title: tx.transaction_type,
          rawType: tx.transaction_type,
          type: tx.transaction_type === "DEPOSIT" ? "credit" : "debit",
          amount: Number(tx.amount),
          status: tx.status,
          created_at: tx.created_at,
        }));

        setTransactions(mapped);
      }
    } catch (e) {
      console.log("❌ TRANSACTION API ERROR:", e);
    } finally {
      setLoading(false);
    }
  };
useFocusEffect(
  useCallback(() => {
    setLoading(true);
    loadTransactions();
  }, [])
);
  /* ================= FILTER LOGIC ================= */

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      return typeFilter === "ALL" || tx.rawType === typeFilter;
    });
  }, [transactions, typeFilter]);

  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft color="#9ca3af" size={20} />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Transaction History</Text>
          <Text style={styles.headerSub}>MONITOR YOUR GOLD GROWTH</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* PROMO */}
        <View style={styles.promoCard}>
          <View style={styles.promoContent}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../images/box.webp")}
                style={styles.promoImage}
              />
            </View>

            <View style={styles.promoTextContainer}>
              <Text style={styles.promoLabel}>ACTIVE PORTFOLIO</Text>
              <Text style={styles.promoTitle}>
                Start your Gold Saving{" "}
                <Text style={{ color: "#6b7280" }}>today</Text>
              </Text>
              <Text style={styles.promoDesc}>
                Automate your wealth and watch your gold grow.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => router.push("/savings/daily-saving")}
          >
            <Plus color="#fff" size={18} strokeWidth={3} />
            <Text style={styles.saveButtonText}>SAVE DAILY</Text>
          </TouchableOpacity>
        </View>

        {/* TYPE FILTER */}
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setTypeOpen(true)}
          >
            <Search size={14} color="#60a5fa" />
            <Text style={styles.filterText}>{typeFilter}</Text>
            <ChevronDown size={14} color="#60a5fa" />
          </TouchableOpacity>
        </View>

        {loading && (
          <Text style={{ color: "#9ca3af", textAlign: "center", margin: 20 }}>
            Loading transactions...
          </Text>
        )}

        {/* TRANSACTIONS */}
        <View style={styles.transactionList}>
          {filteredTransactions.map((tx, index) => {
            const isCredit = tx.type === "credit";

            return (
              <View
                key={tx.id}
                style={[
                  styles.transactionItem,
                  index === filteredTransactions.length - 1 && {
                    borderBottomWidth: 0,
                  },
                ]}
              >
                <View style={styles.txLeft}>
                  <View
                    style={[
                      styles.txIconBox,
                      isCredit
                        ? styles.txCreditIcon
                        : styles.txDebitIcon,
                    ]}
                  >
                    {isCredit ? (
                      <ArrowDownCircle color="#4ade80" size={22} />
                    ) : (
                      <ArrowUpCircle color="#f87171" size={22} />
                    )}
                  </View>

                  <View>
                    <Text style={styles.txName}>{tx.title}</Text>
                    <View style={styles.txDateContainer}>
                      <Clock size={10} color="#6b7280" />
                      <Text style={styles.txDate}>
                        {new Date(tx.created_at).toDateString()}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.txRight}>
                  <Text
                    style={[
                      styles.txAmount,
                      isCredit
                        ? { color: "#4ade80" }
                        : { color: "#f87171" },
                    ]}
                  >
                    {isCredit ? "+" : "-"} ₹{tx.amount.toLocaleString()}
                  </Text>

                  <Text style={styles.txStatus}>{tx.status}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <Text style={styles.footerText}>
          END OF HISTORY • POWERED BY TOOBUX
        </Text>
      </ScrollView>

      {/* TYPE MODAL */}
      <Modal visible={typeOpen} transparent animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setTypeOpen(false)}
        >
          <View style={styles.modalBox}>
            {TYPE_OPTIONS.map((t) => (
              <Pressable
                key={t}
                onPress={() => {
                  setTypeFilter(t);
                  setTypeOpen(false);
                }}
                style={styles.modalItem}
              >
                <Text style={styles.modalText}>{t}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a003d" },
  // scrollContent: { padding: 20, paddingBottom: 0},
scrollContent: {
  padding: 20,
  paddingBottom: 0,
  flexGrow: 1,   // 🔥 MOST IMPORTANT
},
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginTop:-34,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  backButton: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
  },

  headerTextContainer: { marginLeft: 15 },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "900" },
  headerSub: {
    color: "#a855f7",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 2,
  },

  promoCard: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 24,
  },

  promoContent: { flexDirection: "row", alignItems: "center" },
  imageContainer: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 4,
  },
  promoImage: { width: 70, height: 70, borderRadius: 12 },
  promoTextContainer: { marginLeft: 16, flex: 1 },

  promoLabel: {
    color: "#a855f7",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },
  promoTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  promoDesc: { color: "#9ca3af", fontSize: 12 },

  saveButton: {
    marginTop: 16,
    backgroundColor: "#7c3aed",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
  },
  saveButtonText: { color: "#fff", fontWeight: "900", fontSize: 14 },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  filterText: { color: "white", fontWeight: "800", fontSize: 11 },

  transactionList: {
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    overflow: "hidden",
  },

  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  txLeft: { flexDirection: "row", alignItems: "center", gap: 15 },

  txIconBox: {
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
  },

  txCreditIcon: {
    backgroundColor: "rgba(74,222,128,0.1)",
    borderColor: "rgba(74,222,128,0.2)",
  },

  txDebitIcon: {
    backgroundColor: "rgba(248,113,113,0.1)",
    borderColor: "rgba(248,113,113,0.2)",
  },

  txName: { color: "#fff", fontWeight: "900", fontSize: 15 },

  txDateContainer: { flexDirection: "row", alignItems: "center", gap: 5 },
  txDate: { color: "#6b7280", fontSize: 10, fontWeight: "bold" },

  txRight: { alignItems: "flex-end" },
  txAmount: { fontSize: 16, fontWeight: "900" },
  txStatus: {
    color: "#9ca3af",
    fontSize: 9,
    fontWeight: "900",
    marginTop: 4,
  },

  footerText: {
    textAlign: "center",
    color: "#374151",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 3,
    marginTop: 40,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "75%",
    backgroundColor: "#14002f",
    borderRadius: 20,
    padding: 16,
    gap: 10,
  },

  modalItem: {
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  modalText: { color: "white", fontWeight: "800" },
});
