import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "@/constants/colors";
import { useProgressStore } from "@/store/progressStore";

// Quiz questions data
const questions = [
  {
    id: 1,
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "JavaScript Extension",
      "JavaScript Syntax",
      "Java Syntax XML"
    ],
    correctAnswer: "JavaScript XML"
  },
  {
    id: 2,
    question: "Which of the following is valid JSX?",
    options: [
      "<div>Hello</div>",
      "<div>Hello</div>;",
      "const element = <div>Hello</div>;",
      "const element = <div>Hello</div>"
    ],
    correctAnswer: "const element = <div>Hello</div>;"
  },
  {
    id: 3,
    question: "How do you embed JavaScript expressions in JSX?",
    options: [
      "Using {{ expression }}",
      "Using {% expression %}",
      "Using {expression}",
      "Using $expression"
    ],
    correctAnswer: "Using {expression}"
  }
];

export default function Quiz1Screen() {
  const router = useRouter();
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { markQuizCompleted } = useProgressStore();

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    } else {
      setQuizCompleted(true);
      // Save quiz results
      markQuizCompleted(moduleId || "react-basics", score, questions.length);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionNumber}>Question {currentQuestion + 1} of {questions.length}</Text>
        <Text style={styles.questionText}>{question.question}</Text>
        
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === option && styles.selectedOption,
                showFeedback && option === question.correctAnswer && styles.correctOption,
                showFeedback && selectedAnswer === option && option !== question.correctAnswer && styles.incorrectOption
              ]}
              onPress={() => !showFeedback && handleAnswerSelect(option)}
              disabled={showFeedback}
            >
              <Text 
                style={[
                  styles.optionText,
                  showFeedback && option === question.correctAnswer && styles.correctOptionText,
                  showFeedback && selectedAnswer === option && option !== question.correctAnswer && styles.incorrectOptionText
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {showFeedback && (
          <View style={styles.feedbackContainer}>
            <Text style={selectedAnswer === question.correctAnswer ? styles.correctFeedback : styles.incorrectFeedback}>
              {selectedAnswer === question.correctAnswer 
                ? "Correct!" 
                : `Incorrect. The correct answer is: ${question.correctAnswer}`}
            </Text>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
              <Text style={styles.nextButtonText}>
                {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderResults = () => {
    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Quiz Completed!</Text>
        <Text style={styles.scoreText}>Your Score: {score}/{questions.length}</Text>
        
        <Text style={styles.feedbackText}>
          {score === questions.length 
            ? "Perfect! You've mastered JSX basics." 
            : score >= questions.length / 2 
              ? "Good job! You understand most JSX concepts." 
              : "Keep learning! JSX takes practice to master."}
        </Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={resetQuiz}>
            <Text style={styles.buttonText}>Retry Quiz</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]} 
            onPress={() => router.push({
              pathname: "/completion",
              params: {
                moduleName: "React Basics",
                moduleId: moduleId || "react-basics",
                score: score.toString(),
                total: questions.length.toString()
              }
            })}
          >
            <Text style={styles.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen 
        options={{ 
          title: "JSX Quiz",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }} 
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>Module 1 Quiz: JSX Basics</Text>
        <Text style={styles.description}>
          Test your understanding of JSX with these multiple-choice questions.
        </Text>
      </View>
      
      {!quizCompleted ? renderQuestion() : renderResults()}
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
    marginBottom: 16,
  },
  questionContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  questionNumber: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 20,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  selectedOption: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  correctOption: {
    backgroundColor: "#e6f7e6",
    borderColor: colors.success,
    borderWidth: 2,
  },
  incorrectOption: {
    backgroundColor: "#ffebee",
    borderColor: colors.error,
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
  },
  correctOptionText: {
    color: colors.success,
    fontWeight: "600",
  },
  incorrectOptionText: {
    color: colors.error,
    fontWeight: "600",
  },
  feedbackContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  correctFeedback: {
    color: colors.success,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  incorrectFeedback: {
    color: colors.error,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  nextButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  resultsContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 16,
  },
  feedbackText: {
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 6,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});