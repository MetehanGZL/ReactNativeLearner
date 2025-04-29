import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { modules } from "@/constants/modules";
import { colors } from "@/constants/colors";
import { useProgressStore } from "@/store/progressStore";
import { CheckCircle, BookOpen, Clock, Award } from "lucide-react-native";

export default function ModuleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { updateLastAccessed, markModuleCompleted, moduleProgress } = useProgressStore();
  const module = modules.find(m => m.id === id);
  const progress = module ? moduleProgress[module.id] : undefined;

  useEffect(() => {
    if (module) {
      updateLastAccessed(module.id);
    }
  }, [module]);

  const handleCompleteModule = () => {
    if (module) {
      markModuleCompleted(module.id);
      router.push({
        pathname: "/completion",
        params: {
          moduleName: module.title,
          moduleId: module.id
        }
      });
    }
  };

  const handleStartQuiz = () => {
    if (module) {
      router.push({
        pathname: "/quiz1",
        params: {
          moduleId: module.id
        }
      });
    }
  };

  if (!module) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Module not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen 
        options={{ 
          title: module.title,
          headerTitleStyle: {
            fontWeight: "600",
          },
        }} 
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>{module.title}</Text>
        <Text style={styles.description}>{module.description}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{module.level}</Text>
          </View>
          <View style={styles.metaItem}>
            <BookOpen size={14} color={colors.textSecondary} />
            <Text style={styles.meta}>{module.lessons} lessons</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={14} color={colors.textSecondary} />
            <Text style={styles.meta}>{module.duration}</Text>
          </View>
        </View>
        
        {progress?.completed && (
          <View style={styles.completedBanner}>
            <CheckCircle size={18} color={colors.success} />
            <Text style={styles.completedText}>You've completed this module</Text>
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Module Content</Text>
        
        <View style={styles.lessonList}>
          {Array.from({ length: module.lessons }).map((_, index) => (
            <View key={index} style={styles.lessonItem}>
              <View style={styles.lessonNumber}>
                <Text style={styles.lessonNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.lessonContent}>
                <Text style={styles.lessonTitle}>
                  Lesson {index + 1}: {getLessonTitle(module.id, index)}
                </Text>
                <Text style={styles.lessonDuration}>
                  {getLessonDuration(index)} min
                </Text>
              </View>
              {index === 0 && (
                <View style={styles.lessonStatus}>
                  <Text style={styles.currentText}>Current</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.quizSection}>
        <View style={styles.quizHeader}>
          <Award size={24} color={colors.primary} />
          <Text style={styles.quizTitle}>Module Quiz</Text>
        </View>
        <Text style={styles.quizDescription}>
          Test your knowledge with a short quiz after completing the module.
        </Text>
        
        {progress?.quizCompleted ? (
          <View style={styles.quizCompleted}>
            <Text style={styles.quizCompletedText}>
              Quiz completed with score: {progress.quizScore}/3
            </Text>
            <TouchableOpacity 
              style={styles.retakeButton}
              onPress={handleStartQuiz}
            >
              <Text style={styles.retakeButtonText}>Retake Quiz</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={[styles.quizButton, !progress?.completed && styles.quizButtonDisabled]}
            onPress={handleStartQuiz}
            disabled={!progress?.completed}
          >
            <Text style={[styles.quizButtonText, !progress?.completed && styles.quizButtonTextDisabled]}>
              {progress?.completed ? "Start Quiz" : "Complete Module First"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {!progress?.completed && (
        <TouchableOpacity 
          style={styles.completeButton}
          onPress={handleCompleteModule}
        >
          <Text style={styles.completeButtonText}>Mark Module as Complete</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

// Helper functions to generate lesson titles and durations
function getLessonTitle(moduleId: string, index: number): string {
  const titles = {
    "react-basics": [
      "Introduction to JSX",
      "Components and Props",
      "State and Lifecycle",
      "Handling Events",
      "Conditional Rendering"
    ],
    "react-native-intro": [
      "React Native vs React",
      "Setting Up Your Environment",
      "Core Components",
      "Mobile-Specific Considerations"
    ],
    "styling": [
      "StyleSheet API",
      "Flexbox Layout",
      "Responsive Design",
      "Theming",
      "Custom Components",
      "Animation Basics"
    ],
    "navigation": [
      "Navigation Concepts",
      "Stack Navigation",
      "Tab Navigation",
      "Drawer Navigation"
    ]
  };
  
  return titles[moduleId as keyof typeof titles]?.[index] || `Lesson ${index + 1}`;
}

function getLessonDuration(index: number): number {
  // Generate a random but consistent duration between 10-30 minutes
  return 10 + (index * 7) % 21;
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
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  badge: {
    backgroundColor: `${colors.primary}20`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 12,
  },
  badgeText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "500",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  meta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  completedBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${colors.success}15`,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  completedText: {
    fontSize: 14,
    color: colors.success,
    fontWeight: "500",
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  lessonList: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: "hidden",
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lessonNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: `${colors.primary}20`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  lessonNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 4,
  },
  lessonDuration: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  lessonStatus: {
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  currentText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "500",
  },
  quizSection: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  quizHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginLeft: 8,
  },
  quizDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  quizButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  quizButtonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  quizButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  quizButtonTextDisabled: {
    color: colors.textSecondary,
  },
  quizCompleted: {
    backgroundColor: `${colors.success}10`,
    borderRadius: 8,
    padding: 12,
  },
  quizCompletedText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 12,
    textAlign: "center",
  },
  retakeButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  retakeButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  completeButton: {
    backgroundColor: colors.success,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  completeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});