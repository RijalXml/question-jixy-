import React, { useState, useEffect } from 'react';
import {
  ScreenState,
  SubjectId,
  Question,
  ExamResult,
  ActiveExamState,
  UserProfile,
  UserRole,
  AppConfig,
} from './types';
import { questionsMatematika } from './data/matematika';
import { questionsQuranHadis } from './data/quranHadis';
import { questionsSeniRupa } from './data/seniRupa';
import { Navbar } from './components/Navbar';
import { NameScreen } from './components/NameScreen';
import { HomeScreen } from './components/HomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultScreen } from './components/ResultScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AdminPanel } from './components/AdminPanel';
import { AdminLoginModal } from './components/AdminLoginModal';
import {
  getStoredTheme,
  setStoredTheme,
  getStoredStudentName,
  setStoredStudentName,
  getStoredActiveExam,
  setStoredActiveExam,
  getStoredLastResult,
  setStoredLastResult,
  getStoredUserProfile,
  setStoredUserProfile,
  getStoredAdminToken,
  setStoredAdminToken,
  getStoredAppConfig,
  setStoredAppConfig,
} from './utils/storage';
import { apiGetQuestions, apiAdminVerify, apiSubmitQuiz } from './utils/api';

export const getSubjectTitle = (subjectId: SubjectId): string => {
  switch (subjectId) {
    case 'matematika':
      return 'Matematika';
    case 'quran_hadis':
      return "Qur'an Hadis";
    case 'seni_rupa':
      return 'Seni Rupa';
    default:
      return 'Matematika';
  }
};

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  // Navigation screen
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('home');

  // User Profile & Role
  const [userProfile, setUserProfile] = useState<UserProfile>(getStoredUserProfile());
  const [userRole, setUserRole] = useState<UserRole>('USER');
  const [adminToken, setAdminToken] = useState<string | null>(getStoredAdminToken());
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // App Configuration
  const [appConfig, setAppConfig] = useState<AppConfig>(getStoredAppConfig());

  // Questions Map (cached by subject)
  const [questionsMap, setQuestionsMap] = useState<Record<SubjectId, Question[]>>({
    matematika: questionsMatematika,
    quran_hadis: questionsQuranHadis,
    seni_rupa: questionsSeniRupa,
  });

  // Active Quiz State
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('matematika');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(1800); // 30 minutes in seconds

  // Initialize data on mount
  useEffect(() => {
    // 1. Theme
    const initialTheme = getStoredTheme();
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 2. Profile Sync
    const profile = getStoredUserProfile();
    const legacyName = getStoredStudentName();
    if (legacyName && profile.name === 'Siswa') {
      profile.name = legacyName;
      setStoredUserProfile(profile);
    }
    setUserProfile(profile);

    // 3. Admin Token verification
    const token = getStoredAdminToken();
    if (token) {
      apiAdminVerify(token)
        .then((isValid) => {
          if (isValid) {
            setUserRole('ADMIN');
            setAdminToken(token);
          } else {
            setStoredAdminToken(null);
            setAdminToken(null);
            setUserRole('USER');
          }
        })
        .catch(() => {
          // offline or error, retain existing state
        });
    }

    // 4. Fetch dynamic questions with guaranteed fallback
    const fetchFreshQuestions = async (sub: SubjectId) => {
      try {
        const qList = await apiGetQuestions(sub);
        if (Array.isArray(qList) && qList.length > 0) {
          setQuestionsMap((prev) => ({ ...prev, [sub]: qList }));
        }
      } catch (err) {
        // Fallback to static data
      }
    };

    fetchFreshQuestions('matematika');
    fetchFreshQuestions('quran_hadis');
    fetchFreshQuestions('seni_rupa');

    // 5. Active Exam Resume Check
    const activeExam = getStoredActiveExam();
    if (activeExam && !activeExam.isFinished) {
      setSelectedSubject(activeExam.subjectId);
      setAnswers(activeExam.answers || {});
      setTimeRemaining(activeExam.timeRemaining ?? 1800);
      // We don't auto-redirect, we display resume banner on HomeScreen or allow manual resume
    }

    const lastResult = getStoredLastResult();
    if (lastResult) {
      setExamResult(lastResult);
    }

    // If user has never entered a name, start at 'name' screen
    if (!profile.name || profile.name === 'Siswa') {
      setCurrentScreen('name');
    } else {
      setCurrentScreen('home');
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

  // Name Screen Submission
  const handleStartName = (name: string) => {
    const updatedProfile = { ...userProfile, name };
    setUserProfile(updatedProfile);
    setStoredUserProfile(updatedProfile);
    setStoredStudentName(name);
    setCurrentScreen('home');
  };

  // Profile Update
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    const newProfile = { ...userProfile, ...updated };
    setUserProfile(newProfile);
    setStoredUserProfile(newProfile);
    if (updated.name) {
      setStoredStudentName(updated.name);
    }
  };

  // Admin Login
  const handleLoginSuccess = (token: string, user: { name: string; role: 'ADMIN' }) => {
    setAdminToken(token);
    setStoredAdminToken(token);
    setUserRole('ADMIN');
    const updatedProfile = { ...userProfile, role: 'ADMIN' as const };
    setUserProfile(updatedProfile);
    setStoredUserProfile(updatedProfile);
    setCurrentScreen('admin');
  };

  // Admin Logout
  const handleAdminLogout = () => {
    setAdminToken(null);
    setStoredAdminToken(null);
    setUserRole('USER');
    const updatedProfile = { ...userProfile, role: 'USER' as const };
    setUserProfile(updatedProfile);
    setStoredUserProfile(updatedProfile);
    if (currentScreen === 'admin') {
      setCurrentScreen('home');
    }
  };

  // Start Quiz for a subject
  const handleStartQuiz = (subjectId: SubjectId) => {
    setSelectedSubject(subjectId);
    setAnswers({});
    const initialTime = (appConfig.timerMinutes || 30) * 60;
    setTimeRemaining(initialTime);

    // Save active state to storage
    const newExamState: ActiveExamState = {
      studentName: userProfile.name,
      subjectId,
      answers: {},
      currentQuestionIndex: 0,
      timeRemaining: initialTime,
      isFinished: false,
    };
    setStoredActiveExam(newExamState);
    setCurrentScreen('quiz');
  };

  // Resume active ongoing exam
  const handleResumeExam = () => {
    const activeExam = getStoredActiveExam();
    if (activeExam) {
      setSelectedSubject(activeExam.subjectId);
      setAnswers(activeExam.answers || {});
      setTimeRemaining(activeExam.timeRemaining ?? 1800);
      setCurrentScreen('quiz');
    }
  };

  // Answer Change
  const handleAnswerChange = (questionId: number, optionIndex: number | null) => {
    const updatedAnswers = { ...answers };
    if (optionIndex === null) {
      delete updatedAnswers[questionId];
    } else {
      updatedAnswers[questionId] = optionIndex;
    }
    setAnswers(updatedAnswers);

    const currentActive = getStoredActiveExam();
    if (currentActive) {
      currentActive.answers = updatedAnswers;
      setStoredActiveExam(currentActive);
    }
  };

  // Time tick
  const handleTimeTick = (secondsLeft: number) => {
    setTimeRemaining(secondsLeft);
    if (secondsLeft % 5 === 0) {
      const currentActive = getStoredActiveExam();
      if (currentActive) {
        currentActive.timeRemaining = secondsLeft;
        setStoredActiveExam(currentActive);
      }
    }
  };

  // Submit Exam & Calculate Scoring
  const handleSubmitExam = async (finalAnswers: Record<number, number>) => {
    const currentQuestions = (questionsMap[selectedSubject] || []).filter(
      (q) => q.isActive !== false
    );
    const totalQuestions = currentQuestions.length || 1;

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
    const percentage = score;

    let category: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Belajar Lagi' = 'Perlu Belajar Lagi';
    if (score >= 90) {
      category = 'Sangat Baik';
    } else if (score >= 80) {
      category = 'Baik';
    } else if (score >= 70) {
      category = 'Cukup';
    }

    // Award XP: 10 XP per correct answer + 50 XP bonus for score >= 80
    const earnedXP = correctCount * 10 + (score >= 80 ? 50 : 0);

    const calculatedResult: ExamResult = {
      studentName: userProfile.name,
      avatar: userProfile.avatar,
      subjectId: selectedSubject,
      subjectTitle: getSubjectTitle(selectedSubject),
      totalQuestions,
      score,
      correctCount,
      incorrectCount,
      unansweredCount,
      percentage,
      category,
      completedAt: new Date().toISOString(),
    };

    // Update user profile locally
    const updatedProfile: UserProfile = {
      ...userProfile,
      xp: userProfile.xp + earnedXP,
      quizzesCompleted: userProfile.quizzesCompleted + 1,
      history: [calculatedResult, ...userProfile.history],
    };
    setUserProfile(updatedProfile);
    setStoredUserProfile(updatedProfile);

    // Save result to local storage
    setExamResult(calculatedResult);
    setStoredLastResult(calculatedResult);
    setStoredActiveExam(null); // Clear active exam

    // Sync with backend / local leaderboard safely
    try {
      await apiSubmitQuiz({
        studentName: userProfile.name,
        avatar: userProfile.avatar,
        subjectId: selectedSubject,
        answers: finalAnswers,
        score,
        correctCount,
        totalQuestions,
        xp: earnedXP,
      });
    } catch (e) {
      // Offline fallback already handled
    }

    setCurrentScreen('loading');
  };

  // Retry test
  const handleRetryExam = () => {
    handleStartQuiz(selectedSubject);
  };

  // Return to Home
  const handleBackToHome = () => {
    setStoredActiveExam(null);
    setCurrentScreen('home');
  };

  // Protected Admin Navigation check
  const handleNavigate = (screen: ScreenState) => {
    if (screen === 'admin' && userRole !== 'ADMIN') {
      setIsAdminModalOpen(true);
      return;
    }
    setCurrentScreen(screen);
  };

  const activeQuestions = (questionsMap[selectedSubject] || []).filter(
    (q) => q.isActive !== false
  );
  const activeSubjectTitle = getSubjectTitle(selectedSubject);
  const activeExam = getStoredActiveExam();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#090a0d] dark:text-zinc-100 transition-colors duration-200 flex flex-col font-sans">
      {/* Universal Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        userRole={userRole}
        userName={userProfile.name}
        userAvatar={userProfile.avatar}
        userXp={userProfile.xp}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenAdminLogin={() => setIsAdminModalOpen(true)}
        onAdminLogout={handleAdminLogout}
        isQuizActive={currentScreen === 'quiz'}
        timeRemaining={timeRemaining}
        subjectTitle={activeSubjectTitle}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {currentScreen === 'name' && (
          <NameScreen
            initialName={userProfile.name !== 'Siswa' ? userProfile.name : ''}
            onStart={handleStartName}
          />
        )}

        {currentScreen === 'home' && (
          <HomeScreen
            userProfile={userProfile}
            questionsMap={questionsMap}
            onStartQuiz={handleStartQuiz}
            onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
            onNavigateToProfile={() => setCurrentScreen('profile')}
            activeExamSubjectId={activeExam && !activeExam.isFinished ? activeExam.subjectId : null}
            onResumeExam={handleResumeExam}
            userRole={userRole}
            onOpenAdminLogin={() => setIsAdminModalOpen(true)}
            onNavigateToAdmin={() => setCurrentScreen('admin')}
          />
        )}

        {currentScreen === 'quiz' && (
          <QuizScreen
            studentName={userProfile.name}
            subjectId={selectedSubject}
            subjectTitle={activeSubjectTitle}
            questions={activeQuestions}
            savedAnswers={answers}
            initialTimeRemaining={timeRemaining}
            onAnswerChange={handleAnswerChange}
            onSubmitExam={handleSubmitExam}
            onTimeTick={handleTimeTick}
            onBackToMenu={handleBackToHome}
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
            onBackToMenu={handleBackToHome}
            onViewLeaderboard={() => setCurrentScreen('leaderboard')}
          />
        )}

        {currentScreen === 'review' && (
          <ReviewScreen
            questions={activeQuestions}
            userAnswers={answers}
            studentName={userProfile.name}
            subjectTitle={activeSubjectTitle}
            onBackToResult={() => setCurrentScreen('result')}
            onRetry={handleRetryExam}
            onBackToMenu={handleBackToHome}
          />
        )}

        {currentScreen === 'leaderboard' && (
          <LeaderboardScreen
            currentStudentName={userProfile.name}
            onStartQuiz={handleStartQuiz}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onStartQuiz={handleStartQuiz}
            onReviewQuizResult={(res) => {
              setExamResult(res);
              setSelectedSubject(res.subjectId);
              setCurrentScreen('result');
            }}
          />
        )}

        {currentScreen === 'admin' && userRole === 'ADMIN' && adminToken && (
          <AdminPanel
            adminToken={adminToken}
            onLogout={handleAdminLogout}
            onBackToHome={() => setCurrentScreen('home')}
            appConfig={appConfig}
            onUpdateAppConfig={(cfg) => {
              setAppConfig(cfg);
              setStoredAppConfig(cfg);
            }}
          />
        )}
      </main>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Minimalist Footer */}
      <footer className="border-t border-zinc-200/80 bg-white/60 py-3.5 text-center text-[11px] text-zinc-500 dark:border-zinc-800/80 dark:bg-zinc-950/60 dark:text-zinc-400 font-mono">
        <span>{appConfig.appName} • {appConfig.appDescription}</span>
      </footer>
    </div>
  );
}
