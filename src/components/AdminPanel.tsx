import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  LayoutDashboard,
  Database,
  Trophy,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Eye,
  ToggleLeft,
  ToggleRight,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  LogOut,
  X,
  Sparkles,
  Users,
  FileQuestion,
  GraduationCap,
  Save,
} from 'lucide-react';
import { Question, SubjectId, AppConfig, AdminStats } from '../types';
import {
  apiAdminGetStats,
  apiAdminGetQuestions,
  apiAdminSaveQuestion,
  apiAdminDeleteQuestion,
  apiAdminToggleQuestion,
  apiAdminSaveConfig,
  apiAdminResetLeaderboard,
} from '../utils/api';

interface AdminPanelProps {
  adminToken: string;
  onLogout: () => void;
  onBackToHome: () => void;
  appConfig: AppConfig;
  onUpdateAppConfig: (config: AppConfig) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  adminToken,
  onLogout,
  onBackToHome,
  appConfig,
  onUpdateAppConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bank_soal' | 'leaderboard' | 'settings'>('dashboard');

  // Dashboard Stats State
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalQuestions: 0,
    totalQuizzesTaken: 0,
    averageScore: 0,
    ipaCount: 0,
    fikihCount: 0,
    pknCount: 0,
    recentActivity: [],
  });

  // Bank Soal State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('ipa');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal States
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [previewQuestion, setPreviewQuestion] = useState<Question | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [isResetLeaderboardModalOpen, setIsResetLeaderboardModalOpen] = useState(false);

  // Form State for Add / Edit
  const [formSubjectId, setFormSubjectId] = useState<SubjectId>('ipa');
  const [formQuestion, setFormQuestion] = useState('');
  const [formOptionA, setFormOptionA] = useState('');
  const [formOptionB, setFormOptionB] = useState('');
  const [formOptionC, setFormOptionC] = useState('');
  const [formOptionD, setFormOptionD] = useState('');
  const [formCorrectAnswer, setFormCorrectAnswer] = useState<number>(0);
  const [formExplanation, setFormExplanation] = useState('');
  const [formIndicator, setFormIndicator] = useState('');
  const [formTopic, setFormTopic] = useState('');
  const [formDifficulty, setFormDifficulty] = useState<'easy' | 'medium' | 'challenging'>('medium');
  const [formIsActive, setFormIsActive] = useState(true);

  // Settings State
  const [configAppName, setConfigAppName] = useState(appConfig.appName);
  const [configAppDesc, setConfigAppDesc] = useState(appConfig.appDescription);
  const [configTimer, setConfigTimer] = useState(appConfig.timerMinutes);

  // Fetch Stats
  const fetchStats = async () => {
    try {
      const data = await apiAdminGetStats(adminToken);
      setStats(data);
    } catch (e) {
      console.error('Failed to fetch admin stats', e);
    }
  };

  // Fetch Questions
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const qList = await apiAdminGetQuestions(adminToken, selectedSubject);
      setQuestions(qList || []);
    } catch (e) {
      console.error('Failed to fetch admin questions', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (activeTab === 'bank_soal') {
      fetchQuestions();
    }
  }, [activeTab, selectedSubject]);

  const handleOpenAddModal = () => {
    setEditingQuestion(null);
    setFormSubjectId(selectedSubject);
    setFormQuestion('');
    setFormOptionA('');
    setFormOptionB('');
    setFormOptionC('');
    setFormOptionD('');
    setFormCorrectAnswer(0);
    setFormExplanation('');
    setFormIndicator('');
    setFormTopic('');
    setFormDifficulty('medium');
    setFormIsActive(true);
    setIsQuestionModalOpen(true);
  };

  const handleOpenEditModal = (q: Question) => {
    setEditingQuestion(q);
    setFormSubjectId(q.subjectId);
    setFormQuestion(q.question);
    setFormOptionA(q.options[0] || '');
    setFormOptionB(q.options[1] || '');
    setFormOptionC(q.options[2] || '');
    setFormOptionD(q.options[3] || '');
    setFormCorrectAnswer(q.correctAnswer ?? 0);
    setFormExplanation(q.explanation || '');
    setFormIndicator(q.indicator || '');
    setFormTopic(q.topic || '');
    setFormDifficulty(q.difficulty || 'medium');
    setFormIsActive(q.isActive !== false);
    setIsQuestionModalOpen(true);
  };

  // Save Question (Add or Edit)
  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formQuestion.trim()) {
      alert('Pertanyaan tidak boleh kosong.');
      return;
    }

    if (!formOptionA.trim() || !formOptionB.trim() || !formOptionC.trim() || !formOptionD.trim()) {
      alert('Semua pilihan A, B, C, dan D wajib diisi.');
      return;
    }

    if (formCorrectAnswer < 0 || formCorrectAnswer > 3) {
      alert('Tentukan jawaban benar (A, B, C, atau D).');
      return;
    }

    const payload = {
      subjectId: formSubjectId,
      question: formQuestion,
      options: [formOptionA, formOptionB, formOptionC, formOptionD],
      correctAnswer: formCorrectAnswer,
      explanation: formExplanation || 'Tidak ada penjelasan tambahan.',
      indicator: formIndicator || 'Kompetensi Dasar',
      topic: formTopic || 'Materi Umum',
      difficulty: formDifficulty,
      isActive: formIsActive,
    };

    try {
      const result = await apiAdminSaveQuestion(adminToken, {
        ...payload,
        id: editingQuestion?.id,
      });

      if (result.ok) {
        setIsQuestionModalOpen(false);
        setMessage({ type: 'success', text: 'Soal berhasil disimpan!' });
        setTimeout(() => setMessage(null), 3000);
        fetchQuestions();
        fetchStats();
      }
    } catch (e) {
      console.error('Failed to save question', e);
      setMessage({ type: 'error', text: 'Gagal menyimpan soal.' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  // Toggle Active Status
  const handleToggleQuestion = async (id: number) => {
    try {
      await apiAdminToggleQuestion(adminToken, id, selectedSubject);
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, isActive: !q.isActive } : q))
      );
      fetchStats();
    } catch (e) {
      console.error('Failed to toggle question', e);
    }
  };

  // Delete Question
  const handleDeleteQuestion = async (id: number) => {
    try {
      await apiAdminDeleteQuestion(adminToken, id, selectedSubject);
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      setDeleteConfirmId(null);
      setMessage({ type: 'success', text: 'Soal berhasil dihapus!' });
      setTimeout(() => setMessage(null), 3000);
      fetchStats();
    } catch (e) {
      console.error('Failed to delete question', e);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedConfig = {
        appName: configAppName,
        appDescription: configAppDesc,
        timerMinutes: Number(configTimer),
      };
      await apiAdminSaveConfig(adminToken, updatedConfig);
      onUpdateAppConfig({ ...appConfig, ...updatedConfig });
      setMessage({ type: 'success', text: 'Pengaturan sistem berhasil disimpan!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (e) {
      console.error('Failed to update config', e);
    }
  };

  // Reset Leaderboard
  const handleResetLeaderboard = async () => {
    try {
      await apiAdminResetLeaderboard(adminToken);
      setIsResetLeaderboardModalOpen(false);
      setMessage({ type: 'success', text: 'Data leaderboard berhasil direset!' });
      setTimeout(() => setMessage(null), 3000);
      fetchStats();
    } catch (e) {
      console.error('Failed to reset leaderboard', e);
    }
  };

  const filteredQuestions = questions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.indicator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-6 sm:px-6 sm:py-8 font-sans select-none relative z-10">
      {/* Top Banner */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl glass-panel border border-emerald-400/50 bg-emerald-950/30 p-5 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/25 text-emerald-300 border border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-white font-orbitron">
                Admin Panel — Pemilik Sistem
              </h1>
              <span className="rounded-md bg-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-300 font-orbitron border border-emerald-400/40">
                ROLE: ADMIN
              </span>
            </div>
            <p className="text-xs text-emerald-200/80 font-space mt-0.5">
              Kelola 3 bank soal (IPA, Fikih, PKn), pantau analitik siswa, dan atur parameter kuis kosmik.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onBackToHome}
            className="rounded-xl glass-panel border border-white/15 px-3.5 py-1.5 text-xs font-orbitron font-semibold text-violet-100 hover:bg-white/10 transition-colors"
          >
            ← Kembali ke Dashboard
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1 rounded-xl bg-rose-600/80 px-3.5 py-1.5 text-xs font-orbitron font-bold text-white hover:bg-rose-600 transition-colors shadow-xs"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Logout Admin</span>
          </button>
        </div>
      </div>

      {/* Global Alert Notification */}
      {message && (
        <div
          className={`mb-6 flex items-center gap-2 rounded-2xl p-3.5 text-xs font-medium font-space ${
            message.type === 'success'
              ? 'glass-panel border border-emerald-400/50 bg-emerald-950/40 text-emerald-200'
              : 'glass-panel border border-rose-400/50 bg-rose-950/40 text-rose-200'
          }`}
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{message.text}</span>
        </div>
      )}

      {/* Admin Tab Navigation */}
      <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-white/10 pb-3 font-orbitron">
        <button
          type="button"
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === 'dashboard'
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-violet-400/50'
              : 'text-violet-300 hover:bg-white/5'
          }`}
        >
          <LayoutDashboard className="h-3.5 w-3.5 text-cyan-400" />
          <span>Dashboard & Analitik</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('bank_soal')}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === 'bank_soal'
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-violet-400/50'
              : 'text-violet-300 hover:bg-white/5'
          }`}
        >
          <Database className="h-3.5 w-3.5 text-cyan-400" />
          <span>Bank Soal (3 Mapel)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('leaderboard')}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === 'leaderboard'
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-violet-400/50'
              : 'text-violet-300 hover:bg-white/5'
          }`}
        >
          <Trophy className="h-3.5 w-3.5 text-amber-400" />
          <span>Hasil & Leaderboard</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === 'settings'
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-violet-400/50'
              : 'text-violet-300 hover:bg-white/5'
          }`}
        >
          <Settings className="h-3.5 w-3.5 text-violet-400" />
          <span>Pengaturan Aplikasi</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: DASHBOARD & STATISTIK */}
      {/* ============================================================ */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* 4 Key Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-orbitron">
            <div className="rounded-3xl glass-panel border border-white/12 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between text-violet-300 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Total Siswa
                </span>
                <Users className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {stats.totalUsers}
              </div>
              <p className="mt-1 text-[11px] text-violet-300/70 font-space">Siswa aktif terdaftar</p>
            </div>

            <div className="rounded-3xl glass-panel border border-white/12 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between text-violet-300 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Total Soal Aktif
                </span>
                <FileQuestion className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {stats.totalQuestions}
              </div>
              <p className="mt-1 text-[11px] text-violet-300/70 font-space">Di 3 bank mata pelajaran</p>
            </div>

            <div className="rounded-3xl glass-panel border border-white/12 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between text-violet-300 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Quiz Selesai
                </span>
                <GraduationCap className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {stats.totalQuizzesTaken}
              </div>
              <p className="mt-1 text-[11px] text-violet-300/70 font-space">Sesi simulasi terselesaikan</p>
            </div>

            <div className="rounded-3xl glass-panel border border-white/12 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between text-amber-300 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Rata-rata Skor
                </span>
                <Sparkles className="h-4 w-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300">
                {stats.averageScore}
              </div>
              <p className="mt-1 text-[11px] text-violet-300/70 font-space">Skala 0 sampai 100</p>
            </div>
          </div>

          {/* Subject Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-3xl glass-panel border border-cyan-400/30 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🔭</span>
                <div>
                  <h3 className="text-sm font-bold text-white font-orbitron">
                    IPA (Sains & Astronomi)
                  </h3>
                  <span className="text-xs text-cyan-300 font-space">{stats.ipaCount} Soal Aktif</span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 mt-4">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            <div className="rounded-3xl glass-panel border border-emerald-400/30 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🕌</span>
                <div>
                  <h3 className="text-sm font-bold text-white font-orbitron">
                    Fikih Ibadah
                  </h3>
                  <span className="text-xs text-emerald-300 font-space">{stats.fikihCount} Soal Aktif</span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 mt-4">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            <div className="rounded-3xl glass-panel border border-amber-400/30 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🦅</span>
                <div>
                  <h3 className="text-sm font-bold text-white font-orbitron">
                    PKn (Pancasila & Norma)
                  </h3>
                  <span className="text-xs text-amber-300 font-space">{stats.pknCount} Soal Aktif</span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 mt-4">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          {/* Recent Quiz Activity Table */}
          <div className="rounded-3xl glass-panel border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.35)] overflow-hidden">
            <div className="border-b border-white/10 bg-white/5 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xs font-orbitron font-bold uppercase tracking-wider text-violet-200">
                Aktivitas Pengerjaan Quiz Terkini
              </h3>
              <button
                type="button"
                onClick={fetchStats}
                className="text-xs text-cyan-300 hover:text-white flex items-center gap-1 font-space"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="divide-y divide-white/10">
              {stats.recentActivity && stats.recentActivity.length > 0 ? (
                stats.recentActivity.map((act) => (
                  <div key={act.id} className="flex items-center justify-between p-4 text-xs font-space">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {act.subjectId === 'ipa'
                          ? '🔭'
                          : act.subjectId === 'fikih'
                          ? '🕌'
                          : '🦅'}
                      </span>
                      <div>
                        <span className="font-bold text-white font-orbitron">
                          {act.studentName}
                        </span>
                        <span className="block text-[11px] text-violet-300/80">
                          Mapel: {act.subjectId.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-cyan-300 font-orbitron">
                        Skor: {act.score}
                      </span>
                      <span className="block text-[10.5px] text-violet-300/70">
                        {new Date(act.completedAt).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-violet-300 font-space">
                  Belum ada aktivitas pengerjaan kuis yang tercatat.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: MANAJEMEN BANK SOAL */}
      {/* ============================================================ */}
      {activeTab === 'bank_soal' && (
        <div className="space-y-6">
          {/* Subject Switcher & Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Subject Tabs */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedSubject('ipa')}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-orbitron font-bold transition-all ${
                  selectedSubject === 'ipa'
                    ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'glass-panel border border-white/10 text-violet-300 hover:text-white'
                }`}
              >
                <span>🔭</span>
                <span>IPA</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSubject('fikih')}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-orbitron font-bold transition-all ${
                  selectedSubject === 'fikih'
                    ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/60 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                    : 'glass-panel border border-white/10 text-violet-300 hover:text-white'
                }`}
              >
                <span>🕌</span>
                <span>Fikih</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSubject('pkn')}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-orbitron font-bold transition-all ${
                  selectedSubject === 'pkn'
                    ? 'bg-amber-500/30 text-amber-200 border border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                    : 'glass-panel border border-white/10 text-violet-300 hover:text-white'
                }`}
              >
                <span>🦅</span>
                <span>PKn</span>
              </button>
            </div>

            {/* Actions: Search & Add */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-60">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-violet-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari pertanyaan / indikator..."
                  className="w-full rounded-xl glass-panel border border-white/15 bg-white/5 pl-9 pr-3 py-1.5 text-xs text-white placeholder-violet-300/50 focus:border-cyan-400 focus:outline-hidden"
                />
              </div>

              <button
                type="button"
                onClick={handleOpenAddModal}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-orbitron font-bold text-white hover:from-violet-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all whitespace-nowrap active:scale-95"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Tambah Soal</span>
              </button>
            </div>
          </div>

          {/* Question List Cards */}
          <div className="rounded-3xl glass-panel border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.35)] overflow-hidden">
            <div className="border-b border-white/10 bg-white/5 px-6 py-3.5 flex items-center justify-between text-xs font-orbitron font-bold text-violet-200 uppercase">
              <span>Daftar Soal {selectedSubject.toUpperCase()}</span>
              <span>{filteredQuestions.length} Butir Soal</span>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs text-violet-300 font-space">
                <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-cyan-400" />
                <span>Memuat bank soal...</span>
              </div>
            ) : filteredQuestions.length === 0 ? (
              <div className="py-12 text-center text-xs text-violet-300 font-space">
                Tidak ada soal ditemukan.
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {filteredQuestions.map((q) => (
                  <div key={q.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors">
                    <div className="space-y-1 max-w-3xl">
                      <div className="flex items-center gap-2">
                        <span className="font-orbitron font-bold text-xs text-cyan-300">
                          #{q.id}
                        </span>
                        <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-space text-violet-200 border border-white/10">
                          {q.indicator}
                        </span>
                        <span className={`text-[10px] px-2 py-0.2 rounded-full font-orbitron font-bold ${
                          q.isActive !== false ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                        }`}>
                          {q.isActive !== false ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-white font-space">
                        {q.question}
                      </p>
                      <div className="text-[11px] text-violet-300/80 font-space flex items-center gap-2">
                        <span>Kunci: <strong>{['A', 'B', 'C', 'D'][q.correctAnswer]}</strong></span>
                        <span>•</span>
                        <span className="truncate">{q.options[q.correctAnswer]}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleQuestion(q.id)}
                        className="p-2 text-violet-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
                        title={q.isActive !== false ? 'Nonaktifkan Soal' : 'Aktifkan Soal'}
                      >
                        {q.isActive !== false ? <ToggleRight className="h-5 w-5 text-emerald-400" /> : <ToggleLeft className="h-5 w-5 text-zinc-500" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(q)}
                        className="p-2 text-violet-300 hover:text-cyan-300 rounded-xl hover:bg-white/10 transition-colors"
                        title="Edit Soal"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-2 text-violet-300 hover:text-rose-400 rounded-xl hover:bg-white/10 transition-colors"
                        title="Hapus Soal"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: HASIL & LEADERBOARD RESET */}
      {/* ============================================================ */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="rounded-3xl glass-panel border border-white/15 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
            <h3 className="text-base font-bold text-white font-orbitron mb-2">
              Manajemen Papan Peringkat Kosmik
            </h3>
            <p className="text-xs text-violet-200/80 font-space mb-6">
              Atur dan kelola data pengerjaan kuis siswa atau lakukan reset data papan juara jika semester baru dimulai.
            </p>

            <button
              type="button"
              onClick={() => setIsResetLeaderboardModalOpen(true)}
              className="flex items-center gap-2 rounded-2xl bg-rose-600/80 px-4 py-2.5 text-xs font-orbitron font-bold text-white hover:bg-rose-600 transition-colors shadow-xs"
            >
              <Trash2 className="h-4 w-4" />
              <span>Reset Data Leaderboard</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: PENGATURAN APLIKASI */}
      {/* ============================================================ */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl rounded-3xl glass-panel border border-white/15 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
          <h3 className="text-base font-bold text-white font-orbitron mb-2">
            Pengaturan Sistem Quiz Kosmik
          </h3>
          <p className="text-xs text-violet-200/80 font-space mb-6">
            Ubah identitas aplikasi dan durasi waktu simulasi ujian secara terpusat.
          </p>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs font-space">
            <div>
              <label className="block font-semibold text-violet-200 mb-1">
                Nama Aplikasi
              </label>
              <input
                type="text"
                required
                value={configAppName}
                onChange={(e) => setConfigAppName(e.target.value)}
                className="w-full rounded-xl glass-panel border border-white/15 bg-white/5 px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-violet-200 mb-1">
                Deskripsi / Slogan Aplikasi
              </label>
              <textarea
                rows={2}
                required
                value={configAppDesc}
                onChange={(e) => setConfigAppDesc(e.target.value)}
                className="w-full rounded-xl glass-panel border border-white/15 bg-white/5 px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-violet-200 mb-1">
                Durasi Timer Quiz per Mapel (Menit)
              </label>
              <input
                type="number"
                min={5}
                max={120}
                required
                value={configTimer}
                onChange={(e) => setConfigTimer(Number(e.target.value))}
                className="w-full rounded-xl glass-panel border border-white/15 bg-white/5 px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-xs font-orbitron font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] active:scale-95 transition-all"
            >
              <Save className="h-3.5 w-3.5" />
              <span>Simpan Perubahan</span>
            </button>
          </form>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: ADD / EDIT QUESTION */}
      {/* ============================================================ */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl glass-panel border border-white/20 bg-[#0c0822]/95 p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="text-base font-bold text-white font-orbitron">
                {editingQuestion ? 'Edit Soal' : 'Tambah Soal Baru'}
              </h2>
              <button
                type="button"
                onClick={() => setIsQuestionModalOpen(false)}
                className="p-1 text-violet-300 hover:text-white rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="mt-4 space-y-4 text-xs font-space">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-violet-200 mb-1">
                    Mata Pelajaran
                  </label>
                  <select
                    value={formSubjectId}
                    onChange={(e) => setFormSubjectId(e.target.value as SubjectId)}
                    className="w-full rounded-xl glass-panel border border-white/15 bg-zinc-900 px-3 py-2 text-xs text-white"
                  >
                    <option value="ipa">🔭 IPA (Sains & Astronomi)</option>
                    <option value="fikih">🕌 Fikih Ibadah</option>
                    <option value="pkn">🦅 PKn (Pancasila & Norma)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-violet-200 mb-1">
                    Indikator / Topik Soal
                  </label>
                  <input
                    type="text"
                    required
                    value={formIndicator}
                    onChange={(e) => setFormIndicator(e.target.value)}
                    placeholder="Contoh: Tata Surya & Planet"
                    className="w-full rounded-xl glass-panel border border-white/15 bg-white/5 px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-violet-200 mb-1">
                  Pertanyaan
                </label>
                <textarea
                  rows={3}
                  required
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="Tuliskan butir pertanyaan di sini..."
                  className="w-full rounded-xl glass-panel border border-white/15 bg-white/5 px-3 py-2 text-xs text-white"
                />
              </div>

              {/* 4 Choices */}
              <div className="space-y-2.5 pt-1">
                <label className="block font-semibold text-violet-200">
                  Pilihan Jawaban & Kunci Jawaban Benar (Pilih satu radio)
                </label>

                {[
                  { label: 'A', val: formOptionA, setVal: setFormOptionA, idx: 0 },
                  { label: 'B', val: formOptionB, setVal: setFormOptionB, idx: 1 },
                  { label: 'C', val: formOptionC, setVal: setFormOptionC, idx: 2 },
                  { label: 'D', val: formOptionD, setVal: setFormOptionD, idx: 3 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={formCorrectAnswer === item.idx}
                      onChange={() => setFormCorrectAnswer(item.idx)}
                      className="accent-cyan-400 h-4 w-4"
                    />
                    <span className="w-5 font-orbitron font-bold text-cyan-300">{item.label}</span>
                    <input
                      type="text"
                      required
                      value={item.val}
                      onChange={(e) => item.setVal(e.target.value)}
                      placeholder={`Pilihan ${item.label}`}
                      className="flex-1 rounded-xl glass-panel border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-semibold text-violet-200 mb-1">
                  Pembahasan / Penjelasan Materi
                </label>
                <textarea
                  rows={2}
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  placeholder="Penjelasan kenapa kunci jawaban ini benar..."
                  className="w-full rounded-xl glass-panel border border-white/15 bg-white/5 px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="px-4 py-2 rounded-xl glass-panel border border-white/15 text-violet-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-orbitron font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                >
                  Simpan Soal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Leaderboard Modal Confirmation */}
      {isResetLeaderboardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl glass-panel border border-rose-500/40 bg-[#160814]/95 p-6 shadow-2xl">
            <h3 className="text-base font-bold text-rose-300 font-orbitron mb-2">
              Konfirmasi Reset Leaderboard
            </h3>
            <p className="text-xs text-violet-200/80 font-space mb-5">
              Apakah Anda yakin ingin menghapus seluruh data pencapaian siswa pada leaderboard? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsResetLeaderboardModalOpen(false)}
                className="px-4 py-2 rounded-xl glass-panel border border-white/15 text-violet-300 hover:text-white text-xs font-space"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleResetLeaderboard}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-orbitron font-bold text-xs shadow-md"
              >
                Ya, Reset Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
