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
import { apiGetLeaderboard } from '../utils/api';
import { UserAvatar } from './UserAvatar';

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
      const items = await apiGetLeaderboard(subjectFilter, timeframeFilter);
      setEntries(items || []);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [subjectFilter, timeframeFilter]);

  // Client side search filter & strictly score >= 100
  const filteredEntries = entries
    .filter((entry) => entry && Number(entry.score) >= 100)
    .filter((entry) =>
      entry.studentName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const topThree = filteredEntries.slice(0, 3);
  const remainingPlayers = filteredEntries.slice(3);

  const getSubjectBadge = (subId: SubjectId | 'all') => {
    switch (subId) {
      case 'ipa':
        return { label: 'IPA (Tata Surya & Sains)', icon: '🔭' };
      case 'fikih':
        return { label: 'Fikih Ibadah', icon: '🕌' };
      case 'pkn':
        return { label: 'Pendidikan Pancasila (PKn)', icon: '🦅' };
      default:
        return { label: 'Semua Mapel', icon: '🌟' };
    }
  };

  const handleStartActiveSubject = () => {
    if (subjectFilter !== 'all') {
      onStartQuiz(subjectFilter);
    } else {
      onStartQuiz('ipa');
    }
  };

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-5xl px-4 py-8 sm:px-6 sm:py-10 font-sans select-none relative z-10">
      {/* Header */}
      <div className="mb-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/20 px-3 py-1 text-xs font-orbitron font-bold text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
              <Trophy className="h-3.5 w-3.5 text-amber-400" />
              <span>Panggung Kehormatan Siswa</span>
            </div>
            <span className="text-[10px] font-orbitron font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              SKOR 100
            </span>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-orbitron">
              LEADERBOARD KOSMIK
            </h1>
            <div className="h-1 w-36 bg-gradient-to-r from-amber-400 via-violet-400 to-transparent rounded-full mt-1.5" />
          </div>
          <p className="mt-1 text-xs sm:text-sm text-violet-200/80 font-space">
            Daftar siswa berprestasi yang berhasil meraih skor sempurna minimal 100 poin di simulasi ujian.
          </p>
        </div>

        <div className="flex items-center justify-center sm:justify-end gap-3">
          <button
            type="button"
            onClick={fetchLeaderboard}
            className="flex items-center gap-1.5 rounded-2xl glass-panel border border-white/15 px-4 py-2.5 text-xs font-orbitron font-bold text-violet-100 hover:text-white hover:bg-white/10 transition-colors shadow-sm"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
            <span>Segarkan Data</span>
          </button>
        </div>
      </div>

      {/* Leaderboard Criteria Notice */}
      <div className="mb-8 flex items-start gap-3 rounded-3xl glass-panel border border-amber-400/40 bg-amber-950/25 p-4 sm:p-5 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-500/30 text-amber-300 border border-amber-400/50 shadow-[0_0_12px_rgba(245,158,11,0.4)] font-orbitron font-bold text-sm">
          100
        </div>
        <div className="text-xs">
          <h2 className="font-bold text-amber-200 font-orbitron text-sm">
            Syarat Masuk Leaderboard: Skor Sempurna 100 Poin
          </h2>
          <p className="text-amber-300/80 mt-0.5 leading-relaxed font-space">
            Hanya peserta yang menjawab seluruh 30 butir pertanyaan dengan benar dan mencapai nilai sempurna (100) yang akan dicatat di Papan Peringkat Kosmik ini.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="mb-8 space-y-4">
        {/* Subject Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
          <span className="text-xs font-semibold text-violet-300 mr-2 flex items-center gap-1 font-space">
            <Filter className="h-3.5 w-3.5 text-cyan-400" />
            Mata Pelajaran:
          </span>

          <button
            type="button"
            onClick={() => setSubjectFilter('all')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-orbitron font-bold transition-all ${
              subjectFilter === 'all'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.5)] border border-violet-400/50'
                : 'glass-panel border border-white/10 text-violet-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Semua Mapel
          </button>

          <button
            type="button"
            onClick={() => setSubjectFilter('ipa')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-orbitron font-bold transition-all ${
              subjectFilter === 'ipa'
                ? 'bg-cyan-500/30 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.5)] border border-cyan-400/60'
                : 'glass-panel border border-white/10 text-violet-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🔭</span>
            <span>IPA</span>
          </button>

          <button
            type="button"
            onClick={() => setSubjectFilter('fikih')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-orbitron font-bold transition-all ${
              subjectFilter === 'fikih'
                ? 'bg-emerald-500/30 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.5)] border border-emerald-400/60'
                : 'glass-panel border border-white/10 text-violet-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🕌</span>
            <span>Fikih</span>
          </button>

          <button
            type="button"
            onClick={() => setSubjectFilter('pkn')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-orbitron font-bold transition-all ${
              subjectFilter === 'pkn'
                ? 'bg-amber-500/30 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.5)] border border-amber-400/60'
                : 'glass-panel border border-white/10 text-violet-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🦅</span>
            <span>PKn</span>
          </button>
        </div>

        {/* Timeframe & Search Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Timeframe Selector */}
          <div className="flex items-center gap-1.5 rounded-2xl glass-panel border border-white/10 p-1">
            <button
              type="button"
              onClick={() => setTimeframeFilter('daily')}
              className={`rounded-xl px-3 py-1 text-xs font-orbitron transition-all ${
                timeframeFilter === 'daily'
                  ? 'bg-white/20 text-white font-bold shadow-xs'
                  : 'text-violet-300 hover:text-white'
              }`}
            >
              Harian
            </button>
            <button
              type="button"
              onClick={() => setTimeframeFilter('weekly')}
              className={`rounded-xl px-3 py-1 text-xs font-orbitron transition-all ${
                timeframeFilter === 'weekly'
                  ? 'bg-white/20 text-white font-bold shadow-xs'
                  : 'text-violet-300 hover:text-white'
              }`}
            >
              Mingguan
            </button>
            <button
              type="button"
              onClick={() => setTimeframeFilter('all')}
              className={`rounded-xl px-3 py-1 text-xs font-orbitron transition-all ${
                timeframeFilter === 'all'
                  ? 'bg-white/20 text-white font-bold shadow-xs'
                  : 'text-violet-300 hover:text-white'
              }`}
            >
              Semua Waktu
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 sm:w-64 sm:flex-none">
            <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-violet-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama juara..."
              className="w-full rounded-2xl glass-panel border border-white/15 bg-white/5 pl-9 pr-4 py-2 text-xs font-space text-white placeholder-violet-300/50 focus:border-cyan-400 focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Podium for Top 3 (Score 100) */}
      {topThree.length > 0 && !searchQuery && (
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {/* Second Place */}
          {topThree[1] && (
            <div className="order-2 md:order-1 rounded-3xl glass-panel border border-cyan-400/40 p-5 text-center shadow-[0_0_20px_rgba(6,182,212,0.2)] flex flex-col justify-between">
              <div>
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-orbitron font-black text-sm">
                  #2
                </div>
                <div className="flex justify-center mb-2">
                  <UserAvatar avatar={topThree[1].avatar} name={topThree[1].studentName} size="md" />
                </div>
                <h3 className="text-sm font-bold text-white font-orbitron truncate">
                  {topThree[1].studentName}
                </h3>
                <div className="text-xs text-cyan-300/80 font-space mt-0.5">
                  {getSubjectBadge(topThree[1].subjectId).label}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-around font-orbitron text-xs">
                <div>
                  <span className="block text-[10px] text-violet-300 font-space">Skor</span>
                  <span className="text-lg font-black text-white">{topThree[1].score}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-violet-300 font-space">XP</span>
                  <span className="text-lg font-black text-cyan-300">{topThree[1].xp}</span>
                </div>
              </div>
            </div>
          )}

          {/* First Place (Champion) */}
          {topThree[0] && (
            <div className="order-1 md:order-2 rounded-3xl glass-panel border border-amber-400/60 p-6 text-center shadow-[0_0_30px_rgba(245,158,11,0.35)] flex flex-col justify-between transform md:-translate-y-2 bg-amber-950/20">
              <div>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-black font-orbitron font-black text-base shadow-[0_0_15px_rgba(245,158,11,0.6)]">
                  👑 #1
                </div>
                <div className="flex justify-center mb-2">
                  <UserAvatar avatar={topThree[0].avatar} name={topThree[0].studentName} size="lg" />
                </div>
                <h3 className="text-base font-black text-white font-orbitron truncate">
                  {topThree[0].studentName}
                </h3>
                <div className="text-xs text-amber-300 font-space mt-0.5 font-semibold">
                  {getSubjectBadge(topThree[0].subjectId).label}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-around font-orbitron text-xs">
                <div>
                  <span className="block text-[10px] text-violet-300 font-space">Skor</span>
                  <span className="text-2xl font-black text-amber-300">{topThree[0].score}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-violet-300 font-space">XP</span>
                  <span className="text-2xl font-black text-amber-300">{topThree[0].xp}</span>
                </div>
              </div>
            </div>
          )}

          {/* Third Place */}
          {topThree[2] && (
            <div className="order-3 md:order-3 rounded-3xl glass-panel border border-violet-400/40 p-5 text-center shadow-[0_0_20px_rgba(139,92,246,0.2)] flex flex-col justify-between">
              <div>
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-300 border border-violet-400/40 font-orbitron font-black text-sm">
                  #3
                </div>
                <div className="flex justify-center mb-2">
                  <UserAvatar avatar={topThree[2].avatar} name={topThree[2].studentName} size="md" />
                </div>
                <h3 className="text-sm font-bold text-white font-orbitron truncate">
                  {topThree[2].studentName}
                </h3>
                <div className="text-xs text-violet-300/80 font-space mt-0.5">
                  {getSubjectBadge(topThree[2].subjectId).label}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-around font-orbitron text-xs">
                <div>
                  <span className="block text-[10px] text-violet-300 font-space">Skor</span>
                  <span className="text-lg font-black text-white">{topThree[2].score}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-violet-300 font-space">XP</span>
                  <span className="text-lg font-black text-violet-300">{topThree[2].xp}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Leaderboard Table / Cards */}
      <div className="rounded-3xl glass-panel border border-white/15 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
        <div className="border-b border-white/10 bg-white/5 px-6 py-4 flex items-center justify-between text-xs font-orbitron font-bold text-violet-200">
          <span>Daftar Siswa Peraih Nilai 100</span>
          <span>{filteredEntries.length} Siswa Terdaftar</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs font-space text-violet-300">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-cyan-400" />
            <span>Memuat data peringkat kosmik...</span>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <Trophy className="h-12 w-12 mx-auto text-violet-400/40" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white font-orbitron">
                Belum Ada Siswa yang Meraih Nilai 100
              </h3>
              <p className="text-xs text-violet-200/70 max-w-md mx-auto font-space">
                Jadilah siswa pertama yang menyelesaikan seluruh butir soal dengan benar untuk membuka panggung juara ini!
              </p>
            </div>
            <button
              onClick={handleStartActiveSubject}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-orbitron font-bold shadow-[0_0_15px_rgba(139,92,246,0.5)] active:scale-95 transition-all"
            >
              <span>Mulai Ujian Sekarang</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/10 font-space">
            {filteredEntries.map((entry, idx) => {
              const isCurrentUser =
                entry.studentName.toLowerCase() === currentStudentName.toLowerCase();

              return (
                <div
                  key={entry.id || idx}
                  className={`flex items-center justify-between p-4 sm:px-6 transition-colors ${
                    isCurrentUser
                      ? 'bg-violet-600/20 border-l-4 border-violet-400'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-6 text-center font-orbitron font-black text-xs text-violet-300">
                      #{idx + 1}
                    </span>
                    <UserAvatar avatar={entry.avatar} name={entry.studentName} size="sm" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white font-space">
                          {entry.studentName}
                        </span>
                        {isCurrentUser && (
                          <span className="text-[10px] font-orbitron font-bold px-1.5 py-0.2 rounded-full bg-violet-500/30 text-cyan-300 border border-violet-400/40">
                            Kamu
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-violet-300/80 block">
                        {getSubjectBadge(entry.subjectId).icon}{' '}
                        {getSubjectBadge(entry.subjectId).label}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-right font-orbitron">
                    <div>
                      <span className="text-sm sm:text-base font-black text-amber-300">
                        {entry.score}
                      </span>
                      <span className="block text-[10px] text-violet-300 font-space">Poin</span>
                    </div>
                    <div>
                      <span className="text-sm sm:text-base font-black text-cyan-300">
                        {entry.xp}
                      </span>
                      <span className="block text-[10px] text-violet-300 font-space">XP</span>
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
