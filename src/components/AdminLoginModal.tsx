import React, { useState } from 'react';
import { ShieldCheck, X, AlertCircle, Loader2, Eye, EyeOff, Zap, CheckCircle2 } from 'lucide-react';
import { apiAdminLogin } from '../utils/api';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (token: string, user: { name: string; email: string; role: 'ADMIN' }) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleQuickFill = () => {
    setUsername('admin');
    setPassword('admin123');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await apiAdminLogin(username, password);

      if (!result.ok || !result.token || !result.user) {
        throw new Error(result.error || 'Login gagal. Periksa username dan password admin.');
      }

      onLoginSuccess(result.token, result.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Gagal login. Gunakan username: admin dan password: admin123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl glass-panel border border-emerald-400/50 bg-[#070b1a]/95 p-6 sm:p-7 shadow-[0_0_35px_rgba(16,185,129,0.25)] transition-all">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/25 text-emerald-300 border border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-orbitron">
                Login Administrator
              </h2>
              <p className="text-[11px] text-emerald-200/80 font-space">
                Kelola bank soal, edit kunci jawaban & pantau analitik
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1.5 text-violet-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Credentials Info Box */}
        <div className="mt-4 rounded-2xl glass-panel border border-emerald-400/40 bg-emerald-950/40 p-3.5 text-xs font-space">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Kredensial Akses Admin:
            </span>
            <button
              type="button"
              onClick={handleQuickFill}
              className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/30 border border-emerald-400/50 px-2.5 py-1 text-[10.5px] font-orbitron font-bold text-emerald-200 hover:bg-emerald-500/50 transition-colors shadow-xs"
            >
              <Zap className="h-3 w-3 text-emerald-300" />
              Isi Cepat
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-emerald-200 font-mono">
            <div>
              <span className="text-emerald-300/70 block text-[10px]">Username:</span>
              <code className="font-bold bg-black/40 px-2 py-0.5 rounded border border-emerald-400/40">
                admin
              </code>
            </div>
            <div>
              <span className="text-emerald-300/70 block text-[10px]">Password:</span>
              <code className="font-bold bg-black/40 px-2 py-0.5 rounded border border-emerald-400/40">
                admin123
              </code>
            </div>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-950/40 p-3 text-xs text-rose-300 font-space">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs font-space">
          <div>
            <label className="block mb-1 font-semibold text-violet-200 font-orbitron text-[11px]">
              Username / Email Admin
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full rounded-xl glass-panel border border-white/15 bg-white/5 px-3.5 py-2 text-xs text-white placeholder-violet-400/50 focus:border-cyan-400 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-violet-200 font-orbitron text-[11px]">
              Password Admin
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin..."
                className="w-full rounded-xl glass-panel border border-white/15 bg-white/5 px-3.5 pr-9 py-2 text-xs text-white placeholder-violet-400/50 focus:border-cyan-400 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-violet-400 hover:text-white transition-colors"
                title={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl glass-panel border border-white/15 px-4 py-2 text-xs font-space text-violet-300 hover:text-white"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2 text-xs font-orbitron font-bold text-white hover:from-emerald-500 hover:to-teal-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all disabled:opacity-50 active:scale-95"
            >
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>Masuk Admin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
