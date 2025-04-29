import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { colors } from "@/constants/colors";
import { Star, Clock, BookOpen } from "lucide-react-native";

const courses = [
  {
    id: "1",
    title: "Complete React Native Developer",
    instructor: "Sarah Johnson",
    rating: 4.8,
    students: 2453,
    duration: "24 hours",
    level: "Beginner to Advanced",
    image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlYWN0JTIwbmF0aXZlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "2",
    title: "Mobile UI/UX Design Masterclass",
    instructor: "Michael Chen",
    rating: 4.6,
    students: 1872,
    duration: "18 hours",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9iaWxlJTIwZGVzaWdufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "3",
    title: "Advanced React Native Animations",
    instructor: "Jessica Williams",
    rating: 4.9,
    students: 1245,
    duration: "12 hours",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW5pbWF0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
  }
];

export default function CoursesScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Courses</Text>
        <Text style={styles.subtitle}>
          Explore premium courses to enhance your skills
        </Text>
      </View>
      
      <View style={styles.featuredContainer}>
        <Text style={styles.sectionTitle}>Featured Course</Text>
        
        <TouchableOpacity style={styles.featuredCard}>
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVhY3QlMjBuYXRpdmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" }}
            style={styles.featuredImage}
            resizeMode="cover"
          />
          <View style={styles.featuredOverlay}>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>Featured</Text>
            </View>
            <Text style={styles.featuredTitle}>React Native for Beginners</Text>
            <Text style={styles.featuredInstructor}>By John Doe</Text>
            
            <View style={styles.featuredMeta}>
              <View style={styles.featuredMetaItem}>
                <Star size={16} color="#FFD700" />
                <Text style={styles.featuredMetaText}>4.9 (3,245)</Text>
              </View>
              <View style={styles.featuredMetaItem}>
                <Clock size={16} color="white" />
                <Text style={styles.featuredMetaText}>32 hours</Text>
              </View>
              <View style={styles.featuredMetaItem}>
                <BookOpen size={16} color="white" />
                <Text style={styles.featuredMetaText}>42 lessons</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.featuredButton}>
              <Text style={styles.featuredButtonText}>Enroll Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.coursesContainer}>
        <Text style={styles.sectionTitle}>Popular Courses</Text>
        
        {courses.map((course) => (
          <TouchableOpacity key={course.id} style={styles.courseCard}>
            <Image 
              source={{ uri: course.image }}
              style={styles.courseImage}
              resizeMode="cover"
            />
            <View style={styles.courseContent}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseInstructor}>{course.instructor}</Text>
              
              <View style={styles.courseRating}>
                <Star size={14} color="#FFD700" />
                <Text style={styles.courseRatingText}>{course.rating} ({course.students} students)</Text>
              </View>
              
              <View style={styles.courseMeta}>
                <View style={styles.courseMetaItem}>
                  <Clock size={14} color={colors.textSecondary} />
                  <Text style={styles.courseMetaText}>{course.duration}</Text>
                </View>
                <View style={styles.courseLevel}>
                  <Text style={styles.courseLevelText}>{course.level}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity style={styles.browseButton}>
        <Text style={styles.browseButtonText}>Browse All Courses</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  featuredContainer: {
    marginBottom: 24,
  },
  featuredCard: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: "100%",
    height: 200,
  },
  featuredOverlay: {
    padding: 16,
  },
  featuredBadge: {
    position: "absolute",
    top: -30,
    right: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  featuredBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  featuredInstructor: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  featuredMeta: {
    flexDirection: "row",
    marginBottom: 16,
  },
  featuredMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  featuredMetaText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  featuredButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  featuredButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  coursesContainer: {
    marginBottom: 24,
  },
  courseCard: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  courseImage: {
    width: 100,
    height: "100%",
  },
  courseContent: {
    flex: 1,
    padding: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  courseRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  courseRatingText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  courseMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseMetaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  courseMetaText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  courseLevel: {
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  courseLevelText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: "500",
  },
  browseButton: {
    backgroundColor: colors.card,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  browseButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});