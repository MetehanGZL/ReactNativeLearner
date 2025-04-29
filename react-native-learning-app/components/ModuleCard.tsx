import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Code, Smartphone, Palette, Navigation, CheckCircle } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { Module } from "@/constants/modules";
import { useProgressStore } from "@/store/progressStore";

type ModuleCardProps = {
  module: Module;
};

export default function ModuleCard({ module }: ModuleCardProps) {
  const router = useRouter();
  const { moduleProgress } = useProgressStore();
  const progress = moduleProgress[module.id];
  const isCompleted = progress?.completed;

  const getIcon = () => {
    switch (module.icon) {
      case "code":
        return <Code size={24} color={colors.primary} />;
      case "smartphone":
        return <Smartphone size={24} color={colors.primary} />;
      case "palette":
        return <Palette size={24} color={colors.primary} />;
      case "navigation":
        return <Navigation size={24} color={colors.primary} />;
      default:
        return <Code size={24} color={colors.primary} />;
    }
  };

  const handlePress = () => {
    if (module.id === "react-basics") {
      router.push("/module1");
    } else {
      router.push(`/module/${module.id}`);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        isCompleted && styles.completedContainer
      ]}
      onPress={handlePress}
    >
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{module.title}</Text>
          {isCompleted && (
            <CheckCircle size={18} color={colors.success} />
          )}
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {module.description}
        </Text>
        <View style={styles.metaContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{module.level}</Text>
          </View>
          <Text style={styles.meta}>
            {module.lessons} lessons • {module.duration}
          </Text>
          {progress?.quizCompleted && (
            <View style={styles.quizBadge}>
              <Text style={styles.quizBadgeText}>Quiz: {progress.quizScore}/3</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  completedContainer: {
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: `${colors.primary}15`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    flex: 1,
    marginRight: 8,
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 10,
    lineHeight: 20,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  badge: {
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 10,
  },
  badgeText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "600",
  },
  quizBadge: {
    backgroundColor: `${colors.success}15`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  quizBadgeText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: "600",
  },
  meta: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "500",
  },
});