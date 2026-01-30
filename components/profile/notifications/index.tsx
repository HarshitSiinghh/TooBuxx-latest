



import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
   
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BellRing,
  RotateCcw,
  Inbox,
  ArrowLeft,
  Settings,
} from "lucide-react-native";
import { useRouter } from "expo-router";
 

import { useAuthGuard } from "@/hooks/useAuthGaurd";
import {
  getInboxNotificationsApi,
  getTransactionNotificationsApi,
  markInboxReadApi,
  markTransactionsReadApi,
} from "@/services/notification";

// import { useNotificationStore } from "@/store/notificationStore";



 import { useNotificationStore } from "@/store/notificationstore";
type Tab = "INBOX" | "TRANSACTION";

export default function NotificationsPage() {
  const canRender = useAuthGuard();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>("INBOX");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    inboxUnread,
    txnUnread,
    loadCounts,
    clearInbox,
    clearTxn,
  } = useNotificationStore();

  const loadNotifications = async () => {
    setLoading(true);
    setError(false);

    try {
      let data = [];

      if (activeTab === "INBOX") {
        data = await getInboxNotificationsApi();
        await markInboxReadApi();
        clearInbox();
      } else {
        data = await getTransactionNotificationsApi();
        await markTransactionsReadApi();
        clearTxn();
      }

      setNotifications(data || []);
      loadCounts(); // 🔥 header refresh
    } catch (e) {
      console.log("❌ NOTIFICATION API ERROR:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (canRender) {
      loadNotifications();
      loadCounts();
    }
  }, [canRender, activeTab]);

  if (!canRender) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
        >
          <ArrowLeft size={20} color="#9ca3af" />
        </TouchableOpacity>

        <View style={{ marginLeft: 12 }}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>Updates & rewards</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/profile/notification-settings")}
          style={styles.settingBtn}
        >
          <Settings size={18} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      {/* TABS */}
      <View style={styles.tabBar}>
        <TabButton
          label="Inbox"
          active={activeTab === "INBOX"}
          badge={inboxUnread}
          onPress={() => setActiveTab("INBOX")}
        />
        <TabButton
          label="Transaction"
          active={activeTab === "TRANSACTION"}
          badge={txnUnread}
          onPress={() => setActiveTab("TRANSACTION")}
        />
      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.body}>
        {loading && (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#a855f7" />
            <Text style={styles.infoText}>Loading notifications...</Text>
          </View>
        )}

        {error && (
          <View style={styles.center}>
            <Text style={styles.errorText}>Failed to load notifications</Text>
          </View>
        )}

        {!loading && !error && notifications.length === 0 && (
          <View style={styles.center}>
            <Inbox size={42} color="#6b7280" />
            <Text style={styles.infoText}>No notifications found</Text>
          </View>
        )}

        {!loading &&
          !error &&
          notifications.map((item, index) => (
            <NotificationItem
              key={item.id || index}
              title={item.title}
              message={item.message}
              time={formatDate(item.created_at)}
              type={activeTab}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

/* components + styles same as tumhara original code */





/* ================= COMPONENTS ================= */

function TabButton({ label, active, badge, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tabBtn, active && styles.tabBtnActive]}
    >
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {label}
      </Text>

      {badge > 0 && !active && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {badge > 9 ? "9+" : badge}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

function NotificationItem({ title, message, time, type }: any) {
  const isInbox = type === "INBOX";

  return (
    <View style={styles.item}>
      <View style={styles.iconBox}>
        {isInbox ? (
          <BellRing size={18} color="#c084fc" />
        ) : (
          <RotateCcw size={18} color="#60a5fa" />
        )}
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemMsg}>{message}</Text>
        <Text style={styles.itemTime}>{time}</Text>
      </View>
    </View>
  );
}
/* ================= HELPERS ================= */

const formatDate = (dateString: string) => {
  try {
    const d = new Date(dateString);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return dateString;
  }
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a003d" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    marginTop:-30,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  backBtn: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
  },

  settingBtn: {
    marginLeft: "auto",
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
  },

  title: { color: "white", fontSize: 20, fontWeight: "900" },
  subtitle: { color: "#c084fc", fontSize: 10, fontWeight: "700" },

  tabBar: {
    flexDirection: "row",
    margin: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 14,
    padding: 4,
  },

  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  tabBtnActive: {
    backgroundColor: "#7c3aed",
  },

  tabText: {
    color: "#9ca3af",
    fontWeight: "900",
    fontSize: 12,
  },

  tabTextActive: {
    color: "white",
  },

  badge: {
    backgroundColor: "#dc2626",
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },

  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "900",
  },

  body: { padding: 16, paddingBottom: 30 },

  center: {
    alignItems: "center",
    marginTop: 60,
    opacity: 0.8,
  },

  infoText: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 10,
  },

  errorText: {
    color: "#f87171",
    fontSize: 12,
    marginTop: 10,
  },

  item: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

iconBox: {
width: 38,
height: 38,
justifyContent: "center",
alignItems: "center",
backgroundColor: "rgba(255,255,255,0.06)",
borderRadius: 12,
},

  itemTitle: {
    color: "white",
    fontWeight: "900",
    fontSize: 13,
  },

  itemMsg: {
    color: "#9ca3af",
    fontSize: 11,
    marginTop: 2,
  },

  itemTime: {
    color: "#6b7280",
    fontSize: 9,
    marginTop: 4,
    fontWeight: "700",
  },
});
