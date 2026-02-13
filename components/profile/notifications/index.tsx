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

 import LottieView from "lottie-react-native";

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
      loadCounts(); 
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
    <SafeAreaView style={styles.container}  edges={["left","right","bottom"]}>
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
       
          <View
      style={{
        flex: 1,
        justifyContent: "center",
        marginTop:200,
        alignItems: "center",
        backgroundColor: "#062530",
      }}
    >
      <LottieView
        source={require("../../../assets/gold.json")}
        autoPlay
        loop
        style={{ width: 180, height: 180 }}
      />
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
          <BellRing size={18} color="#facc15" />
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




const styles = StyleSheet.create({
  /* ================= ROOT ================= */
  container: {
    flex: 1,
    backgroundColor: "#062530",
  },

  /* ================= HEADER ================= */
  header: {
    flexDirection: "row",
    alignItems: "center",
    // padding: 18,
     paddingBottom:10,
     paddingHorizontal:18,
    // marginTop:-55,
    borderBottomWidth: 1,
    borderBottomColor: "#104e64",
  },

  backBtn: {
    padding: 10,
    backgroundColor: "rgba(16,78,100,0.35)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  settingBtn: {
    marginLeft: "auto",
    padding: 10,
    backgroundColor: "rgba(16,78,100,0.35)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
  },

  subtitle: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "700",
  },

  /* ================= TABS ================= */
  tabBar: {
    flexDirection: "row",
    margin: 16,
    backgroundColor: "rgba(16,78,100,0.35)",
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: "#104e64",
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
    backgroundColor: "#facc15",
  },

  tabText: {
    color: "#8fbac4",
    fontWeight: "900",
    fontSize: 12,
  },

  tabTextActive: {
    color: "#062530",
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
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "900",
  },

  /* ================= BODY ================= */
  body: {
    padding: 16,
    paddingBottom: 30,
  },

  center: {
    alignItems: "center",
    marginTop: 60,
    opacity: 0.85,
  },

  infoText: {
    color: "#8fbac4",
    fontSize: 12,
    marginTop: 10,
  },

  errorText: {
    color: "#f87171",
    fontSize: 12,
    marginTop: 10,
  },

  /* ================= ITEMS ================= */
  item: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#0b3442",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  iconBox: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(16,78,100,0.35)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  itemTitle: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 13,
  },

  itemMsg: {
    color: "#8fbac4",
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
