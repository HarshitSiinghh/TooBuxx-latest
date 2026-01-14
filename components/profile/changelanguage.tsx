import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "ta", label: "தமிழ் (Tamil)" },
  { code: "te", label: "తెలుగు (Telugu)" },
  { code: "bn", label: "বাংলা (Bengali)" },
  { code: "mr", label: "मराठी (Marathi)" },
];

export default function ChangeLanguage() {
  const router = useRouter();
  const [selected, setSelected] = useState("en");

  const handleSave = () => {
    Alert.alert("Success 🎉", "Language is changed");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="white" />
        </Pressable>

        <Text style={styles.title}>Change Language</Text>
        <View style={{ width: 22 }} />
      </View>

      <Text style={styles.subtitle}>
        Choose your preferred app language
      </Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {LANGUAGES.map((lang) => {
          const active = selected === lang.code;

          return (
            <Pressable
              key={lang.code}
              onPress={() => setSelected(lang.code)}
              style={[
                styles.card,
                active && styles.activeCard,
              ]}
            >
              <Text style={styles.languageText}>{lang.label}</Text>

              {active && (
                <Feather name="check-circle" size={20} color="#4ade80" />
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Save Button */}
      <Pressable style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Language</Text>
      </Pressable>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a003d",
    paddingHorizontal: 16,
    paddingTop: 50,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  subtitle: {
    color: "#c4b5fd",
    fontSize: 13,
    marginBottom: 14,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#2f2360",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  activeCard: {
    borderWidth: 1,
    borderColor: "#4ade80",
  },

  languageText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },

  saveBtn: {
    backgroundColor: "#6d3cff",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 30, // 👈 little margin from bottom
  },

  saveText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
});
