
import { Home, Settings, History, Gift, Share2 } from "lucide-react-native";
import { View, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Tabs } from "expo-router";
export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1a003d",
          borderTopColor: "#2f2360",
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarActiveTintColor: "#a78bfa",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
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
      <View
        style={[
          styles.dailyButton,
          { backgroundColor: focused ? "#7c3aed" : "#6d28d9" },
        ]}
      >
        <Gift color="#fff" size={26} />
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
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
});





