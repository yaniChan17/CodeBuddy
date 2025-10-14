import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen({ navigation }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => navigation.replace("Login") },
    ]);
  };

  return (
    <View style={[styles.container, darkMode && { backgroundColor: "#1a1a1a" }]}>
      <Text style={[styles.header, darkMode && { color: "#fff" }]}>Settings</Text>

      {/* Dark Mode */}
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Ionicons name="moon" size={22} color={darkMode ? "#fff" : "#333"} />
          <Text style={[styles.text, darkMode && { color: "#fff" }]}>Dark Mode</Text>
        </View>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      {/* Notifications */}
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Ionicons name="notifications" size={22} color={darkMode ? "#fff" : "#333"} />
          <Text style={[styles.text, darkMode && { color: "#fff" }]}>Notifications</Text>
        </View>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      {/* Account Settings */}
      <TouchableOpacity style={styles.row}>
        <View style={styles.rowLeft}>
          <Ionicons name="person-circle" size={22} color={darkMode ? "#fff" : "#333"} />
          <Text style={[styles.text, darkMode && { color: "#fff" }]}>Account</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff4500",
    paddingVertical: 14,
    borderRadius: 15,
    marginTop: 40,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },
});
