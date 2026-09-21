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
    matematikaCount: 0,
    quranHadisCount: 0,
    seniRupaCount: 0,
    recentActivity: [],
  });

  // Bank Soal State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('matematika');
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
  const [formSubjectId, setFormSubjectId] = useState<SubjectId>('matematika');
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
      const res = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error('Failed to fetch admin stats', e);
    }
  };

  // Fetch Questions
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/questions?subject=${selectedSubject}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setQuestions(data.questions || []);
      }
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

    // Validations
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
      let res;
      if (editingQuestion) {
        res = await fetch(`/api/admin/questions/${editingQuestion.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/admin/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setIsQuestionModalOpen(false);
        setMessage({
          type: 'success',
          text: editingQuestion ? 'Soal berhasil diperbarui!' : 'Soal baru berhasil ditambahkan!',
        });
        setTimeout(() => setMessage(null), 3000);
        fetchQuestions();
        fetchStats();
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menyimpan soal.');
      }
    } catch (err) {
      console.error('Error saving question:', err);
      alert('Terjadi kesalahan jaringan.');
    }
  };

  // Toggle Active/Inactive
  const handleToggleActive = async (q: Question) => {
    try {
      const res = await fetch(`/api/admin/questions/${q.id}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        setQuestions((prev) =>
          prev.map((item) => (item.id === q.id ? { ...item, isActive: !item.isActive } : item))
        );
      }
    } catch (e) {
      console.error('Failed to toggle question status', e);
    }
  };

  // Delete Question
  const handleDeleteQuestion = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/questions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        setDeleteConfirmId(null);
        setMessage({ type: 'success', text: 'Soal berhasil dihapus.' });
        setTimeout(() => setMessage(null), 3000);
        fetchQuestions();
        fetchStats();
      }
    } catch (e) {
      console.error('Failed to delete question', e);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          appName: configAppName,
          appDescription: configAppDesc,
          timerMinutes: Number(configTimer),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        onUpdateAppConfig(data.appConfig);
        setMessage({ type: 'success', text: 'Pengaturan sistem berhasil disimpan!' });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (e) {
      console.error('Failed to update config', e);
    }
  };

  // Reset Leaderboard
  const handleResetLeaderboard = async () => {
    try {
      const res = await fetch('/api/admin/leaderboard', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        setIsResetLeaderboardModalOpen(false);
        setMessage({ type: 'success', text: 'Data leaderboard berhasil direset!' });
        setTimeout(() => setMessage(null), 3000);
        fetchStats();
      }
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
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-6 sm:px-6 sm:py-8 font-sans">
      {/* Top Banner */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 dark:border-emerald-900/60 dark:bg-emerald-950/30">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-2xs">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-emerald-950 dark:text-emerald-100 font-mono">
                Admin Panel — Pemilik Sistem
              </h1>
              <span className="rounded-md bg-emerald-200/70 px-2 py-0.5 text-[10px] font-bold text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200 font-mono">
                ROLE: ADMIN
              </span>
            </div>
            <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80">
              Kelola seluruh bank soal, pantau analitik siswa, dan atur parameter kuis.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onBackToHome}
            className="rounded-xl border border-emerald-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-emerald-900 hover:bg-emerald-50 dark:border-emerald-800 dark:bg-zinc-900 dark:text-emerald-200 dark:hover:bg-zinc-800 transition-colors"
          >
            ← Kembali ke Dashboard Siswa
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1 rounded-xl bg-rose-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 transition-colors shadow-2xs"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Logout Admin</span>
          </button>
        </div>
      </div>

      {/* Global Alert Notification */}
      {message && (
        <div
          className={`mb-6 flex items-center gap-2 rounded-xl p-3.5 text-xs font-medium ${
            message.type === 'success'
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
              : 'border border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300'
          }`}
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{message.text}</span>
        </div>
      )}

      {/* Admin Tab Navigation */}
      <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            activeTab === 'dashboard'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs'
              : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
          }`}
        >
          <LayoutDashboard className="h-3.5 w-3.5" />
          <span>Dashboard & Statistik</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('bank_soal')}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            activeTab === 'bank_soal'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs'
              : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
          }`}
        >
          <Database className="h-3.5 w-3.5" />
          <span>Manajemen Bank Soal</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('leaderboard')}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            activeTab === 'leaderboard'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs'
              : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
          }`}
        >
          <Trophy className="h-3.5 w-3.5" />
          <span>Hasil & Leaderboard</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            activeTab === 'settings'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs'
              : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
          }`}
        >
          <Settings className="h-3.5 w-3.5" />
          <span>Pengaturan Aplikasi</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: DASHBOARD & STATISTIK */}
      {/* ============================================================ */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* 4 Key Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between text-zinc-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider font-mono">
                  Total Pengguna
                </span>
                <Users className="h-4 w-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 font-mono">
                {stats.totalUsers}
              </div>
              <p className="mt-1 text-[11px] text-zinc-400">Siswa aktif berpartisipasi</p>
            </div>

            <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between text-zinc-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider font-mono">
                  Total Soal Aktif
                </span>
                <FileQuestion className="h-4 w-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 font-mono">
                {stats.totalQuestions}
              </div>
              <p className="mt-1 text-[11px] text-zinc-400">Di 3 bank mata pelajaran</p>
            </div>

            <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between text-zinc-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider font-mono">
                  Quiz Dikerjakan
                </span>
                <GraduationCap className="h-4 w-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 font-mono">
                {stats.totalQuizzesTaken}
              </div>
              <p className="mt-1 text-[11px] text-zinc-400">Sesi simulasi terselesaikan</p>
            </div>

            <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between text-zinc-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider font-mono">
                  Rata-rata Skor
                </span>
                <Sparkles className="h-4 w-4 text-amber-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
                {stats.averageScore}
              </div>
              <p className="mt-1 text-[11px] text-zinc-400">Skala 0 sampai 100</p>
            </div>
          </div>

          {/* Subject Distribution & Simple Chart */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📐</span>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Matematika
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">{stats.matematikaCount} Soal Tersedia</span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 mt-4">
                <div className="h-full bg-indigo-500" style={{ width: '100%' }} />
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📖</span>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Qur'an Hadis
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">{stats.quranHadisCount} Soal Tersedia</span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 mt-4">
                <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎨</span>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Seni Rupa
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">{stats.seniRupaCount} Soal Tersedia</span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 mt-4">
                <div className="h-full bg-rose-500" style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          {/* Recent Quiz Activity Table */}
          <div className="rounded-2xl border border-zinc-200/90 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
            <div className="border-b border-zinc-100 bg-zinc-50/70 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900 flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Aktivitas Pengerjaan Quiz Terkini
              </h3>
              <button
                type="button"
                onClick={fetchStats}
                className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {stats.recentActivity && stats.recentActivity.length > 0 ? (
                stats.recentActivity.map((act) => (
                  <div key={act.id} className="flex items-center justify-between p-4 text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">
                        {act.subjectId === 'matematika'
                          ? '📐'
                          : act.subjectId === 'quran_hadis'
                          ? '📖'
                          : '🎨'}
                      </span>
                      <div>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">
                          {act.studentName}
                        </span>
                        <span className="block text-[11px] text-zinc-400">
                          Mata Pelajaran: {act.subjectId}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        Skor: {act.score}
                      </span>
                      <span className="block text-[10.5px] text-zinc-400">
                        {new Date(act.completedAt).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-zinc-500">
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
                onClick={() => setSelectedSubject('matematika')}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  selectedSubject === 'matematika'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs'
                    : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300'
                }`}
              >
                <span>📐</span>
                <span>Matematika</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSubject('quran_hadis')}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  selectedSubject === 'quran_hadis'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs'
                    : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300'
                }`}
              >
                <span>📖</span>
                <span>Qur'an Hadis</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSubject('seni_rupa')}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  selectedSubject === 'seni_rupa'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs'
                    : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300'
                }`}
              >
                <span>🎨</span>
                <span>Seni Rupa</span>
              </button>
            </div>

            {/* Actions: Search & Add */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-60">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari pertanyaan / indikator..."
                  className="w-full rounded-xl border border-zinc-200 bg-white pl-9 pr-3 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>

              <button
                type="button"
                onClick={handleOpenAddModal}
                className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-2xs transition-all whitespace-nowrap"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Tambah Soal</span>
              </button>
            </div>
          </div>

          {/* Question List Cards */}
          <div className="rounded-2xl border border-zinc-200/90 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
            <div className="border-b border-zinc-100 bg-zinc-50/70 px-6 py-3.5 dark:border-zinc-800 dark:bg-zinc-900 flex items-center justify-between text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-400 uppercase">
              <span>Daftar Soal {selectedSubject}</span>
              <span>{filteredQuestions.length} Butir Soal</span>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs text-zinc-500 font-mono">
                <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2 text-zinc-400" />
                Memuat bank soal...
              </div>
            ) : filteredQuestions.length === 0 ? (
              <div className="py-12 text-center text-xs text-zinc-500">
                Tidak ada soal yang sesuai dengan kriteria pencarian.
              </div>
            ) : (
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {filteredQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className={`p-5 transition-colors ${
                      q.isActive === false
                        ? 'opacity-60 bg-zinc-50/50 dark:bg-zinc-950/40'
                        : 'hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-mono font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                            #{idx + 1} (ID: {q.id})
                          </span>
                          <span className="rounded-md border border-zinc-200 px-2 py-0.5 text-[10.5px] font-mono text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                            {q.indicator}
                          </span>
                          <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10.5px] font-mono text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                            Kunci: {['A', 'B', 'C', 'D'][q.correctAnswer]}
                          </span>
                          {q.isActive === false && (
                            <span className="rounded-md bg-rose-100 px-2 py-0.5 text-[10.5px] font-mono font-semibold text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                              Nonaktif
                            </span>
                          )}
                        </div>

                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-relaxed">
                          {q.question}
                        </p>

                        {/* Options preview */}
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {q.options.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 ${
                                q.correctAnswer === oIdx
                                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200 font-medium'
                                  : 'border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-400'
                              }`}
                            >
                              <span className="font-mono font-bold">{['A', 'B', 'C', 'D'][oIdx]}.</span>
                              <span className="truncate">{opt}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1 sm:self-start pt-2 sm:pt-0">
                        {/* Preview */}
                        <button
                          type="button"
                          onClick={() => setPreviewQuestion(q)}
                          className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
                          title="Preview Soal"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(q)}
                          className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
                          title="Edit Soal"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>

                        {/* Toggle Active */}
                        <button
                          type="button"
                          onClick={() => handleToggleActive(q)}
                          className={`rounded-lg p-2 transition-colors ${
                            q.isActive !== false
                              ? 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                              : 'text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                          }`}
                          title={q.isActive !== false ? 'Nonaktifkan Soal' : 'Aktifkan Soal'}
                        >
                          {q.isActive !== false ? (
                            <ToggleRight className="h-5 w-5" />
                          ) : (
                            <ToggleLeft className="h-5 w-5" />
                          )}
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(q.id)}
                          className="rounded-lg p-2 text-zinc-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 transition-colors"
                          title="Hapus Soal"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: LEADERBOARD MANAGEMENT */}
      {/* ============================================================ */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Manajemen Data Peringkat & Riwayat
                </h3>
                <p className="text-xs text-zinc-500">
                  Pantau catatan skor peserta atau hapus/reset data peringkat jika masa simulasi semester telah usai.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsResetLeaderboardModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700 shadow-2xs transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Reset Data Leaderboard</span>
              </button>
            </div>

            <div className="mt-6 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                Sistem secara otomatis memperbarui leaderboard segera setelah seorang siswa menyelesaikan simulasi ujian. Poin XP dihitung berdasarkan jumlah jawaban benar ditambah bonus performa.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: PENGATURAN APLIKASI */}
      {/* ============================================================ */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Pengaturan Sistem Quiz
          </h3>
          <p className="text-xs text-zinc-500 mb-6">
            Ubah identitas aplikasi dan durasi waktu simulasi ujian secara terpusat.
          </p>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Nama Aplikasi
              </label>
              <input
                type="text"
                required
                value={configAppName}
                onChange={(e) => setConfigAppName(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-sans text-zinc-900 focus:border-zinc-900 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Deskripsi / Slogan Aplikasi
              </label>
              <textarea
                rows={2}
                required
                value={configAppDesc}
                onChange={(e) => setConfigAppDesc(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-sans text-zinc-900 focus:border-zinc-900 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Durasi Timer Quiz per Mata Pelajaran (Menit)
              </label>
              <input
                type="number"
                min={5}
                max={120}
                required
                value={configTimer}
                onChange={(e) => setConfigTimer(Number(e.target.value))}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-sans text-zinc-900 focus:border-zinc-900 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
              <p className="mt-1 text-[11px] text-zinc-400 font-sans">
                Standar: 30 Menit untuk 30 butir soal.
              </p>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-2xs transition-all"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Simpan Pengaturan</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: ADD / EDIT QUESTION */}
      {/* ============================================================ */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                {editingQuestion ? 'Edit Soal' : 'Tambah Soal Baru'}
              </h2>
              <button
                type="button"
                onClick={() => setIsQuestionModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="mt-4 space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Mata Pelajaran
                  </label>
                  <select
                    value={formSubjectId}
                    onChange={(e) => setFormSubjectId(e.target.value as SubjectId)}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-sans text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  >
                    <option value="matematika">📐 Matematika</option>
                    <option value="quran_hadis">📖 Qur'an Hadis</option>
                    <option value="seni_rupa">🎨 Seni Rupa</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Indikator / Topik Soal
                  </label>
                  <input
                    type="text"
                    required
                    value={formIndicator}
                    onChange={(e) => setFormIndicator(e.target.value)}
                    placeholder="Contoh: Operasi Hitung Aljabar"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-sans text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Pertanyaan
                </label>
                <textarea
                  rows={3}
                  required
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="Tuliskan butir pertanyaan di sini..."
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-sans text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>

              {/* 4 Choices */}
              <div className="space-y-2.5 pt-1">
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300">
                  Pilihan Jawaban & Kunci Jawaban Benar (Pilih satu radio)
                </label>

                {[
                  { label: 'A', val: formOptionA, setVal: setFormOptionA, idx: 0 },
                  { label: 'B', val: formOptionB, setVal: setFormOptionB, idx: 1 },
                  { label: 'C', val: formOptionC, setVal: setFormOptionC, idx: 2 },
                  { label: 'D', val: formOptionD, setVal: setFormOptionD, idx: 3 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="correctAnswerRadio"
                        checked={formCorrectAnswer === item.idx}
                        onChange={() => setFormCorrectAnswer(item.idx)}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="font-bold w-4">{item.label}.</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={item.val}
                      onChange={(e) => item.setVal(e.target.value)}
                      placeholder={`Teks pilihan ${item.label}...`}
                      className="flex-1 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-sans text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Penjelasan / Pembahasan Jawaban
                </label>
                <textarea
                  rows={2}
                  required
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  placeholder="Jelaskan alasan mengapa jawaban tersebut benar..."
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-sans text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <label className="flex items-center gap-2 cursor-pointer font-sans text-xs">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="h-4 w-4 rounded text-zinc-900 focus:ring-zinc-900"
                  />
                  <span>Status Aktif (Tampilkan dalam kuis siswa)</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsQuestionModalOpen(false)}
                    className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-zinc-900 px-5 py-2 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-2xs"
                  >
                    Simpan Soal
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: PREVIEW QUESTION */}
      {/* ============================================================ */}
      {previewQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-4">
              <span className="text-xs font-mono font-semibold text-zinc-500">
                Preview Tampilan Siswa
              </span>
              <button
                type="button"
                onClick={() => setPreviewQuestion(null)}
                className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-2">
              <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[10.5px] font-mono text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                {previewQuestion.indicator}
              </span>
            </div>

            <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-relaxed mb-4">
              {previewQuestion.question}
            </p>

            <div className="space-y-2 mb-4">
              {previewQuestion.options.map((opt, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-xs ${
                    previewQuestion.correctAnswer === i
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 font-semibold'
                      : 'border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300'
                  }`}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800 font-mono font-bold">
                    {['A', 'B', 'C', 'D'][i]}
                  </span>
                  <span>{opt}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 block mb-0.5">
                Pembahasan Resmi:
              </span>
              {previewQuestion.explanation}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: DELETE QUESTION CONFIRMATION */}
      {/* ============================================================ */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-mono">
              Hapus Soal Ini?
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              Tindakan ini permanen dan akan menghapus butir soal dari bank soal sistem.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleDeleteQuestion(deleteConfirmId)}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 shadow-2xs"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: RESET LEADERBOARD CONFIRMATION */}
      {/* ============================================================ */}
      {isResetLeaderboardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-mono">
              Konfirmasi Reset Leaderboard
            </h3>
            <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
              Seluruh rekam data skor siswa, riwayat aktivitas kuis, dan poin peringkat leaderboard akan dibersihkan dari server. Apakah Anda yakin ingin melanjutkan?
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setIsResetLeaderboardModalOpen(false)}
                className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleResetLeaderboard}
                className="rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white hover:bg-rose-700 shadow-2xs"
              >
                Reset Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
