import React from "react";
import { Tabs } from "expo-router";
import { Home, BookOpen, Award, Settings } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { StyleSheet, Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.footerActiveText,
        tabBarInactiveTintColor: colors.footerInactiveText,
        tabBarStyle: {
          borderTopColor: colors.border,
          backgroundColor: colors.footerBackground,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: colors.headerBackground,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontWeight: "600",
          color: colors.headerText,
          fontSize: 18,
        },
        headerTintColor: colors.headerText,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Learn",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]}>Learn</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: "Courses",
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]}>Courses</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ color, size }) => <Award size={size} color={color} />,
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]}>Progress</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]}>Settings</Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },
});