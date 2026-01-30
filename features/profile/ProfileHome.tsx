
// import React, { useCallback, useEffect, useState,  } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   ScrollView,Modal,
//   Image,
//   ActivityIndicator,
//   Dimensions,
//   StatusBar,
// } from "react-native";
// import { 
//   ArrowLeft, User, BadgeCheck, Zap, 
//   CalendarClock, Disc, Gift, Calendar, 
//   TrendingUp, PieChart, Users, ArrowUpRight, PlusCircle ,MoreVertical
// } from "lucide-react-native";
// import { useRouter,useFocusEffect} from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { LinearGradient } from "expo-linear-gradient";
// // Stores & APIs
// import { ShowEditMenu } from "@/store/store";
// import { useProfileStore } from "@/store/profileStore";
// import { getProfileApi } from "@/services/profile";
// import { getGoldPriceApi } from "@/services/goldprice";

// // Sub-Components
// import { EditMenu } from "@/components/profile/editmenu";
// import { NomineeSection } from "@/components/profile/nominee";
// import { GetHelpSection } from "@/components/profile/GetHelpSection";
// import { SettingSection } from "@/components/profile/setting-section";
// import { VersionSection } from "@/components/profile/version";

// const { width } = Dimensions.get("window");

// // --- TYPES ---
// interface SectionTitleProps {
//   title: string;
//   dotColor: string;
//   marginTop?: number;
// }

// // --- SHARED ROUTES CONFIG ---
// // Yahan check karein ki aapki files ke name yahi hain (e.g. app/dailySavings.tsx)
// const ROUTES = {
//   DAILY: "/savings/daily-saving",
//   INSTANT: "/savings/instant-saving",
//   SPINS: "/spin-and-win/spin-wheel",
//   REWARDS: "/profile/reward",
//   WEEKLY: "/savings/weekly-saving",
//   MONTHLY: "/savings/monthly-saving",
//   REFER: "/spin-and-win/referral",
//   WITHDRAW: "/savings/withdrawalFrom",
//   DEPOSIT: "/paymentsDetails/deposite",
// };

// // --- REUSABLE COMPONENTS ---

// const SectionTitle = ({ title, dotColor, marginTop = 0 }: SectionTitleProps) => (
//   <View style={[styles.sectionHeader, { marginTop }]}>
//     <View style={[styles.sectionDot, { backgroundColor: dotColor }]} />
//     <Text style={styles.sectionHeaderText}>{title}</Text>
//   </View>
// );

// const ModernForYou = () => {
//   const router = useRouter();
//   const items = [
//     { label: "Daily Savings", icon: CalendarClock, color: "#A855F7", path: ROUTES.DAILY },
//     { label: "Instant Savings", icon: Zap, color: "#F59E0B", path: ROUTES.INSTANT },
//     { label: "Spins", icon: Disc, color: "#EC4899", path: ROUTES.SPINS },
//     { label: "Rewards", icon: Gift, color: "#60A5FA", path: ROUTES.REWARDS },
//   ];

//   return (
//     <View style={styles.glassContainer}>
//       {items.map((item, i) => (
//         <Pressable 
//           key={i} 
//           style={styles.iconBtnStack} 
//           onPress={() => router.push(item.path as any)}
//         >
//           <View style={[styles.iconBg, { backgroundColor: `${item.color}15` }]}>
//             <item.icon size={22} color={item.color} strokeWidth={2.5} />
//           </View>
//           <Text style={styles.iconLabel}>{item.label.toUpperCase()}</Text>
//         </Pressable>
//       ))}
//     </View>
//   );
// };

// const ModernGoldGrid = () => {
//   const router = useRouter();
//   const data = [
//     { label: "Daily Savings", icon: Calendar, color: "#A855F7", path: ROUTES.DAILY },
//     { label: "Instant Savings", icon: Zap, color: "#F59E0B", path: ROUTES.INSTANT },
//     { label: "Weekly Saving", icon: TrendingUp, color: "#10B981", path: ROUTES.WEEKLY },
//     { label: "Monthly Savings", icon: PieChart, color: "#6366F1", path: ROUTES.MONTHLY },
//     { label: "Refer & Earn", icon: Users, color: "#EC4899", path: ROUTES.REFER },
//     { label: "Withdraw Saving", icon: ArrowUpRight, color: "#EF4444", path: ROUTES.WITHDRAW },
//     { label: "Spins", icon: Disc, color: "#8B5CF6", path: ROUTES.SPINS },
//     { label: "Deposit", icon: PlusCircle, color: "#60A5FA", path: ROUTES.DEPOSIT },
//   ];

//   return (
//     <View style={styles.gridWrapper}>
//       {data.map((item, i) => (
//         <Pressable 
//           key={i} 
//           style={styles.gridBox} 
//           onPress={() => router.push(item.path as any)}
//         >
//           <View style={[styles.gridIconCircle, { backgroundColor: `${item.color}12` }]}>
//             <item.icon size={20} color={item.color} strokeWidth={2} />
//           </View>
//           <Text style={styles.gridLabelText}>{item.label.toUpperCase()}</Text>
//         </Pressable>
//       ))}
//     </View>
//   );
// };

// // --- MAIN PROFILE COMPONENT ---

// function Profile() {
//   const router = useRouter();
//   const insets = useSafeAreaInsets();
//   const { menu } = ShowEditMenu();
// const [showMenu, setShowMenu] = useState(false);
//   const profile = useProfileStore((s) => s.profile);
//   const wallet = useProfileStore((s) => s.wallet);
//   const setProfile = useProfileStore((s) => s.setProfile);
//   const setWallet = useProfileStore((s) => s.setWallet);
//   const setReferral = useProfileStore((s) => s.setReferral);



//   const [loading, setLoading] = useState(true);
//   const [goldPrice, setGoldPrice] = useState(0);



// const loadProfile = async () => {
//   try {
//     setLoading(true);

//     const [res, goldRes] = await Promise.all([
//       getProfileApi(),
//       getGoldPriceApi(),
//     ]);

//     if (res?.success) {
//       const { user, wallet, referral_reward } = res.data;

//       console.log("PROFILE WALLET 👉", wallet);

//       setProfile(user);

//       if (wallet) {
//         setWallet({
//           ...wallet,
//           deposit_balance: Number(wallet.deposit_balance || 0),
//           total_money_balance: Number(wallet.total_money_balance || 0),
//           total_gold_grams: Number(wallet.total_gold_grams || 0),
//         });
//       }

//       if (referral_reward) setReferral(referral_reward);
//     }

//     if (goldRes?.success) {
//       setGoldPrice(Number(goldRes?.data?.market_sell_price || 0));
//     }
//   } catch (err) {
//     console.log("❌ PROFILE API ERROR:", err);
//   } finally {
//     setLoading(false);
//   }
// };
// useFocusEffect(
//   useCallback(() => {
//     loadProfile();

//     // gold price auto update
//     const interval = setInterval(() => {
//       getGoldPriceApi().then((g) => {
//         if (g?.success) {
//           setGoldPrice(Number(g?.data?.market_sell_price || 0));
//         }
//       });
//     }, 15000);

//     return () => clearInterval(interval);
//   }, [])
// );
//   const handleBack = useCallback(() => router.back(), []);

//  if (loading) {
//   return (
//     <View style={{
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "#1a003d",   // ✅ yahan background color
//     }}>
//       <ActivityIndicator size="large" color="#a855f7" />
//     </View>
//   );
// }

//   return (
//     <View style={[styles.container, { backgroundColor: "#0a001a" }]}>
//       <StatusBar barStyle="light-content" />
//       <View style={styles.topGlow} />
//       <View style={styles.bottomGlow} />
// {/* 
//       <View style={styles.topWrapper}>
//         <View style={[styles.header,  ]}>
//           <Pressable onPress={handleBack} style={styles.iconBtn}>
//             <ArrowLeft size={20} color="#FFFFFF" />
//           </Pressable>
//           <View style={styles.headerText}>
//             <Text style={styles.headerLabel}>ACCOUNT</Text>
//             <Text style={styles.headerName}>{profile?.username || "My Profile"}</Text>
//           </View>
//         </View>
//       </View> */}


//       <Modal
//   transparent
//   animationType="fade"
//   visible={showMenu}
//   onRequestClose={() => setShowMenu(false)}
// >
//   <Pressable 
//     style={styles.menuOverlay} 
//     onPress={() => setShowMenu(false)}
//   >
//     <View style={styles.menuBox}>
      
//       <Pressable style={styles.menuItem}>
//         <Text style={styles.menuText}>Edit Profile</Text>
//       </Pressable>

//       <Pressable style={styles.menuItem}>
//         <Text style={styles.menuText}>Contact Us</Text>
//       </Pressable>

//       <Pressable style={[styles.menuItem, { borderBottomWidth: 0 }]}>
//         <Text style={[styles.menuText, { color: "#ff4d4d" }]}>
//           Logout
//         </Text>
//       </Pressable>

//     </View>
//   </Pressable>
// </Modal>



//       <View style={styles.topWrapper}>
// <View style={styles.header}>

//   {/* LEFT */} 
  
//   <Pressable onPress={handleBack} style={styles.iconBtn}>
//     <ArrowLeft size={20} color="#FFFFFF" />
//   </Pressable>

//   {/* CENTER */}
//   <View style={styles.headerCenter}>
//     <Text style={styles.headerLabel}>ACCOUNT</Text>
//     <Text style={styles.headerName}>
//       {profile?.username || "My Profile"}
//     </Text>
//   </View>

//   {/* RIGHT */}
//   <Pressable onPress={() => setShowMenu(true)} style={styles.iconBtn}>
//     <MoreVertical size={20} color="#FFFFFF" />
//   </Pressable>

// </View>
// </View>

//       <ScrollView 
//         showsVerticalScrollIndicator={false} 
//         contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
//       >
//         <View style={styles.profileCard}>
//           <View style={styles.profileRow}>
//             <LinearGradient colors={["#a855f7", "#6366f1", "#60a5fa"]} style={styles.avatarBorder}>
//               <View style={styles.avatarInner}>
//                 {profile?.profile_photo ? (
//                   <Image source={{ uri: profile.profile_photo }} style={styles.profileImg} />
//                 ) : (
//                   <User size={32} color="rgba(168,85,247,0.5)" />
//                 )}
//               </View>
//             </LinearGradient>

//             <View style={styles.userInfo}>
//               <View style={styles.nameBadgeRow}>
//                 <Text style={styles.userNameText} numberOfLines={1}>{profile?.username || "User"}</Text>
//                 <BadgeCheck size={18} color="#60A5FA" />
//               </View>
//               <Text style={styles.phoneText}>+91 {profile?.phone || "0000000000"}</Text>
//               {/* <View style={styles.tag}>
//                 <Zap size={10} color="#A855F7" />
//                 <Text style={styles.tagText}>PREMIUM</Text>
//               </View> */}
//             </View>
//           </View>

//           <View style={styles.statsRow}>
//             {[
//               { label: "DEPOSIT", val: `₹${Number(wallet?.deposit_balance || 0).toLocaleString()}` },
//               { label: "SAVINGS", val: `₹${(Number(wallet?.total_gold_grams || 0) * goldPrice).toLocaleString()}` },
//               { label: "GOLD", val: `${Number(wallet?.total_gold_grams || 0).toFixed(3)}g` }
//             ].map((stat, i) => (
//               <View key={i} style={styles.statBox}>
//                 <Text style={styles.statLabel}>{stat.label}</Text>
//                 <Text style={stat.label === "GOLD" ? [styles.statValue, {color: '#F59E0B'}] : styles.statValue} numberOfLines={1}>{stat.val}</Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         <SectionTitle title="SECURITY & NOMINATIONS" dotColor="#A855F7" />
//         <NomineeSection />

//         <SectionTitle title="EXCLUSIVELY FOR YOU" dotColor="#6366f1" marginTop={24} />
//         <ModernForYou />

//         <SectionTitle title="GOLD SERVICES" dotColor="#F59E0B" marginTop={24} />
//         <ModernGoldGrid />

//         <View style={styles.settingsGroup}>
//           <GetHelpSection />
//           <View style={styles.separator} />
//           <SettingSection />
//           <View style={styles.separator} />
//           <VersionSection />
//         </View>
//       </ScrollView>

//       {menu && <EditMenu />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   loaderWrap: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0a001a" },
//   topGlow: { position: 'absolute', top: -50, right: -50, width: 250, height: 250, borderRadius: 125, backgroundColor: 'rgba(147, 51, 234, 0.12)', zIndex: 0 },
//   bottomGlow: { position: 'absolute', bottom: 100, left: -100, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(79, 70, 229, 0.08)', zIndex: 0 },
//   topWrapper: { backgroundColor: "#160531", paddingBottom: 10 },
//   header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 14 ,  paddingVertical: 28,},
//   headerText: { marginLeft: 15 },
//   headerLabel: { fontSize: 10, fontWeight: "900", color: "#A855F7", letterSpacing: 2 },
//   headerName: { fontSize: 16, fontWeight: "900", color: "#FFFFFF" },
//   iconBtn: { padding: 10, backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: 12, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.1)" },
//   scrollContent: { padding: 20 },
//   profileCard: { backgroundColor: "rgba(255, 255, 255, 0.04)", borderRadius: 28, padding: 16, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.08)", marginBottom: 25 },
  
//   profileRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20 },
//   avatarBorder: { width: 75, height: 75, borderRadius: 22, padding: 2 },
//   avatarInner: { flex: 1, borderRadius: 20, backgroundColor: "#1a003d", alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
//   profileImg: { width: '100%', height: '100%' },
//   userInfo: { flex: 1 },
//   nameBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
//   userNameText: { fontSize: 18, fontWeight: "900", color: "#FFFFFF" },
//   phoneText: { fontSize: 12, fontWeight: "600", color: "#6B7280", marginTop: 2 },
//   tag: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start', backgroundColor: 'rgba(168, 85, 247, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginTop: 8, borderWidth: 0.5, borderColor: 'rgba(168, 85, 247, 0.3)' },
//   tagText: { fontSize: 8, fontWeight: "900", color: "#A855F7" },
//   statsRow: { flexDirection: 'row', gap: 8 },
//   statBox: { flex: 1, backgroundColor: "rgba(255, 255, 255, 0.03)", padding: 12, borderRadius: 16, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.05)" },
//   statLabel: { fontSize: 8, fontWeight: "900", color: "#6B7280", letterSpacing: 1, marginBottom: 4 },
//   statValue: { fontSize: 14, fontWeight: "900", color: "#FFFFFF" },
//   sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12, paddingLeft: 4 },
//   sectionDot: { width: 4, height: 4, borderRadius: 2 },
//   sectionHeaderText: { fontSize: 10, fontWeight: "900", color: "#6B7280", letterSpacing: 2 },
//   glassContainer: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1a003d', padding: 16, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
//   iconBtnStack: { alignItems: 'center', flex: 1 },
//   iconBg: { width: 46, height: 46, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },headerCenter: {
//   flex: 1,              // 🔥 ye main cheez hai
//   alignItems: "center",
// },
//   iconLabel: { fontSize: 8, fontWeight: '900', color: '#FFFFFF', textAlign: 'center' },
//   gridWrapper: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#1a003d', padding: 12, borderRadius: 28, borderWidth: 1, borderColor: '#1a003d' },
//   gridBox: { width: '25%', alignItems: 'center', marginBottom: 16, marginTop: 8 },
//   gridIconCircle: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.03)' },
//   gridLabelText: { fontSize: 7, fontWeight: '900', color: '#9CA3AF', textAlign: 'center', paddingHorizontal: 2 },
//   settingsGroup: { marginTop: 24, backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: 24, padding: 16, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.05)" },
//   separator: { height: 1, backgroundColor: "rgba(255, 255, 255, 0.05)", marginVertical: 12 },


//   menuOverlay: {
//   flex: 1,
//   backgroundColor: "rgba(0,0,0,0.4)",
//   justifyContent: "flex-start",
//   alignItems: "flex-end",
//   paddingTop: 70,
//   paddingRight: 16,
// },

// menuBox: {
//   width: 180,
//   backgroundColor: "#1a003d",
//   borderRadius: 14,
//   overflow: "hidden",
//   borderWidth: 1,
//   borderColor: "rgba(255,255,255,0.08)",
// },

// menuItem: {
//   paddingVertical: 12,
//   paddingHorizontal: 14,
//   borderBottomWidth: 1,
//   borderBottomColor: "rgba(255,255,255,0.08)",
// },

// menuText: {
//   color: "#fff",
//   fontSize: 14,
// },
// });

// export default Profile;

















import React, { useCallback, useState } from "react";
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

const { width } = Dimensions.get("window");

// --- TYPES ---
interface SectionTitleProps {
  title: string;
  dotColor: string;
  marginTop?: number;
}

const ROUTES = {
  DAILY: "/savings/daily-saving",
  INSTANT: "/savings/instant-saving",
  SPINS: "/spin-and-win/spin-wheel",
  REWARDS: "/profile/reward",
  WEEKLY: "/savings/weekly-saving",
  MONTHLY: "/savings/monthly-saving",
  REFER: "/spin-and-win/referral",
  WITHDRAW: "/savings/withdrawalFrom",
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
    { label: "Daily Savings", icon: CalendarClock, color: "#A855F7", path: ROUTES.DAILY },
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
    { label: "Daily Savings", icon: Calendar, color: "#A855F7", path: ROUTES.DAILY },
    { label: "Instant Savings", icon: Zap, color: "#F59E0B", path: ROUTES.INSTANT },
    { label: "Weekly Saving", icon: TrendingUp, color: "#10B981", path: ROUTES.WEEKLY },
    { label: "Monthly Savings", icon: PieChart, color: "#6366F1", path: ROUTES.MONTHLY },
    { label: "Refer & Earn", icon: Users, color: "#EC4899", path: ROUTES.REFER },
    { label: "Withdraw Saving", icon: ArrowUpRight, color: "#EF4444", path: ROUTES.WITHDRAW },
    { label: "Spins", icon: Disc, color: "#8B5CF6", path: ROUTES.SPINS },
    { label: "Deposit", icon: PlusCircle, color: "#60A5FA", path: ROUTES.DEPOSIT },
  ];

  return (
    <View style={styles.gridWrapper}>
      {data.map((item, i) => (
        <Pressable 
          key={i} 
          style={styles.gridBox} 
          onPress={() => router.push(item.path as any)}
        >
          <View style={[styles.gridIconCircle, { backgroundColor: `${item.color}12` }]}>
            <item.icon size={20} color={item.color} strokeWidth={2} />
          </View>
          <Text style={styles.gridLabelText}>{item.label.toUpperCase()}</Text>
        </Pressable>
      ))}
    </View>
  );
};

// --- MAIN PROFILE COMPONENT ---

function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { menu } = ShowEditMenu();
  const [showMenu, setShowMenu] = useState(false);
  
  const profile = useProfileStore((s) => s.profile);
  const wallet = useProfileStore((s) => s.wallet);
  const setProfile = useProfileStore((s) => s.setProfile);
  const setWallet = useProfileStore((s) => s.setWallet);
  const setReferral = useProfileStore((s) => s.setReferral);

  const [loading, setLoading] = useState(true);
  const [goldPrice, setGoldPrice] = useState(0);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const [res, goldRes] = await Promise.all([
        getProfileApi(),
        getGoldPriceApi(),
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
    } catch (err) {
      console.log("❌ PROFILE API ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
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

  const handleBack = useCallback(() => router.back(), []);

  if (loading) {
    return (
      <View style={styles.loaderWrap}>
        <ActivityIndicator size="large" color="#a855f7" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: "#0a001a" }]}>
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
                <UserRoundPen size={18} color="#A855F7" />
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

            {/* <Pressable 
              style={({ pressed }) => [styles.menuItem, pressed && { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}
              onPress={() => { setShowMenu(false); }}
            >
              <View style={[styles.menuIconBg, { backgroundColor: 'rgba(239, 68, 68, 0.15)' }]}>
                <LogOut size={18} color="#EF4444" />
              </View>
              <Text style={[styles.menuText, { color: "#EF4444", fontWeight: '700' }]}>Logout</Text>
            </Pressable> */}
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
                {/* {profile?.profile_photo ? (
                  <Image source={{ uri: profile.profile_photo }} style={styles.profileImg} />
                ) : (
                  <User size={32} color="rgba(168,85,247,0.5)" />
                )} */}




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
              <View style={styles.nameBadgeRow}>
                <Text style={styles.userNameText} numberOfLines={1}>{profile?.username || "User"}</Text>
                <BadgeCheck size={18} color="#60A5FA" />
              </View>
              <Text style={styles.phoneText}>+91 {profile?.phone || "0000000000"}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            {[
              { label: "DEPOSIT", val: `₹${Number(wallet?.deposit_balance || 0).toLocaleString()}` },
              { label: "SAVINGS", val: `₹${(Number(wallet?.total_gold_grams || 0) * goldPrice).toLocaleString()}` },
              { label: "GOLD", val: `${Number(wallet?.total_gold_grams || 0).toFixed(3)}g` }
            ].map((stat, i) => (
              <View key={i} style={styles.statBox}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={stat.label === "GOLD" ? [styles.statValue, {color: '#F59E0B'}] : styles.statValue} numberOfLines={1}>{stat.val}</Text>
              </View>
            ))}
          </View>
        </View>

        <SectionTitle title="SECURITY & NOMINATIONS" dotColor="#A855F7" />
        <NomineeSection />

        <SectionTitle title="EXCLUSIVELY FOR YOU" dotColor="#6366f1" marginTop={24} />
        <ModernForYou />

        <SectionTitle title="GOLD SERVICES" dotColor="#F59E0B" marginTop={24} />
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
  container: { flex: 1 },
  loaderWrap: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1a003d" },
  topGlow: { position: 'absolute', top: -50, right: -50, width: 250, height: 250, borderRadius: 125, backgroundColor: 'rgba(147, 51, 234, 0.12)', zIndex: 0 },
  bottomGlow: { position: 'absolute', bottom: 100, left: -100, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(79, 70, 229, 0.08)', zIndex: 0 },
  topWrapper: { backgroundColor: "#160531", paddingBottom: 10 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 14, paddingVertical: 28 },
  headerCenter: { flex: 1, alignItems: "center" },
  headerLabel: { fontSize: 10, fontWeight: "900", color: "#A855F7", letterSpacing: 2 },
  headerName: { fontSize: 16, fontWeight: "900", color: "#FFFFFF" },
  iconBtn: { padding: 10, backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: 12, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.1)" },
  scrollContent: { padding: 20 },
  profileCard: { backgroundColor: "rgba(255, 255, 255, 0.04)", borderRadius: 28, padding: 16, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.08)", marginBottom: 25 },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20 },
  avatarBorder: { width: 75, height: 75, borderRadius: 22, padding: 2 },
  avatarInner: { flex: 1, borderRadius: 20, backgroundColor: "#1a003d", alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  profileImg: { width: '100%', height: '100%' },
  userInfo: { flex: 1 },
  nameBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  userNameText: { fontSize: 18, fontWeight: "900", color: "#FFFFFF" },
  phoneText: { fontSize: 12, fontWeight: "600", color: "#6B7280", marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 8 },
  statBox: { flex: 1, backgroundColor: "rgba(255, 255, 255, 0.03)", padding: 12, borderRadius: 16, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.05)" },
  statLabel: { fontSize: 8, fontWeight: "900", color: "#6B7280", letterSpacing: 1, marginBottom: 4 },
  statValue: { fontSize: 14, fontWeight: "900", color: "#FFFFFF" },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12, paddingLeft: 4 },
  sectionDot: { width: 4, height: 4, borderRadius: 2 },
  sectionHeaderText: { fontSize: 10, fontWeight: "900", color: "#6B7280", letterSpacing: 2 },
  glassContainer: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1a003d', padding: 16, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  iconBtnStack: { alignItems: 'center', flex: 1 },
  iconBg: { width: 46, height: 46, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  iconLabel: { fontSize: 8, fontWeight: '900', color: '#FFFFFF', textAlign: 'center' },
  gridWrapper: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#1a003d', padding: 12, borderRadius: 28, borderWidth: 1, borderColor: '#1a003d' },
  gridBox: { width: '25%', alignItems: 'center', marginBottom: 16, marginTop: 8 },
  gridIconCircle: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.03)' },
  gridLabelText: { fontSize: 7, fontWeight: '900', color: '#9CA3AF', textAlign: 'center', paddingHorizontal: 2 },
  settingsGroup: { marginTop: 24, backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: 24, padding: 16, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.05)" },
  separator: { height: 1, backgroundColor: "rgba(255, 255, 255, 0.05)", marginVertical: 12 },

  // --- MENU STYLES ---
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 85,
    paddingRight: 20,
  },
  menuBox: {
    width: 200,
    backgroundColor: "#160531",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    elevation: 20,
    padding: 8,
  },
  menuHeader: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
    marginBottom: 4,
  },
  menuHeaderText: {
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 14,
    marginVertical: 2,
  },
  menuItemPressed: {
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  menuIconBg: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  menuSeparator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginVertical: 6,
    marginHorizontal: 8,
  },
});

export default Profile;