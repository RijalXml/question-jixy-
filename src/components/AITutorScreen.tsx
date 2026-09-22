import React, { useState, useRef, useEffect } from 'react';
import { SubjectId, ScreenState } from '../types';
import { LKS_SUBJECTS } from '../data/lksLessons';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Lightbulb,
  ArrowRight,
  BookOpen,
  RotateCcw
} from 'lucide-react';

interface AITutorScreenProps {
  selectedSubject: SubjectId;
  onSelectSubject: (sub: SubjectId) => void;
  onNavigate: (screen: ScreenState) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AITutorScreen: React.FC<AITutorScreenProps> = ({
  selectedSubject,
  onSelectSubject,
  onNavigate,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: 'Halo! Saya AI Tutor Pendamping LKS kamu. Saya siap membantumu memahami materi **SKI**, **Bahasa Inggris**, atau **Bahasa Jawa**. Mau bertanya tentang materi apa hari ini?',
      timestamp: 'Baru saja',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: '🕌 4 Respon Quraisy terhadap Dakwah Nabi', query: 'Jelaskan mengapa kaum kafir Quraisy menolak dakwah Rasulullah saw. di Mekah?' },
    { label: '🔤 Rumus Simple Present Tense', query: 'Bagaimana rumus dan contoh Simple Present Tense untuk menceritakan rutinitas harian?' },
    { label: '🍲 Struktur Procedure Text Makanan', query: 'Apa saja 3 struktur utama dalam Procedure Text Bahasa Inggris?' },
    { label: 'ꦗ Struktur Teks Wacan Narasi Jawa', query: 'Jelaskan 4 struktur wacan narasi Jawa: orientasi, komplikasi, resolusi, lan koda!' },
    { label: '🤝 Basa Ngoko vs Basa Krama', query: 'Kapan kita nggunakake Basa Ngoko lan kapan wajib nggunakake Basa Krama?' },
    { label: '📖 Bedane Fabel, Legenda, lan Mite', query: 'Apa bedane fabel, legenda, lan mite ing crita rakyat Jawa?' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: q.trim(),
      timestamp: 'Sekarang',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Context-rich smart educational response
    setTimeout(() => {
      let reply = '';
      const lower = q.toLowerCase();

      if (lower.includes('quraisy') || lower.includes('menolak') || lower.includes('mekah') || lower.includes('ski')) {
        reply = `**Alasan Kaum Kafir Quraisy Menolak Dakwah Rasulullah saw.:**\n\n` +
          `1. **Takut kehilangan kekuasaan & status sosial**: Bangsawan Quraisy khawatir derajat mereka disamakan dengan budak (Islam mengajarkan persamaan derajat).\n` +
          `2. **Takut rugi ekonomi**: Mekah adalah pusat perdagangan patung berhala. Mereka cemas hilangnya penyembah berhala akan menghentikan bisnis patung.\n` +
          `3. **Fanatisme buta terhadap nenek moyang**: Kebiasaan menyembah berhala sudah mendarah daging turun-temurun.\n` +
          `4. **Takut akan hari kebangkitan**: Mereka tidak percaya manusia yang sudah menjadi tulang belulang bisa dihidupkan kembali dan diadili amal perbuatannya.`;
      } else if (lower.includes('simple present') || lower.includes('tense') || lower.includes('inggris')) {
        reply = `**Simple Present Tense (Habitual Action & Facts):**\n\n` +
          `• **Verbal Sentence:**\n` +
          `  - (+) Subject + Verb 1 (-s/-es) + Object\n` +
          `  - (-) Subject + do/does not + Verb 1\n` +
          `  - (?) Do/Does + Subject + Verb 1?\n` +
          `  *Catatan*: Subjek he, she, it menggunakan akhiran -s/-es (contoh: *Budi plays football*).\n\n` +
          `• **Nominal Sentence (To Be: am, is, are):**\n` +
          `  - Contoh: *I am happy*, *She is a student*.`;
      } else if (lower.includes('procedure') || lower.includes('makanan') || lower.includes('culinary')) {
        reply = `**Generic Structure of Procedure Text (Recipe):**\n\n` +
          `1. **Goal / Aim**: Menyatakan tujuan (contoh: *How to Make Fried Rice*).\n` +
          `2. **Ingredients / Materials**: Daftar bahan dan takarannya (contoh: *rice, eggs, salt*).\n` +
          `3. **Steps / Methods**: Urutan langkah pembuatan dengan kata kerja imperatif (*stir, fry, chop, boil*).\n\n` +
          `**Adjective Rasa Makanan**: *sweet* (manis), *savory* (gurih), *spicy* (pedas), *sour* (asam).`;
      } else if (lower.includes('narasi') || lower.includes('struktur wacan') || lower.includes('jawa')) {
        reply = `**4 Struktur Wacan Narasi Jawa:**\n\n` +
          `1. **Orientasi**: Pambuka crita sing ngenalake paraga (tokoh), papan panggonan (latar panggonan), lan wektu dumadine prastawa.\n` +
          `2. **Komplikasi**: Nalika wiwit ana dredah utawa masalah sing dialami dening paraga utama.\n` +
          `3. **Resolusi**: Pangudhare prakara (masalah wis nemokake dalan pungkasan utawa solusi).\n` +
          `4. **Koda**: Panutup crita sing ngemot dudutan lan amanat luhur (pesen becik) kanggo pamaca.`;
      } else if (lower.includes('ngoko') || lower.includes('krama')) {
        reply = `**Unggah-Ungguh Basa Jawa:**\n\n` +
          `• **Basa Ngoko**: Digunakake nalika guneman karo kanca sapadha-padha, wong sing saumuran, utawa marang wong sing luwih enom.\n` +
          `• **Basa Krama (Alus)**: Digunakake nalika murid matur marang bapak/ibu guru, anak marang wong tuwa, utawa marang wong sing kudu diajeni.`;
      } else if (lower.includes('fabel') || lower.includes('legenda') || lower.includes('mite')) {
        reply = `**Jinis-jinis Crita Rakyat:**\n\n` +
          `1. **Fabel**: Dongeng sato kewan sing bisa tumindak kaya manungsa (tuladha: *Kancil lan Baya*).\n` +
          `2. **Legenda**: Crita asal-usul sawijining panggonan (tuladha: *Asal-usul Rawa Pening*, *Danau Toba*).\n` +
          `3. **Mite / Mitos**: Crita suci kang ana gandhengane karo dewa-dewi utawa alam gaib (tuladha: *Nyi Roro Kidul*).\n` +
          `4. **Sage**: Crita kepahlawanan utawa babad sejarah kuno.`;
      } else {
        reply = `Pertanyaan bagus! Dalam konteks materi LKS kurikulum genap, konsep ini berkaitan erat dengan pemahaman topik secara mendalam. ` +
          `Kamu bisa membaca detail rangkuman di menu **Materi LKS** atau langsung menguji pemahaman dengan mengerjakan **30 Soal Quiz** yang sudah disiapkan!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-' + Date.now(),
          sender: 'ai',
          text: reply,
          timestamp: 'Baru saja',
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto select-none">
      {/* 1. TUTOR HEADER CARD */}
      <div
        id="tutor-header"
        className="p-6 rounded-3xl bg-gradient-to-r from-purple-950 via-zinc-900 to-indigo-950 text-white border border-purple-800/40 shadow-md flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-400/30 flex items-center justify-center text-xl">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-[10px] font-bold text-purple-300">
              <Sparkles className="w-3 h-3" />
              <span>Pendamping Belajar Cerdas</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
              AI Tutor Pendamping LKS
            </h2>
            <p className="text-xs text-zinc-300">
              Kuasai materi SKI, Bahasa Inggris, dan Bahasa Jawa dengan tanya jawab interaktif.
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'reset-1',
                sender: 'ai',
                text: 'Sesi chat telah diperbarui. Silakan ajukan pertanyaan seputar materi LKS!',
                timestamp: 'Baru saja',
              },
            ])
          }
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-300 transition-colors"
          title="Mulai Sesi Baru"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* 2. QUICK PROMPT CHIPS */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 px-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>Contoh Pertanyaan Populer LKS:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              id={`tutor-prompt-chip-${idx}`}
              onClick={() => handleSend(p.query)}
              className="text-xs px-3 py-1.5 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-700/70 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-zinc-700 dark:text-zinc-300 font-medium transition-all active:scale-95 shadow-xs"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. CHAT MESSAGES DISPLAY */}
      <div
        id="tutor-chat-box"
        className="rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/70 dark:border-zinc-800/80 p-5 sm:p-6 shadow-xs min-h-[420px] max-h-[580px] overflow-y-auto space-y-4"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                m.sender === 'user'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                m.sender === 'user'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-xs'
                  : 'bg-zinc-100/90 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border border-zinc-200/60 dark:border-zinc-700/60'
              }`}
            >
              {m.text}
              <div
                className={`text-[10px] mt-1.5 text-right ${
                  m.sender === 'user' ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-400'
                }`}
              >
                {m.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-75" />
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-150" />
              <span className="ml-1">AI Tutor sedang berpikir...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 4. INPUT AREA */}
      <div className="relative">
        <input
          id="tutor-input-field"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Tanyakan materi SKI, Bahasa Inggris, atau Bahasa Jawa..."
          className="w-full pl-5 pr-14 py-3.5 rounded-2xl bg-white/90 dark:bg-zinc-800/90 border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
        />
        <button
          id="tutor-btn-submit"
          onClick={() => handleSend()}
          disabled={!input.trim() || isTyping}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white shadow-xs transition-all active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
