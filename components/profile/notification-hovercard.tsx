import { View, Text, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { X } from "lucide-react-native";
import { Navigation } from "@/store/store"; 
import { useRouter } from "expo-router";

// const TABS = ["Rewards", "Transactions", "Platform"];

export default function NotificationPage() {
  const { setOpen } = Navigation();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>

               <Pressable onPress={() => router.back()}>
                  <X  size={24} color="#9CA3AF" />
                </Pressable>

      </View>


      {/* Notifications */}
      <ScrollView contentContainerStyle={styles.list}>
        {/* Today */}
        <View>
          <Text style={styles.sectionTitle}>TODAY</Text>

          <View style={styles.notification}>
            <Image
              source={require("../../images/gold-coin.png")}
              style={styles.icon}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>You saved ₹50 in Gold!</Text>
              <Text style={styles.desc}>
                Your 24K gold balance just grew. Keep stacking daily to reach
                your goal faster!
              </Text>

              <Pressable>
                <Text style={styles.action}>View Savings</Text>
              </Pressable>
            </View>

            <Text style={styles.time}>09:32</Text>
          </View>
        </View>

        {/* Earlier */}
        <View>
          <Text style={styles.sectionTitle}>OCTOBER 12</Text>

          <View style={styles.notification}>
            <Image
              source={require("../../images/box.webp")}
              style={styles.icon}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>
                Your Gold Vault Reached ₹10,000!
              </Text>
              <Text style={styles.desc}>
                Amazing progress! You’re just ₹2,000 away from unlocking your
                reward tier.
              </Text>

              <Pressable>
                <Text style={styles.action}>Check Rewards</Text>
              </Pressable>
            </View>

            <Text style={styles.time}>11:10</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a003d",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },

  tabs: {
    marginBottom: 16,
  },

  tab: {
    backgroundColor: "#232323",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
  },

  tabText: {
    fontSize: 12,
    color: "#D1D5DB",
  },

  list: {
    gap: 24,
    paddingBottom: 30,
  },

  sectionTitle: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 8,
  },

  notification: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },

  icon: {
    width: 24,
    height: 24,
    marginTop: 4,
  },

  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  desc: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 2,
  },

  action: {
    color: "#facc15",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },

  time: {
    fontSize: 12,
    color: "#9CA3AF",
    marginLeft: 8,
  },
});
