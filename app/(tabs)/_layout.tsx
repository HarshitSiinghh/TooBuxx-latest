

import { Home, Settings, History, Gift, Share2 } from "lucide-react-native";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  // ✅ Profile loading removed - handled in root _layout.tsx

  return (
    <Tabs
      screenOptions={
        {
        headerShown: false,
        // tabBarStyle: {
        //   backgroundColor: "#1a003d",
        //   borderTopColor: "#2f2360",
        //   height: 64 + insets.bottom,
        //   // height: 64 ,
        //   // paddingBottom: insets.bottom,
        //   paddingBottom: 0,
        // },


        tabBarStyle: {
  backgroundColor: "#1a003d",
  height: 64 +insets.bottom,
  paddingBottom: 0,

  borderTopWidth: 0,     // ✅ line remove
  elevation: 0,         // ✅ Android shadow remove
  shadowColor: "transparent", // ✅ iOS shadow remove
},
        tabBarActiveTintColor: "#a78bfa",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }
    }
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
        {/* 🔵 Circle Button */}
        <View
          style={[
            styles.dailyButton,
            { backgroundColor: focused ? "#7c3aed" : "#6d28d9" },
          ]}
        >
          <Gift color="#fff" size={26} />
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
          title: "History",
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
  elevation: 10,
  shadowColor: "#7c3aed",
  shadowOpacity: 0.45,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 6 },
  borderWidth: 3,
  borderColor: "#a78bfa", // makes it unique
},

savingText: {
  color: "#e9d5ff",
  marginTop: 6,
  fontSize: 13,
  fontWeight: "700",
  textAlign: "center",
  width: 70,            
},




});









