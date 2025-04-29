import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/constants/colors";
import { modules } from "@/constants/modules";
import ModuleCard from "@/components/ModuleCard";
import { useProgressStore } from "@/store/progressStore";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const router = useRouter();
  const { moduleProgress } = useProgressStore();
  
  // Calculate completion stats
  const completedModules = Object.values(moduleProgress).filter(m => m.completed).length;
  const totalModules = modules.length;
  const completionPercentage = totalModules > 0 
    ? Math.round((completedModules / totalModules) * 100) 
    : 0;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <Text style={styles.greeting}>Welcome to</Text>
            <Text style={styles.title}>React Native Learning</Text>
            <Text style={styles.subtitle}>
              Master the fundamentals of React and React Native development
            </Text>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.contentContainer}>
        {completedModules > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Your Progress</Text>
              <Text style={styles.progressPercentage}>{completionPercentage}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${completionPercentage}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {completedModules} of {totalModules} modules completed
            </Text>
          </View>
        )}

        <View style={styles.modulesContainer}>
          <FlatList
            data={modules}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ModuleCard module={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modulesList}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    overflow: 'hidden',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerGradient: {
    paddingTop: 30,
    paddingBottom: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    paddingHorizontal: 24,
  },
  greeting: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 6,
    fontWeight: "500",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 22,
    fontWeight: "500",
  },
  contentContainer: {
    flex: 1,
    marginTop: -20,
    paddingHorizontal: 20,
  },
  progressContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  modulesContainer: {
    flex: 1,
  },
  modulesList: {
    paddingBottom: 24,
  },
});