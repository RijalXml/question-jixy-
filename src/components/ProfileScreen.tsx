import React, { useState, useRef } from 'react';
import {
  User,
  Sparkles,
  Trophy,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  BookOpen,
  Edit2,
  Check,
  RotateCcw,
  ArrowRight,
  Upload,
  Image as ImageIcon,
  Camera,
  Trash2,
  AlertCircle,
  X,
} from 'lucide-react';
import { UserProfile, SubjectId, ExamResult } from '../types';
import { UserAvatar } from './UserAvatar';

interface ProfileScreenProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onStartQuiz: (subjectId: SubjectId) => void;
  onReviewQuizResult?: (result: ExamResult) => void;
}

const AVATAR_CATEGORIES = [
  {
    name: 'Penjelajah Antariksa',
    items: ['🚀', '👨‍🚀', '👩‍🚀', '🪐', '🌟', '☄️', '🌌', '🛸'],
  },
  {
    name: 'Siswa & Pelajar',
    items: ['🎓', '👨‍🎓', '👩‍🎓', '🧕', '🧑‍🎓', '🧑‍🏫'],
  },
  {
    name: 'Sains & Prestasi',
    items: ['🔭', '🔬', '💡', '🏆', '🥇', '⭐', '🧠', '🦁'],
  },
];

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userProfile,
  onUpdateProfile,
  onStartQuiz,
  onReviewQuizResult,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(userProfile.name);
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const [avatarTab, setAvatarTab] = useState<'upload' | 'preset'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdateProfile({ name: nameInput.trim() });
      setIsEditingName(false);
    }
  };

  const handleSelectAvatar = (avatar: string) => {
    onUpdateProfile({ avatar });
    setIsAvatarPickerOpen(false);
    setUploadError(null);
  };

  const isCustomPhoto =
    userProfile.avatar &&
    (userProfile.avatar.startsWith('data:image') ||
      userProfile.avatar.startsWith('http://') ||
      userProfile.avatar.startsWith('https://') ||
      userProfile.avatar.startsWith('blob:'));

  const processImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Format file harus berupa gambar (JPG, PNG, WebP).'));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        reject(new Error('Ukuran foto terlalu besar. Maksimal 10MB.'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const size = 256;
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Gagal memproses gambar.'));
              return;
            }

            const minDim = Math.min(img.width, img.height);
            const sx = (img.width - minDim) / 2;
            const sy = (img.height - minDim) / 2;

            ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            resolve(dataUrl);
          } catch (err) {
            reject(err);
          }
        };
        img.onerror = () => reject(new Error('File gambar rusak atau tidak valid.'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Gagal membaca file gambar.'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    try {
      const dataUrl = await processImageFile(file);
      onUpdateProfile({ avatar: dataUrl });
      setIsAvatarPickerOpen(false);
    } catch (err: any) {
      setUploadError(err.message || 'Gagal mengunggah foto.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    try {
      const dataUrl = await processImageFile(file);
      onUpdateProfile({ avatar: dataUrl });
      setIsAvatarPickerOpen(false);
    } catch (err: any) {
      setUploadError(err.message || 'Gagal memproses foto.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleResetToDefaultAvatar = () => {
    onUpdateProfile({ avatar: '👨‍🎓' });
    setIsAvatarPickerOpen(false);
    setUploadError(null);
  };

  const completedSubjectsSet = new Set(
    userProfile.history.filter((h) => h.score >= 75).map((h) => h.subjectId)
  );

  const completedCount = ['ips', 'pjok'].filter((s) =>
    completedSubjectsSet.has(s as SubjectId) ||
    (s === 'ips' && (completedSubjectsSet.has('taaruf') || completedSubjectsSet.has('ipa'))) ||
    (s === 'pjok' && (completedSubjectsSet.has('adawat') || completedSubjectsSet.has('fikih')))
  ).length;

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-4xl px-4 py-8 sm:px-6 sm:py-10 font-sans select-none relative z-10">
      {/* Profile Header Hero Card */}
      <div className="relative mb-8 overflow-hidden rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with Interactive Edit Overlay */}
          <div className="relative group">
            <UserAvatar avatar={userProfile.avatar} name={userProfile.name} size="xl" />

            <button
              type="button"
              id="btn-edit-avatar"
              onClick={() => setIsAvatarPickerOpen(true)}
              className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg ring-2 ring-[#050510] hover:bg-violet-500 hover:scale-110 transition-all"
              title="Ganti Foto Profil / Avatar"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>

          {/* User Info & Edit Name */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/40 bg-cyan-500/20 px-3 py-0.5 text-xs font-orbitron font-bold text-cyan-300">
                <Sparkles className="h-3 w-3 text-cyan-400" />
                Penjelajah Kosmik Siswa
              </span>

              {userProfile.xp >= 500 && (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-500/20 px-2.5 py-0.5 text-xs font-orbitron font-bold text-amber-300">
                  <Trophy className="h-3 w-3 text-amber-400" />
                  Siswa Berprestasi
                </span>
              )}
            </div>

            {isEditingName ? (
              <form onSubmit={handleSaveName} className="flex items-center gap-2 max-w-sm mt-1">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="flex-1 rounded-xl glass-panel border border-cyan-400/50 bg-white/5 px-3 py-1.5 text-sm font-space text-white focus:outline-hidden"
                  autoFocus
                  maxLength={30}
                />
                <button
                  type="submit"
                  className="rounded-xl bg-cyan-500 px-3 py-1.5 text-xs font-orbitron font-bold text-black hover:bg-cyan-400 shadow-sm"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingName(false)}
                  className="rounded-xl glass-panel border border-white/15 px-3 py-1.5 text-xs text-violet-300"
                >
                  Batal
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-orbitron">
                  {userProfile.name}
                </h1>
                <button
                  type="button"
                  onClick={() => {
                    setNameInput(userProfile.name);
                    setIsEditingName(true);
                  }}
                  className="text-violet-400 hover:text-white transition-colors"
                  title="Ubah Nama"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>
            )}

            <p className="text-xs sm:text-sm text-violet-200/80 font-space">
              Tingkat SMP/MTs • LKS Semester Genap 2026
            </p>
          </div>
        </div>

        {/* Avatar Picker Modal / Drawer */}
        {isAvatarPickerOpen && (
          <div className="mt-6 pt-6 border-t border-white/10 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white font-orbitron">
                Pilih Foto Profil atau Karakter Antariksa
              </h3>
              <button
                type="button"
                onClick={() => setIsAvatarPickerOpen(false)}
                className="text-violet-300 hover:text-white p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Sub Tabs */}
            <div className="flex items-center gap-2 mb-4">
              <button
                type="button"
                onClick={() => setAvatarTab('upload')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-orbitron font-bold transition-all ${
                  avatarTab === 'upload'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'glass-panel border border-white/10 text-violet-300'
                }`}
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Upload Foto Pribadi</span>
              </button>
              <button
                type="button"
                onClick={() => setAvatarTab('preset')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-orbitron font-bold transition-all ${
                  avatarTab === 'preset'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'glass-panel border border-white/10 text-violet-300'
                }`}
              >
                <span>Preset Karakter & Emoji</span>
              </button>

              {isCustomPhoto && (
                <button
                  type="button"
                  onClick={handleResetToDefaultAvatar}
                  className="ml-auto flex items-center gap-1 text-xs text-rose-300 hover:text-rose-200"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>Hapus Foto Custom</span>
                </button>
              )}
            </div>

            {/* TAB 1: File Upload */}
            {avatarTab === 'upload' && (
              <div className="space-y-3 font-space">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`group relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-cyan-400 bg-cyan-950/30'
                      : 'border-white/15 glass-panel hover:border-cyan-400/50 hover:bg-white/5'
                  }`}
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl glass-panel border border-white/15 text-cyan-300 group-hover:scale-105 transition-transform">
                    <ImageIcon className="h-6 w-6" />
                  </div>

                  <p className="text-sm font-semibold text-white">
                    Pilih Foto dari Galeri HP / Komputer
                  </p>
                  <p className="mt-1 text-xs text-violet-300">
                    Tarik dan lepaskan foto di sini, atau <span className="font-semibold text-cyan-300 underline">klik untuk menelusuri</span>
                  </p>
                  <p className="mt-2 text-[10.5px] font-mono text-violet-400">
                    Mendukung JPG, PNG, WebP • Otomatis dipotong dan dikompresi
                  </p>

                  {isUploading && (
                    <div className="absolute inset-0 bg-[#050510]/80 rounded-3xl flex items-center justify-center backdrop-blur-xs">
                      <div className="flex items-center gap-2 text-xs font-semibold text-white">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                        <span>Memproses foto profil...</span>
                      </div>
                    </div>
                  )}
                </div>

                {uploadError && (
                  <div className="flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-950/30 p-3 text-xs text-rose-300">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Emoji Presets */}
            {avatarTab === 'preset' && (
              <div className="space-y-4">
                {AVATAR_CATEGORIES.map((cat, catIdx) => (
                  <div key={catIdx}>
                    <div className="mb-2 text-xs font-orbitron font-bold text-violet-300">
                      {cat.name}
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {cat.items.map((av, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectAvatar(av)}
                          className={`flex h-11 w-11 items-center justify-center rounded-xl text-2xl transition-all hover:scale-110 ${
                            userProfile.avatar === av
                              ? 'bg-violet-600 ring-2 ring-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                              : 'glass-panel border border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {av}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4 Stats Blocks */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-orbitron">
          <div className="rounded-2xl glass-panel border border-white/10 p-3">
            <span className="block text-[10px] text-violet-300 uppercase font-bold">Total XP</span>
            <span className="text-xl font-black text-amber-300 flex items-center justify-center gap-1 mt-0.5">
              <Sparkles className="h-4 w-4 text-amber-400" />
              {userProfile.xp}
            </span>
          </div>

          <div className="rounded-2xl glass-panel border border-white/10 p-3">
            <span className="block text-[10px] text-violet-300 uppercase font-bold">Quiz Selesai</span>
            <span className="text-xl font-black text-white mt-0.5 block">
              {userProfile.quizzesCompleted}
            </span>
          </div>

          <div className="rounded-2xl glass-panel border border-white/10 p-3">
            <span className="block text-[10px] text-violet-300 uppercase font-bold">Skor Terbaik</span>
            <span className="text-xl font-black text-emerald-300 mt-0.5 block">
              {userProfile.history.length > 0
                ? Math.max(...userProfile.history.map((h) => h.score))
                : 0}
            </span>
          </div>

          <div className="rounded-2xl glass-panel border border-white/10 p-3">
            <span className="block text-[10px] text-violet-300 uppercase font-bold">Mapel Tuntas</span>
            <span className="text-xl font-black text-cyan-300 mt-0.5 block">
              {completedCount} / 2
            </span>
          </div>
        </div>
      </div>

      {/* Subject Completion Badges (IPS & PJOK Kelas 7) */}
      <div className="mb-8 rounded-3xl glass-panel border border-white/15 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 font-orbitron">
          <Award className="h-4 w-4 text-amber-400" />
          <span>Status Ketuntasan Mata Pelajaran (IPS & PJOK)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* IPS */}
          <div
            className={`flex items-center justify-between rounded-2xl border p-4 transition-colors ${
              completedSubjectsSet.has('ips') || completedSubjectsSet.has('taaruf') || completedSubjectsSet.has('ipa')
                ? 'border-cyan-400/50 bg-cyan-950/30'
                : 'border-white/10 glass-panel'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌏</span>
              <div>
                <span className="block text-xs font-bold text-white font-orbitron">
                  IPS (Ilmu Pengetahuan Sosial)
                </span>
                <span className="text-[11px] text-violet-300 font-space">
                  {completedSubjectsSet.has('ips') || completedSubjectsSet.has('taaruf') || completedSubjectsSet.has('ipa') ? 'Tuntas' : 'Belum Selesai'}
                </span>
              </div>
            </div>
            {completedSubjectsSet.has('ips') || completedSubjectsSet.has('taaruf') || completedSubjectsSet.has('ipa') ? (
              <CheckCircle2 className="h-5 w-5 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
            ) : (
              <button
                type="button"
                onClick={() => onStartQuiz('ips')}
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1.5 text-xs font-orbitron font-bold text-white shadow-xs hover:scale-105 transition-all"
              >
                Mulai Quiz
              </button>
            )}
          </div>

          {/* PJOK */}
          <div
            className={`flex items-center justify-between rounded-2xl border p-4 transition-colors ${
              completedSubjectsSet.has('pjok') || completedSubjectsSet.has('adawat') || completedSubjectsSet.has('fikih')
                ? 'border-emerald-400/50 bg-emerald-950/30'
                : 'border-white/10 glass-panel'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚽</span>
              <div>
                <span className="block text-xs font-bold text-white font-orbitron">
                  PJOK (Penjasorkes)
                </span>
                <span className="text-[11px] text-violet-300 font-space">
                  {completedSubjectsSet.has('pjok') || completedSubjectsSet.has('adawat') || completedSubjectsSet.has('fikih') ? 'Tuntas' : 'Belum Selesai'}
                </span>
              </div>
            </div>
            {completedSubjectsSet.has('pjok') || completedSubjectsSet.has('adawat') || completedSubjectsSet.has('fikih') ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            ) : (
              <button
                type="button"
                onClick={() => onStartQuiz('pjok')}
                className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-1.5 text-xs font-orbitron font-bold text-white shadow-xs hover:scale-105 transition-all"
              >
                Mulai Quiz
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quiz History */}
      <div className="rounded-3xl glass-panel border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.35)] overflow-hidden">
        <div className="border-b border-white/10 bg-white/5 px-6 py-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white font-orbitron">
            Riwayat Pengerjaan Quiz
          </h2>
          <span className="text-xs font-orbitron text-violet-300">
            {userProfile.history.length} Catatan Ujian
          </span>
        </div>

        {userProfile.history.length === 0 ? (
          <div className="py-12 text-center text-xs text-violet-300 font-space">
            Belum ada riwayat quiz yang dikerjakan. Pilih mata pelajaran di Beranda untuk memulai petualangan!
          </div>
        ) : (
          <div className="divide-y divide-white/10 font-space">
            {userProfile.history.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 sm:p-5 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-panel border border-white/15 text-lg">
                    {item.subjectId === 'ips'
                      ? '🌏'
                      : item.subjectId === 'pjok'
                      ? '⚽'
                      : item.subjectId === 'taaruf'
                      ? '🤝'
                      : item.subjectId === 'adawat'
                      ? '🎒'
                      : '📚'}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white font-orbitron">
                      {item.subjectTitle}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-violet-300">
                      <span>{new Date(item.completedAt).toLocaleDateString('id-ID')}</span>
                      <span>•</span>
                      <span>
                        Benar: {item.correctCount}/{item.totalQuestions}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right font-orbitron">
                    <span className="text-base sm:text-lg font-black text-amber-300">
                      {item.score}
                    </span>
                    <span className="block text-[10px] text-emerald-300 font-medium">
                      {item.category}
                    </span>
                  </div>

                  {onReviewQuizResult && (
                    <button
                      type="button"
                      onClick={() => onReviewQuizResult(item)}
                      className="hidden sm:flex items-center gap-1 rounded-xl glass-panel border border-white/15 px-3 py-1.5 text-xs font-orbitron font-bold text-cyan-300 hover:bg-white/10 transition-colors"
                    >
                      <span>Review</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
