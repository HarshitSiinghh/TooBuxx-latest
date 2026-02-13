import React, { useCallback, useState } 
from "react";
 import LottieView from "lottie-react-native";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  Image,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from "react-native";
import { 
  ArrowLeft, User, BadgeCheck, Zap, 
  CalendarClock, Disc, Gift, Calendar, 
  TrendingUp, PieChart, Users, ArrowUpRight, PlusCircle, MoreVertical,
  UserRoundPen, PhoneCall, LogOut 
} from "lucide-react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

// Stores & APIs
import { ShowEditMenu } from "@/store/store";
import { useProfileStore } from "@/store/profileStore";
import { getProfileApi } from "@/services/profile";
import { getGoldPriceApi } from "@/services/goldprice";
import { BASE_URL_PROFILE_PIC } from "@/constants/api";
// Sub-Components
import { EditMenu } from "@/components/profile/editmenu";
import { NomineeSection } from "@/components/profile/nominee";
import { GetHelpSection } from "@/components/profile/GetHelpSection";
import { SettingSection } from "@/components/profile/setting-section";
import { VersionSection } from "@/components/profile/version";
 import { getKycStatusApi } from "@/services/kyc";
const { width } = Dimensions.get("window");
import { getPortfolioApi } from "@/services/portfolio";
// --- TYPES ---
interface SectionTitleProps {
  title: string;
  dotColor: string;
  marginTop?: number;
  
}

const ROUTES = {
  DAILY: "/metals/gold/engine",
  INSTANT: "/metals/silver/engine",
  SPINS: "/spin-and-win/spin-wheel",
  REWARDS: "/profile/reward",
  WEEKLY: "/metals/platinium/engine",
  MONTHLY: "/portfolio",
  REFER: "/spin-and-win/referral",
  WITHDRAW: "/withdraw",
  DEPOSIT: "/paymentsDetails/deposite",
};

// --- REUSABLE COMPONENTS ---

const SectionTitle = ({ title, dotColor, marginTop = 0 }: SectionTitleProps) => (
  <View style={[styles.sectionHeader, { marginTop }]}>
    <View style={[styles.sectionDot, { backgroundColor: dotColor }]} />
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

const ModernForYou = () => {
  const router = useRouter();
  const items = [
    { label: "Daily Savings", icon: CalendarClock, color: "#facc15", path: ROUTES.DAILY },
    { label: "Instant Savings", icon: Zap, color: "#F59E0B", path: ROUTES.INSTANT },
    { label: "Spins", icon: Disc, color: "#EC4899", path: ROUTES.SPINS },
    { label: "Rewards", icon: Gift, color: "#60A5FA", path: ROUTES.REWARDS },
  ];

  return (
    <View style={styles.glassContainer}>
      {items.map((item, i) => (
        <Pressable 
          key={i} 
          style={styles.iconBtnStack} 
          onPress={() => router.push(item.path as any)}
        >
          <View style={[styles.iconBg, { backgroundColor: `${item.color}15` }]}>
            <item.icon size={22} color={item.color} strokeWidth={2.5} />
          </View>
          <Text style={styles.iconLabel}>{item.label.toUpperCase()}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const ModernGoldGrid = () => {
  const router = useRouter();
  const data = [
    { label: "Gold savings", image: require("../../images/latest-images/New folder (2)/instant.png"), path: ROUTES.DAILY },
    { label: "Silver savings", image: require("../../images/latest-images/New folder (2)/weekly.png"), path: ROUTES.INSTANT },
    { label: "Platinium savings", image: require("../../images/latest-images/New folder (2)/monthly.png"), path: ROUTES.WEEKLY },
    { label: "Portfolio", image: require("../../images/latest-images/New folder (2)/daily.png"), path: ROUTES.MONTHLY },
    { label: "Refer & Earn", image: require("../../images/latest-images/New folder (2)/refer-earn.png"), path: ROUTES.REFER },
    { label: "Withdraw Saving", image: require("../../images/latest-images/New folder (2)/withdrawal.png"), path: ROUTES.WITHDRAW },
    { label: "Spins", image:require("../../images/latest-images/New folder (2)/spin.png"), path: ROUTES.SPINS },
    { label: "Deposit", image:require("../../images/latest-images/New folder (2)/deposit.png"), path: ROUTES.DEPOSIT },
  ];

  return (
    <View style={styles.gridWrapper}>
      {data.map((item, i) => (
        <Pressable 
          key={i} 
          style={styles.gridBox} 
          onPress={() => router.push(item.path as any)}
        >
          <View style={styles.gridIconCircle}>
            <Image
              source={item.image}
              style={styles.serviceImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.gridLabelText}>{item.label.toUpperCase()}</Text>
        </Pressable>
      ))}
    </View>
  );
};

// --- MAIN PROFILE COMPONENT ---

function Profile() {
    const [totalSavings, setTotalSavings] = useState(0);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { menu } = ShowEditMenu();
  const [showMenu, setShowMenu] = useState(false);
  const [kycStatus, setKycStatus] = useState<"pending" | "approved" | "rejected" | null>(null);

  const profile = useProfileStore((s) => s.profile);
  const wallet = useProfileStore((s) => s.wallet);
  const setProfile = useProfileStore((s) => s.setProfile);
  const setWallet = useProfileStore((s) => s.setWallet);
  const setReferral = useProfileStore((s) => s.setReferral);

  const [loading, setLoading] = useState(true);
  const [goldPrice, setGoldPrice] = useState(0);

  const loadPortfolio = async () => {
    try {
      const res = await getPortfolioApi();
  
      if (res?.success) {
        console.log("PORTFOLIO 👉", res);
  
        const total =
          Number(res?.gold_24K?.current_value || 0) +
          Number(res?.gold_22K?.current_value || 0) +
          Number(res?.gold_18K?.current_value || 0) +
          Number(res?.silver?.current_value || 0) +
          Number(res?.platinum?.current_value || 0);
  
        setTotalSavings(total);
      }
    } catch (e) {
      console.log("Portfolio error:", e);
    }
  };
  const loadProfile = async () => {
    try {
      setLoading(true);
      const [res, goldRes,kycRes] = await Promise.all([
        getProfileApi(),
        getGoldPriceApi(),
          getKycStatusApi(),
      ]);


      if (res?.success) {
        const { user, wallet: w, referral_reward } = res.data;
        setProfile(user);
        if (w) {
          setWallet({
            ...w,
            deposit_balance: Number(w.deposit_balance || 0),
            total_money_balance: Number(w.total_money_balance || 0),
            total_gold_grams: Number(w.total_gold_grams || 0),
          });
        }
        if (referral_reward) setReferral(referral_reward);
      }

      if (goldRes?.success) {
        setGoldPrice(Number(goldRes?.data?.market_sell_price || 0));
      }
      // 👉 KYC STATUS SET
console.log("FULL KYC API RES 👉", kycRes);
console.log("FULL profile API RES 👉", User);

if (kycRes?.success && kycRes?.kyc) {
  const status = kycRes.kyc.status;   // 👈 direct read
  console.log("KYC STATUS 👉", status);
  setKycStatus(status);
} else {
  console.log("KYC NOT FOUND ❌");
  setKycStatus(null);
}


    } catch (err) {
      console.log("❌ PROFILE API ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
      loadPortfolio();
      const interval = setInterval(() => {
        getGoldPriceApi().then((g) => {
          if (g?.success) {
            setGoldPrice(Number(g?.data?.market_sell_price || 0));
          }
        });
      }, 15000);
      return () => clearInterval(interval);
    }, [])
  );
console.log("full profile data",profile);

  const handleBack = useCallback(() => router.back(), []);

  if (loading) {
    return (
    <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#062530",
          }}
        >
          <LottieView
            source={require("../../assets/gold.json")}
            autoPlay
            loop
            style={{ width: 180, height: 180 }}
          />
        </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: "rgba(16,78,100,0.25)",
 }]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topGlow} />
      <View style={styles.bottomGlow} />

      {/* --- PREMIUM MENU MODAL --- */}
      <Modal
        transparent
        animationType="fade"
        visible={showMenu}
        onRequestClose={() => setShowMenu(false)}
      >
        <Pressable 
          style={styles.menuOverlay} 
          onPress={() => setShowMenu(false)}
        >
          <View style={styles.menuBox}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuHeaderText}>Quick Actions</Text>
            </View>

            <Pressable 
              style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
              onPress={() => { router.push("/profile/edit-profile")}}
            >
              <View style={[styles.menuIconBg, { backgroundColor: 'rgba(168, 85, 247, 0.15)' }]}>
                <UserRoundPen size={18} color="#facc15" />
              </View>
              <Text style={styles.menuText}>Edit Profile</Text>
            </Pressable>

            <Pressable 
              style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
              onPress={() => { setShowMenu(false); }}
            >
              <View style={[styles.menuIconBg, { backgroundColor: 'rgba(96, 165, 250, 0.15)' }]}>
                <PhoneCall size={18} color="#60A5FA" />
              </View>
              <Text style={styles.menuText}>Contact Us</Text>
            </Pressable>

            <View style={styles.menuSeparator} />

         
          </View>
        </Pressable>
      </Modal>

      <View style={styles.topWrapper}>
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.iconBtn}>
            <ArrowLeft size={20} color="#FFFFFF" />
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={styles.headerLabel}>ACCOUNT</Text>
            <Text style={styles.headerName}>{profile?.username || "My Profile"}</Text>
          </View>

          <Pressable onPress={() => setShowMenu(true)} style={styles.iconBtn}>
            <MoreVertical size={20} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
      >
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <LinearGradient colors={["#a855f7", "#6366f1", "#60a5fa"]} style={styles.avatarBorder}>
              <View style={styles.avatarInner}>
          




                {profile?.profile_photo ? (
  <Image
    source={{
      uri: profile.profile_photo.startsWith("http")
        ? profile.profile_photo
        : `${BASE_URL_PROFILE_PIC}${profile.profile_photo}`,
    }}
    style={styles.profileImg}
  />
) : (
  <User size={32} color="rgba(168,85,247,0.5)" />
)}
              </View>
            </LinearGradient>

            <View style={styles.userInfo}>
              {/* <View style={styles.nameBadgeRow}>
                <Text style={styles.userNameText} numberOfLines={1}>{profile?.username || "User"}</Text>
                <BadgeCheck size={18} color="#facc15" />
              </View>
              
              
              */}
              <View style={styles.nameBadgeRow}>
  <Text style={styles.userNameText} numberOfLines={1}>
    {profile?.username || "User"}
  </Text>

  {kycStatus === "approved" && (
    <BadgeCheck size={18} color="#22c55e" />
  )}
</View>

              {/* <Text style={styles.phoneText}>+91 {profile?.phone || "0000000000"}</Text>
               */}

               <Text style={styles.phoneText}>
  +91 {profile?.phone || "0000000000"}
</Text>

{/* ✅ KYC STATUS TEXT */}
{kycStatus === "approved" && (
<Pressable onPress={()=> router.push("/spin-and-win/KYC")}>
    <Text style={{
    fontSize: 12,
    color: "#22c55e",
    marginTop: 2,
    fontWeight: "600"
  }}>
    KYC Verified
  </Text>
</Pressable>
)}

{kycStatus === "pending" && (
  <Text style={{
    fontSize: 12,
    color: "#f59e0b",
    marginTop: 2,
    fontWeight: "600"
  }}>
    KYC Pending
  </Text>
)}

{kycStatus === "rejected" && (
  <Text style={{
    fontSize: 12,
    color: "#ef4444",
    marginTop: 2,
    fontWeight: "600"
  }}>
    KYC Rejected
  </Text>
)}





            </View>
          </View>

          <View style={styles.statsRow}>
            {[
              { label: "DEPOSIT", val: `₹${Number(wallet?.deposit_balance || 0).toLocaleString()}` },
              { label: "SAVINGS", val:totalSavings.toFixed(2) },
              { label: "GOLD", val: `${Number(wallet?.total_gold_grams || 0).toFixed(3)}g` }
            ].map((stat, i) => (
              <View key={i} style={styles.statBox}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={stat.label === "GOLD" ? [styles.statValue, {color: '#F59E0B'}] : styles.statValue} numberOfLines={1}>{stat.val}</Text>
              </View>
            ))}
          </View>
        </View>

        <SectionTitle title="SECURITY & NOMINATIONS" dotColor="#facc15" />
        <NomineeSection   kycStatus={kycStatus}    nomineeStatus={profile?.nominee ?? 0}/>

        {/* <SectionTitle title="EXCLUSIVELY FOR YOU" dotColor="#6366f1" marginTop={24} /> */}
        {/* <ModernForYou /> */}

        <SectionTitle title="TOOBUX SERVICES" dotColor="#F59E0B" marginTop={24} />
        <ModernGoldGrid />

        <View style={styles.settingsGroup}>
          <GetHelpSection />
          <View style={styles.separator} />
          <SettingSection />
          <View style={styles.separator} />
          <VersionSection />
        </View>
      </ScrollView>

      {menu && <EditMenu />}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#062530",
  },

  loaderWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#062530",
  },

  /* ===== GLOWS ===== */
  topGlow: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(16,78,100,0.25)",
    zIndex: 0,
  },

  bottomGlow: {
    position: "absolute",
    bottom: 100,
    left: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(16,78,100,0.18)",
    zIndex: 0,
  },

  topWrapper: {
    backgroundColor: "#062530",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#104e64",
  },

  /* ===== HEADER ===== */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 14,
    // paddingVertical: 20,
  },

  headerCenter: {
    flex: 1,
    alignItems: "center",
  },

  headerLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#facc15",
    letterSpacing: 2,
  },

  headerName: {
    fontSize: 16,
    fontWeight: "900",
    color: "#ffffff",
  },

  iconBtn: {
    padding: 10,
    backgroundColor: "rgba(16,78,100,0.35)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  scrollContent: {
    padding: 20,
  },

  /* ===== PROFILE CARD ===== */
  profileCard: {
    backgroundColor: "#0b3442",
    borderRadius: 28,
    padding: 16,
    borderWidth: 1,
    borderColor: "#104e64",
    marginBottom: 25,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },

  avatarBorder: {
    width: 75,
    height: 75,
    borderRadius: 22,
    padding: 2,
    backgroundColor: "#104e64",
  },

  avatarInner: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#062530",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  profileImg: {
    width: "100%",
    height: "100%",
  },

  userInfo: {
    flex: 1,
  },

  nameBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  userNameText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#ffffff",
  },

  phoneText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8fbac4",
    marginTop: 2,
  },

  /* ===== STATS ===== */
  statsRow: {
    flexDirection: "row",
    gap: 8,
  },

  statBox: {
    flex: 1,
    backgroundColor: "rgba(16,78,100,0.35)",
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  statLabel: {
    fontSize: 8,
    fontWeight: "900",
    color: "#8fbac4",
    letterSpacing: 1,
    marginBottom: 4,
  },

  statValue: {
    fontSize: 14,
    fontWeight: "900",
    color: "#ffffff",
  },

  /* ===== SECTION HEADERS ===== */
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    paddingLeft: 4,
  },

  sectionDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },

  sectionHeaderText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#8fbac4",
    letterSpacing: 2,
  },

  /* ===== GLASS ACTION STRIP ===== */
  glassContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0b3442",
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  iconBtnStack: {
    alignItems: "center",
    flex: 1,
  },

  iconBg: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  iconLabel: {
    fontSize: 8,
    fontWeight: "900",
    color: "#ffffff",
    textAlign: "center",
  },
serviceImage: {
  width: 36,
  height: 36,
},

  /* ===== GRID ===== */
  gridWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#0b3442",
    padding: 12,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  gridBox: {
    width: "25%",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },

  gridIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  gridLabelText: {
    fontSize: 7,
    fontWeight: "900",
    color: "#8fbac4",
    textAlign: "center",
    paddingHorizontal: 2,
  },

  /* ===== SETTINGS ===== */
  settingsGroup: {
    marginTop: 24,
    backgroundColor: "#0b3442",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  separator: {
    height: 1,
    backgroundColor: "#104e64",
    marginVertical: 12,
  },

  /* ===== MENU ===== */
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(6,37,48,0.9)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 85,
    paddingRight: 20,
  },

  menuBox: {
    width: 200,
    backgroundColor: "#0b3442",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#104e64",
    elevation: 20,
    padding: 8,
  },

  menuHeader: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#104e64",
    marginBottom: 4,
  },

  menuHeaderText: {
    color: "#8fbac4",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 14,
    marginVertical: 2,
  },

  menuItemPressed: {
    backgroundColor: "rgba(16,78,100,0.35)",
  },

  menuIconBg: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  menuText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },

  menuSeparator: {
    height: 1,
    backgroundColor: "#104e64",
    marginVertical: 6,
    marginHorizontal: 8,
  },
});
export default Profile;
