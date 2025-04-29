import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { colors } from "@/constants/colors";
import { useProgressStore } from "@/store/progressStore";

export default function Module1Screen() {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  const [showCodeResult, setShowCodeResult] = useState(false);
  const { updateLastAccessed, markModuleCompleted } = useProgressStore();

  useEffect(() => {
    updateLastAccessed("react-basics");
  }, []);

  const toggleMessage = () => {
    setShowMessage(prevState => !prevState);
  };

  const handleCompleteModule = () => {
    markModuleCompleted("react-basics");
    router.push({
      pathname: "/completion",
      params: {
        moduleName: "React Basics",
        moduleId: "react-basics"
      }
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen 
        options={{ 
          title: "Module 1",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }} 
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>Module 1: What is JSX?</Text>
        <Text style={styles.description}>
          JSX is a syntax extension for JavaScript that looks similar to HTML but works within React.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.paragraph}>
          JSX stands for JavaScript XML. It allows you to write HTML-like code in your JavaScript files.
          React uses JSX to describe what the UI should look like.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Example</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.code}>
            {`const element = <h1>Hello, world!</h1>;

function Welcome() {
  return <h1>Hello, React!</h1>;
}`}
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Points</Text>
        <Text style={styles.paragraph}>
          • JSX produces React "elements"

          • You can put any valid JavaScript expression inside JSX using curly braces

          • JSX prevents injection attacks by escaping embedded values

          • Babel compiles JSX down to React.createElement() calls
        </Text>
      </View>
      
      <View style={styles.interactiveSection}>
        <Text style={styles.sectionTitle}>Try it yourself!</Text>
        <Text style={styles.paragraph}>
          This example demonstrates how JSX works with React's state management. 
          Click the button below to see JSX in action:
        </Text>
        
        <TouchableOpacity 
          style={styles.interactiveButton}
          onPress={toggleMessage}
        >
          <Text style={styles.interactiveButtonText}>Click me!</Text>
        </TouchableOpacity>
        
        {showMessage && (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>This is rendered using JSX!</Text>
            <Text style={styles.explanation}>
              When you clicked the button, React used state to conditionally render this text.
              This is a fundamental concept in React - UI elements can appear/disappear based on state.
            </Text>
          </View>
        )}
      </View>
      
      {/* Code Playground Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Code Playground</Text>
        <Text style={styles.paragraph}>
          Let's explore a more complex JSX example with state:
        </Text>
        
        <View style={styles.codeBlock}>
          <Text style={styles.code}>
{`import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.runButton}
          onPress={() => setShowCodeResult(!showCodeResult)}
        >
          <Text style={styles.runButtonText}>Run Code</Text>
        </TouchableOpacity>
        
        {showCodeResult && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Code Explanation:</Text>
            <Text style={styles.resultText}>
              This code creates a Counter component that:
            </Text>
            <View style={styles.resultPoints}>
              <Text style={styles.resultPoint}>• Uses the useState hook to create a 'count' state variable</Text>
              <Text style={styles.resultPoint}>• Displays the current count value inside JSX using {"{count}"}</Text>
              <Text style={styles.resultPoint}>• Includes a button that updates the count when clicked</Text>
              <Text style={styles.resultPoint}>• When the button is clicked, the component re-renders with the new count</Text>
            </View>
            <View style={styles.simulatedOutput}>
              <Text style={styles.outputTitle}>Simulated Output:</Text>
              <View style={styles.counterOutput}>
                <Text style={styles.counterText}>You clicked 3 times</Text>
                <TouchableOpacity style={styles.counterButton}>
                  <Text style={styles.counterButtonText}>Click me</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.button, styles.completeButton]}
          onPress={handleCompleteModule}
        >
          <Text style={styles.completeButtonText}>Complete Module</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push("/quiz1")}
        >
          <Text style={styles.buttonText}>Take Quiz</Text>
        </TouchableOpacity>
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
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  codeBlock: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  code: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#333",
  },
  interactiveSection: {
    marginBottom: 24,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
  },
  interactiveButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
    alignSelf: "center",
  },
  interactiveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  messageContainer: {
    backgroundColor: "#f0f8ff",
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  message: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  explanation: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    fontStyle: "italic",
  },
  runButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
    alignSelf: "center",
  },
  runButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  resultContainer: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  resultText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
  },
  resultPoints: {
    marginBottom: 16,
  },
  resultPoint: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 4,
  },
  simulatedOutput: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  outputTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: 12,
  },
  counterOutput: {
    alignItems: "center",
  },
  counterText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
  },
  counterButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  counterButtonText: {
    fontSize: 14,
    color: colors.text,
  },
  actionButtons: {
    marginTop: 16,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  completeButton: {
    backgroundColor: colors.success,
  },
  completeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});