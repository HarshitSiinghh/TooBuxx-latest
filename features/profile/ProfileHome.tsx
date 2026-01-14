import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { ArrowLeft, EllipsisVertical, User, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ShowEditMenu } from "@/store/store";

import { EditMenu } from "@/components/profile/editmenu";
import { NomineeSection } from "@/components/profile/nominee";
import { ForYouSection } from "@/components/profile/ForYouSection";
import { GoldSection } from "@/components/profile/GoldSection";
import { GetHelpSection } from "@/components/profile/GetHelpSection";
import { SettingSection } from "@/components/profile/setting-section";
import { VersionSection } from "@/components/profile/version";

const Profile = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showEditMenu, menu } = ShowEditMenu();

  return (
    <View style={styles.container}>
      {/* 🔝 Header */}
      <View style={[styles.topBar, { paddingTop: insets.top }]}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} color="#9CA3AF" />
        </Pressable>

        <Text style={styles.headerTitle}>Profile</Text>

        <Pressable onPress={() => showEditMenu(!menu)}>
          {menu ? (
            <X size={24} color="#9CA3AF" />
          ) : (
            <EllipsisVertical size={24} color="#9CA3AF" />
          )}
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 12,
          paddingBottom: insets.bottom , // 🔥 bottom safe + tab space
        }}
      >
        {/* User Info */}
        <View style={styles.userRow}>
          <Pressable style={styles.avatar}>
            <User size={26} color="#9CA3AF" />
          </Pressable>

          <View>
            <Text style={styles.username}>Username</Text>
            <Text style={styles.phone}>90940950945</Text>
          </View>
        </View>

        {/* Sections */}
        <NomineeSection />
        <ForYouSection />
        <GoldSection />
        <GetHelpSection />
        <SettingSection />
        <VersionSection />
      </ScrollView>

      {/* Bottom Edit Menu */}
      {menu && <EditMenu />}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a003d",
  },

  topBar: {
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },

  avatar: {
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: "#322361",
    justifyContent: "center",
    alignItems: "center",
  },

  username: {
    color: "#9a91b9",
    fontWeight: "700",
    fontSize: 18,
  },

  phone: {
    color: "#9CA3AF",
    fontSize: 14,
  },
});
