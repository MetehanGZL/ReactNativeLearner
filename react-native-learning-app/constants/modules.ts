export type Module = {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
};

export const modules: Module[] = [
  {
    id: "react-basics",
    title: "React Basics",
    description: "Learn the fundamentals of React including components, props, and state",
    icon: "code",
    lessons: 5,
    duration: "2 hours",
    level: "Beginner"
  },
  {
    id: "react-native-intro",
    title: "React Native Introduction",
    description: "Introduction to React Native and how it differs from React",
    icon: "smartphone",
    lessons: 4,
    duration: "1.5 hours",
    level: "Beginner"
  },
  {
    id: "styling",
    title: "Styling in React Native",
    description: "Learn how to style components using StyleSheet and Flexbox",
    icon: "palette",
    lessons: 6,
    duration: "2.5 hours",
    level: "Beginner"
  },
  {
    id: "navigation",
    title: "Navigation",
    description: "Implement navigation between screens using Expo Router",
    icon: "navigation",
    lessons: 4,
    duration: "2 hours",
    level: "Intermediate"
  }
];