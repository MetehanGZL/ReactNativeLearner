import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { Award } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";

export default function CompletionScreen() {
  const router = useRouter();
  const { moduleName, moduleId, score, total } = useLocalSearchParams<{
    moduleName: string;
    moduleId: string;
    score?: string;
    total?: string;
  }>();

  const hasScore = score !== undefined && total !== undefined;
  
  const getScoreMessage = () => {
    if (!hasScore) return "";
    
    const scoreNum = parseInt(score);
    const totalNum = parseInt(total);
    const percentage = Math.round((scoreNum / totalNum) * 100);
    
    if (percentage === 100) {
      return "Perfect score! You really know your stuff!";
    } else if (percentage >= 80) {
      return "Great job! You have a solid understanding of the material.";
    } else if (percentage >= 60) {
      return "Good work! Keep practicing to improve your knowledge.";
    } else {
      return "You completed the quiz. Consider reviewing the material again.";
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "Completion",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }} 
      />
      
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBackground}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Award size={64} color="#FFFFFF" />
          </View>
          
          <Text style={styles.title}>Congratulations!</Text>
          <Text style={styles.message}>
            You've completed {moduleName || "the module"}!
          </Text>
          
          {hasScore && (
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreTitle}>Your Score</Text>
              <Text style={styles.score}>{score}/{total}</Text>
              <Text style={styles.scoreMessage}>{getScoreMessage()}</Text>
            </View>
          )}
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]} 
              onPress={() => router.push("/")}
            >
              <Text style={styles.primaryButtonText}>Back to Home</Text>
            </TouchableOpacity>
            
            {moduleId && (
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => {
                  // Logic to navigate to next module based on current moduleId
                  if (moduleId === "react-basics") {
                    router.push("/module/react-native-intro");
                  } else if (moduleId === "react-native-intro") {
                    router.push("/module/styling");
                  } else if (moduleId === "styling") {
                    router.push("/module/navigation");
                  } else {
                    router.push("/");
                  }
                }}
              >
                <Text style={styles.buttonText}>Next Module</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradientBackground: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 32,
  },
  scoreContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    alignItems: "center",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scoreTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: 8,
  },
  score: {
    fontSize: 42,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 12,
  },
  scoreMessage: {
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
    lineHeight: 22,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  primaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});