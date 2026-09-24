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
  SpaceThemeMode,
} from './types';
import { questionsTaaruf, questionsAdawat, questionsUsrah } from './data/bahasaArab';

import { SpaceBackground } from './components/SpaceBackground';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { SubjectScreen } from './components/SubjectScreen';
import { MateriDetailScreen } from './components/MateriDetailScreen';
import { QuizScreen } from './components/QuizScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultScreen } from './components/ResultScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AdminPanel } from './components/AdminPanel';
import { AdminLoginModal } from './components/AdminLoginModal';
import { NameScreen } from './components/NameScreen';
import {
  SketchScratchpadModal,
  SketchPencilDoodle,
} from './components/SketchElements';

import {
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

export const getSubjectTitle = (subjectId: SubjectId | string): string => {
  switch (subjectId) {
    case 'taaruf':
      return 'B. Arab: At-Ta\'aruf & Fasilitas Madrasah (التَّعَارُفُ وَالْمَرَافِقُ)';
    case 'adawat':
      return 'B. Arab: Perlengkapan, Warna & Alamat (الأَدَوَاتُ وَالْعُنْوَانُ)';
    case 'usrah':
      return 'B. Arab: Rumah, Keluarga & Keseharian (البَيْتُ وَالْأُسْرَةُ وَالْيَوْمِيَّاتُ)';
    case 'ipa':
    case 'fikih':
    case 'pkn':
      return 'Bahasa Arab Kelas 7 (MTs / SMP)';
    default:
      return 'Bahasa Arab Kelas 7';
  }
};

export default function App() {
  // Space theme mode: 'planet' | 'blackhole'
  const [spaceTheme, setSpaceTheme] = useState<SpaceThemeMode>(() => {
    const saved = localStorage.getItem('space_theme_mode');
    return (saved === 'blackhole' ? 'blackhole' : 'planet') as SpaceThemeMode;
  });

  // Navigation screen
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('home');

  // Selected Subject & Subchapter
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('taaruf');
  const [selectedSubchapterId, setSelectedSubchapterId] = useState<string>('taaruf-sub-1a');

  // User Profile & Role
  const [userProfile, setUserProfile] = useState<UserProfile>(getStoredUserProfile());
  const [userRole, setUserRole] = useState<UserRole>('USER');
  const [adminToken, setAdminToken] = useState<string | null>(getStoredAdminToken());
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Scratchpad modal state
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);

  // App Configuration
  const [appConfig, setAppConfig] = useState<AppConfig>(getStoredAppConfig());

  // Questions Map (cached by subject)
  const [questionsMap, setQuestionsMap] = useState<Record<SubjectId, Question[]>>({
    taaruf: questionsTaaruf,
    adawat: questionsAdawat,
    usrah: questionsUsrah,
    ipa: questionsTaaruf,
    fikih: questionsAdawat,
    pkn: questionsUsrah,
  });

  // Active Quiz State
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(1800);

  // Toggle space theme mode
  const handleToggleSpaceTheme = () => {
    const nextMode: SpaceThemeMode = spaceTheme === 'planet' ? 'blackhole' : 'planet';
    setSpaceTheme(nextMode);
    localStorage.setItem('space_theme_mode', nextMode);
  };

  // Initialize data on mount
  useEffect(() => {
    // Force dark class for cosmic theme
    document.documentElement.classList.add('dark');

    // 1. Profile Sync
    const profile = getStoredUserProfile();
    const legacyName = getStoredStudentName();
    if (legacyName && profile.name === 'Siswa') {
      profile.name = legacyName;
      setStoredUserProfile(profile);
    }
    setUserProfile(profile);

    // 2. Admin Token verification
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
        .catch(() => {});
    }

    // 3. Fetch dynamic questions from API if available
    const fetchFreshQuestions = async (sub: SubjectId) => {
      try {
        const qList = await apiGetQuestions(sub);
        if (Array.isArray(qList) && qList.length > 0) {
          setQuestionsMap((prev) => ({ ...prev, [sub]: qList }));
        }
      } catch (err) {
        // Fallback to static seed data
      }
    };

    fetchFreshQuestions('taaruf');
    fetchFreshQuestions('adawat');
    fetchFreshQuestions('usrah');

    // 4. Active Exam Resume Check
    const activeExam = getStoredActiveExam();
    if (activeExam && !activeExam.isFinished) {
      setSelectedSubject(activeExam.subjectId);
      setAnswers(activeExam.answers || {});
      setTimeRemaining(activeExam.timeRemaining ?? 1800);
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
    setStoredActiveExam(null);

    // Sync with backend / local leaderboard safely
    try {
      await apiSubmitQuiz({
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
      });
    } catch (e) {
      // Offline fallback
    }

    setCurrentScreen('loading');
  };

  const handleRetryExam = () => {
    handleStartQuiz(selectedSubject);
  };

  const handleBackToHome = () => {
    setStoredActiveExam(null);
    setCurrentScreen('home');
  };

  const handleNavigate = (screen: ScreenState) => {
    if (screen === 'admin' && userRole !== 'ADMIN') {
      setIsAdminModalOpen(true);
      return;
    }
    setCurrentScreen(screen);
  };

  const handleSelectSubject = (subjectId: SubjectId) => {
    setSelectedSubject(subjectId);
    setCurrentScreen('subject');
  };

  const handleSelectSubchapter = (subchapterId: string) => {
    setSelectedSubchapterId(subchapterId);
    setCurrentScreen('materi');
  };

  const activeQuestions = (questionsMap[selectedSubject] || []).filter(
    (q) => q.isActive !== false
  );
  const activeSubjectTitle = getSubjectTitle(selectedSubject);
  const activeExam = getStoredActiveExam();
  const activeExamSubjectId = (activeExam && !activeExam.isFinished) ? activeExam.subjectId : null;

  const isDedicatedExamView = currentScreen === 'quiz' || currentScreen === 'loading' || currentScreen === 'name';

  return (
    <div className="relative min-h-screen text-white flex flex-col font-sans selection:bg-violet-600 selection:text-white overflow-x-hidden">
      {/* Ultra-lightweight Cosmic Space Background (Quantum Planet, 0% CPU overhead) */}
      <SpaceBackground />

      {/* 1. NAME SCREEN (ONBOARDING) */}
      {currentScreen === 'name' && (
        <NameScreen
          initialName={userProfile.name !== 'Siswa' ? userProfile.name : ''}
          onStart={handleStartName}
        />
      )}

      {/* 2. DEDICATED QUIZ VIEW */}
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

      {/* 3. LOADING TRANSITION VIEW */}
      {currentScreen === 'loading' && (
        <LoadingScreen onComplete={() => setCurrentScreen('result')} />
      )}

      {/* 4. CLASSIC FAMILIAR GUI LAYOUT WITH NAVIGATION BAR */}
      {!isDedicatedExamView && (
        <div className="relative z-10 flex-1 flex flex-col min-h-screen">
          {/* TOP NAVBAR (COSMIC GLASSMORPHISM) */}
          <Navbar
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            userRole={userRole}
            userName={userProfile.name}
            userAvatar={userProfile.avatar}
            userXp={userProfile.xp}
            spaceTheme={spaceTheme}
            onToggleSpaceTheme={handleToggleSpaceTheme}
            onOpenAdminLogin={() => setIsAdminModalOpen(true)}
            onAdminLogout={handleAdminLogout}
            onOpenScratchpad={() => setIsScratchpadOpen(true)}
            isQuizActive={false}
            timeRemaining={timeRemaining}
            subjectTitle={activeSubjectTitle}
          />

          {/* MAIN CONTAINER */}
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 animate-in fade-in duration-200">
            {currentScreen === 'home' && (
              <HomeScreen
                userProfile={userProfile}
                onSelectSubject={handleSelectSubject}
                onNavigate={handleNavigate}
                onSelectSubchapter={handleSelectSubchapter}
                activeExamSubjectId={activeExamSubjectId}
                onResumeExam={handleResumeExam}
                onOpenScratchpad={() => setIsScratchpadOpen(true)}
                spaceTheme={spaceTheme}
                onToggleSpaceTheme={handleToggleSpaceTheme}
              />
            )}

            {currentScreen === 'subject' && (
              <SubjectScreen
                selectedSubject={selectedSubject}
                onSelectSubject={setSelectedSubject}
                onSelectSubchapter={handleSelectSubchapter}
                onNavigate={handleNavigate}
                onOpenScratchpad={() => setIsScratchpadOpen(true)}
              />
            )}

            {currentScreen === 'materi' && (
              <MateriDetailScreen
                subchapterId={selectedSubchapterId}
                selectedSubject={selectedSubject}
                onNavigate={handleNavigate}
                onSelectSubchapter={handleSelectSubchapter}
                onOpenScratchpad={() => setIsScratchpadOpen(true)}
              />
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

          {/* COSMIC GLASSMORPHISM FOOTER */}
          <footer className="mt-auto border-t border-white/10 glass-panel py-6 text-center text-xs text-violet-300">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-space">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-orbitron font-bold text-cyan-300">
                  LKS GENAP 2026
                </span>
                <span className="text-[11px] text-violet-200">Quiz Edukasi Kosmik</span>
              </div>
              <p className="text-[11px] text-violet-300/80">
                Mata Pelajaran: 🔭 IPA (Sains & Tata Surya) • 🕌 Fikih Ibadah • 🦅 PKn (Pancasila)
              </p>
              <div className="flex items-center gap-3 text-[11px]">
                <button
                  onClick={() => setIsScratchpadOpen(true)}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1 font-mono text-amber-300"
                >
                  <SketchPencilDoodle className="w-3.5 h-3.5" />
                  <span>Kertas Coretan</span>
                </button>
                <span className="text-white/20">•</span>
                <button
                  onClick={() => handleNavigate('leaderboard')}
                  className="hover:text-cyan-300 transition-colors text-amber-300 font-semibold"
                >
                  Papan Juara 100
                </button>
              </div>
            </div>
          </footer>

          {/* FLOATING SCRATCHPAD BUTTON */}
          <button
            id="btn-floating-scratchpad"
            onClick={() => setIsScratchpadOpen(true)}
            className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-orbitron text-xs font-bold shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:shadow-[0_0_25px_rgba(245,158,11,0.8)] hover:scale-105 active:scale-95 transition-all border border-amber-300"
            title="Buka Kertas Coretan & Sketsa"
          >
            <SketchPencilDoodle className="w-4 h-4" />
            <span className="hidden sm:inline">Kertas Coretan</span>
            <span className="sm:hidden">Coretan</span>
          </button>
        </div>
      )}

      {/* 5. UNFINISHED SKETCH / SCRATCHPAD MODAL */}
      <SketchScratchpadModal
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
      />

      {/* 6. ADMIN LOGIN MODAL */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
