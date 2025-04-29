import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ModuleProgress = {
  completed: boolean;
  quizScore?: number;
  quizCompleted: boolean;
  lastAccessedAt?: string;
};

type ProgressState = {
  moduleProgress: Record<string, ModuleProgress>;
  markModuleCompleted: (moduleId: string) => void;
  markQuizCompleted: (moduleId: string, score: number, total: number) => void;
  updateLastAccessed: (moduleId: string) => void;
  resetProgress: () => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      moduleProgress: {},
      
      markModuleCompleted: (moduleId) => 
        set((state) => ({
          moduleProgress: {
            ...state.moduleProgress,
            [moduleId]: {
              ...state.moduleProgress[moduleId],
              completed: true,
              lastAccessedAt: new Date().toISOString(),
            }
          }
        })),
      
      markQuizCompleted: (moduleId, score, total) => 
        set((state) => ({
          moduleProgress: {
            ...state.moduleProgress,
            [moduleId]: {
              ...state.moduleProgress[moduleId],
              quizCompleted: true,
              quizScore: score,
              completed: true,
              lastAccessedAt: new Date().toISOString(),
            }
          }
        })),
      
      updateLastAccessed: (moduleId) => 
        set((state) => ({
          moduleProgress: {
            ...state.moduleProgress,
            [moduleId]: {
              ...state.moduleProgress[moduleId] || { completed: false, quizCompleted: false },
              lastAccessedAt: new Date().toISOString(),
            }
          }
        })),
      
      resetProgress: () => set({ moduleProgress: {} }),
    }),
    {
      name: 'react-native-learning-progress',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);