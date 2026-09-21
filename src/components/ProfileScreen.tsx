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
    name: 'Siswa & Pelajar',
    items: ['🎓', '👨‍🎓', '👩‍🎓', '🧕', '🧑‍🎓', '🧑‍🏫'],
  },
  {
    name: 'Pelajaran & Prestasi',
    items: ['📐', '📖', '🎨', '🏆', '🥇', '⭐'],
  },
  {
    name: 'Sains & Karakter',
    items: ['🚀', '💡', '🦁', '🔬', '🧠', '🌟', '🎯', '🐱'],
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

  // Compress & crop image to high-quality 256x256 square data URL
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
            const TARGET_SIZE = 256;
            canvas.width = TARGET_SIZE;
            canvas.height = TARGET_SIZE;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Gagal memproses kanvas gambar.'));
              return;
            }

            // Center crop to 1:1 square aspect ratio
            const minDim = Math.min(img.width, img.height);
            const startX = (img.width - minDim) / 2;
            const startY = (img.height - minDim) / 2;

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            ctx.drawImage(
              img,
              startX,
              startY,
              minDim,
              minDim,
              0,
              0,
              TARGET_SIZE,
              TARGET_SIZE
            );

            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
            resolve(compressedDataUrl);
          } catch (err) {
            reject(new Error('Gagal memproses gambar.'));
          }
        };
        img.onerror = () => reject(new Error('Gagal membaca gambar dari galeri.'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Gagal membuka file.'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await handleProcessFile(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleProcessFile = async (file: File) => {
    setUploadError(null);
    setIsUploading(true);
    try {
      const dataUrl = await processImageFile(file);
      onUpdateProfile({ avatar: dataUrl });
      setIsAvatarPickerOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengupload foto.';
      setUploadError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await handleProcessFile(file);
    }
  };

  const handleRemovePhoto = () => {
    onUpdateProfile({ avatar: '🎓' });
    setUploadError(null);
  };

  // Completed subjects calculation
  const completedSubjectsSet = new Set(userProfile.history.map((h) => h.subjectId));
  const completedCount = completedSubjectsSet.size;

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Profile Header Card */}
      <div className="mb-8 rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/90 transition-all">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {/* Avatar with click to edit */}
          <div className="relative group">
            <button
              id="change-avatar-button"
              type="button"
              onClick={() => setIsAvatarPickerOpen(!isAvatarPickerOpen)}
              className="relative flex h-20 w-20 items-center justify-center rounded-3xl overflow-hidden shadow-xs transition-transform group-hover:scale-105 border-2 border-zinc-200 dark:border-zinc-700 focus:outline-hidden"
              title="Klik untuk ganti foto atau avatar"
            >
              <UserAvatar avatar={userProfile.avatar} name={userProfile.name} size="2xl" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Camera className="h-6 w-6" />
              </div>
            </button>
            <button
              type="button"
              onClick={() => setIsAvatarPickerOpen(!isAvatarPickerOpen)}
              className="absolute -bottom-1 -right-1 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 p-1.5 shadow-xs text-xs hover:scale-110 transition-transform"
              title="Ganti Foto Profil"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* User Name & Details */}
          <div className="flex-1">
            {isEditingName ? (
              <form onSubmit={handleSaveName} className="flex items-center gap-2 max-w-sm mx-auto sm:mx-0">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 focus:outline-hidden"
                  autoFocus
                />
                <button
                  type="submit"
                  className="rounded-xl bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
                >
                  <Check className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {userProfile.name}
                </h1>
                <button
                  type="button"
                  onClick={() => setIsEditingName(true)}
                  className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-1"
                  title="Ubah Nama Siswa"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            <div className="mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 font-mono text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                Status: {userProfile.role}
              </span>
              <span>•</span>
              <span>Kelas 7 SMP</span>
              <span>•</span>
              <span>Anggota Terdaftar</span>
            </div>

            <div className="mt-3 flex items-center justify-center sm:justify-start gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsAvatarPickerOpen(true);
                  setAvatarTab('upload');
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <Camera className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                <span>Ubah Foto Profil</span>
              </button>

              {isCustomPhoto && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50/50 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300 transition-colors"
                  title="Hapus foto kustom dan gunakan emoji"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>Reset Foto</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Avatar & Photo Picker Drawer / Modal */}
        {isAvatarPickerOpen && (
          <div className="mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAvatarTab('upload')}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    avatarTab === 'upload'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs'
                      : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400'
                  }`}
                >
                  <Upload className="h-3.5 w-3.5" />
                  <span>Upload Foto Galeri</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAvatarTab('preset')}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    avatarTab === 'preset'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs'
                      : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400'
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Avatar Karakter</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsAvatarPickerOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-1"
                title="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* TAB 1: Upload Foto Galeri */}
            {avatarTab === 'upload' && (
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="avatar-gallery-input"
                />

                {/* Drag & Drop Upload Box */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                  }}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-amber-500 bg-amber-50/50 dark:border-amber-400 dark:bg-amber-950/20'
                      : 'border-zinc-200 bg-zinc-50/50 hover:border-zinc-400 hover:bg-zinc-100/60 dark:border-zinc-700 dark:bg-zinc-800/40 dark:hover:border-zinc-600'
                  }`}
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-zinc-800 shadow-2xs group-hover:scale-105 transition-transform">
                    <ImageIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>

                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Pilih Foto dari Galeri HP / Komputer
                  </p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Tarik dan lepaskan foto di sini, atau <span className="font-semibold text-amber-600 dark:text-amber-400 underline">klik untuk menelusuri</span>
                  </p>
                  <p className="mt-2 text-[10.5px] font-mono text-zinc-400">
                    Mendukung JPG, PNG, WebP • Otomatis dipotong rapi dan dikompresi
                  </p>

                  {isUploading && (
                    <div className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 rounded-2xl flex items-center justify-center backdrop-blur-2xs">
                      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-amber-600 border-t-transparent" />
                        <span>Memproses foto profil...</span>
                      </div>
                    </div>
                  )}
                </div>

                {uploadError && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Avatar Karakter & Emoji Presets */}
            {avatarTab === 'preset' && (
              <div className="space-y-4">
                {AVATAR_CATEGORIES.map((cat, catIdx) => (
                  <div key={catIdx}>
                    <div className="mb-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                      {cat.name}
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {cat.items.map((av, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectAvatar(av)}
                          className={`flex h-11 w-11 items-center justify-center rounded-xl text-2xl transition-transform hover:scale-110 ${
                            userProfile.avatar === av
                              ? 'bg-zinc-900 text-white dark:bg-zinc-100 ring-2 ring-zinc-900 dark:ring-zinc-100'
                              : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                          }`}
                          title={`Pilih avatar ${av}`}
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
        <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3">
            <span className="block text-[10px] text-zinc-500 uppercase font-semibold">Total XP</span>
            <span className="text-xl font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1 mt-0.5">
              <Sparkles className="h-4 w-4" />
              {userProfile.xp}
            </span>
          </div>

          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3">
            <span className="block text-[10px] text-zinc-500 uppercase font-semibold">Quiz Selesai</span>
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-0.5 block">
              {userProfile.quizzesCompleted}
            </span>
          </div>

          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3">
            <span className="block text-[10px] text-zinc-500 uppercase font-semibold">Skor Terbaik</span>
            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
              {userProfile.history.length > 0
                ? Math.max(...userProfile.history.map((h) => h.score))
                : 0}
            </span>
          </div>

          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3">
            <span className="block text-[10px] text-zinc-500 uppercase font-semibold">Mapel Tuntas</span>
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-0.5 block">
              {completedCount} / 3
            </span>
          </div>
        </div>
      </div>

      {/* Subject Completion Badges */}
      <div className="mb-8 rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/90">
        <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
          <Award className="h-4 w-4 text-amber-500" />
          <span>Status Ketuntasan Mata Pelajaran</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Matematika */}
          <div
            className={`flex items-center justify-between rounded-xl border p-4 transition-colors ${
              completedSubjectsSet.has('matematika')
                ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-950/20'
                : 'border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">📐</span>
              <div>
                <span className="block text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  Matematika
                </span>
                <span className="text-[11px] text-zinc-500">
                  {completedSubjectsSet.has('matematika') ? 'Tuntas' : 'Belum Selesai'}
                </span>
              </div>
            </div>
            {completedSubjectsSet.has('matematika') ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            ) : (
              <button
                type="button"
                onClick={() => onStartQuiz('matematika')}
                className="rounded-lg bg-zinc-900 px-2.5 py-1 text-[11px] font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
              >
                Mulai
              </button>
            )}
          </div>

          {/* Qur'an Hadis */}
          <div
            className={`flex items-center justify-between rounded-xl border p-4 transition-colors ${
              completedSubjectsSet.has('quran_hadis')
                ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-950/20'
                : 'border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">📖</span>
              <div>
                <span className="block text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  Qur'an Hadis
                </span>
                <span className="text-[11px] text-zinc-500">
                  {completedSubjectsSet.has('quran_hadis') ? 'Tuntas' : 'Belum Selesai'}
                </span>
              </div>
            </div>
            {completedSubjectsSet.has('quran_hadis') ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            ) : (
              <button
                type="button"
                onClick={() => onStartQuiz('quran_hadis')}
                className="rounded-lg bg-zinc-900 px-2.5 py-1 text-[11px] font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
              >
                Mulai
              </button>
            )}
          </div>

          {/* Seni Rupa */}
          <div
            className={`flex items-center justify-between rounded-xl border p-4 transition-colors ${
              completedSubjectsSet.has('seni_rupa')
                ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-950/20'
                : 'border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🎨</span>
              <div>
                <span className="block text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  Seni Rupa
                </span>
                <span className="text-[11px] text-zinc-500">
                  {completedSubjectsSet.has('seni_rupa') ? 'Tuntas' : 'Belum Selesai'}
                </span>
              </div>
            </div>
            {completedSubjectsSet.has('seni_rupa') ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            ) : (
              <button
                type="button"
                onClick={() => onStartQuiz('seni_rupa')}
                className="rounded-lg bg-zinc-900 px-2.5 py-1 text-[11px] font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
              >
                Mulai
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quiz History */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900/90 overflow-hidden">
        <div className="border-b border-zinc-100 bg-zinc-50/70 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Riwayat Pengerjaan Quiz
            </h2>
            <span className="text-xs font-mono text-zinc-500">
              {userProfile.history.length} Catatan Ujian
            </span>
          </div>
        </div>

        {userProfile.history.length === 0 ? (
          <div className="py-12 text-center text-xs text-zinc-500">
            Belum ada riwayat quiz yang dikerjakan. Pilih mata pelajaran di halaman Home untuk mulai!
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {userProfile.history.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 sm:p-5 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-lg">
                    {item.subjectId === 'matematika'
                      ? '📐'
                      : item.subjectId === 'quran_hadis'
                      ? '📖'
                      : '🎨'}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {item.subjectTitle}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
                      <span>{new Date(item.completedAt).toLocaleDateString('id-ID')}</span>
                      <span>•</span>
                      <span>
                        Benar: {item.correctCount}/{item.totalQuestions}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right font-mono">
                    <span className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {item.score}
                    </span>
                    <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      {item.category}
                    </span>
                  </div>

                  {onReviewQuizResult && (
                    <button
                      type="button"
                      onClick={() => onReviewQuizResult(item)}
                      className="hidden sm:flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
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
