import React, { useState } from "react";
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView, Alert } from "react-native";
import { colors } from "@/constants/colors";
import { Bell, Moon, Globe, HelpCircle, Info, Mail, LogOut } from "lucide-react-native";
import { useProgressStore } from "@/store/progressStore";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const { resetProgress } = useProgressStore();

  const handleResetProgress = () => {
    Alert.alert(
      "Reset Progress",
      "Are you sure you want to reset all your learning progress? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Reset",
          onPress: () => {
            resetProgress();
            Alert.alert("Success", "Your progress has been reset.");
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          Customize your learning experience
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <View style={styles.iconContainer}>
              <Bell size={20} color={colors.primary} />
            </View>
            <Text style={styles.settingLabel}>Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: "#E0E0E0", true: `${colors.primary}80` }}
            thumbColor={notifications ? colors.primary : "#f4f3f4"}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <View style={styles.iconContainer}>
              <Moon size={20} color={colors.primary} />
            </View>
            <Text style={styles.settingLabel}>Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#E0E0E0", true: `${colors.primary}80` }}
            thumbColor={darkMode ? colors.primary : "#f4f3f4"}
          />
        </View>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <View style={styles.iconContainer}>
              <Globe size={20} color={colors.primary} />
            </View>
            <Text style={styles.settingLabel}>Language</Text>
          </View>
          <View style={styles.settingValue}>
            <Text style={styles.settingValueText}>{language}</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <View style={styles.iconContainer}>
              <HelpCircle size={20} color={colors.primary} />
            </View>
            <Text style={styles.settingLabel}>Help Center</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <View style={styles.iconContainer}>
              <Mail size={20} color={colors.primary} />
            </View>
            <Text style={styles.settingLabel}>Contact Us</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <View style={styles.iconContainer}>
              <Info size={20} color={colors.primary} />
            </View>
            <Text style={styles.settingLabel}>About</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handleResetProgress}
        >
          <View style={styles.settingInfo}>
            <View style={[styles.iconContainer, styles.dangerIcon]}>
              <LogOut size={20} color={colors.error} />
            </View>
            <Text style={styles.dangerText}>Reset Progress</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    padding: 16,
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${colors.primary}15`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  dangerIcon: {
    backgroundColor: `${colors.error}15`,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text,
  },
  dangerText: {
    fontSize: 16,
    color: colors.error,
  },
  settingValue: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  settingValueText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  versionContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  versionText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});