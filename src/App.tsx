import React, { useState, useEffect } from 'react';
import { ScreenState, SubjectId, Question, ExamResult, ActiveExamState } from './types';
import { questionsIndonesia } from './data/indonesia';
import { questionsAkidahAkhlak } from './data/akidah';
import { Navbar } from './components/Navbar';
import { NameScreen } from './components/NameScreen';
import { SubjectScreen } from './components/SubjectScreen';
import { QuizScreen } from './components/QuizScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultScreen } from './components/ResultScreen';
import { ReviewScreen } from './components/ReviewScreen';
import {
  getStoredTheme,
  setStoredTheme,
  getStoredStudentName,
  setStoredStudentName,
  getStoredActiveExam,
  setStoredActiveExam,
  getStoredLastResult,
  setStoredLastResult,
} from './utils/storage';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Navigation screen
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('name');

  // Student & Exam State
  const [studentName, setStudentName] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('indonesia');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(1800); // 30 minutes in seconds

  // Initialize from localStorage
  useEffect(() => {
    // Theme
    const initialTheme = getStoredTheme();
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Student Name
    const savedName = getStoredStudentName();
    if (savedName) {
      setStudentName(savedName);
    }

    // Check for active ongoing exam or previous result
    const activeExam = getStoredActiveExam();
    if (activeExam && !activeExam.isFinished) {
      setStudentName(activeExam.studentName);
      setSelectedSubject(activeExam.subjectId);
      setAnswers(activeExam.answers || {});
      setTimeRemaining(activeExam.timeRemaining ?? 1800);
      setCurrentScreen('quiz');
      return;
    }

    const lastResult = getStoredLastResult();
    if (lastResult) {
      setExamResult(lastResult);
      setSelectedSubject(lastResult.subjectId);
    }

    if (savedName) {
      setCurrentScreen('subject');
    } else {
      setCurrentScreen('name');
    }
  }, []);

  // Theme toggle handler
  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setStoredTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Step 1: Start after entering student name
  const handleStartName = (name: string) => {
    setStudentName(name);
    setStoredStudentName(name);
    setCurrentScreen('subject');
  };

  // Change student name
  const handleChangeName = () => {
    setCurrentScreen('name');
  };

  // Step 2: Subject Selected
  const handleSelectSubject = (subjectId: SubjectId) => {
    setSelectedSubject(subjectId);
    setAnswers({});
    setTimeRemaining(1800); // Reset to 30:00

    // Save active state to localStorage
    const newExamState: ActiveExamState = {
      studentName,
      subjectId,
      answers: {},
      currentQuestionIndex: 0,
      timeRemaining: 1800,
      isFinished: false,
    };
    setStoredActiveExam(newExamState);
    setCurrentScreen('quiz');
  };

  // Step 3: Handle answer choice change in quiz
  const handleAnswerChange = (questionId: number, optionIndex: number | null) => {
    const updatedAnswers = { ...answers };
    if (optionIndex === null) {
      delete updatedAnswers[questionId];
    } else {
      updatedAnswers[questionId] = optionIndex;
    }
    setAnswers(updatedAnswers);

    // Persist active state
    const currentActive = getStoredActiveExam();
    if (currentActive) {
      currentActive.answers = updatedAnswers;
      setStoredActiveExam(currentActive);
    }
  };

  // Handle timer tick for background storage saving
  const handleTimeTick = (secondsLeft: number) => {
    setTimeRemaining(secondsLeft);
    // Periodically sync time to storage
    if (secondsLeft % 5 === 0) {
      const currentActive = getStoredActiveExam();
      if (currentActive) {
        currentActive.timeRemaining = secondsLeft;
        setStoredActiveExam(currentActive);
      }
    }
  };

  // Step 4: Submit Exam & Calculate Scoring
  const handleSubmitExam = (finalAnswers: Record<number, number>) => {
    const currentQuestions = selectedSubject === 'indonesia' ? questionsIndonesia : questionsAkidahAkhlak;
    const totalQuestions = currentQuestions.length;

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    currentQuestions.forEach((q) => {
      const chosen = finalAnswers[q.id];
      if (chosen === undefined) {
        unansweredCount++;
      } else if (chosen === q.correctAnswer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    let category: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Belajar Lagi' = 'Perlu Belajar Lagi';
    if (score >= 90) {
      category = 'Sangat Baik';
    } else if (score >= 80) {
      category = 'Baik';
    } else if (score >= 70) {
      category = 'Cukup';
    }

    const calculatedResult: ExamResult = {
      studentName,
      subjectId: selectedSubject,
      subjectTitle: selectedSubject === 'indonesia' ? 'Bahasa Indonesia' : 'Akidah Akhlak',
      totalQuestions,
      score,
      correctCount,
      incorrectCount,
      unansweredCount,
      percentage,
      category,
      completedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setExamResult(calculatedResult);
    setStoredLastResult(calculatedResult);
    setStoredActiveExam(null); // Clear active ongoing test
    setCurrentScreen('loading'); // Show loading screen with animation before showing result
  };

  // Retry test: resets answers and timer, preserves student name, starts back at question 1
  const handleRetryExam = () => {
    setAnswers({});
    setTimeRemaining(1800);
    const newExamState: ActiveExamState = {
      studentName,
      subjectId: selectedSubject,
      answers: {},
      currentQuestionIndex: 0,
      timeRemaining: 1800,
      isFinished: false,
    };
    setStoredActiveExam(newExamState);
    setCurrentScreen('quiz');
  };

  // Return to subject selection menu
  const handleBackToMenu = () => {
    setStoredActiveExam(null);
    setCurrentScreen('subject');
  };

  const activeQuestions = selectedSubject === 'indonesia' ? questionsIndonesia : questionsAkidahAkhlak;
  const activeSubjectTitle = selectedSubject === 'indonesia' ? 'Bahasa Indonesia' : 'Akidah Akhlak';

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#0c0e12] dark:text-zinc-100 transition-colors duration-200 flex flex-col font-sans">
      {/* Universal Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        studentName={studentName}
        subjectTitle={activeSubjectTitle}
        timeRemaining={timeRemaining}
        showTimer={currentScreen === 'quiz'}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {currentScreen === 'name' && (
          <NameScreen
            initialName={studentName}
            onStart={handleStartName}
          />
        )}

        {currentScreen === 'subject' && (
          <SubjectScreen
            studentName={studentName}
            onSelectSubject={handleSelectSubject}
            onChangeName={handleChangeName}
          />
        )}

        {currentScreen === 'quiz' && (
          <QuizScreen
            studentName={studentName}
            subjectId={selectedSubject}
            subjectTitle={activeSubjectTitle}
            questions={activeQuestions}
            savedAnswers={answers}
            initialTimeRemaining={timeRemaining}
            onAnswerChange={handleAnswerChange}
            onSubmitExam={handleSubmitExam}
            onTimeTick={handleTimeTick}
            onBackToMenu={handleBackToMenu}
          />
        )}

        {currentScreen === 'loading' && (
          <LoadingScreen onComplete={() => setCurrentScreen('result')} />
        )}

        {currentScreen === 'result' && examResult && (
          <ResultScreen
            result={examResult}
            onReview={() => setCurrentScreen('review')}
            onRetry={handleRetryExam}
            onBackToMenu={handleBackToMenu}
          />
        )}

        {currentScreen === 'review' && (
          <ReviewScreen
            questions={activeQuestions}
            userAnswers={answers}
            studentName={studentName}
            subjectTitle={activeSubjectTitle}
            onBackToResult={() => setCurrentScreen('result')}
            onRetry={handleRetryExam}
            onBackToMenu={handleBackToMenu}
          />
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-zinc-200/80 bg-white/50 py-3 text-center text-[11px] text-zinc-600 dark:border-zinc-800/80 dark:bg-zinc-950/40 dark:text-zinc-400 font-mono">
        <span>PTS MASTER — Latihan PTS Kelas 7 SMP • Kurikulum Merdeka</span>
      </footer>
    </div>
  );
}
