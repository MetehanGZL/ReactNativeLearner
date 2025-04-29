import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { colors } from "@/constants/colors";
import { modules } from "@/constants/modules";
import { useProgressStore } from "@/store/progressStore";
import { CheckCircle, Clock, Award } from "lucide-react-native";

export default function ProgressScreen() {
  const { moduleProgress, resetProgress } = useProgressStore();
  
  // Calculate overall stats
  const completedModules = Object.values(moduleProgress).filter(m => m.completed).length;
  const totalModules = modules.length;
  const completionPercentage = totalModules > 0 
    ? Math.round((completedModules / totalModules) * 100) 
    : 0;
  
  // Calculate quiz stats
  const completedQuizzes = Object.values(moduleProgress).filter(m => m.quizCompleted).length;
  const totalQuizScore = Object.values(moduleProgress)
    .filter(m => m.quizCompleted && m.quizScore !== undefined)
    .reduce((sum, m) => sum + (m.quizScore || 0), 0);
  const maxPossibleScore = completedQuizzes * 3; // Assuming each quiz has 3 questions
  const averageScore = maxPossibleScore > 0 
    ? Math.round((totalQuizScore / maxPossibleScore) * 100) 
    : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Learning Progress</Text>
        <Text style={styles.subtitle}>
          Track your journey through React Native
        </Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <CheckCircle size={24} color={colors.primary} />
          </View>
          <Text style={styles.statValue}>{completedModules}/{totalModules}</Text>
          <Text style={styles.statLabel}>Modules Completed</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Award size={24} color={colors.primary} />
          </View>
          <Text style={styles.statValue}>{completedQuizzes}</Text>
          <Text style={styles.statLabel}>Quizzes Taken</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Clock size={24} color={colors.primary} />
          </View>
          <Text style={styles.statValue}>{averageScore}%</Text>
          <Text style={styles.statLabel}>Quiz Average</Text>
        </View>
      </View>
      
      <View style={styles.progressOverview}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Overall Progress</Text>
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
      </View>
      
      <View style={styles.moduleProgressContainer}>
        <Text style={styles.sectionTitle}>Module Progress</Text>
        
        {modules.map((module) => {
          const progress = moduleProgress[module.id] || { completed: false, quizCompleted: false };
          
          return (
            <View key={module.id} style={styles.moduleProgressItem}>
              <View style={styles.moduleInfo}>
                <Text style={styles.moduleName}>{module.title}</Text>
                <Text style={styles.moduleLevel}>{module.level}</Text>
              </View>
              
              <View style={styles.moduleStatus}>
                {progress.completed ? (
                  <View style={styles.completedBadge}>
                    <CheckCircle size={16} color={colors.success} />
                    <Text style={styles.completedText}>Completed</Text>
                  </View>
                ) : (
                  <Text style={styles.pendingText}>Not started</Text>
                )}
                
                {progress.quizCompleted && progress.quizScore !== undefined && (
                  <View style={styles.quizBadge}>
                    <Text style={styles.quizScore}>Quiz: {progress.quizScore}/3</Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>
      
      <TouchableOpacity 
        style={styles.resetButton}
        onPress={resetProgress}
      >
        <Text style={styles.resetButtonText}>Reset Progress</Text>
      </TouchableOpacity>
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
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 4,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primary}15`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
  },
  progressOverview: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  moduleProgressContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  moduleProgressItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleName: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 4,
  },
  moduleLevel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  moduleStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${colors.success}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  completedText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: "500",
    marginLeft: 4,
  },
  pendingText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  quizBadge: {
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  quizScore: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "500",
  },
  resetButton: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  resetButtonText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: "500",
  },
});