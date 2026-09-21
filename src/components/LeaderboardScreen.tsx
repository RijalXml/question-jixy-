import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Medal,
  Sparkles,
  Search,
  Filter,
  Calendar,
  BookOpen,
  ArrowUpDown,
  RefreshCw,
} from 'lucide-react';
import { LeaderboardEntry, SubjectId } from '../types';

interface LeaderboardScreenProps {
  currentStudentName: string;
  onStartQuiz: (subjectId: SubjectId) => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  currentStudentName,
  onStartQuiz,
}) => {
  const [subjectFilter, setSubjectFilter] = useState<SubjectId | 'all'>('all');
  const [timeframeFilter, setTimeframeFilter] = useState<'all' | 'daily' | 'weekly'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (subjectFilter !== 'all') params.set('subject', subjectFilter);
      if (timeframeFilter !== 'all') params.set('timeframe', timeframeFilter);

      const res = await fetch(`/api/leaderboard?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setEntries(data.items || []);
      }
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [subjectFilter, timeframeFilter]);

  // Client side search filter
  const filteredEntries = entries.filter((entry) =>
    entry.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topThree = filteredEntries.slice(0, 3);
  const remainingPlayers = filteredEntries.slice(3);

  // Subject label helper
  const getSubjectBadge = (subId: SubjectId | 'all') => {
    switch (subId) {
      case 'matematika':
        return { label: 'Matematika', icon: '📐' };
      case 'quran_hadis':
        return { label: "Qur'an Hadis", icon: '📖' };
      case 'seni_rupa':
        return { label: 'Seni Rupa', icon: '🎨' };
      default:
        return { label: 'Semua Mapel', icon: '🌟' };
    }
  };

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300 font-mono mb-2">
            <Trophy className="h-3.5 w-3.5 text-amber-500" />
            <span>Papan Prestasi Siswa</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
            LEADERBOARD
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Peringkat akumulasi skor tertinggi dan perolehan XP para siswa berprestasi.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchLeaderboard}
          className="self-center sm:self-auto flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors shadow-2xs"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Segarkan Data</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="mb-8 space-y-4">
        {/* Subject Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mr-2 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" />
            Mata Pelajaran:
          </span>

          <button
            type="button"
            onClick={() => setSubjectFilter('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              subjectFilter === 'all'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs'
                : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
            }`}
          >
            Semua Mata Pelajaran
          </button>

          <button
            type="button"
            onClick={() => setSubjectFilter('matematika')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              subjectFilter === 'matematika'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs'
                : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
            }`}
          >
            <span>📐</span>
            <span>Matematika</span>
          </button>

          <button
            type="button"
            onClick={() => setSubjectFilter('quran_hadis')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              subjectFilter === 'quran_hadis'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs'
                : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
            }`}
          >
            <span>📖</span>
            <span>Qur'an Hadis</span>
          </button>

          <button
            type="button"
            onClick={() => setSubjectFilter('seni_rupa')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              subjectFilter === 'seni_rupa'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs'
                : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
            }`}
          >
            <span>🎨</span>
            <span>Seni Rupa</span>
          </button>
        </div>

        {/* Timeframe & Search Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Timeframe Selector */}
          <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-900">
            <button
              type="button"
              onClick={() => setTimeframeFilter('daily')}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                timeframeFilter === 'daily'
                  ? 'bg-white text-zinc-900 shadow-2xs dark:bg-zinc-800 dark:text-zinc-100 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              Harian
            </button>
            <button
              type="button"
              onClick={() => setTimeframeFilter('weekly')}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                timeframeFilter === 'weekly'
                  ? 'bg-white text-zinc-900 shadow-2xs dark:bg-zinc-800 dark:text-zinc-100 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              Mingguan
            </button>
            <button
              type="button"
              onClick={() => setTimeframeFilter('all')}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                timeframeFilter === 'all'
                  ? 'bg-white text-zinc-900 shadow-2xs dark:bg-zinc-800 dark:text-zinc-100 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              Keseluruhan
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama siswa..."
              className="w-full rounded-xl border border-zinc-200 bg-white pl-9 pr-3 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-100"
            />
          </div>
        </div>
      </div>

      {/* TOP 3 PODIUM DISPLAY */}
      {topThree.length > 0 && !searchQuery && (
        <div className="mb-10">
          <h2 className="mb-4 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-center">
            Panggung Kehormatan 3 Besar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* RANK 2 (Silver) */}
            {topThree[1] && (
              <div className="order-2 md:order-1 rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900/90 relative pt-7 transition-all hover:scale-[1.02]">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex h-7 items-center gap-1 rounded-full border border-slate-300 bg-slate-100 px-2.5 text-xs font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 shadow-2xs font-mono">
                  🥈 Rank 2
                </div>
                <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-3xl shadow-2xs dark:bg-slate-800">
                  {topThree[1].avatar}
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {topThree[1].studentName}
                </h3>
                <span className="inline-block mt-0.5 rounded-md bg-zinc-100 px-2 py-0.5 text-[10.5px] font-mono text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {getSubjectBadge(topThree[1].subjectId).icon}{' '}
                  {getSubjectBadge(topThree[1].subjectId).label}
                </span>

                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-around font-mono text-xs">
                  <div>
                    <span className="block text-[10px] text-zinc-400 uppercase">Skor</span>
                    <span className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">
                      {topThree[1].score}
                    </span>
                  </div>
                  <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
                  <div>
                    <span className="block text-[10px] text-zinc-400 uppercase">XP</span>
                    <span className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-0.5">
                      <Sparkles className="h-3 w-3" />
                      {topThree[1].xp}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* RANK 1 (Gold) — Center and elevated */}
            {topThree[0] && (
              <div className="order-1 md:order-2 rounded-2xl border-2 border-amber-300 bg-linear-to-b from-amber-50/50 to-white p-6 text-center shadow-md dark:border-amber-700/60 dark:from-amber-950/20 dark:to-zinc-900 relative pt-8 transition-all hover:scale-[1.03] md:-translate-y-2">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 items-center gap-1.5 rounded-full border border-amber-400 bg-amber-400 px-3.5 text-xs font-extrabold text-amber-950 shadow-xs font-mono">
                  🥇 Rank 1
                </div>
                <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-4xl shadow-xs ring-4 ring-amber-200/60 dark:bg-amber-900/40 dark:ring-amber-900/40">
                  {topThree[0].avatar}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {topThree[0].studentName}
                </h3>
                <span className="inline-block mt-0.5 rounded-md bg-amber-100/80 px-2 py-0.5 text-[10.5px] font-mono font-medium text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                  {getSubjectBadge(topThree[0].subjectId).icon}{' '}
                  {getSubjectBadge(topThree[0].subjectId).label}
                </span>

                <div className="mt-4 pt-3 border-t border-amber-100 dark:border-zinc-800 flex items-center justify-around font-mono text-xs">
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase font-semibold">
                      Skor Juara
                    </span>
                    <span className="text-2xl font-black text-amber-700 dark:text-amber-400">
                      {topThree[0].score}
                    </span>
                  </div>
                  <div className="h-7 w-[1px] bg-amber-200 dark:bg-zinc-800" />
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase font-semibold">
                      Total XP
                    </span>
                    <span className="text-base font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-0.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      {topThree[0].xp}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* RANK 3 (Bronze) */}
            {topThree[2] && (
              <div className="order-3 rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900/90 relative pt-7 transition-all hover:scale-[1.02]">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex h-7 items-center gap-1 rounded-full border border-amber-700/30 bg-amber-100 px-2.5 text-xs font-bold text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300 shadow-2xs font-mono">
                  🥉 Rank 3
                </div>
                <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-3xl shadow-2xs dark:bg-zinc-800">
                  {topThree[2].avatar}
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {topThree[2].studentName}
                </h3>
                <span className="inline-block mt-0.5 rounded-md bg-zinc-100 px-2 py-0.5 text-[10.5px] font-mono text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {getSubjectBadge(topThree[2].subjectId).icon}{' '}
                  {getSubjectBadge(topThree[2].subjectId).label}
                </span>

                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-around font-mono text-xs">
                  <div>
                    <span className="block text-[10px] text-zinc-400 uppercase">Skor</span>
                    <span className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">
                      {topThree[2].score}
                    </span>
                  </div>
                  <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
                  <div>
                    <span className="block text-[10px] text-zinc-400 uppercase">XP</span>
                    <span className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-0.5">
                      <Sparkles className="h-3 w-3" />
                      {topThree[2].xp}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* REMAINING PLAYERS LIST TABLE */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900/90 overflow-hidden">
        <div className="border-b border-zinc-100 bg-zinc-50/70 px-5 py-3.5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
            <span>Daftar Peringkat Peserta</span>
            <span>{filteredEntries.length} Peserta Terdaftar</span>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-zinc-500 font-mono">
            <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2 text-zinc-400" />
            Memuat data peringkat...
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="py-12 text-center text-xs text-zinc-500">
            Belum ada data untuk filter yang dipilih. Jadilah yang pertama menyelesaikan quiz!
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {filteredEntries.map((player, index) => {
              const rank = index + 1;
              const isCurrentUser =
                player.studentName.toLowerCase().trim() === currentStudentName.toLowerCase().trim();

              return (
                <div
                  key={player.id || index}
                  className={`flex items-center justify-between px-4 sm:px-6 py-3.5 transition-colors ${
                    isCurrentUser
                      ? 'bg-amber-50/40 dark:bg-amber-950/20'
                      : 'hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40'
                  }`}
                >
                  {/* Rank & Player Details */}
                  <div className="flex items-center gap-3.5">
                    {/* Rank Badge */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold ${
                        rank === 1
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-200'
                          : rank === 2
                          ? 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                          : rank === 3
                          ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                      }`}
                    >
                      {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
                    </div>

                    {/* Avatar & Name */}
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{player.avatar}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            {player.studentName}
                          </span>
                          {isCurrentUser && (
                            <span className="rounded-md bg-amber-100 px-1.5 py-0.2 text-[9.5px] font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-mono">
                              Anda
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[10.5px] text-zinc-500 dark:text-zinc-400">
                          <span>
                            {getSubjectBadge(player.subjectId).icon}{' '}
                            {getSubjectBadge(player.subjectId).label}
                          </span>
                          <span>•</span>
                          <span>{player.quizzesCompleted}x Selesai</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Score & XP Stats */}
                  <div className="flex items-center gap-4 sm:gap-8 font-mono text-right">
                    <div>
                      <span className="block text-[10px] text-zinc-400 uppercase">Skor</span>
                      <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                        {player.score}
                      </span>
                    </div>

                    <div className="min-w-[70px]">
                      <span className="block text-[10px] text-zinc-400 uppercase">XP</span>
                      <span className="text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400 flex items-center justify-end gap-0.5">
                        <Sparkles className="h-3 w-3" />
                        {player.xp}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
