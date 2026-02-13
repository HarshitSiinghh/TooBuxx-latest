

import { Home, Settings, History, Gift, Share2 } from "lucide-react-native";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  // ✅ Profile loading removed - handled in root _layout.tsx

  return (
    <Tabs
//       screenOptions={
//         {
//         headerShown: false,
//         // tabBarStyle: {
//         //   backgroundColor: "#1a003d",
//         //   borderTopColor: "#2f2360",
//         //   height: 64 + insets.bottom,
//         //   // height: 64 ,
//         //   // paddingBottom: insets.bottom,
//         //   paddingBottom: 0,
//         // },


//         tabBarStyle: {
//   backgroundColor: "#1a003d",
//   height: 64 +insets.bottom,
//   paddingBottom: 0,

//   borderTopWidth: 0,     // ✅ line remove
//   elevation: 0,         // ✅ Android shadow remove
//   shadowColor: "transparent", // ✅ iOS shadow remove
// },
//         tabBarActiveTintColor: "#a78bfa",
//         tabBarInactiveTintColor: "#9ca3af",
//         tabBarLabelStyle: {
//           fontSize: 11,
//           fontWeight: "600",
//         },
//       }
//     }





screenOptions={{
  headerShown: false,

  tabBarStyle: {
    backgroundColor: "#062530",
    height: 80 ,
    paddingBottom: 0,

    borderTopWidth: 0,
    elevation: 0,
    shadowColor: "transparent",
  },

  tabBarActiveTintColor: "#facc15",   // gold
  tabBarInactiveTintColor: "#8fbac4", // muted teal

  tabBarLabelStyle: {
    fontSize: 11,
    fontWeight: "700",
  },
}}

    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />

      {/* Refer */}
      <Tabs.Screen
        name="refer"
        options={{
          title: "Refer",
          tabBarIcon: ({ color, size }) => (
            <Share2 size={size} color={color} />
          ),
        }}
      />

      {/* DAILY CENTER BUTTON */}
      <Tabs.Screen
  name="daily-savings"
  options={{
    title: "",
    tabBarIcon: ({ focused }) => (
      <View style={{ alignItems: "center", marginTop: 36 }}>
       
        <View
  style={[
    styles.dailyButton,
    { backgroundColor: focused ? "#facc15" : "#104e64" },
  ]}
>
  <Gift color={focused ? "#062530" : "#ffffff"} size={26} />
</View>


        {/* 📝 Text OUTSIDE the circle */}
        <Text style={styles.savingText} numberOfLines={1}>Saving</Text>
      </View>
    ),
    tabBarButton: (props) => {
      const { onPress, accessibilityState, children } = props;

      return (
        <Pressable
          onPress={onPress}
          accessibilityState={accessibilityState}
          style={styles.dailyWrapper}
        >
          {children}
        </Pressable>
      );
    },
  }}
/>

      {/* History */}
      <Tabs.Screen
        name="history"
        options={{
          title: "Transaction",
          tabBarIcon: ({ color, size }) => (
            <History size={size} color={color} />
          ),
        }}
      />

      {/* Settings */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  dailyWrapper: {
    top: -22,
    justifyContent: "center",
    alignItems: "center",
  },

  dailyButton: {
    width: 55,
    height: 55,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center",

    // backgroundColor: "#104e64",
    backgroundColor: "#062530",

    // glow / elevation
    elevation: 10,
    shadowColor: "#facc15",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },

    borderWidth: 3,
    borderColor: "#facc15",
  },

  savingText: {
    color: "#c7e4ec",
    marginTop: 6,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    width: 70,
  },
});
