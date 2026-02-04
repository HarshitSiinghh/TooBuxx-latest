import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bell,
  Smartphone,
  Mail,
  ShieldCheck,
  Zap,
  Info,
  ArrowLeft,
} from "lucide-react-native";
import { useRouter } from "expo-router";

import { useAuthGuard } from "@/hooks/useAuthGaurd";
import {
  getNotificationSettingsApi,
  updateNotificationSettingsApi,
  apiToUI,
  uiToAPI,
} from "@/services/notification";

export default function NotificationSettingsPage() {
  const canRender = useAuthGuard();
  const router = useRouter();

  const [settings, setSettings] = useState({
    priceAlerts: false,
    rewards: false,
    transactions: false,
    marketing: false,
    emailNotifications: false,
  });

  const [loading, setLoading] = useState(true);

  /* ================= LOAD SETTINGS ================= */

  useEffect(() => {
    if (canRender) fetchSettings();
  }, [canRender]);

  const fetchSettings = async () => {
    try {
      const res = await getNotificationSettingsApi();
      console.log("NOTIFICATION SETTINGS 👉", res);

      // ✅ res is already settings object
      setSettings(apiToUI(res));
    } catch (e) {
      console.log("❌ NOTIFICATION API ERROR:", e);
    } finally {
      setLoading(false);
    }
  };

  /* ================= TOGGLE ================= */

  const toggleSetting = async (key: keyof typeof settings) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);

    try {
      await updateNotificationSettingsApi(uiToAPI(updated));
    } catch (e) {
      console.log("❌ UPDATE SETTING ERROR:", e);
    }
  };

  if (!canRender || loading) return null;

  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft color="#9ca3af" size={20} />
        </TouchableOpacity>

        <View style={{ marginLeft: 12 }}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>Manage your alerts & updates</Text>
        </View>

        <Info color="#6b7280" size={18} style={{ marginLeft: "auto" }} />
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* HERO */}
        <View style={styles.hero}>
          <View>
            <Text style={styles.heroTitle}>Stay Updated</Text>
            <Text style={styles.heroDesc}>
              Receive real-time gold price and account alerts.
            </Text>
          </View>
          <View style={styles.heroIcon}>
            <Bell color="#c084fc" size={20} />
          </View>
        </View>

        {/* CHANNELS */}
        <Text style={styles.sectionTitle}>ALERT CHANNELS</Text>

        <View style={styles.card}>
          <ToggleItem
            icon={<Smartphone color="#c084fc" />}
            title="Push Notifications"
            desc="Instant alerts on your phone"
            active={settings.marketing}
            onToggle={() => toggleSetting("marketing")}
          />

          <Divider />

          <ToggleItem
            icon={<Mail color="#60a5fa" />}
            title="Email Updates"
            desc="Statements and reports"
            active={settings.emailNotifications}
            onToggle={() => toggleSetting("emailNotifications")}
          />
        </View>

        {/* TYPES */}
        <Text style={styles.sectionTitle}>NOTIFICATION TYPES</Text>

        <View style={styles.card}>
          <ToggleItem
            icon={<Zap color="#facc15" />}
            title="Gold Price Alerts"
            desc="Target price notifications"
            active={settings.priceAlerts}
            onToggle={() => toggleSetting("priceAlerts")}
          />

          <Divider />

          <ToggleItem
            icon={<Smartphone color="#4ade80" />}
            title="Rewards & Offers"
            desc="Bonuses and deals"
            active={settings.rewards}
            onToggle={() => toggleSetting("rewards")}
          />

          <Divider />

          <ToggleItem
            icon={<ShieldCheck color="#818cf8" />}
            title="Security & Transactions"
            desc="Account and gold alerts"
            active={settings.transactions}
            onToggle={() => toggleSetting("transactions")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= TOGGLE ITEM ================= */

function ToggleItem({ icon, title, desc, active, onToggle }: any) {
  return (
    <View style={styles.toggleRow}>
      <View style={{ flexDirection: "row", gap: 14, alignItems: "center" }}>
        <View style={styles.iconBox}>{icon}</View>

        <View>
          <Text style={styles.toggleTitle}>{title}</Text>
          <Text style={styles.toggleDesc}>{desc}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onToggle}
        style={[styles.switch, active && styles.switchActive]}
      >
        <View style={[styles.knob, active && { marginLeft: 18 }]} />
      </TouchableOpacity>
    </View>
  );
}

const Divider = () => <View style={styles.divider} />;

/* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#1a003d" },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 18,
//     marginTop:-40,
//     // paddingBottom:10,
//     borderBottomWidth: 1,
//     borderBottomColor: "rgba(255,255,255,0.05)",
//   },

//   backButton: {
//     padding: 10,
//     backgroundColor: "rgba(255,255,255,0.05)",
//     borderRadius: 12,
//   },

//   title: { color: "white", fontSize: 20, fontWeight: "900" },
//   subtitle: { color: "#c084fc", fontSize: 10, fontWeight: "700" },

//   body: { padding: 18 },

//   hero: {
//     backgroundColor: "#240056",
//     borderRadius: 22,
//     padding: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },

//   heroTitle: { color: "white", fontSize: 18, fontWeight: "900" },
//   heroDesc: { color: "#9ca3af", fontSize: 12, marginTop: 4 },

//   heroIcon: {
//     backgroundColor: "rgba(192,132,252,0.2)",
//     padding: 12,
//     borderRadius: 16,
//   },

//   sectionTitle: {
//     color: "#6b7280",
//     fontSize: 10,
//     fontWeight: "800",
//     letterSpacing: 2,
//     marginBottom: 8,
//     marginLeft: 4,
//   },

//   card: {
//     backgroundColor: "rgba(255,255,255,0.03)",
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.08)",
//     marginBottom: 20,
//   },

//   toggleRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 18,
//   },

//   iconBox: {
//     padding: 10,
//     borderRadius: 14,
//     backgroundColor: "rgba(255,255,255,0.05)",
//   },

//   toggleTitle: { color: "white", fontWeight: "900", fontSize: 14 },
//   toggleDesc: { color: "#9ca3af", fontSize: 11, marginTop: 2 },

//   switch: {
//     width: 42,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: "#1f2933",
//     padding: 3,
//   },

//   switchActive: {
//     backgroundColor: "#7c3aed",
//   },

//   knob: {
//     width: 18,
//     height: 18,
//     backgroundColor: "white",
//     borderRadius: 9,
//   },

//   divider: {
//     height: 1,
//     backgroundColor: "rgba(255,255,255,0.05)",
//     marginHorizontal: 16,
//   },
// });






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
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#104e64",
  },

  backButton: {
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

  /* ================= BODY ================= */
  body: {
    padding: 18,
  },

  /* ================= HERO ================= */
  hero: {
    backgroundColor: "#0b3442",
    borderRadius: 22,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  heroTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
  },

  heroDesc: {
    color: "#8fbac4",
    fontSize: 12,
    marginTop: 4,
  },

  heroIcon: {
    backgroundColor: "rgba(250,204,21,0.15)",
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.35)",
  },

  /* ================= SECTION ================= */
  sectionTitle: {
    color: "#6b7280",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 8,
    marginLeft: 4,
  },

  /* ================= CARD ================= */
  card: {
    backgroundColor: "#0b3442",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#104e64",
    marginBottom: 20,
    overflow: "hidden",
  },

  /* ================= TOGGLE ROW ================= */
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
  },

  iconBox: {
    padding: 10,
    borderRadius: 14,
    backgroundColor: "rgba(16,78,100,0.35)",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  toggleTitle: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 14,
  },

  toggleDesc: {
    color: "#8fbac4",
    fontSize: 11,
    marginTop: 2,
  },

  /* ================= SWITCH ================= */
  switch: {
    width: 42,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#041d26",
    padding: 3,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  switchActive: {
    backgroundColor: "#facc15",
  },

  knob: {
    width: 18,
    height: 18,
    backgroundColor: "#ffffff",
    borderRadius: 9,
  },

  /* ================= DIVIDER ================= */
  divider: {
    height: 1,
    backgroundColor: "#104e64",
    marginHorizontal: 16,
  },
});
